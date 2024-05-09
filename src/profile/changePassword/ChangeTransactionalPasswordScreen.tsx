import {useState} from 'react';
import Button from '../../components/Button/Button';
import DefaultModal from '../../components/DefaultModal/DefaultModal';
import {
  Background,
  BottomView,
} from '../../components/DefaultScreen/DefaultScreen';
import NumericInputField from '../../components/NumericInputField/NumericInputField';
import AlertIcon from '../../components/icons/AlertIcon';
import InfoIcon from '../../components/icons/InfoIcon';
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
import Colors from '../../styles/colors';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {setLoading} from '../../redux/slices/LoadingSlice';
import {RootStackParamList} from '../../navigation/RootStack';
import {StackNavigationProp} from '@react-navigation/stack';
import {changeTransactionalPassword} from '../../api/password';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ChangeAppPassword'>;
};

function ChangeTransactionalPassword({navigation}: Props) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [modalSafePasswordVisible, setModalSafePasswordVisible] =
    useState(false);
  const [modalWrongPasswordVisible, setModalWrongPasswordVisible] =
    useState(false);

  const isButtonDisabled = () => {
    return (
      currentPassword.length < 4 ||
      newPassword.length < 4 ||
      confirmNewPassword.length < 4
    );
  };

  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.token.token);
  const id = useSelector((state: RootState) => state.userId.userId);
  const idAccount = useSelector(
    (state: RootState) => state.accountId.accountId,
  );
  const handlePasswordChange = async () => {
    if (newPassword !== confirmNewPassword) {
      setModalWrongPasswordVisible(true);
    } else {
      dispatch(setLoading(true));
      const changeAppPasswordResponse = await changeTransactionalPassword(
        token,
        id,
        idAccount,
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
        (changeAppPasswordResponse.code === 401 ||
          changeAppPasswordResponse.code === 400)
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
          <Container>
            <TopWrapper>
              <Title>Digite qual será sua senha para realizar transações</Title>
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
                <NumericInputField
                  onChangeFunction={setCurrentPassword}
                  size={4}
                  label="Digite sua senha atual"
                  secureText={true}
                />
                <NumericInputField
                  onChangeFunction={setNewPassword}
                  size={4}
                  label="Digite sua nova senha"
                  secureText={true}
                />
                <NumericInputField
                  onChangeFunction={setConfirmNewPassword}
                  size={4}
                  label="Confirme sua nova senha"
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
        </BottomView>
      </Background>
    </>
  );
}

export default ChangeTransactionalPassword;