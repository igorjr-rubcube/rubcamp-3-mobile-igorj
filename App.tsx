/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {firebase} from '@react-native-firebase/analytics';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import LoadingModal from './src/loading/LoadingModal';
import RootStack from './src/navigation/RootStack';
import {store} from './src/redux/store';

function App(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
    const fun = async () => {
      await firebase.analytics().logEvent('app_open');
      console.log('App Opened');
      
    };
    fun();
  }, []);

  return (
    <Provider store={store}>
      <LoadingModal />
      <RootStack />
    </Provider>
  );
}

export default App;
