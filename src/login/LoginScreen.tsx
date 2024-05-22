import React, {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';
import {useDispatch} from 'react-redux';
import {getAccounts, getUserId, login} from '../api/login';
import Button from '../components/Button/Button';
import DefaultModal from '../components/DefaultModal/DefaultModal';
import TextInputField from '../components/TextInputField/TextInputField';
import AlertIcon from '../components/icons/AlertIcon';
import EyeIcon from '../components/icons/EyeIcon';
import EyeSlashIcon from '../components/icons/EyeSlashIcon';
import {setLoading} from '../redux/slices/LoadingSlice';
import {setToken} from '../redux/slices/TokenSlice';
import {setUserId} from '../redux/slices/UserIdSlice';
import Colors from '../styles/colors';
import {
  ButtonContainer,
  Container,
  Form,
  Link,
  LinkContainer,
  Logo,
  Message,
  Screen,
  Title,
} from './LoginScreen.styles';

const logo = require('../assets/rubbank-logo.png');
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

import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/RootStack';
import {setAccounts} from '../redux/slices/AccountsSlice';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>;
};

function LoginScreen({navigation}: Props) {
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
  const [modalMessage, setModalMessage] = useState('');

  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const validateForm = () => {
    return cpf.length == 14 && password.length > 8;
  };

  const handleLogin = async () => {
    dispatch(setLoading(true));
    const loginResponse = await login(cpf, password);

    if (loginResponse) {
      if (loginResponse.code === 200) {
        const token = loginResponse.data.token;
        dispatch(setToken(token));

        const id = getUserId(token);
        dispatch(setUserId(id));

        const accountsResponse = await getAccounts(token, id);
        if (accountsResponse && accountsResponse.code === 200) {
          const accounts = accountsResponse.data;
          dispatch(setAccounts(accounts));
        }

        navigation.navigate('SelectAccount');
      } else if (loginResponse.code === 401) {
        let message = `Sua conta pode ser bloqueada. Você tem ${loginResponse.data.triesLeft} tentativas restantes`;
        setModalMessage(message);
        setModalVisible(true);
      } else {
        setModalMessage('Usuário e/ou senha inválidos');
        setModalVisible(true);
      }
    }
    dispatch(setLoading(false));
  };

  return (
    <Screen>
      <DefaultModal
        visible={modalVisible}
        setVisible={setModalVisible}
        title="Atenção"
        message={modalMessage}
        buttonLabel="TENTAR DE NOVO"
        icon={<AlertIcon fill={Colors.alert} />}
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
              <EyeSlashIcon fill={Colors.grey} />
            ) : (
              <EyeIcon fill={Colors.grey} />
            )
          }
          iconFunction={() => setPasswordVisible(!passwordVisible)}
        />
        <LinkContainer onPress={() => navigation.navigate('RequestEmailRecoverPassword')} align='flex-start'>
          <Link>Esqueceu a sua senha?</Link>
        </LinkContainer>
      </Form>
      <ButtonContainer>
        <Button
          onPress={handleLogin}
          disabled={!validateForm()}
          text={'CONFIRMAR'}
        />
      </ButtonContainer>
      {!keyboardShow && (
        <LinkContainer onPress={() => navigation.navigate('InsertUserData')} align="center">
          <Link>Criar nova conta</Link>
        </LinkContainer>
      )}
    </Screen>
  );
}

export default LoginScreen;
