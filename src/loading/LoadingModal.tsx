import React from 'react';
import {ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import Colors from '../styles/colors';
import {Container, Modal, Screen, Spinner} from './LoadingScreen.styles';

const logo = require('../assets/rubbank-logo.png');

function LoadingModal() {
  const loading = useSelector((state: RootState) => state.loading.isLoading);
  return (
    <>
      {loading ? (
        <Modal transparent={true}>
          <Screen background={Colors.darkTransparent}>
            <Container>
              <Spinner size={50} color={Colors.default} />
            </Container>
          </Screen>
        </Modal>
      ) : null}
    </>
  );
}

export default LoadingModal;
