import React from 'react';
import {
  Button,
  ButtonText,
  ContainerImage,
  Logo,
  Message,
  Screen,
  Title,
} from './WelcomeScreen.styles';

const logo = require('../../assets/rubbank-logo.png');

function WelcomeScreen({navigation}: any) {
  return (
    <Screen>
      <ContainerImage>
        <Logo source={logo} />
      </ContainerImage>
      <Title>Bem-vindo a RubBank!</Title>
      <Message>Sua conta digital, sem burocracia.</Message>
      <Button onPress={() => navigation.navigate('Login')}>
        <ButtonText>COMEÇAR</ButtonText>
      </Button>
    </Screen>
  );
}

export default WelcomeScreen;
