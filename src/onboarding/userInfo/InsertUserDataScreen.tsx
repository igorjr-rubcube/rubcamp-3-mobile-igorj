import {StackNavigationProp} from '@react-navigation/stack';
import {Dayjs} from 'dayjs';
import {useEffect, useState} from 'react';
import Button from '../../components/Button/Button';
import DatePickerModal from '../../components/DatePicker/DatePickerModal';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import TextInputField from '../../components/TextInputField/TextInputField';
import {RootStackParamList} from '../../navigation/RootStack';
import {
  ButtonContainer,
  Container,
  Content,
  InputContainer,
  Scroll,
  Title,
  TopWrapper,
} from './InsertUserDataScreen.styles';
import {validateUserData} from '../../api/onboarding';
import DefaultModal from '../../components/DefaultModal/DefaultModal';
import AlertIcon from '../../components/icons/AlertIcon';
import Colors from '../../styles/colors';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../redux/slices/LoadingSlice';

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
        navigation.navigate('InsertCep');
      } else if (response.code === 400) {
        handleError(response.data.message);
        console.log(validationErrors);
      } else if (response.code === 409) {
        handleError(0);
      }
      dispatch(setLoading(false));
    }
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
              <ProgressBar progress={0.2} />
              <Title>Preencha abaixo com seus dados pessoais.</Title>
              <InputContainer>
                <TextInputField
                  value={fullName}
                  onChangeFunction={setFullName}
                  label={'Nome completo*'}
                  placeholder={'Digite seu nome completo'}
                  error={validationErrors.fullName}
                />
              </InputContainer>
              <InputContainer>
                <TextInputField
                  value={email}
                  onChangeFunction={setEmail}
                  label={'E-mail*'}
                  placeholder={'Digite seu e-mail'}
                  error={validationErrors.email}
                />
              </InputContainer>
              <InputContainer>
                <TextInputField
                  value={cpf}
                  onChangeFunction={setCpf}
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
                  onChangeFunction={setPhone}
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
                  editable={false}
                  error={validationErrors.birthdate}
                  onFocus={() => {
                    setIsDatePickerVisible(true);
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
