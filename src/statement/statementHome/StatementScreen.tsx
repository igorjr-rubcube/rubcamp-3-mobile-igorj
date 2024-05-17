import {StackNavigationProp} from '@react-navigation/stack';
import dayjs, {Dayjs} from 'dayjs';
import {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList} from 'react-native';
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
import PigIcon from '../../components/icons/PigIcon';
import RubbankIcon from '../../components/icons/RubbankIcon';
import {RootStackParamList} from '../../navigation/RootStack';
import {setLoading} from '../../redux/slices/LoadingSlice';
import {RootState} from '../../redux/store';
import Colors from '../../styles/colors';
import DetailedTransferModal from '../detailedTransferModal/DetailedTransferModal';
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

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Statement'>;
};

interface AccountType {
  bankName: string;
  branch: string;
  number: string;
  user: {
    fullName: string;
  };
}

interface TransferType {
  id: string;
  date: string;
  amount: number;
  status: string;
  fromAccount: AccountType;
  toAccount: AccountType;
}

const statusDict = {
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

const operationDict = {
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

function StatementScreen({navigation}: Props) {
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [detailedTransferModalVisible, setDetailedTransferModalVisible] =
    useState(false);

  const [showBalance, setShowBalance] = useState(true);
  const tabs = ['Tudo', 'Entrada', 'Saída', 'Futuro'];
  const [selectedTab, setSelectedTab] = useState(0);
  const periods = [15, 30, 60, 90];
  const [period, setPeriod] = useState(0);
  const [order, setOrder] = useState('desc');
  const [initialDate, setInitialDate] = useState(dayjs());
  const [finalDate, setFinalDate] = useState(
    dayjs().subtract(periods[0], 'day'),
  );
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(6);

  const balance = useSelector((state: RootState) => state.balance.balance);
  const token = useSelector((state: RootState) => state.token.token);
  const userId = useSelector((state: RootState) => state.userId.userId);
  const accountId = useSelector(
    (state: RootState) => state.accountId.accountId,
  );
  const account = useSelector(
    (state: RootState) => state.accounts.accounts,
  ).find(account => account.id === accountId);
  const [selectedTransfer, setSelectedTransfer] = useState<string>('');
  const dispatch = useDispatch();

  const [statement, setStatement] = useState<TransferType[]>([]);
  const [refreshEnd, setRefreshEnd] = useState(false);
  const [bottomLoading, setBottomLoading] = useState(false);

  const fetchData = async (params: any) => {
    const response = await getFilteredStatement(
      token,
      userId,
      accountId,
      params,
    );
    if (response) {
      if (response.code === 200) {
        setStatement(response.data);
      }
    } else {
      return;
    }
  };

  const refetchData = async (params: any) => {
    const response = await getFilteredStatement(
      token,
      userId,
      accountId,
      params,
    );
    if (response) {
      if (response.code === 200) {
        const newStatement = [...statement, ...response.data];
        setStatement(newStatement);
        if (response.data.length === 0) {
          setRefreshEnd(true);
        }
      }
    }
  };

  const handleDetailedTransfer = (id: string) => () => {
    setSelectedTransfer(id);
    setDetailedTransferModalVisible(true);
  };

  const onListEnd = () => {
    if (statement.length === 0 || refreshEnd) {
      return;
    }
    setBottomLoading(true);
    setSkip(skip + take);
    const params: GetFilteredStatementParams = {
      order: order as any,
      operation: tabOperation[selectedTab as keyof typeof tabOperation] as any,
      status: selectedTab === 3 ? 'SCHEDULED' : 'COMPLETED',
      start: finalDate.format('YYYY-MM-DD'),
      end: initialDate.format('YYYY-MM-DD'),
      skip: skip + take,
      take: take,
    };
    refetchData(params).then(() => setBottomLoading(false));
  };

  const RenderTransfers = ({
    item,
    currentDate,
  }: {
    item: any;
    currentDate?: string;
  }) => {
    const {id, date, amount, status, fromAccount, toAccount} = item;

    return (
      <TransfersContainer>
        <DateWrapper>
          {(currentDate == undefined ||
            dayjs(date).format('YYYY-MM-DD') !==
              dayjs(currentDate).format('YYYY-MM-DD')) && (
            <DateText>
              {dayjs(date).toDate().toLocaleDateString('pt-BR', {
                month: 'long',
                day: 'numeric',
              })}
            </DateText>
          )}
          <Transfer onPress={handleDetailedTransfer(id)}>
            <LeftWrapper>
              <TransferIcon>
                <RubbankIcon />
              </TransferIcon>
              <TextWrapper>
                <TransferTitle>Transferência Entre Contas</TransferTitle>
                <TransferSubtitle>
                  {statusDict[status as keyof typeof statusDict].name}
                </TransferSubtitle>
                <TransferSubtitle>
                  {dayjs(date).format('HH:mm')}
                </TransferSubtitle>
              </TextWrapper>
            </LeftWrapper>
            <RightWrapper>
              <TransferValue
                color={
                  status === 'SCHEDULED'
                    ? operationDict.scheduled.color
                    : account?.number === fromAccount.number
                    ? operationDict.out.color
                    : operationDict.in.color
                }>
                {amount
                  .toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })
                  .replace('R$', 'RC')}
              </TransferValue>
            </RightWrapper>
          </Transfer>
        </DateWrapper>
      </TransfersContainer>
    );
  };

  const handleChangeTab = (index: number) => {
    dispatch(setLoading(true));
    setSelectedTab(index);
    setBottomLoading(false);
    setRefreshEnd(false);
    setStatement([]);
    setSkip(0);
    // let start = dayjs(initialDate);
    // let end = dayjs(finalDate);
    // let periodIndex = period;
    // if (period == -1) {
    //   periodIndex = 0;
    // }
    // if (index === 3) {
    //   start = dayjs();
    //   end = dayjs().add(periods[periodIndex], 'day');
    // } else {
    //   start = dayjs(finalDate).subtract(periods[periodIndex], 'day');
    //   end = dayjs(initialDate);
    // }
    const params: GetFilteredStatementParams = {
      order: order as any,
      operation: tabOperation[index as keyof typeof tabOperation] as any,
      status: index === 3 ? 'SCHEDULED' : 'COMPLETED',
      start: '',
      end: '',
      skip: 0,
      take: take,
    };
    fetchData(params).then(() => dispatch(setLoading(false)));
  };

  const handleFilter = (
    period: number,
    initialDate: string,
    finalDate: string,
    order: string,
  ) => {
    dispatch(setLoading(true));
    setPeriod(period);
    setInitialDate(dayjs(initialDate));
    setFinalDate(dayjs(finalDate));
    setOrder(order);
    setSkip(0);
    setBottomLoading(false);
    setRefreshEnd(false);
    setStatement([]);
    let start: Dayjs | '' = dayjs(initialDate);
    let end: Dayjs | '' = dayjs(finalDate);

    let periodIndex = period;
    if (period == -1) {
      periodIndex = 0;
    }
    if (start.isSame(end, 'day')) {
      if (selectedTab === 3) {
        start = '';
        end = '';
      } else {
        start = dayjs(finalDate).subtract(periods[periodIndex], 'day');
        end = dayjs(initialDate);
      }
    } else {
      start = dayjs(initialDate);
      end = dayjs(finalDate);
      if (start.isAfter(end)) {
        const temp = start;
        start = end;
        end = temp;
      }
    }

    const params: GetFilteredStatementParams = {
      order: order as any,
      operation: tabOperation[selectedTab as keyof typeof tabOperation] as any,
      status: selectedTab === 3 ? 'SCHEDULED' : 'COMPLETED',
      start: start === '' ? '' : start.format('YYYY-MM-DD'),
      end: end === '' ? '' : end.format('YYYY-MM-DD'),
      skip: 0,
      take: take,
    };
    fetchData(params).then(() => dispatch(setLoading(false)));
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton onPress={() => setFilterModalVisible(true)}>
          <FilterIcon fill={Colors.white} />
        </IconButton>
      ),
    });
    setSelectedTab(0);
    handleChangeTab(selectedTab);
    dispatch(setLoading(true));
  }, []);

  const Footer = () => {
    return bottomLoading ? (
      <ActivityIndicator color={Colors.default} />
    ) : (
      <TransferEndText>Chegamos ao final da lista!</TransferEndText>
    );
  };

  return (
    <>
      <FilterModal
        visible={filterModalVisible}
        setVisible={setFilterModalVisible}
        filterFunction={handleFilter}
      />
      <DetailedTransferModal
        visible={detailedTransferModalVisible}
        setVisible={setDetailedTransferModalVisible}
        transferId={selectedTransfer}
      />
      <Background>
        <TopView flexSize={1}>
          <Wrapper>
            <BalanceWrapper>
              <Balance>
                <Title>Saldo disponível</Title>
                {showBalance ? (
                  <BalanceText>
                    {balance &&
                      parseFloat(balance as any)
                        ?.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })
                        .replace('R$', 'RC')}
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
                  onPress={() => handleChangeTab(index)}>
                  <TabText selected={selectedTab === index}>{tab}</TabText>
                </Tab>
              ))}
            </TabsWrapper>
            <FlatList
              data={statement}
              renderItem={({item, index}) => (
                <RenderTransfers
                  item={item}
                  currentDate={statement[index - 1]?.date}
                />
              )}
              keyExtractor={item => item.id}
              onEndReached={onListEnd}
              onEndReachedThreshold={0.01}
              ListFooterComponent={Footer}
              ListEmptyComponent={
                <TransferNull>
                  <TransferNullIcon>
                    <PigIcon fill={Colors.lightGrey} />
                  </TransferNullIcon>
                  <TransferNullText>
                    Você ainda não possui lançamentos.
                  </TransferNullText>
                </TransferNull>
              }
            />
          </Content>
        </Bottom>
      </Background>
    </>
  );
}

export default StatementScreen;
