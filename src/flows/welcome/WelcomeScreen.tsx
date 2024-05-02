import React from 'react';
import {
  ContainerImage,
  Logo,
  Message,
  Screen,
  Title,
} from './WelcomeScreen.styles';
import Button from '../../components/Button/Button';

const logo = require('../../assets/rubbank-logo.png');

function WelcomeScreen({navigation}: any) {
  return (
    <Screen>
      <ContainerImage>
        <Logo source={logo} />
      </ContainerImage>
      <Title>Bem-vindo a RubBank!</Title>
      <Message>Sua conta digital, sem burocracia.</Message>
      <Button 
        onPress={() => navigation.navigate('Login')}
        text='COMEÇAR'
      />
    </Screen>
  );
}

export default WelcomeScreen;
