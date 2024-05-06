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
import {getAccounts, getUserId, login} from './api/login';
import EyeIcon from '../../components/icons/EyeIcon';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {setLoading} from '../../redux/slices/LoadingSlice';
import {setToken} from '../../redux/slices/TokenSlice';
import {setUserId} from '../../redux/slices/UserIdSlice';
import {setAccountId} from '../../redux/slices/AccountIdSlice';

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

  const dispatch = useDispatch();

  const validateForm = () => {
    return cpf.length == 14 && password.length > 8;
  };

  const handleLogin = async () => {
    dispatch(setLoading(true));
    const loginResponse = await login(cpf, password);
    if (loginResponse && loginResponse.code === 200) {
      const token = loginResponse.data.token;
      dispatch(setToken(token));
      const id = getUserId(token);
      dispatch(setUserId(id));
      const accountsResponse = await getAccounts(token, id);
      if (accountsResponse && accountsResponse.code === 200) {
        const accountId = accountsResponse.data[0].id;
        dispatch(setAccountId(accountId));
      }
      navigation.navigate('Home');
      dispatch(setLoading(false));
    } else if (loginResponse && (loginResponse.code === 401 || loginResponse.code === 400)) {
      setModalVisible(true);
      dispatch(setLoading(false));
    }
  };

  return (
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
