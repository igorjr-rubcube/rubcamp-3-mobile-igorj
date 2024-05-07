import {useState} from 'react';
import {Linking} from 'react-native';
import Button from '../../../components/Button/Button';
import {
  Background,
  BottomView,
} from '../../../components/DefaultScreen/DefaultScreen';
import TextInputField from '../../../components/TextInputField/TextInputField';
import InfoIcon from '../../../components/icons/InfoIcon';
import Colors from '../../../styles/colors';
import {
  Container,
  Form,
  Subtitle,
  SubtitleIcon,
  SubtitleWrapper,
  Title,
  TopWrapper,
} from './ChangeAppPasswordScreen.styles';

function ChangeAppPasswordScreen() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <Background>
      <BottomView flexSize={1}>
        <Container>
          <TopWrapper>
            <Title>Digite qual será sua senha para entrar no aplicativo</Title>
            <SubtitleWrapper
              onPress={() =>
                Linking.openURL(
                  'https://www.kaspersky.com.br/resource-center/threats/how-to-create-a-strong-password',
                )
              }>
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
          <Button onPress={() => {}} disabled={false} text={'CONFIRMAR'} />
        </Container>
      </BottomView>
    </Background>
  );
}

export default ChangeAppPasswordScreen;
