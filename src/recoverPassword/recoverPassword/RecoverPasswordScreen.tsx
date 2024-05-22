import {StackNavigationProp} from '@react-navigation/stack';
import {
  Background,
  TopView,
} from '../../components/DefaultScreen/DefaultScreen';

import {RouteProp} from '@react-navigation/native';
import {useState} from 'react';
import {createNumberMask} from 'react-native-mask-input';
import {recoverPassword} from '../../axios/api/password';
import Button from '../../components/Button/Button';
import DefaultModal from '../../components/DefaultModal/DefaultModal';
import TextInputField from '../../components/TextInputField/TextInputField';
import AlertIcon from '../../components/icons/AlertIcon';
import InfoIcon from '../../components/icons/InfoIcon';
import SafePasswordModal from '../../components/safePasswordModal/SafePasswordModal';
import {RootStackParamList} from '../../navigation/RootStack';
import Colors from '../../styles/colors';
import {
  Bottom,
  BottomWrapper,
  Content,
  Form,
  Subtitle,
  SubtitleIcon,
  SubtitleWrapper,
  Title,
} from './RecoverPasswordScreen.styles';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'RecoverPassword'>;
  route: RouteProp<RootStackParamList, 'RecoverPassword'>;
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

function RecoverPasswordScreen({navigation, route}: Props) {
  const token = route.params.token;
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [modalSafePasswordVisible, setModalSafePasswordVisible] =
    useState(false);
  const [modalErrorVisible, setModalErrorVisible] = useState(false);
  const [modalErrorTitle, setModalErrorTitle] = useState('');
  const [modalErrorMessage, setModalErrorMessage] = useState('');

  const handleConfirm = async () => {
    if (password !== confirmPassword) {
      setModalErrorTitle('Senha inválida');
      setModalErrorMessage('As senhas não coincidem');
      setModalErrorVisible(true);
      return;
    }
    const response = await recoverPassword(token, password);
    if (response) {
      if (response.code === 204) {
        navigation.navigate('Success', {
          title: 'Senha alterada com sucesso',
          message: 'Sua senha foi alterada com sucesso. Faça login novamente.',
          navigateTo: 'Login',
        });
      } else if (response.code === 401) {
        setModalErrorTitle('Atenção');
        setModalErrorMessage('Token inválido');
        setModalErrorVisible(true);
      } else if (response.code === 400) {
        setModalErrorTitle('Senha inválida');
        setModalErrorMessage(
          'Por favor, verifique as recomendações para criação da senha e tente novamente.',
        );
        setModalErrorVisible(true);
      } else {
        setModalErrorTitle('Erro');
        setModalErrorMessage('Erro ao alterar a senha');
        setModalErrorVisible(true);
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
        visible={modalErrorVisible}
        setVisible={setModalErrorVisible}
        icon={<AlertIcon fill={Colors.alert} />}
        title={modalErrorTitle}
        message={modalErrorMessage}
        hasButton={true}
        buttonLabel={'TENTAR DE NOVO'}
      />
      <Background>
        <TopView flexSize={0.3}>
          <></>
        </TopView>
        <Bottom>
          <Content>
            <Form>
              <Title>
                Digite qual será sua nova senha para entrar no aplicativo
              </Title>
              <SubtitleWrapper
                onPress={() => {
                  setModalSafePasswordVisible(!modalSafePasswordVisible);
                }}>
                <SubtitleIcon>
                  <InfoIcon fill={Colors.darkblue} />
                </SubtitleIcon>
                <Subtitle>Como criar uma senha segura</Subtitle>
              </SubtitleWrapper>
              <TextInputField
                value={password}
                onChangeFunction={setPassword}
                label={'Digite sua nova senha'}
                placeholder={''}
                secureText={true}
              />
              <TextInputField
                value={confirmPassword}
                onChangeFunction={setConfirmPassword}
                label={'Confirme sua nova senha'}
                placeholder={''}
                secureText={true}
              />
              <BottomWrapper>
                <Button onPress={handleConfirm} text={'CONFIRMAR'} />
              </BottomWrapper>
            </Form>
          </Content>
        </Bottom>
      </Background>
    </>
  );
}

export default RecoverPasswordScreen;
