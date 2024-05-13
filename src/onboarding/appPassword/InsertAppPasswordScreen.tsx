import {StackNavigationProp} from '@react-navigation/stack';
import {useState} from 'react';
import Button from '../../components/Button/Button';
import DefaultModal from '../../components/DefaultModal/DefaultModal';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import AlertIcon from '../../components/icons/AlertIcon';
import InfoIcon from '../../components/icons/InfoIcon';
import SafePasswordModal from '../../components/safePasswordModal/SafePasswordModal';
import {RootStackParamList} from '../../navigation/RootStack';
import Colors from '../../styles/colors';
import {
  ButtonContainer,
  Container,
  Content,
  Form,
  Subtitle,
  SubtitleIcon,
  SubtitleWrapper,
  Title,
  TopWrapper,
} from './InsertAppPassword';
import TextInputField from '../../components/TextInputField/TextInputField';
import {useDispatch} from 'react-redux';
import {setLoading} from '../../redux/slices/LoadingSlice';
import {validateAppPassword} from '../../api/onboarding';
import {setPassword} from '../../redux/slices/OnboardingSlice';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'InsertAppPassword'>;
};

function InsertAppPasswordScreen({navigation}: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSafePasswordVisible, setModalSafePasswordVisible] =
    useState(false);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const handleConfirm = async () => {
    if (newPassword !== confirmPassword) {
      setModalVisible(true);
    }
    dispatch(setLoading(true));
    const response = await validateAppPassword(newPassword);
    if (response) {
      if (response.code === 204) {
        dispatch(setPassword(newPassword));
        navigation.navigate('InsertTransactionalPassword');
        dispatch(setLoading(false));
        return;
      }
    }
    dispatch(setLoading(false));
    setModalVisible(true);
  };

  return (
    <>
      <DefaultModal
        visible={modalVisible}
        setVisible={setModalVisible}
        title="Senha inválida"
        message="Por favor, verifique as recomendações para criação da senha e tente novamente."
        buttonLabel="TENTAR DE NOVO"
        icon={<AlertIcon fill={Colors.alert} />}
      />
      <Container>
        <SafePasswordModal
          visible={modalSafePasswordVisible}
          setVisible={setModalSafePasswordVisible}
        />
        <Content>
          <TopWrapper>
            <ProgressBar progress={0.57} />
            <Title>Digite qual será sua senha para entrar no aplicativo</Title>
            <SubtitleWrapper
              onPress={() => {
                setModalSafePasswordVisible(!modalSafePasswordVisible);
              }}>
              <SubtitleIcon>
                <InfoIcon fill={Colors.darkblue} />
              </SubtitleIcon>
              <Subtitle>Como criar uma senha segura</Subtitle>
            </SubtitleWrapper>
            <Form>
              <TextInputField
                value={newPassword}
                onChangeFunction={setNewPassword}
                label={'Digite sua nova senha'}
                placeholder={''}
                secureText={true}
              />
              <TextInputField
                value={confirmPassword}
                onChangeFunction={setConfirmPassword}
                label={'Confirme sua nova senha'}
                placeholder={''}
                secureText={true}
              />
            </Form>
          </TopWrapper>
          <ButtonContainer>
            <Button onPress={handleConfirm} text="CONFIRMAR" />
          </ButtonContainer>
        </Content>
      </Container>
    </>
  );
}
export default InsertAppPasswordScreen;
