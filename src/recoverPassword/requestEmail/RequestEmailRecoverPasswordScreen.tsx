import {useState} from 'react';
import Button from '../../components/Button/Button';
import TextInputField from '../../components/TextInputField/TextInputField';
import {
  BottomWrapper,
  Container,
  Screen,
  Subtitle,
  Title,
} from './RequestEmailRecoverPasswordScreen.styles';
import {requestEmailRecoverPassword} from '../../axios/api/password';
import {setLoading} from '../../redux/slices/LoadingSlice';
import {useDispatch} from 'react-redux';
import DefaultModal from '../../components/DefaultModal/DefaultModal';
import CheckIcon from '../../components/icons/CheckIconAlt';
import Colors from '../../styles/colors';
import AlertIcon from '../../components/icons/AlertIcon';
import { RootStackParamList } from '../../navigation/RootStack';
import { StackNavigationProp } from '@react-navigation/stack';

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

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'RequestEmailRecoverPassword'>;
};

function RequestEmailRecoverPasswordScreen({navigation}: Props) {
  const [cpf, setCpf] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>('');
  const [modalMessage, setModalMessage] = useState<string>('');
  const [modalIcon, setModalIcon] = useState<React.JSX.Element>(
    <CheckIcon fill={Colors.darkblue} />,
  );
  const [buttonLabel, setButtonLabel] = useState('TENTAR DE NOVO');


  const dispatch = useDispatch();

  const handleContinue = async () => {
    dispatch(setLoading(true));
    const response = await requestEmailRecoverPassword(cpf);
    if (response) {
      if (response.code === 204) {
        dispatch(setLoading(false));
        setButtonLabel('CONTINUAR')
        setModalTitle('Sucesso');
        setModalMessage('E-mail de recuperação enviado com sucesso!');
        setModalVisible(true);
        setModalIcon(<CheckIcon fill={Colors.darkblue} />);
      } else {
        setModalTitle('Atenção');
        setModalMessage('CPF não encontrado');
        setModalVisible(true);
        setModalIcon(<AlertIcon fill={Colors.alert} />);
      }
    }
    dispatch(setLoading(false));
  };

  const handleSuccess = () => {
    if (modalTitle === 'Sucesso') {
      setModalVisible(false);
      navigation.navigate('Welcome');
    }
    setModalVisible(false);
  };

  return (
    <>
      <DefaultModal
        visible={modalVisible}
        setVisible={handleSuccess}
        title={modalTitle}
        message={modalMessage}
        buttonLabel={buttonLabel}
        icon={modalIcon}
      />
      <Screen>
        <Container>
          <Title>Esqueci minha senha</Title>
          <Subtitle>Insira seu CPF</Subtitle>
          <TextInputField
            value={cpf}
            onChangeFunction={setCpf}
            label={''}
            placeholder={''}
            mask={cpfMask}
            maxLength={14}
            inputMode="numeric"
            textAlign={'center'}
          />
        </Container>
        <BottomWrapper>
          <Button text="CONTINUAR" onPress={handleContinue} />
        </BottomWrapper>
      </Screen>
    </>
  );
}

export default RequestEmailRecoverPasswordScreen;
