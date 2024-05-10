import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getBalance} from '../api/home';
import {
  Background,
  BottomView,
  TopView,
} from '../components/DefaultScreen/DefaultScreen';
import EyeIcon from '../components/icons/EyeIcon';
import EyeSlashIcon from '../components/icons/EyeSlashIcon';
import HelpIcon from '../components/icons/HelpIcon';
import MenuIcon from '../components/icons/MenuIcon';
import NotificationIcon from '../components/icons/NotificationIcon';
import ProfileIcon from '../components/icons/ProfileIcon';
import ReceiptIcon from '../components/icons/ReceiptIcon';
import TransferIcon from '../components/icons/TransferIcon';
import {setBalance} from '../redux/slices/BalanceSlice';
import {RootState} from '../redux/store';
import Colors from '../styles/colors';
import {
  Balance,
  BalanceText,
  BalanceWrapper,
  IconButton,
  IconButtonTopBar,
  Image,
  RightWrapper,
  TabButton,
  TabButtonText,
  TabRow,
  Title,
  TopBar,
} from './HomeScreen.styles';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/RootStack';
import LogoutIcon from '../components/icons/LogoutIcon';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const logo = require('../assets/rubbank-logo-white.png');

function HomeScreen({navigation}: Props) {
  const [showBalance, setShowBalance] = useState(true);
  const token = useSelector((state: RootState) => state.token.token);
  const userId = useSelector((state: RootState) => state.userId.userId);
  const accountId = useSelector(
    (state: RootState) => state.accountId.accountId,
  );
  const balance = useSelector((state: RootState) => state.balance.balance);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const balanceGet = await getBalance(token, userId, accountId);
      if (balanceGet) {
        dispatch(setBalance(balanceGet.data.balance));
      }
    };
    fetchData();
    return () => {};
  }, []);

  return (
    <Background>
      <TopView flexSize={1}>
        <TopBar>
          <Image source={logo} />
          <RightWrapper>
            <IconButtonTopBar>
              <NotificationIcon fill={Colors.light} />
            </IconButtonTopBar>
            <IconButtonTopBar>
              <HelpIcon fill={Colors.light} />
            </IconButtonTopBar>
            <IconButtonTopBar>
              <LogoutIcon fill={Colors.light} />
            </IconButtonTopBar>
          </RightWrapper>
        </TopBar>
        <BalanceWrapper>
          <Title>Seu saldo</Title>
          <Balance>
            {showBalance ? (
              <BalanceText>
                RC{' '}
                {balance && balance != 0
                  ? balance?.toString().replace('.', ',')
                  : '0.00'}
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
          <TabButton>
            <IconButton>
              <TransferIcon fill={Colors.darkblue} />
            </IconButton>
            <TabButtonText>Transferir</TabButtonText>
          </TabButton>
          <TabButton>
            <IconButton>
              <ReceiptIcon fill={Colors.darkblue} />
            </IconButton>
            <TabButtonText>Extrato</TabButtonText>
          </TabButton>
        </TabRow>
        <TabRow>
          <TabButton onPress={() => navigation.navigate('Profile')}>
            <IconButton>
              <ProfileIcon fill={Colors.darkblue} />
            </IconButton>
            <TabButtonText>Perfil</TabButtonText>
          </TabButton>
        </TabRow>
      </BottomView>
    </Background>
  );
}

export default HomeScreen;
