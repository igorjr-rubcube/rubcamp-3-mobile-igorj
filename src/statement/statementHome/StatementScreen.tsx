import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getBalance} from '../../api/home';
import {
  Background,
  TopView,
} from '../../components/DefaultScreen/DefaultScreen';
import EyeIcon from '../../components/icons/EyeIcon';
import EyeSlashIcon from '../../components/icons/EyeSlashIcon';
import FilterIcon from '../../components/icons/FilterIcon';
import RubbankIcon from '../../components/icons/RubbankIcon';
import {RootStackParamList} from '../../navigation/RootStack';
import {setBalance} from '../../redux/slices/BalanceSlice';
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
  TransferIcon,
  TransferSubtitle,
  TransferTitle,
  TransferValue,
  TransfersContainer,
  Wrapper,
} from './StatementScreen.styles';
import dayjs from 'dayjs';
import { getFilteredStatement, getFilteredStatementParams } from '../../api/statement';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const logo = require('../assets/rubbank-logo-white.png');

function StatementScreen({navigation}: Props) {
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const openFilterModal = () => {
    setFilterModalVisible(true);
  };

  const [showBalance, setShowBalance] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const tabs = ['Tudo', 'Entrada', 'Saída', 'Futuro'];
  const periods = [15, 30, 60, 90];
  const orders = [0, 1];
  const [period, setPeriod] = useState(0);
  const [order, setOrder] = useState(0);
  const [initialDate, setInitialDate] = useState(dayjs());
  const [finalDate, setFinalDate] = useState(dayjs().add(-periods[0], 'day'));
  const [statement , setStatement] = useState([])


  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(10);


  const balance = useSelector((state: RootState) => state.balance.balance);
  const token = useSelector((state: RootState) => state.token.token);
  const userId = useSelector((state: RootState) => state.userId.userId);
  const accountId = useSelector((state: RootState) => state.accountId.accountId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    const params = {
      order: order === 0 ? 'asc' : 'desc',
      operation: selectedTab === 1 ? 'in' : selectedTab === 2 ? 'out' : 'both',
      start: initialDate.format('YYYY-MM-DD'),
      end: finalDate.format('YYYY-MM-DD'),
      skip: skip,
      take: take,
    } as getFilteredStatementParams;
    const fetchData = async () => {
      const response = await getFilteredStatement(token, userId, accountId, params);
      if (response) {
        setStatement(response.data);
        
      } else {
        return;
      }
      dispatch(setLoading(false));
    };
    fetchData();
    navigation.setOptions({
      headerRight: () => (
        <IconButton onPress={openFilterModal}>
          <FilterIcon fill={Colors.white} />
        </IconButton>
      ),
    });
    return () => {};
  }, []);

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
            <TransfersContainer>
              <DateWrapper>
                <DateText>11 de Agosto</DateText>
                <Transfer>
                  <LeftWrapper>
                    <TransferIcon>
                      <RubbankIcon fill={Colors.default} />
                    </TransferIcon>
                    <TextWrapper>
                      <TransferTitle>Transferência Entre Contas</TransferTitle>
                      <TransferSubtitle>Confirmada</TransferSubtitle>
                      <TransferSubtitle>16:58</TransferSubtitle>
                    </TextWrapper>
                  </LeftWrapper>
                  <RightWrapper>
                    <TransferValue>RC 8,24</TransferValue>
                  </RightWrapper>
                </Transfer>
              </DateWrapper>
            </TransfersContainer>
          </Content>
        </Bottom>
      </Background>
    </>
  );
}

export default StatementScreen;
