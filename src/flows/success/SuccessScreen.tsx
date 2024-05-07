import React from 'react';
import {
  Screen,
  IconContainer,
  Message,
  Title,
  Container,
} from './SuccessScreen.styles';
import CheckIcon from '../../components/icons/CheckIcon';
import Colors from '../../styles/colors';

const logo = require('../../assets/rubbank-logo.png');

export type SuccessScreenProps = {
  navigation: any;
  title: string;
  message: string;
  button?: any;
};

function SuccessScreen({
  navigation,
  title,
  message,
  button,
}: SuccessScreenProps) {
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
