import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Background,
  TopView,
} from '../../components/DefaultScreen/DefaultScreen';

import {
  getByBranchAndNumber,
  searchAccountsByCpf,
} from '../../axios/api/account';
import Button from '../../components/Button/Button';
import DefaultModal from '../../components/DefaultModal/DefaultModal';
import TextInputField from '../../components/TextInputField/TextInputField';
import AlertIcon from '../../components/icons/AlertIcon';
import EyeIcon from '../../components/icons/EyeIcon';
import EyeSlashIcon from '../../components/icons/EyeSlashIcon';
import {RootStackParamList} from '../../navigation/RootStack';
import {setLoading} from '../../redux/slices/LoadingSlice';
import {setSelectedAccount} from '../../redux/slices/TransferSlice';
import {RootState} from '../../redux/store';
import Colors from '../../styles/colors';
import {
  Balance,
  BalanceText,
  BalanceWrapper,
  Bottom,
  BottomWrapper,
  Content,
  Form,
  IconButton,
  Tab,
  TabText,
  TabsWrapper,
  Title,
  Wrapper,
} from './CreateTransferScreen.styles';
import { getBalance } from '../../axios/api/home';
import { setBalance } from '../../redux/slices/BalanceSlice';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'CreateTransfer'>;
};

const cpfMask = [
  /\d/,
  /\d/,
  /\d/,
  '.',
  /\d/,
  /\d/,
  /\d/,
  '.',
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
];

const accountMask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

function CreateTransfer({navigation}: Props) {
  const balance = useSelector((state: RootState) => state.balance.balance);
  const token = useSelector((state: RootState) => state.token.token);
  const userId = useSelector((state: RootState) => state.userId.userId);
  const accountId = useSelector(
    (state: RootState) => state.accountId.accountId,
  );
  const accountsFrom = useSelector(
    (state: RootState) => state.accounts.accounts,
  );
  const accountFrom = accountsFrom.find(account => account.id === accountId);

  const tabs = ['CPF', 'Número da Conta'];
  const [selectedTab, setSelectedTab] = useState(0);
  const [showBalance, setShowBalance] = useState(false);
  const [cpf, setCpf] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [branch, setBranch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const dispatch = useDispatch();

  const handleChangeTab = (index: number) => {
    setSelectedTab(index);
  };

  const searchAccounts = async () => {
    try {
      const response = await searchAccountsByCpf(
        token,
        userId,
        accountId,
        cpf.replace(/\D/g, ''),
      );
      if (response) {
        if (response.code === 200) {
          const filteredAccounts = response.data.filter(
            (account: any) => account.number !== accountFrom?.number,
          );
          if (filteredAccounts.length === 0) {
            setModalMessage(
              'Usuário não possui contas disponíveis para transferir.',
            );
            setModalVisible(true);
            dispatch(setLoading(false));
            return;
          }
          navigation.navigate('SelectAccountToTransfer', {
            accounts: filteredAccounts,
            cpf: cpf,
          });
          dispatch(setLoading(false));
        } else if (response.code === 404) {
          dispatch(setLoading(false));
          setModalMessage('CPF não encontrado');
          setModalVisible(true);
        }
      }
    } catch (error) {}
  };

  const getAccount = async () => {
    const response = await getByBranchAndNumber(
      token,
      userId,
      accountId,
      branch,
      accountNumber.replace(/\D/g, ''),
    );
    if (response) {
      if (response.code === 200) {
        const accountTo = response.data;
        dispatch(setSelectedAccount(accountTo));
        navigation.navigate('InsertAmount');
      } else if (response.code === 404) {
        setModalMessage('Conta não encontrada');
        setModalVisible(true);
      }
    } else {
      setModalMessage('Erro ao buscar conta');
      setModalVisible(true);
    }
    dispatch(setLoading(false));
  };

  const handleContinue = () => {
    dispatch(setLoading(true));
    if (selectedTab === 0) {
      searchAccounts();
    } else {
      getAccount();
    }
  };

  const buttonDisabled = () => {
    if (selectedTab === 0) {
      return cpf.length < 14;
    } else {
      return branch.length < 3 || accountNumber.length < 9;
    }
  };

  const fetchData = async () => {
    const balanceGet = await getBalance(token, userId, accountId);
    if (balanceGet) {
      dispatch(setBalance(balanceGet.data.balance));
    }
  };

  useEffect(() => {
    setBranch('001');
    dispatch(setLoading(true));
    fetchData().then(() => dispatch(setLoading(false)));
    return () => {};
  }, []);


  return (
    <>
      <DefaultModal
        visible={modalVisible}
        setVisible={setModalVisible}
        title="Atenção"
        message={modalMessage}
        buttonLabel="TENTAR DE NOVO"
        icon={<AlertIcon fill={Colors.alert} />}
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
            <Form>
              {selectedTab === 0 ? (
                <TextInputField
                  value={cpf}
                  onChangeFunction={setCpf}
                  label={'CPF'}
                  placeholder={''}
                  mask={cpfMask}
                  maxLength={14}
                />
              ) : (
                <>
                  <TextInputField
                    value={branch}
                    onChangeFunction={setBranch}
                    label={'Agência'}
                    placeholder={''}
                    maxLength={3}
                    disabled={true}

                  />
                  <TextInputField
                    value={accountNumber}
                    onChangeFunction={setAccountNumber}
                    label={'Número da Conta'}
                    placeholder={''}
                    maxLength={9}
                    mask={accountMask}
                  />
                </>
              )}
              <BottomWrapper>
                <Button
                  onPress={handleContinue}
                  text={'CONTINUAR'}
                  disabled={buttonDisabled()}
                />
              </BottomWrapper>
            </Form>
          </Content>
        </Bottom>
      </Background>
    </>
  );
}

export default CreateTransfer;
