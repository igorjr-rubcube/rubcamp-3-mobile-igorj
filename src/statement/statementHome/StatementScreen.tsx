import {StackNavigationProp} from '@react-navigation/stack';
import dayjs from 'dayjs';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  GetFilteredStatementParams,
  getFilteredStatement,
} from '../../api/statement';
import {
  Background,
  TopView,
} from '../../components/DefaultScreen/DefaultScreen';
import EyeIcon from '../../components/icons/EyeIcon';
import EyeSlashIcon from '../../components/icons/EyeSlashIcon';
import FilterIcon from '../../components/icons/FilterIcon';
import RubbankIcon from '../../components/icons/RubbankIcon';
import {RootStackParamList} from '../../navigation/RootStack';
import {setLoading} from '../../redux/slices/LoadingSlice';
import {RootState} from '../../redux/store';
import Colors from '../../styles/colors';
import FilterModal from '../filterModal/FilterModal';
import {
  Balance,
  BalanceText,
  BalanceWrapper,
  Bottom,
  Content,
  DateText,
  DateWrapper,
  IconButton,
  LeftWrapper,
  RightWrapper,
  Tab,
  TabText,
  TabsWrapper,
  TextWrapper,
  Title,
  Transfer,
  TransferEndText,
  TransferIcon,
  TransferNull,
  TransferNullIcon,
  TransferNullText,
  TransferSubtitle,
  TransferTitle,
  TransferValue,
  TransfersContainer,
  Wrapper,
} from './StatementScreen.styles';
import AccountsIcon from '../../components/icons/AccountsIcon';
import PigIcon from '../../components/icons/PigIcon';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Statement'>;
};

function StatementScreen({navigation}: Props) {
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const openFilterModal = () => {
    setFilterModalVisible(true);
  };

  const [showBalance, setShowBalance] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const tabs = ['Tudo', 'Entrada', 'Saída', 'Futuro'];
  const periods = [15, 30, 60, 90];
  const orders = [1, 0];
  const [period, setPeriod] = useState(0);
  const [order, setOrder] = useState(0);
  const [initialDate, setInitialDate] = useState(dayjs());
  const [finalDate, setFinalDate] = useState(
    dayjs().subtract(periods[0], 'day'),
  );

  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(10);

  const balance = useSelector((state: RootState) => state.balance.balance);
  const token = useSelector((state: RootState) => state.token.token);
  const userId = useSelector((state: RootState) => state.userId.userId);
  const accountId = useSelector(
    (state: RootState) => state.accountId.accountId,
  );
  const account = useSelector(
    (state: RootState) => state.accounts.accounts,
  ).find(account => account.id === accountId);
  const dispatch = useDispatch();

  interface TransferType {
    id: string;
    date: string;
    amount: number;
    status: string;
    fromAccount: object;
    toAccount: object;
  }

  interface StatementType {
    [key: string]: TransferType[];
  }
  const [statement, setStatement] = useState<StatementType>({});
  const groupByDate = (statementData: []) => {
    const grouped: StatementType = {};
    statementData.forEach((item: any) => {
      const date = dayjs(item.date).format('YYYY-MM-DD');
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(item);
    });
    setStatement(grouped);
  };

  const status = {
    COMPLETED: {
      name: 'Confirmada',
      color: Colors.green,
    },
    SCHEDULED: {
      name: 'Agendada',
      color: Colors.green,
    },
    FAILED: {
      name: 'Falhou',
      color: Colors.green,
    },
  };

  const operation = {
    in: {
      name: 'Entrada',
      color: Colors.green,
    },
    out: {
      name: 'Saída',
      color: Colors.red,
    },
    scheduled: {
      name: 'Agendada',
      color: Colors.yellow,
    },
  };

  const tabOperation = {
    0: 'both',
    1: 'in',
    2: 'out',
  };

  const fetchData = async (params: any) => {
    const response = await getFilteredStatement(
      token,
      userId,
      accountId,
      params,
    );
    if (response) {
      if (response.code === 200) {
        groupByDate(response.data);
      }
    } else {
      return;
    }
    dispatch(setLoading(false));
  };

  useEffect(() => {
    dispatch(setLoading(true));
    const params: GetFilteredStatementParams = {
      order: order === 0 ? 'asc' : 'desc',
      operation: tabOperation[selectedTab as keyof typeof tabOperation] as any,
      status: selectedTab === 3 ? 'SCHEDULED' : 'COMPLETED',
      start: finalDate.format('YYYY-MM-DD'),
      end: initialDate.format('YYYY-MM-DD'),
      skip: skip,
      take: take,
    };
    fetchData(params);
    navigation.setOptions({
      headerRight: () => (
        <IconButton onPress={openFilterModal}>
          <FilterIcon fill={Colors.white} />
        </IconButton>
      ),
    });
    return () => {};
  }, []);

  useEffect(() => {
    let start = initialDate;
    let end = finalDate;
    if (selectedTab === 3) {
      if (period == -1) {
        end = dayjs().add(periods[0], 'day');
      } else {
        end = dayjs().add(periods[period], 'day');
      }
      start = dayjs();
    }
    if (end.isBefore(start)) {
      start = finalDate;
      end = initialDate;
    }
    dispatch(setLoading(true));
    const params: GetFilteredStatementParams = {
      order: order === 0 ? 'asc' : 'desc',
      operation: tabOperation[selectedTab as keyof typeof tabOperation] as any,
      status: selectedTab === 3 ? 'SCHEDULED' : 'COMPLETED',
      start: start.format('YYYY-MM-DD'),
      end: end.format('YYYY-MM-DD'),
      skip: skip,
      take: take,
    };
    fetchData(params);
    return () => {};
  }, [selectedTab, order, initialDate, finalDate, period]);

  return (
    <>
      <FilterModal
        visible={filterModalVisible}
        setVisible={setFilterModalVisible}
        setPeriod={setPeriod}
        setOrder={setOrder}
        initialDate={initialDate}
        setInitialDate={setInitialDate}
        finalDate={finalDate}
        setFinalDate={setFinalDate}
      />
      <Background>
        <TopView flexSize={1}>
          <Wrapper>
            <BalanceWrapper>
              <Balance>
                <Title>Saldo disponível</Title>
                {showBalance ? (
                  <BalanceText>
                    RC{' '}
                    {balance && balance != 0
                      ? balance?.toString().replace('.', ',')
                      : '0,00'}
                  </BalanceText>
                ) : (
                  <BalanceText>____________</BalanceText>
                )}
              </Balance>
              <IconButton onPress={() => setShowBalance(prev => !prev)}>
                {showBalance ? (
                  <EyeIcon fill={Colors.light} />
                ) : (
                  <EyeSlashIcon fill={Colors.light} />
                )}
              </IconButton>
            </BalanceWrapper>
          </Wrapper>
        </TopView>
        <Bottom>
          <Content>
            <TabsWrapper>
              {tabs.map((tab, index) => (
                <Tab
                  selected={selectedTab === index}
                  key={index}
                  onPress={() => setSelectedTab(index)}>
                  <TabText selected={selectedTab === index}>{tab}</TabText>
                </Tab>
              ))}
            </TabsWrapper>
            {Object.keys(statement).length == 0 ? (
              <TransferNull>
                <TransferNullIcon>
                  <PigIcon fill={Colors.lightGrey} />
                </TransferNullIcon>
                <TransferNullText>
                  Você ainda não possui lançamentos.
                </TransferNullText>
              </TransferNull>
            ) : null}
            <TransfersContainer>
              {Object.keys(statement).length > 0 &&
                Object.keys(statement).map((date, index) => (
                  <DateWrapper key={index}>
                    <DateText>
                      {dayjs(date).toDate().toLocaleDateString('pt-BR', {
                        month: 'long',
                        day: 'numeric',
                      })}
                    </DateText>
                    {statement[date].map((transfer: any, index: number) => (
                      <Transfer key={index}>
                        <LeftWrapper>
                          <TransferIcon>
                            <RubbankIcon />
                          </TransferIcon>
                          <TextWrapper>
                            <TransferTitle>
                              Transferência Entre Contas
                            </TransferTitle>
                            <TransferSubtitle>
                              {
                                status[transfer.status as keyof typeof status]
                                  .name
                              }
                            </TransferSubtitle>
                            <TransferSubtitle>
                              {dayjs(transfer.date).format('HH:mm')}
                            </TransferSubtitle>
                          </TextWrapper>
                        </LeftWrapper>
                        <RightWrapper>
                          <TransferValue
                            color={
                              transfer.status === 'SCHEDULED'
                                ? operation.scheduled.color
                                : account?.number ===
                                  transfer.fromAccount.number
                                ? operation.out.color
                                : operation.in.color
                            }>
                            {transfer.amount
                              .toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                              })
                              .replace('R$', 'RC')}
                          </TransferValue>
                        </RightWrapper>
                      </Transfer>
                    ))}
                  </DateWrapper>
                ))}
              <TransferEndText>Chegamos ao final da lista!</TransferEndText>
            </TransfersContainer>
          </Content>
        </Bottom>
      </Background>
    </>
  );
}

export default StatementScreen;
