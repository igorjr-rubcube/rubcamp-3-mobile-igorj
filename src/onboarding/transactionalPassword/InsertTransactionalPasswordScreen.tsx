import { StackNavigationProp } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { validateTransactionalPassword } from '../../api/onboarding';
import Button from '../../components/Button/Button';
import DefaultModal from '../../components/DefaultModal/DefaultModal';
import NumericInputField from '../../components/NumericInputField/NumericInputField';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import AlertIcon from '../../components/icons/AlertIcon';
import InfoIcon from '../../components/icons/InfoIcon';
import SafePasswordModal from '../../components/safePasswordModal/SafePasswordModal';
import { RootStackParamList } from '../../navigation/RootStack';
import { setLoading } from '../../redux/slices/LoadingSlice';
import { setAccountData, setPassword } from '../../redux/slices/OnboardingSlice';
import Colors from '../../styles/colors';
import {
  ButtonContainer,
  Container,
  Content,
  Form,
  Subtitle,
  SubtitleIcon,
  SubtitleWrapper,
  Title,
  TopWrapper,
} from './InsertTransactionalPassword';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'InsertTransactionalPassword'>;
};

function InsertTransactionalPasswordScreen({navigation}: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSafePasswordVisible, setModalSafePasswordVisible] =
    useState(false);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const handleConfirm = async () => {
    if (newPassword !== confirmPassword) {
      setModalVisible(true);
    }
    dispatch(setLoading(true));
    const response = await validateTransactionalPassword(newPassword);
    if (response) {
      if (response.code === 204) {
        const accountData = {
          transactionPassword: newPassword,
          type: ''
        };
        dispatch(setAccountData(accountData));
        navigation.navigate('AccountType');
        dispatch(setLoading(false));
        return;
      }
    }
    dispatch(setLoading(false));
    setModalVisible(true);
  };
  
  return (
    <>
      <DefaultModal
        visible={modalVisible}
        setVisible={setModalVisible}
        title="Senha inválida"
        message="Por favor, verifique as recomendações para criação da senha e tente novamente."
        buttonLabel="TENTAR DE NOVO"
        icon={<AlertIcon fill={Colors.alert} />}
      />
      <Container>
        <SafePasswordModal
          visible={modalSafePasswordVisible}
          setVisible={setModalSafePasswordVisible}
        />
        <Content>
          <TopWrapper>
            <ProgressBar progress={0.71} />
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
            <Form>
            <NumericInputField
                    onChangeFunction={setNewPassword}
                    size={4}
                    label="Digite sua nova senha"
                    secureText={true}
                  />
                  <NumericInputField
                    onChangeFunction={setConfirmPassword}
                    size={4}
                    label="Confirme sua nova senha"
                    secureText={true}
                  />
            </Form>
          </TopWrapper>
          <ButtonContainer>
            <Button onPress={handleConfirm} text="CONFIRMAR" />
          </ButtonContainer>
        </Content>
      </Container>
    </>
  );
}
export default InsertTransactionalPasswordScreen;
