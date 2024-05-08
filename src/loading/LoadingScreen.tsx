import React from 'react';
import {ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import Colors from '../styles/colors';
import {Container, Logo, Screen} from './LoadingScreen.styles';

const logo = require('../assets/rubbank-logo.png');

function LoadingScreen() {
  const loading = useSelector((state: RootState) => state.loading.isLoading);
  return (
    <>
      {loading ? (
        <Screen>
          <Container>
            <Logo source={logo} />
            <ActivityIndicator size={50} color={Colors.default} />
          </Container>
        </Screen>
      ) : null}
    </>
  );
}

export default LoadingScreen;
