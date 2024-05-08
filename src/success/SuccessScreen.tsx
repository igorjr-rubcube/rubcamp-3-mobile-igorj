import React, {useEffect} from 'react';
import CheckIcon from '../components/icons/CheckIcon';
import Colors from '../styles/colors';
import {
  Container,
  IconContainer,
  Message,
  Screen,
  Title,
} from './SuccessScreen.styles';

const logo = require('../assets/rubbank-logo.png');

export type SuccessScreenProps = {
  title: string;
  message: string;
  button: any;
};

function SuccessScreen({route, navigation}: any) {
  const {title, message, button, navigateTo} = route.params;
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate(navigateTo);
    }, 2500);
  }, []);
  return (
    <Screen>
      <Container>
        <IconContainer>
          <CheckIcon fill={Colors.default} />
        </IconContainer>
        <Title>{title}</Title>
        <Message>{message}</Message>
      </Container>
      {button}
    </Screen>
  );
}

export default SuccessScreen;
