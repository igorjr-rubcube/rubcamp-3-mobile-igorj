import {StackNavigationProp} from '@react-navigation/stack';
import {Dayjs} from 'dayjs';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {validateUserData} from '../../api/onboarding';
import Button from '../../components/Button/Button';
import DatePickerModal from '../../components/DatePicker/DatePickerModal';
import DefaultModal from '../../components/DefaultModal/DefaultModal';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import TextInputField from '../../components/TextInputField/TextInputField';
import AlertIcon from '../../components/icons/AlertIcon';
import {RootStackParamList} from '../../navigation/RootStack';
import {setLoading} from '../../redux/slices/LoadingSlice';
import {setUserData} from '../../redux/slices/OnboardingSlice';
import Colors from '../../styles/colors';
import {
  ButtonContainer,
  Container,
  Content,
  InputContainer,
  Scroll,
  Title,
  TopWrapper,
} from './InsertUserDataScreen.styles';

const cpfMask = [
  /\d/,
  /\d/,
  /\d/,
  '.',
  /\d/,
  /\d/,
  /\d/,
  '.',
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
];

const phoneMask = [
  '(',
  /\d/,
  /\d/,
  ')',
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

interface Error {
  content: string;
  path: string;
}

interface Fields {
  fullName: boolean;
  email: boolean;
  cpf: boolean;
  phone: boolean;
  birthdate: boolean;
}

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'InsertCep'>;
};

function InsertUserDataScreen({navigation}: Props) {
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [birthDate, setBirthDate] = useState<Date>(new Date());
  const validationInitialState = {
    fullName: false,
    email: false,
    cpf: false,
    phone: false,
    birthdate: false,
  };
  const [validationErrors, setValidationErrors] = useState<Fields>(
    validationInitialState,
  );

  const [isDatePickerVisible, setIsDatePickerVisible] =
    useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleError = (error: Error[] | number) => {
    if (error instanceof String || error === 0) {
      setValidationErrors(validationInitialState);
      return;
    }
    if (error instanceof Array) {
      const newValidationErrors = {...validationInitialState};
      if (error.length > 0) setModalVisible(true);
      error.forEach(error => {
        switch (error.path) {
          case 'fullName':
            newValidationErrors.fullName = true;
            break;
          case 'email':
            newValidationErrors.email = true;
            break;
          case 'cpf':
            newValidationErrors.cpf = true;
            break;
          case 'phone':
            newValidationErrors.phone = true;
            break;
          case 'birthdate':
            newValidationErrors.birthdate = true;
            break;
        }
      });
      setValidationErrors(newValidationErrors);
    }
  };

  const dispatch = useDispatch();

  const handleConfirm = async () => {
    const userData = {
      cpf: cpf,
      fullName: fullName,
      email: email,
      phone: phone,
      birthdate: birthDate.toISOString(),
    };

    dispatch(setLoading(true));
    const response = await validateUserData(userData);
    if (response) {
      if (response.code === 204) {
        dispatch(setUserData(userData));
        navigation.navigate('InsertCep');
      } else if (response.code === 400) {
        handleError(response.data.message);
      } else if (response.code === 409) {
        handleError(0);
      }
      dispatch(setLoading(false));
    }
  };

  const onChange = (
    setFunction: typeof setFullName,
    path: string,
    value: string,
  ) => {
    setFunction(value);
    const newValidationErrors = {...validationErrors};
    switch (path) {
      case 'fullName':
        newValidationErrors.fullName = false;
        break;
      case 'email':
        newValidationErrors.email = false;
        break;
      case 'cpf':
        newValidationErrors.cpf = false;
        break;
      case 'phone':
        newValidationErrors.phone = false;
        break;
    }
    setValidationErrors(newValidationErrors);
  };

  return (
    <>
      <DefaultModal
        visible={modalVisible}
        setVisible={setModalVisible}
        title="Atenção"
        message="Preencha todos os campos corretamente"
        buttonLabel="TENTAR DE NOVO"
        icon={<AlertIcon fill={Colors.alert} />}
      />
      <DatePickerModal
        visible={isDatePickerVisible}
        setVisible={() => setIsDatePickerVisible(false)}
        onDateSelected={(date: Dayjs) => setBirthDate(date.toDate())}
      />
      <Container>
        <Content>
          <Scroll>
            <TopWrapper>
              <ProgressBar progress={0.14} />
              <Title>Preencha abaixo com seus dados pessoais.</Title>
              <InputContainer>
                <TextInputField
                  value={fullName}
                  onChangeFunction={(value: string) =>
                    onChange(setFullName, 'fullName', value)
                  }
                  label={'Nome completo*'}
                  placeholder={'Digite seu nome completo'}
                  error={validationErrors.fullName}
                />
              </InputContainer>
              <InputContainer>
                <TextInputField
                  value={email}
                  onChangeFunction={(value: string) =>
                    onChange(setEmail, 'email', value)
                  }
                  label={'E-mail*'}
                  placeholder={'Digite seu e-mail'}
                  error={validationErrors.email}
                />
              </InputContainer>
              <InputContainer>
                <TextInputField
                  value={cpf}
                  onChangeFunction={(value: string) =>
                    onChange(setCpf, 'cpf', value)
                  }
                  label={'CPF*'}
                  placeholder={'Digite seu CPF'}
                  mask={cpfMask}
                  maxLength={14}
                  error={validationErrors.cpf}
                />
              </InputContainer>
              <InputContainer>
                <TextInputField
                  value={phone}
                  onChangeFunction={(value: string) =>
                    onChange(setPhone, 'phone', value)
                  }
                  label={'Telefone*'}
                  placeholder={'Digite seu telefone'}
                  mask={phoneMask}
                  maxLength={15}
                  error={validationErrors.phone}
                />
              </InputContainer>
              <InputContainer>
                <TextInputField
                  value={birthDate.toLocaleDateString('pt-BR')}
                  onChangeFunction={setBirthDate}
                  label={'Data de nascimento*'}
                  placeholder={''}
                  showInput={false}
                  editable={true}
                  error={validationErrors.birthdate}
                  onFocus={() => {
                    setIsDatePickerVisible(true);
                    setValidationErrors({
                      ...validationErrors,
                      birthdate: false,
                    });
                  }}
                />
              </InputContainer>
            </TopWrapper>
            <ButtonContainer>
              <Button onPress={handleConfirm} text="CONFIRMAR" />
            </ButtonContainer>
          </Scroll>
        </Content>
      </Container>
    </>
  );
}
export default InsertUserDataScreen;
