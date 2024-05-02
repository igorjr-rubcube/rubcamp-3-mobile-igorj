/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen from 'react-native-splash-screen';
import WelcomeScreen from './src/flow/welcome/WelcomeScreen';
import LoginScreen from './src/flow/login/LoginScreen';

function App(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="Home"
          component={WelcomeScreen}
        />
        <Stack.Screen 
        options={{headerTitle: '', headerTransparent: true}}
        name="Login" 
        component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
