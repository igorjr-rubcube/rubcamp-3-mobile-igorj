import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../home/HomeScreen';
import LoginScreen from '../login/LoginScreen';
import AccountTypeScreen from '../onboarding/accountType/AccountTypeScreen';
import InsertAddressScreen from '../onboarding/address/InsertAddressScreen';
import InsertAppPasswordScreen from '../onboarding/appPassword/InsertAppPasswordScreen';
import InsertCepScreen from '../onboarding/cep/InsertCepScreen';
import InsertTransactionalPasswordScreen from '../onboarding/transactionalPassword/InsertTransactionalPasswordScreen';
import InsertUserDataScreen from '../onboarding/userData/InsertUserDataScreen';
import AccountInfoScreen from '../profile/accountInfo/AccountInfoScreen';
import ChangeAddressScreen from '../profile/changeAddress/ChangeAddressScreen';
import ChangeAppPasswordScreen from '../profile/changePassword/ChangeAppPasswordScreen';
import ChangeTransactionalPasswordScreen from '../profile/changePassword/ChangeTransactionalPasswordScreen';
import ProfileScreen from '../profile/profileHome/ProfileScreen';
import SelectAccountScreen from '../selectAccount/selectAccountScreen/SelectAccountScreen';
import StatementScreen from '../statement/statementHome/StatementScreen';
import Colors from '../styles/colors';
import SuccessScreen from '../success/SuccessScreen';
import WelcomeScreen from '../welcome/WelcomeScreen';
import CreateNewAccountScreen from '../selectAccount/createNewAccount/CreateNewAccountScreen';

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  SelectAccount: undefined;
  CreateNewAccount: undefined;
  Home: undefined;
  Statement: undefined;
  Profile: undefined;
  AccountInfo: undefined;
  ChangeAppPassword: undefined;
  ChangeTransactionalPassword: undefined;
  ChangeAddress: undefined;
  Success: {
    title: string;
    message: string;
    navigateTo: 'Home' | 'Profile' | 'Login' | 'SelectAccount';
  };
  InsertUserData: undefined;
  InsertCep: undefined;
  InsertAddress: undefined;
  InsertAppPassword: undefined;
  InsertTransactionalPassword: undefined;
  AccountType: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          orientation: 'portrait',
          headerTitle: 'Perfil',
          statusBarColor: Colors.transparent,
          navigationBarColor: Colors.darkblue,
          headerTitleAlign: 'center',
          headerTransparent: true,
          headerTintColor: Colors.white,
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: 'regular',
            fontFamily: 'Roboto',
          },
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

        <Stack.Group>
          <Stack.Screen
            options={{headerShown: false}}
            name="SelectAccount"
            component={SelectAccountScreen}
          />
          <Stack.Screen
            options={{headerTitle: 'Criar nova conta', headerTintColor: Colors.darkblue}}
            name="CreateNewAccount"
            component={CreateNewAccountScreen}
          />
        </Stack.Group>
        <Stack.Screen
          options={{headerShown: false}}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{
            headerTitle: 'Extrato',
          }}
          name="Statement"
          component={StatementScreen}
        />
        <Stack.Group>
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
            name="InsertUserData"
            component={InsertUserDataScreen}
          />
          <Stack.Screen name="InsertCep" component={InsertCepScreen} />
          <Stack.Screen name="InsertAddress" component={InsertAddressScreen} />
          <Stack.Screen
            name="InsertAppPassword"
            component={InsertAppPasswordScreen}
          />
          <Stack.Screen
            name="InsertTransactionalPassword"
            component={InsertTransactionalPasswordScreen}
          />
          <Stack.Screen name="AccountType" component={AccountTypeScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootStack;
