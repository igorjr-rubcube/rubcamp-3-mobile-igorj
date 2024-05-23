import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Background,
  TopView,
} from '../../components/DefaultScreen/DefaultScreen';

import {ScrollView} from 'react-native';
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
  setTransferDate,
} from '../../redux/slices/TransferSlice';
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
  SwitchTransferDate,
  Title,
  TransferDateView,
  Wrapper,
} from './InsertAmountScreen.styles';
import DatePickerModal from '../../components/DatePicker/DatePickerModal';
import {Dayjs} from 'dayjs';
import DefaultModal from '../../components/DefaultModal/DefaultModal';
import AlertIcon from '../../components/icons/AlertIcon';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'CreateTransfer'>;
};

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
    if (isDateFieldEnabled) {
      if (transferDateState && transferDateState > new Date()) {
        dispatch(setTransferDate(transferDateState.toString()));
      } else {
        dispatch(setTransferDate(null));
        setModalVisible(true);
        return;
      }
    } else {
      dispatch(setTransferDate(null));
      return;
    }
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
      }
      dispatch(setLoading(false));
    };
    fetchData();
  }, []);

  const enableContinue = () => {
    if (balance === undefined) {
      return false;
    }
    return !(amount > 0 && amount <= balance);
  };

  const [isDateFieldEnabled, setIsDateFieldEnabled] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [transferDateState, setTransferDateState] = useState<Date>(new Date());

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <DefaultModal
        visible={modalVisible}
        setVisible={setModalVisible}
        title="Atenção"
        message={'Insira uma data válida para a transferência agendada.'}
        buttonLabel="TENTAR DE NOVO"
        icon={<AlertIcon fill={Colors.alert} />}
      />
      <DatePickerModal
        visible={isDatePickerVisible}
        setVisible={setIsDatePickerVisible}
        onDateSelected={(date: Dayjs) => setTransferDateState(date.toDate())}
      />
      <Background>
        <TopView flexSize={0.75}>
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
                <TransferDateView>
                  <InfoText>Tranferência Agendada?</InfoText>
                  <SwitchTransferDate
                    value={isDateFieldEnabled}
                    onValueChange={setIsDateFieldEnabled}
                    trackColor={{
                      true: Colors.default,
                      false: Colors.lightGrey,
                    }}
                    thumbColor={Colors.darkblue}
                  />
                </TransferDateView>
                {isDateFieldEnabled && (
                  <Field>
                    <TextInputField
                      value={transferDateState.toLocaleDateString('pt-BR')}
                      onChangeFunction={setTransferDateState}
                      label={'Data do pagamento'}
                      placeholder={''}
                      showInput={false}
                      editable={true}
                      onFocus={() => {
                        setIsDatePickerVisible(true);
                      }}
                    />
                  </Field>
                )}
              </Form>
              <Button
                onPress={handleContinue}
                text={'CONTINUAR'}
                disabled={enableContinue()}
              />
            </ScrollView>
          </Content>
        </Bottom>
      </Background>
    </>
  );
}

export default InsertAmountScreen;
