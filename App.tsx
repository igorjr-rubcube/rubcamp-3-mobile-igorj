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
import ProfileScreen from './src/flows/profile/ProfileScreen';
import Colors from './src/styles/colors';
import ChangeAppPasswordScreen from './src/flows/profile/changeAppPassword/ChangeAppPasswordScreen';

function App(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <LoadingScreen />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            orientation: 'portrait',
            headerTransparent: true,
            statusBarColor: Colors.transparent,
          }}>
          <Stack.Screen
            options={{headerTitle: ''}}
            name="Welcome"
            component={WelcomeScreen}
          />
          <Stack.Screen
            options={{headerTitle: ''}}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Home"
            component={HomeScreen}
          />
          <Stack.Group
            screenOptions={{
              headerTitle: 'Perfil',
              headerTitleAlign: 'center',
              headerTransparent: true,
              headerTintColor: Colors.white,
              headerTitleStyle: {
                fontSize: 24,
                fontWeight: 'regular',
                fontFamily: 'Roboto',
              },
            }}>
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen
              options={{headerTitle: 'Alterar senha do App'}}
              name="ChangeAppPassword"
              component={ChangeAppPasswordScreen}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
