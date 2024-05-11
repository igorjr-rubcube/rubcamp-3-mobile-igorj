import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../home/HomeScreen';
import LoginScreen from '../login/LoginScreen';
import ChangeAppPasswordScreen from '../profile/changePassword/ChangeAppPasswordScreen';
import ProfileScreen from '../profile/profileHome/ProfileScreen';
import SuccessScreen from '../success/SuccessScreen';
import WelcomeScreen from '../welcome/WelcomeScreen';
import ChangeTransactionalPasswordScreen from '../profile/changePassword/ChangeTransactionalPasswordScreen';
import ChangeAddressScreen from '../profile/changeAddress/ChangeAddressScreen';
import Colors from '../styles/colors';
import InsertCepScreen from '../onboarding/cep/InsertCepScreen';
import InsertUserInfoScreen from '../onboarding/userInfo/InsertUserInfoScreen';
import SelectAccountScreen from '../selectAccount/SelectAccountScreen';
import AccountInfoScreen from '../profile/accountIfo/AccountInfoScreen';

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  SelectAccount: undefined;
  Home: undefined;
  Profile: undefined;
  AccountInfo: undefined;
  ChangeAppPassword: undefined;
  ChangeTransactionalPassword: undefined;
  ChangeAddress: undefined;
  Success: {title: string; message: string; navigateTo: 'Home' | 'Profile'};
  InsertUserInfo: undefined;
  InsertCep: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

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
          name="SelectAccount"
          component={SelectAccountScreen}
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
            name="AccountInfo"
            component={AccountInfoScreen}
            options={{headerTitle: 'Dados bancários'}}
          />
          <Stack.Screen
            options={{headerTitle: 'Alterar senha do App'}}
            name="ChangeAppPassword"
            component={ChangeAppPasswordScreen}
          />
          <Stack.Screen
            options={{headerTitle: 'Alterar senha do transacional'}}
            name="ChangeTransactionalPassword"
            component={ChangeTransactionalPasswordScreen}
          />
          <Stack.Screen
            options={{headerTitle: 'Alterar endereço'}}
            name="ChangeAddress"
            component={ChangeAddressScreen}
          />
          <Stack.Screen
            name="Success"
            component={SuccessScreen}
            options={{headerShown: false}}
            initialParams={{
              title: '',
              message: '',
              navigateTo: 'Home',
            }}
          />
        </Stack.Group>
        <Stack.Group
          screenOptions={{
            headerShown: false,
            presentation: 'modal',
          }}>
          <Stack.Screen
            name="InsertUserInfo"
            component={InsertUserInfoScreen}
          />
          <Stack.Screen name="InsertCep" component={InsertCepScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootStack;
