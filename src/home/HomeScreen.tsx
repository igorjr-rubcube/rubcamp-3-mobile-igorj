import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useState} from 'react';
import {RefreshControl, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getBalance} from '../api/home';
import {logout} from '../api/login';
import {
  Background,
  BottomView,
  TopView,
} from '../components/DefaultScreen/DefaultScreen';
import AccountsIcon from '../components/icons/AccountsIcon';
import EyeIcon from '../components/icons/EyeIcon';
import EyeSlashIcon from '../components/icons/EyeSlashIcon';
import HelpIcon from '../components/icons/HelpIcon';
import LogoutIcon from '../components/icons/LogoutIcon';
import NotificationIcon from '../components/icons/NotificationIcon';
import ProfileIcon from '../components/icons/ProfileIcon';
import ReceiptIcon from '../components/icons/ReceiptIcon';
import TransferIcon from '../components/icons/TransferIcon';
import {RootStackParamList} from '../navigation/RootStack';
import {setBalance} from '../redux/slices/BalanceSlice';
import {setLoading} from '../redux/slices/LoadingSlice';
import {removeToken} from '../redux/slices/TokenSlice';
import {RootState} from '../redux/store';
import Colors from '../styles/colors';
import {
  Balance,
  BalanceText,
  BalanceWrapper,
  IconButton,
  IconButtonTopBar,
  IconContainer,
  Image,
  RightWrapper,
  TabButton,
  TabButtonText,
  TabRow,
  Title,
  TopBar,
} from './HomeScreen.styles';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const logo = require('../assets/rubbankLogoWhite.png');

function HomeScreen({navigation}: Props) {
  const [showBalance, setShowBalance] = useState(true);
  const token = useSelector((state: RootState) => state.token.token);
  const userId = useSelector((state: RootState) => state.userId.userId);
  const accountId = useSelector(
    (state: RootState) => state.accountId.accountId,
  );
  const balance = useSelector((state: RootState) => state.balance.balance);
  const dispatch = useDispatch();

  const fetchData = async () => {
    const balanceGet = await getBalance(token, userId, accountId);
    if (balanceGet) {
      dispatch(setBalance(balanceGet.data.balance));
    }
  };

  useEffect(() => {
    dispatch(setLoading(true));
    fetchData().then(() => dispatch(setLoading(false)));
    return () => {};
  }, []);

  const handleLogout = async () => {
    dispatch(setLoading(true));
    dispatch(removeToken());
    logout(token).then(() => {
      dispatch(setLoading(false));
      navigation.navigate('Welcome');
    });
  };

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    fetchData().then(() => setRefreshing(false));
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Background>
        <TopView flexSize={1}>
          <TopBar>
            <Image source={logo} />
            <RightWrapper>
              <IconButtonTopBar>
                <HelpIcon fill={Colors.light} />
              </IconButtonTopBar>
              <IconButtonTopBar onPress={handleLogout}>
                <LogoutIcon fill={Colors.light} />
              </IconButtonTopBar>
            </RightWrapper>
          </TopBar>
          <BalanceWrapper>
            <Title>Seu saldo</Title>
            <Balance>
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
                <BalanceText>__________________</BalanceText>
              )}
              <IconButton onPress={() => setShowBalance(prev => !prev)}>
                {showBalance ? (
                  <EyeIcon fill={Colors.light} />
                ) : (
                  <EyeSlashIcon fill={Colors.light} />
                )}
              </IconButton>
            </Balance>
          </BalanceWrapper>
        </TopView>
        <BottomView flexSize={6}>
          <TabRow>
            <TabButton onPress={() => navigation.navigate('CreateTransfer')}>
              <IconContainer>
                <TransferIcon fill={Colors.darkblue} />
              </IconContainer>
              <TabButtonText>Transferir</TabButtonText>
            </TabButton>
            <TabButton onPress={() => navigation.navigate('Statement')}>
              <IconContainer>
                <ReceiptIcon fill={Colors.darkblue} />
              </IconContainer>
              <TabButtonText>Extrato</TabButtonText>
            </TabButton>
          </TabRow>
          <TabRow>
            <TabButton onPress={() => navigation.navigate('Profile')}>
              <IconContainer>
                <ProfileIcon fill={Colors.darkblue} />
              </IconContainer>
              <TabButtonText>Perfil</TabButtonText>
            </TabButton>
            <TabButton onPress={() => navigation.navigate('SelectAccount')}>
              <IconContainer>
                <AccountsIcon fill={Colors.darkblue} />
              </IconContainer>
              <TabButtonText>Trocar de conta</TabButtonText>
            </TabButton>
          </TabRow>
        </BottomView>
      </Background>
    </ScrollView>
  );
}

export default HomeScreen;
