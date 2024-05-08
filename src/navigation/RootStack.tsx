import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import HomeScreen from '../home/HomeScreen';
import LoginScreen from '../login/LoginScreen';
import ChangeAppPasswordScreen from '../profile/changeAppPassword/ChangeAppPasswordScreen';
import ProfileScreen from '../profile/profileHome/ProfileScreen';
import SuccessScreen from '../success/SuccessScreen';
import WelcomeScreen from '../welcome/WelcomeScreen';

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Home: undefined;
  Profile: undefined;
  ChangeAppPassword: undefined;
  Success: {title: string; message: string; navigateTo: string};
};

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
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
          <Stack.Screen
            name="Success"
            component={SuccessScreen}
            options={{headerShown: false}}
            initialParams={{
              title: '',
              message: '',
              navigateTo: '',
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootStack;
