import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {changeAppPassword} from '../../api/password';
import Button from '../../components/Button/Button';
import DefaultModal from '../../components/DefaultModal/DefaultModal';
import {
  Background,
  BottomView,
} from '../../components/DefaultScreen/DefaultScreen';
import TextInputField from '../../components/TextInputField/TextInputField';
import AlertIcon from '../../components/icons/AlertIcon';
import InfoIcon from '../../components/icons/InfoIcon';
import {setLoading} from '../../redux/slices/LoadingSlice';
import {RootState} from '../../redux/store';
import Colors from '../../styles/colors';
import SafePasswordModal from '../safePasswordModal/SafePasswordModal';
import {
  Container,
  Form,
  Subtitle,
  SubtitleIcon,
  SubtitleWrapper,
  Title,
  TopWrapper,
} from './ChangePassword.styles';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/RootStack';
import {ScrollView} from 'react-native';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ChangeAppPassword'>;
};

function ChangeAppPasswordScreen({navigation}: Props) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [modalSafePasswordVisible, setModalSafePasswordVisible] =
    useState(false);
  const [modalWrongPasswordVisible, setModalWrongPasswordVisible] =
    useState(false);

  const isButtonDisabled = () => {
    return (
      currentPassword.length < 8 ||
      newPassword.length < 8 ||
      confirmPassword.length < 8
    );
  };

  const dispatch = useDispatch();
  const id = useSelector((state: RootState) => state.userId.userId);
  const token = useSelector((state: RootState) => state.token.token);
  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      setModalWrongPasswordVisible(true);
    } else {
      dispatch(setLoading(true));
      const changeAppPasswordResponse = await changeAppPassword(
        token,
        id,
        currentPassword,
        newPassword,
      );
      if (changeAppPasswordResponse && changeAppPasswordResponse.code === 204) {
        navigation.navigate({
          name: 'Success',
          params: {
            title: 'Alteração realizada',
            message: 'Você redefiniu sua senha com sucesso!',
            navigateTo: 'Profile',
          },
        });
        dispatch(setLoading(false));
      } else if (
        changeAppPasswordResponse &&
        changeAppPasswordResponse.code === 401
      ) {
        setModalWrongPasswordVisible(true);
        dispatch(setLoading(false));
      }
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <SafePasswordModal
        visible={modalSafePasswordVisible}
        setVisible={setModalSafePasswordVisible}
      />
      <DefaultModal
        visible={modalWrongPasswordVisible}
        setVisible={setModalWrongPasswordVisible}
        icon={<AlertIcon fill={Colors.alert} />}
        title="Senha inválida"
        message="Por favor, verifique as recomendações para criação da senha e tente novamente."
        hasButton={true}
        buttonLabel="TENTAR DE NOVO"
      />
      <Background>
        <BottomView flexSize={1}>
          <ScrollView>
            <Container>
              <TopWrapper>
                <Title>
                  Digite qual será sua senha para entrar no aplicativo
                </Title>
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
                    value={currentPassword}
                    onChangeFunction={setCurrentPassword}
                    label={'Digite sua senha atual'}
                    placeholder={''}
                    secureText={true}
                  />
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
              <Button
                onPress={handlePasswordChange}
                disabled={isButtonDisabled()}
                text={'CONFIRMAR'}
              />
            </Container>
          </ScrollView>
        </BottomView>
      </Background>
    </>
  );
}

export default ChangeAppPasswordScreen;
