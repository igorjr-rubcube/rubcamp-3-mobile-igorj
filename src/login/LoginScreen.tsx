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

const logo = require('../assets/rubbank-logo.png');

function LoginScreen() {
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

  return (
    <Screen>
      <Logo source={logo} />
      <Container flexSize={1}>
        <Title>Olá,</Title>
        <Message>Para acessar digite seu documento e senha</Message>
      </Container>
      <Form>
        <Label>CPF</Label>
        <Field>
          <Input placeholder="Insira seu CPF aqui" />
        </Field>
        <Label>Senha</Label>
        <Field>
          <Input
            placeholder="Insira sua senha"
            secureTextEntry={passwordVisible}
          />
          <IconContainer onPressIn={() => setPasswordVisible(!passwordVisible)}>
            <EyeSlashIcon />
          </IconContainer>
        </Field>
        <Link>Esqueci a sua senha?</Link>
        <Container flexDirection="row" flexSize={2}>
          <Button>
            <ButtonText>CONFIRMAR</ButtonText>
          </Button>
        </Container>
      </Form>
      {keyboardShow ? null : <Link>Criar nova conta</Link>}
    </Screen>
  );
}

export default LoginScreen;
