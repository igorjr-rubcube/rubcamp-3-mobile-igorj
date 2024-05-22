import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createAccount} from '../../axios/api/onboarding';
import Button from '../../components/Button/Button';
import NumericInputField from '../../components/NumericInputField/NumericInputField';
import {RootStackParamList} from '../../navigation/RootStack';
import {setLoading} from '../../redux/slices/LoadingSlice';
import {RootState} from '../../redux/store';
import {
  ButtonContainer,
  Container,
  Content,
  FieldWrapper,
  Form,
  RadioButton,
  RadioButtonCenter,
  RadioField,
  RadioText,
  RadioView,
  Subtitle,
  SubtitleIcon,
  SubtitleWrapper,
  Title,
  TopWrapper,
} from './CreateNewAccountScreen.styles';
import {setAccounts} from '../../redux/slices/AccountsSlice';
import {getAccounts} from '../../axios/api/login';
import AlertIcon from '../../components/icons/AlertIcon';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import DefaultModal from '../../components/DefaultModal/DefaultModal';
import SafePasswordModal from '../../components/safePasswordModal/SafePasswordModal';
import InfoIcon from '../../components/icons/InfoIcon';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'AccountType'>;
};

function CreateNewAccountScreen({navigation}: Props) {
  const [accountType, setAccountType] = useState('');
  const [transactionPassword, setTransactionPassword] = useState('');
  const [confirmTransactionPassword, setConfirmTransactionPassword] =
    useState('');
  const [checkingPressed, setCheckingPressed] = useState(false);
  const [savingPressed, setSavingPressed] = useState(false);

  const token = useSelector((state: RootState) => state.token.token);
  const id = useSelector((state: RootState) => state.userId.userId);
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalSafePasswordVisible, setModalSafePasswordVisible] =
    useState(false);

  const handlePress = (type: string) => {
    if (type === 'CHECKING') {
      setAccountType('CHECKING');
      setCheckingPressed(true);
      setSavingPressed(false);
    } else {
      setAccountType('SAVING');
      setCheckingPressed(false);
      setSavingPressed(true);
    }
  };

  const handleConfirm = async () => {
    if (transactionPassword !== confirmTransactionPassword) {
      setModalVisible(true);
      return;
    }
    dispatch(setLoading(true));
    const response = await createAccount(
      token,
      id,
      transactionPassword,
      accountType,
    );
    if (response) {
      if (response.code === 201) {
        const accountsResponse = await getAccounts(token, id);
        if (accountsResponse && accountsResponse.code === 200) {
          const accounts = accountsResponse.data;
          dispatch(setAccounts(accounts));
          dispatch(setLoading(false));
        }
        navigation.navigate('Success', {
          title: 'Sua nova conta digital RubBank foi criada com sucesso!',
          message: 'Acesse agora com seu CPF ou CNPJ e senha cadastados.',
          navigateTo: 'SelectAccount',
        });
      } else {
        dispatch(setLoading(false));
      }
    }
  };

  return (
    <>
      <SafePasswordModal
        visible={modalSafePasswordVisible}
        setVisible={setModalSafePasswordVisible}
      />
      <DefaultModal
        visible={modalVisible}
        setVisible={setModalVisible}
        title="Senha inválida"
        message="Por favor, verifique as recomendações para criação da senha e tente novamente."
        buttonLabel="TENTAR DE NOVO"
        icon={<AlertIcon fill={Colors.alert} />}
      />
      <Container>
        <Content>
          <TopWrapper>
            <Form>
              <Title>Digite qual será sua senha para efetuar transações</Title>
              <SubtitleWrapper
                onPress={() => {
                  setModalSafePasswordVisible(!modalSafePasswordVisible);
                }}>
                <SubtitleIcon>
                  <InfoIcon fill={Colors.darkblue} />
                </SubtitleIcon>
                <Subtitle>Como criar uma senha segura</Subtitle>
              </SubtitleWrapper>
              <NumericInputField
                onChangeFunction={setTransactionPassword}
                size={4}
                label={'Digite sua nova senha'}
              />
              <NumericInputField
                onChangeFunction={setConfirmTransactionPassword}
                size={4}
                label={'Confirme sua nova senha'}
              />
              <Title>
                Selecione qual será o tipo de conta que você deseja criar
              </Title>
              <RadioView>
                <RadioField>
                  <RadioButton onPress={() => handlePress('CHECKING')}>
                    <RadioButtonCenter pressed={checkingPressed} />
                  </RadioButton>
                  <RadioText>CONTA CORRENTE</RadioText>
                </RadioField>
                <RadioField>
                  <RadioButton onPress={() => handlePress('SAVING')}>
                    <RadioButtonCenter pressed={savingPressed} />
                  </RadioButton>
                  <RadioText>CONTA POUPANÇA</RadioText>
                </RadioField>
              </RadioView>
            </Form>
          </TopWrapper>
          <ButtonContainer>
            <Button onPress={handleConfirm} text="CRIAR CONTA" />
          </ButtonContainer>
        </Content>
      </Container>
    </>
  );
}
export default CreateNewAccountScreen;
