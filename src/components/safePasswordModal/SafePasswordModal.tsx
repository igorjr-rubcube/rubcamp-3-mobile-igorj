import Button from '../../components/Button/Button';
import CheckIconAlt from '../../components/icons/CheckIconAlt';
import XIcon from '../../components/icons/XIcon';
import Colors from '../../styles/colors';
import {
  CloseButton,
  ModalBackground,
  ModalView,
  RuleContainer,
  RuleIcon,
  RuleText,
  Subtitle,
  Title,
  TopWrapper,
} from './SafePasswordModal.styles';

interface SafePasswordModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

function SafePasswordModal({visible, setVisible}: SafePasswordModalProps) {
  return (
    <ModalView visible={visible} animationType="slide">
      <ModalBackground>
        <TopWrapper>
          <CloseButton onPress={() => setVisible(false)}>
            <XIcon fill={Colors.black} />
          </CloseButton>
          <Title>Criar Senha</Title>
          <Subtitle>
            Siga as instruções abaixo para criar uma senha segura:
          </Subtitle>
          <RuleContainer>
            <RuleIcon>
              <CheckIconAlt />
            </RuleIcon>
            <RuleText>
              A senha deve conter no mínimo 8 caracteres, entre letras, números
              e caracteres especiais (!@#$%^&*)
            </RuleText>
          </RuleContainer>
          <RuleContainer>
            <RuleIcon>
              <CheckIconAlt />
            </RuleIcon>
            <RuleText>
              Não utilizar números ou letras repetidos; não uitilizar números ou
              letras sequênciais (ex: 12345678, aaaaaaaa)
            </RuleText>
          </RuleContainer>
          <RuleContainer>
            <RuleIcon>
              <CheckIconAlt />
            </RuleIcon>
            <RuleText>
              Não é permitido utilizar dados pessoais como nome, data de
              nascimento, número de telefone ou nome da mãe
            </RuleText>
          </RuleContainer>
        </TopWrapper>
        <Button onPress={() => setVisible(false)} text={'ENTENDI'} />
      </ModalBackground>
    </ModalView>
  );
}

export default SafePasswordModal;
