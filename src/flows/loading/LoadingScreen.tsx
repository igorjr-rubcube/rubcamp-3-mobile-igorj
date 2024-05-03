import React from 'react';
import {ActivityIndicator} from 'react-native';
import Colors from '../../styles/colors';
import {Container, Logo, Screen} from './LoadingScreen.styles';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';

const logo = require('../../assets/rubbank-logo.png');

function LoadingScreen() {
  const loading = useSelector((state: RootState) => state.loading.isLoading);
  return (
    <>
      {loading ? (
        <Screen>
          <Container>
            <Logo source={logo} />
            <ActivityIndicator size={50} color={Colors.button.secondary} />
          </Container>
        </Screen>
      ) : null}
    </>
  );
}

export default LoadingScreen;
