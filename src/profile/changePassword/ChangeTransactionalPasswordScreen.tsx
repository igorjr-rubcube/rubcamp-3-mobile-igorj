import {Colors} from 'react-native/Libraries/NewAppScreen';
import DefaultModal from '../../components/DefaultModal/DefaultModal';
import {
  Background,
  BottomView,
} from '../../components/DefaultScreen/DefaultScreen';
import TextInputField from '../../components/TextInputField/TextInputField';
import AlertIcon from '../../components/icons/AlertIcon';
import InfoIcon from '../../components/icons/InfoIcon';
import SafePasswordModal from '../safePasswordModal/SafePasswordModal';
import {
  Container,
  TopWrapper,
  Title,
  SubtitleWrapper,
  SubtitleIcon,
  Subtitle,
  Form,
} from './ChangePassword.styles';
import {useState} from 'react';
import Button from '../../components/Button/Button';
import NumericInputField from '../../components/NumericInputField/NumericInputField';

function ChangeTransactionalPassword() {
  const [currentPassword, setCurrentPassword] = useState(['', '', '', '']);

  const setCurrentPasswordAt = (text: string, index: number) => {
    const newPassword = [...currentPassword];
    newPassword[index] = text;
    setCurrentPassword(newPassword);
  }
  
  const [modalSafePasswordVisible, setModalSafePasswordVisible] =
    useState(false);
  const [modalWrongPasswordVisible, setModalWrongPasswordVisible] =
    useState(false);

  const handlePasswordChange = async () => {};

  return (
    <>
      <SafePasswordModal
        visible={modalSafePasswordVisible}
        setVisible={setModalSafePasswordVisible}
      />
      <DefaultModal
        visible={modalWrongPasswordVisible}
        setVisible={setModalWrongPasswordVisible}
        icon={<AlertIcon fill={Colors.alert} />}
        title="Senha inválida"
        message="Por favor, verifique as recomendações para criação da senha e tente novamente."
        hasButton={true}
        buttonLabel="TENTAR DE NOVO"
      />
      <Background>
        <BottomView flexSize={1}>
          <Container>
            <TopWrapper>
              <Title>Digite qual será sua senha para realizar transações</Title>
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
                  inputs={currentPassword}
                  onChangeFunction={setCurrentPasswordAt}
                  label="Senha atual"
                  placeholder="Digite sua senha atual"
                  secureText={true}
                />
              </Form>
            </TopWrapper>
            <Button
              onPress={handlePasswordChange}
              disabled={false}
              text={'CONFIRMAR'}
            />
          </Container>
        </BottomView>
      </Background>
    </>
  );
}

export default ChangeTransactionalPassword;
