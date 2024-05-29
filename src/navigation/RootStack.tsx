import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreateTransferScreen from '../createTransfer/createTransferHome/CreateTransferScreen';
import InsertAmountScreen from '../createTransfer/insertAmount/InsertAmountScreen';
import InsertPasswordScreen from '../createTransfer/insertPassword/InsertPasswordScreen';
import SelectAccountToTransferScreen from '../createTransfer/selectAccount/SelectAccountToTransferScreen';
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
import RecoverPasswordScreen from '../recoverPassword/recoverPassword/RecoverPasswordScreen';
import RequestEmailRecoverPasswordScreen from '../recoverPassword/requestEmail/RequestEmailRecoverPasswordScreen';
import CreateNewAccountScreen from '../selectAccount/createNewAccount/CreateNewAccountScreen';
import SelectAccountScreen from '../selectAccount/selectAccountScreen/SelectAccountScreen';
import StatementScreen from '../statement/statementHome/StatementScreen';
import Colors from '../styles/colors';
import SuccessScreen from '../success/SuccessScreen';
import WelcomeScreen from '../welcome/WelcomeScreen';
import FaqScreen from '../faq/faqHome/FaqScreen';

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  SelectAccount: undefined;
  CreateNewAccount: undefined;
  Faq: undefined;
  Home: undefined;
  Statement: undefined;
  CreateTransfer: undefined;
  SelectAccountToTransfer: {
    cpf: string;
    accounts: Array<{
      number: string;
      branch: number;
      bankName: string;
      user: {
        fullName: string;
        cpf: string;
      };
    }>;
  };
  InsertAmount: undefined;
  InsertPassword: undefined;
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
  RequestEmailRecoverPassword: undefined;
  RecoverPassword: {
    token: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const config = {
  screens: {
    RecoverPassword: {
      path: 'recover-password/:token',
      parse: {
        token: (token: string) => token,
      },
      stringify: {
        token: (token: string) => token,
      },
    },
  },
};

const linking = {
  prefixes: ['rubbank://open'],
  config,
};

function RootStack() {
  return (
    <NavigationContainer linking={linking}>
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
          options={{headerTitle: '', headerTintColor: Colors.darkblue}}
          name="Login"
          component={LoginScreen}
          
        />
        <Stack.Screen
          options={{headerTitle: '', headerTintColor: Colors.darkblue}}
          name="RequestEmailRecoverPassword"
          component={RequestEmailRecoverPasswordScreen}
        />
        <Stack.Screen
          options={{headerShown: true, headerTitle: 'Recuperar senha'}}
          name="RecoverPassword"
          component={RecoverPasswordScreen}
        />
        <Stack.Group>
          <Stack.Screen
            options={{headerShown: false}}
            name="SelectAccount"
            component={SelectAccountScreen}
          />
          <Stack.Screen
            options={{
              headerTitle: 'Criar nova conta',
              headerTintColor: Colors.darkblue,
            }}
            name="CreateNewAccount"
            component={CreateNewAccountScreen}
          />
        </Stack.Group>
        <Stack.Screen
          options={{headerTitle: 'FAQ', headerTintColor: Colors.darkblue}}
          name="Faq"
          component={FaqScreen}
        />
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
          <Stack.Group screenOptions={{headerTitle: 'Transferência'}}>
            <Stack.Screen
              name="CreateTransfer"
              component={CreateTransferScreen}
            />
            <Stack.Screen
              options={{
                headerTitle: 'Selecione a conta destino',
                headerTintColor: Colors.darkblue,
              }}
              name="SelectAccountToTransfer"
              component={SelectAccountToTransferScreen}
              initialParams={{cpf: '', accounts: []}}
            />
            <Stack.Screen name="InsertAmount" component={InsertAmountScreen} />
            <Stack.Screen
              name="InsertPassword"
              component={InsertPasswordScreen}
            />
          </Stack.Group>
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
