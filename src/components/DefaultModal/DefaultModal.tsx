import React from 'react';
import {
  CenterContainer,
  CloseButton,
  CloseButtonText,
  ConfirmButton,
  ConfirmButtonText,
  ModalBackground,
  ModalContainer,
  ModalIcon,
  ModalMessage,
  ModalTitle,
  ModalView,
} from '../../components/DefaultModal/DefaultModal.styles';

type defaultModalProps = {
  title: string;
  message: string;
  hasButton?: boolean;
  buttonLabel?: string;
  icon?: React.JSX.Element;
  visible: boolean;
  setVisible: any;
};

function DefaultModal({
  title,
  message,
  hasButton = true,
  buttonLabel,
  icon,
  visible,
  setVisible,
}: defaultModalProps) {
  return (
    <ModalView
      visible={visible}
      animationType="none"
      transparent={true}
      onRequestClose={setVisible}>
      <ModalBackground>
        <ModalContainer>
          <CloseButton onPress={setVisible}>
            <CloseButtonText>x</CloseButtonText>
          </CloseButton>
          <CenterContainer>
            <ModalIcon>{icon}</ModalIcon>
            <ModalTitle>{title}</ModalTitle>
            <ModalMessage>{message}</ModalMessage>
            {hasButton && (
              <ConfirmButton onPress={setVisible}>
                <ConfirmButtonText>{buttonLabel}</ConfirmButtonText>
              </ConfirmButton>
            )}
          </CenterContainer>
        </ModalContainer>
      </ModalBackground>
    </ModalView>
  );
}

export default DefaultModal;
