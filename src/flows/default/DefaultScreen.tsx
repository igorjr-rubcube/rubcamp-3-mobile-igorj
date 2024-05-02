import React from 'react';
import {Screen, Logo, Message, Title} from './DefaultScreen.styles';

const logo = require('../../assets/rubbank-logo.png');

type DefaultScreenProps = {
  successError: boolean;
  message: string;
};

function DefaultScreen({successError, message}: DefaultScreenProps) {
  return (
    <Screen>
      <Logo source={logo}></Logo>
      <Title>{successError ? 'Success' : 'Error'}</Title>
      <Message>{message}</Message>
    </Screen>
  );
}

export default DefaultScreen;
