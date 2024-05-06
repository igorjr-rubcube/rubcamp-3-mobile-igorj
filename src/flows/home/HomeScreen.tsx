import {useEffect, useState} from 'react';
import EyeIcon from '../../components/icons/EyeIcon';
import EyeSlashIcon from '../../components/icons/EyeSlashIcon';
import HelpIcon from '../../components/icons/HelpIcon';
import MenuIcon from '../../components/icons/MenuIcon';
import NotificationIcon from '../../components/icons/NotificationIcon';
import ProfileIcon from '../../components/icons/ProfileIcon';
import ReceiptIcon from '../../components/icons/ReceiptIcon';
import TransferIcon from '../../components/icons/TransferIcon';
import Colors from '../../styles/colors';
import {
  BackgroundBottom,
  BottomContainer,
  Image,
  Screen,
  BalanceText,
  TabButton,
  IconButton,
  TabButtonText,
  TabRow,
  Title,
  TopBar,
  TopContainer,
  RightWrapper,
  Balance,
  IconButtonTopBar,
  BalanceWrapper,
} from './HomeScreen.styles';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {getBalance} from './api/home';
import {setBalance} from '../../redux/slices/BalanceSlice';

function HomeScreen() {
  const [showBalance, setShowBalance] = useState(true);
  const token = useSelector((state: RootState) => state.token.token);
  const userId = useSelector((state: RootState) => state.userId.userId);
  const accountId = useSelector((state: RootState) => state.accountId.accountId);
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
    return () => {
    };
  }, []);
  return (
    <Screen>
      <TopContainer>
        <TopBar>
          <Image source={require('../../assets/rubbank-logo-white.png')} />
          <RightWrapper>
            <IconButtonTopBar>
              <NotificationIcon fill={Colors.icons.light} />
            </IconButtonTopBar>
            <IconButtonTopBar>
              <HelpIcon fill={Colors.icons.light} />
            </IconButtonTopBar>
            <IconButtonTopBar>
              <MenuIcon fill={Colors.icons.light} />
            </IconButtonTopBar>
          </RightWrapper>
        </TopBar>
        <BalanceWrapper>
          <Title>Seu saldo</Title>
          <Balance>
            {showBalance ? (
              <BalanceText>
                RC {balance && balance === 0 ? balance?.toString().replace('.', ',') : '0.00'}
              </BalanceText>
            ) : (
              <BalanceText>_____________________</BalanceText>
            )}
            <IconButton onPress={() => setShowBalance(prev => !prev)}>
              {showBalance ? (
                <EyeIcon fill={Colors.icons.light} />
              ) : (
                <EyeSlashIcon fill={Colors.icons.light} />
              )}
            </IconButton>
          </Balance>
        </BalanceWrapper>
      </TopContainer>
      <BottomContainer>
        <BackgroundBottom>
          <TabRow>
            <TabButton>
              <IconButton>
                <TransferIcon fill={Colors.icons.default} />
              </IconButton>
              <TabButtonText>Transferir</TabButtonText>
            </TabButton>
            <TabButton>
              <IconButton>
                <ReceiptIcon fill={Colors.icons.default} />
              </IconButton>
              <TabButtonText>Extrato</TabButtonText>
            </TabButton>
          </TabRow>
          <TabRow>
            <TabButton>
              <IconButton>
                <ProfileIcon fill={Colors.icons.default} />
              </IconButton>
              <TabButtonText>Perfil</TabButtonText>
            </TabButton>
          </TabRow>
        </BackgroundBottom>
      </BottomContainer>
    </Screen>
  );
}

export default HomeScreen;
