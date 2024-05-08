/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';

import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import LoadingScreen from './src/loading/LoadingScreen';
import RootStack from './src/navigation/RootStack';

function App(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <LoadingScreen />
      <RootStack />
    </Provider>
  );
}

export default App;
