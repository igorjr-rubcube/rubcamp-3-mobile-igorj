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
import WelcomeScreen from './src/flows/welcome/WelcomeScreen';
import LoginScreen from './src/flows/login/LoginScreen';
import SuccessScreen, {
  SuccessScreenProps,
} from './src/flows/success/SuccessScreen';
import Button from './src/components/Button/Button';

function App(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const Stack = createNativeStackNavigator();

  return (
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
          options={{headerTitle: '', headerTransparent: true}}
          name="Success">
          {({navigation}) => {
            const props: SuccessScreenProps = {
              navigation,
              title: 'Login efetuado com sucesso',
              message: 'Seja bem-vindo ao RubBank!',
              button: Button({
                text: 'VOLTAR',
                onPress: () => navigation.navigate('Welcome'),
              }),
            };
            return <SuccessScreen {...props} />;
          }}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
