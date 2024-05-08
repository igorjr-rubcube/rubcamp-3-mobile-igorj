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
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/RootStack';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Success'>;
  route: RouteProp<RootStackParamList, 'Success'>;
};

function SuccessScreen({navigation, route}: Props) {
  const {title, message, navigateTo} = route.params;
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
    </Screen>
  );
}

export default SuccessScreen;
