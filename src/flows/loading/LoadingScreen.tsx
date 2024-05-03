import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Animated, Easing} from 'react-native';
import SpinnerIcon from '../../components/icons/SpinnerIcon';
import Colors from '../../styles/colors';
import {Container, Logo, Screen} from './LoadingScreen.styles';

const logo = require('../../assets/rubbank-logo.png');

function LoadingScreen() {
  return (
    <Screen>
      <Container>
        <Logo source={logo} />
        <ActivityIndicator size={50} color={Colors.button.secondary} />
      </Container>
    </Screen>
  );
}

export default LoadingScreen;
