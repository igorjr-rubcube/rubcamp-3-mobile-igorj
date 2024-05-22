import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Background,
  TopView,
} from '../../components/DefaultScreen/DefaultScreen';

import {ScrollView} from 'react-native';
import {createNumberMask} from 'react-native-mask-input';
import {getUserInfo} from '../../axios/api/profile';
import Button from '../../components/Button/Button';
import TextInputField from '../../components/TextInputField/TextInputField';
import EyeIcon from '../../components/icons/EyeIcon';
import EyeSlashIcon from '../../components/icons/EyeSlashIcon';
import {RootStackParamList} from '../../navigation/RootStack';
import {setLoading} from '../../redux/slices/LoadingSlice';
import {UserInfoState, setUserInfo} from '../../redux/slices/UserInfoSlice';
import {
  setTransferAmount,
  setTransferDescription,
} from '../../redux/slices/TransferSlice';
import {RootState} from '../../redux/store';
import Colors from '../../styles/colors';
import {
  Balance,
  BalanceText,
  BalanceWrapper,
  Bottom,
  BottomWrapper,
  Content,
  Field,
  Form,
  IconButton,
  Info,
  InfoContainer,
  InfoText,
  InfoTitle,
  Title,
  Wrapper,
} from './InsertPasswordScreen.styles';
import NumericInputField from '../../components/NumericInputField/NumericInputField';
import DefaultModal from '../../components/DefaultModal/DefaultModal';
import AlertIcon from '../../components/icons/AlertIcon';
import { createTransfer } from '../../axios/api/transfer';

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

const amountMask = createNumberMask({
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: '.',
  allowDecimal: true,
  decimalSymbol: ',',
  decimalLimit: 2,
} as any);

function InsertPasswordScreen({navigation}: Props) {
  const [showBalance, setShowBalance] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const balance = useSelector((state: RootState) => state.balance.balance);
  const token = useSelector((state: RootState) => state.token.token);
  const userId = useSelector((state: RootState) => state.userId.userId);
  const selectedAccount = useSelector(
    (state: RootState) => state.transfer.selectedAccount,
  );
  const amount = useSelector((state: RootState) => state.transfer.amount);
  const description = useSelector(
    (state: RootState) => state.transfer.description,
  );
  const accountId = useSelector((state: RootState) => state.accountId.accountId);

  const [transactionPassword, setTransactionPassword] = useState('');

  const handleContinue = async () => {
    dispatch(setLoading(true));
    if (!selectedAccount) {
      setModalMessage('Selecione uma conta para transferir');
      setModalVisible(true);
      dispatch(setLoading(false));
      return;
    }
    console.log('description', description);
    
    const response = await createTransfer(
      token,
      userId,
      accountId,
      transactionPassword,
      amount,
      description,
      selectedAccount.number,
      selectedAccount.branch,
    );
    if (response) {
      if (response.code === 200 || response.code === 206) {
        navigation.navigate('Success', {
          title: 'Transferência realizada com sucesso',
          message: '',
          navigateTo: 'Home',
        });
      } else if (response.code === 401) {
        let message = `Sua conta pode ser bloqueada. Você tem ${response.data.triesLeft} tentativas restantes. Em caso de dúvidas, entre em contato com o suporte`;
        setModalMessage(message);
        setModalVisible(true);
      } else {
        setModalMessage('Erro ao realizar transferência');
        setModalVisible(true);
      }
      dispatch(setLoading(false));
    }
  };

  const dispatch = useDispatch();

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
            <Form>
              <NumericInputField
                onChangeFunction={setTransactionPassword}
                size={4}
                label={'Confirme sua senha transacional'}
                secureText={true}
              />
              <BottomWrapper>
                <Button
                  onPress={handleContinue}
                  text={'CONTINUAR'}
                  disabled={transactionPassword.length < 4}
                />
              </BottomWrapper>
            </Form>
          </Content>
        </Bottom>
      </Background>
    </>
  );
}

export default InsertPasswordScreen;
