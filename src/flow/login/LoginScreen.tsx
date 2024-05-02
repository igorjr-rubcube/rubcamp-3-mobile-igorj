import React, {useEffect, useState} from 'react';
import {
  Screen,
  Logo,
  Message,
  Title,
  Form,
  Label,
  Input,
  Field,
  Link,
  Container,
  Button,
  ButtonText,
  IconContainer,
} from './LoginScreen.styles';
import EyeSlashIcon from './EyeSlashIcon';
import {Keyboard} from 'react-native';
import DefaultModal from '../default/DefaultModal';
import AlertIcon from '../default/AlertIcon';
import Colors from '../../styles/colors';
import { login } from './api/login';

const logo = require('../../assets/rubbank-logo.png');

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
        <Label>CPF</Label>
        <Field>
          <Input 
          value={cpf} 
          onChangeText={setCpf}
          placeholder="Insira seu CPF aqui" />
        </Field>
        <Label>Senha</Label>
        <Field>
          <Input
            value={password}
            onChangeText={setPassword}
            placeholder="Insira sua senha"
            secureTextEntry={passwordVisible}
          />
          <IconContainer onPressIn={() => setPasswordVisible(!passwordVisible)}>
            <EyeSlashIcon fill={Colors.icons.default} />
          </IconContainer>
        </Field>
        <Link>Esqueci a sua senha?</Link>
        <Container flexDirection="row" flexSize={2}>
          <Button
            onPress={async () => {
              const response = await login(cpf, password);
              if (response && response.code === 200) {
                setToken(response.data.token);
                navigation.navigate('Home');
              } else if (response && response.code === 401) {
                setModalVisible(true);
              }
            }}>
            <ButtonText>CONFIRMAR</ButtonText>
          </Button>
        </Container>
      </Form>
      {!keyboardShow && <Link>Criar nova conta</Link>}
    </Screen>
  );
}

export default LoginScreen;
