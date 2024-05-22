import React from 'react';
import {ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import Colors from '../styles/colors';
import {Container, Logo, Screen} from './LoadingScreen.styles';
import {Modal} from '../components/DatePicker/DatePickerModal.styles';

const logo = require('../assets/rubbankLogo.png');

function LoadingScreen() {
  const loading = useSelector((state: RootState) => state.loading.isLoading);
  return (
    <>
      {loading ? (
          <Screen background={Colors.light}>
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
