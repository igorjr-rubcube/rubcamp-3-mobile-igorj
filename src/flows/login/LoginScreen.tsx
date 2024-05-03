import React, {useEffect, useState} from 'react';
import {
  Screen,
  Logo,
  Message,
  Title,
  Form,
  Link,
  Container,
} from './LoginScreen.styles';
import Colors from '../../styles/colors';
import EyeSlashIcon from '../../components/icons/EyeSlashIcon';
import DefaultModal from '../../components/DefaultModal/DefaultModal';
import AlertIcon from '../../components/icons/AlertIcon';
import TextInputField from '../../components/TextInputField/TextInputField';
import Button from '../../components/Button/Button';
import {Keyboard} from 'react-native';
import {login} from './api/login';
import EyeIcon from '../../components/icons/EyeIcon';
import LoadingScreen from '../loading/LoadingScreen';

const logo = require('../../assets/rubbank-logo.png');
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

function LoginScreen({navigation}: any) {
  const [keyboardShow, setKeyboardShow] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardShow(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardShow(false);
      },
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const [passwordVisible, setPasswordVisible] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    setModalVisible(false);
  }, []);

  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    return cpf.length == 14 && password.length > 8;
  };

  const handleLogin = async () => {
    setLoading(true);
    const response = await login(cpf, password);
    if (response && response.code === 200) {
      setToken(response.data.token);
      navigation.navigate('Success');
    } else if (response && (response.code === 401 || response.code === 400)) {
      setLoading(false);
      setModalVisible(true);
    }
  };

  return loading ? (
    <LoadingScreen />
  ) : (
    <Screen>
      <DefaultModal
        visible={modalVisible}
        setVisible={setModalVisible}
        title="Atenção"
        message="Usuário e/ou senha inválidos"
        buttonLabel="TENTAR DE NOVO"
        icon={<AlertIcon fill={Colors.icons.alert} />}
      />
      <Logo source={logo} />
      <Container flexSize={1}>
        <Title>Olá,</Title>
        <Message>Para acessar digite seu documento e senha</Message>
      </Container>
      <Form>
        <TextInputField
          value={cpf}
          onChangeFunction={setCpf}
          label="CPF"
          placeholder="Insira seu CPF aqui"
          mask={cpfMask}
          inputMode="numeric"
        />
        <TextInputField
          value={password}
          onChangeFunction={setPassword}
          label="Senha"
          placeholder="Insira sua senha"
          secureText={passwordVisible}
          secureTextFunction={setPasswordVisible}
          icon={
            passwordVisible ? (
              <EyeSlashIcon fill={Colors.icons.default} />
            ) : (
              <EyeIcon fill={Colors.icons.default} />
            )
          }
          iconFunction={() => setPasswordVisible(!passwordVisible)}
        />
        <Link>Esqueci a sua senha?</Link>
        <Container flexDirection="row" flexSize={2}>
          <Button
            onPress={handleLogin}
            disabled={!validateForm()}
            text={'CONFIRMAR'}
          />
        </Container>
      </Form>
      {!keyboardShow && <Link>Criar nova conta</Link>}
    </Screen>
  );
}

export default LoginScreen;
