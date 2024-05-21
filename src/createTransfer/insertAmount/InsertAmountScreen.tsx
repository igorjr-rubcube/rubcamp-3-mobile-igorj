import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Background,
  TopView,
} from '../../components/DefaultScreen/DefaultScreen';

import {ScrollView} from 'react-native';
import {createNumberMask} from 'react-native-mask-input';
import {getUserInfo} from '../../api/profile';
import Button from '../../components/Button/Button';
import TextInputField from '../../components/TextInputField/TextInputField';
import EyeIcon from '../../components/icons/EyeIcon';
import EyeSlashIcon from '../../components/icons/EyeSlashIcon';
import {RootStackParamList} from '../../navigation/RootStack';
import {setLoading} from '../../redux/slices/LoadingSlice';
import {UserInfoState, setUserInfo} from '../../redux/slices/UserInfoSlice';
import {setTransferAmount, setTransferDescription} from '../../redux/slices/TransferSlice';
import {RootState} from '../../redux/store';
import Colors from '../../styles/colors';
import {
  Balance,
  BalanceText,
  BalanceWrapper,
  Bottom,
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
} from './InsertAmountScreen.styles';

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

function InsertAmountScreen({navigation}: Props) {
  const [showBalance, setShowBalance] = useState(true);

  const balance = useSelector((state: RootState) => state.balance.balance);
  const token = useSelector((state: RootState) => state.token.token);
  const userId = useSelector((state: RootState) => state.userId.userId);
  const userFullName = useSelector(
    (state: RootState) => state.userInfo.fullName,
  );

  const selectedAccount = useSelector(
    (state: RootState) => state.transfer.selectedAccount,
  );

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);

  const handleContinue = async () => {
    dispatch(setTransferAmount(amount));
    dispatch(setTransferDescription(description));
    navigation.navigate('InsertPassword');
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    const fetchData = async () => {
      const userResponse = await getUserInfo(token, userId);
      if (userResponse && userResponse.code === 200) {
        const userInfo = userResponse.data as UserInfoState;
        dispatch(setUserInfo(userInfo));
      } else {
      }
      dispatch(setLoading(false));
    };
    fetchData();
  }, []);

  return (
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
          <ScrollView>
            <InfoContainer>
              <Info>
                <InfoTitle>Enviado de</InfoTitle>
                <InfoText>{userFullName}</InfoText>
              </Info>
              <Info>
                <InfoTitle>CPF</InfoTitle>
                <InfoText>
                  {selectedAccount?.user.cpf.replace(
                    /(\d{3})(\d{3})(\d{3})(\d{2})/,
                    '$1.$2.$3-$4',
                  )}
                </InfoText>
              </Info>
              <Info>
                <InfoTitle>Nome</InfoTitle>
                <InfoText>{selectedAccount?.user.fullName}</InfoText>
              </Info>
              <Info>
                <InfoTitle>Banco</InfoTitle>
                <InfoText>{selectedAccount?.bankName}</InfoText>
              </Info>
              <Info>
                <InfoTitle>Agência</InfoTitle>
                <InfoText>{selectedAccount?.branch}</InfoText>
              </Info>
              <Info>
                <InfoTitle>Conta</InfoTitle>
                <InfoText>
                  {selectedAccount?.number.replace(/(\d{5})(\d{3})/, '$1-$2')}
                </InfoText>
              </Info>
            </InfoContainer>
            <Form>
              <Field>
                <TextInputField
                  value={description}
                  onChangeFunction={setDescription}
                  label={'Descrição'}
                  placeholder={''}
                />
              </Field>
              <Field>
                <TextInputField
                  value={amount}
                  onChangeFunction={setAmount}
                  label={'Valor do pagamento'}
                  placeholder={''}
                  fontSize={42}
                  fixedPlaceholder="RC"
                  currency={true}
                  maxLength={14}
                />
              </Field>
            </Form>
            <Button
              onPress={handleContinue}
              text={'CONTINUAR'}
              disabled={!amount}
            />
          </ScrollView>
        </Content>
      </Bottom>
    </Background>
  );
}

export default InsertAmountScreen;
