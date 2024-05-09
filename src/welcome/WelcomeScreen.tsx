import React from 'react';
import Button from '../components/Button/Button';
import {
  ContainerImage,
  Logo,
  Message,
  Screen,
  Title,
} from './WelcomeScreen.styles';

import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/RootStack';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Welcome'>;
};

const logo = require('../assets/rubbank-logo.png');

function WelcomeScreen({navigation}: Props) {
  return (
    <Screen>
      <ContainerImage>
        <Logo source={logo} />
      </ContainerImage>
      <Title>Bem-vindo a RubBank!</Title>
      <Message>Sua conta digital, sem burocracia.</Message>
      <Button onPress={() => navigation.navigate('Login')} text="COMEÇAR" />
    </Screen>
  );
}

export default WelcomeScreen;
