import React from 'react';
import {
  ButtonsContainer,
  CloseButton,
  CloseButtonText,
  ConfirmButton,
  ConfirmButtonText,
  LikeDislikeButton,
  LikeDislikeCount,
  LikeDislikeView,
  ModalBackground,
  ModalContainer,
  ModalIcon,
  ModalMessage,
  ModalTitle,
  ModalView,
} from './FaqModal.styles';
import LikeIcon from '../../components/icons/LikeIcon';
import Colors from '../../styles/colors';
import DislikeIcon from '../../components/icons/DislikeIcon';

type defaultModalProps = {
  title: string;
  message: string | React.JSX.Element;
  hasButton?: boolean;
  buttonLabel?: string;
  icon?: React.JSX.Element;
  visible: boolean;
  setVisible: any;
};

function FaqModal({
  title,
  message,
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
          {icon && <ModalIcon>{icon}</ModalIcon>}
          <ModalTitle>{title}</ModalTitle>
          <ModalMessage>{message}</ModalMessage>
          <ButtonsContainer>
            <ConfirmButton onPress={setVisible}>
              <ConfirmButtonText>{buttonLabel}</ConfirmButtonText>
            </ConfirmButton>
            <LikeDislikeView>
              <LikeDislikeButton>
                <LikeIcon fill={Colors.green} />
              </LikeDislikeButton>
              <LikeDislikeCount>10</LikeDislikeCount>
            </LikeDislikeView>
            <LikeDislikeView>
              <LikeDislikeButton>
                <DislikeIcon fill={Colors.red} />
              </LikeDislikeButton>
              <LikeDislikeCount>10</LikeDislikeCount>
            </LikeDislikeView>
          </ButtonsContainer>
        </ModalContainer>
      </ModalBackground>
    </ModalView>
  );
}

export default FaqModal;
