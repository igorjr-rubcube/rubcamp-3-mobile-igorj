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
import LoginScreen from './src/flows/login/LoginScreen';
import WelcomeScreen from './src/flows/welcome/WelcomeScreen';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import LoadingScreen from './src/flows/loading/LoadingScreen';
import HomeScreen from './src/flows/home/HomeScreen';

function App(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <LoadingScreen />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{headerTitle: '', headerTransparent: true}}
            name="Welcome"
            component={WelcomeScreen}
          />
          <Stack.Screen
            options={{headerTitle: '', headerTransparent: true}}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Home"
            component={HomeScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
