import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/RootStack';
import {
  TopWrapper,
  ButtonContainer,
  Container,
  Content,
  InputContainer,
  Title,
} from './InsertUserInfoScreen.styles';
import TextInputField from '../../components/TextInputField/TextInputField';
import {useEffect, useState} from 'react';
import Button from '../../components/Button/Button';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs, {Dayjs} from 'dayjs';
import DatePickerModal from '../../components/DatePicker/DatePickerModal';

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

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'InsertCep'>;
};

function InsertUserInfoScreen({navigation}: Props) {
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [birthDate, setBirthDate] = useState<Date>(new Date());

  const [isDatePickerVisible, setIsDatePickerVisible] =
    useState<boolean>(false);
  return (
    <>
      <DatePickerModal
        visible={isDatePickerVisible}
        setVisible={() => setIsDatePickerVisible(false)}
        onDateSelected={(date: Dayjs) => setBirthDate(date.toDate())}
      />
      <Container>
        <Content>
          <TopWrapper>
            <ProgressBar progress={0.2} />
            <Title>Preencha abaixo com seus dados pessoais.</Title>
            <InputContainer>
              <TextInputField
                value={fullName}
                onChangeFunction={setFullName}
                label={'Nome completo*'}
                placeholder={'Digite seu nome completo'}
              />
            </InputContainer>
            <InputContainer>
              <TextInputField
                value={email}
                onChangeFunction={setEmail}
                label={'E-mail*'}
                placeholder={'Digite seu e-mail'}
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
              />
            </InputContainer>
            <TextInputField
              value={birthDate.toLocaleDateString('pt-BR')}
              onChangeFunction={setBirthDate}
              label={'Data de nascimento*'}
              placeholder={'Selecione sua data de nascimento'}
              showInput={false}
              editable={false}
              onFocus={() => {
                setIsDatePickerVisible(true);
              }}
            />
            <InputContainer></InputContainer>
          </TopWrapper>
          <ButtonContainer>
            <Button
              onPress={() => navigation.navigate('InsertCep')}
              text="CONFIRMAR"
            />
          </ButtonContainer>
        </Content>
      </Container>
    </>
  );
}
export default InsertUserInfoScreen;
