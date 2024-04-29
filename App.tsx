/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import DefaultScreen from './src/components/DefaultScreen';

function App(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  
  return (
    <SafeAreaView>
      <View>
        <DefaultScreen />
      </View>
    </SafeAreaView>
  );
}

export default App;
