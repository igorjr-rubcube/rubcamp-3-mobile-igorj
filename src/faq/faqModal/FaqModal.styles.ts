import styled from 'styled-components/native';
import Colors from '../../styles/colors';

export const ModalView = styled.Modal`
  width: 100%;
  height: 100%;
`;

export const ModalBackground = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.darkTransparent};
`;

export const ModalContainer = styled.View`
  justify-content: center;
  align-items: center;
  background-color: ${Colors.light};
  border-radius: 12px;
  width: 80%;
  padding: 10%;
`;

export const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 0px;
  right: 10px;
`;

export const CloseButtonText = styled.Text`
  font-family: monospace;
  font-size: 28px;
  color: ${Colors.darkblue};
`;

export const ModalIcon = styled.View`
  width: 30%;
  height: 30%;
  margin-bottom: 10%;
`;

export const ModalTitle = styled.Text`
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  color: ${Colors.darkblue};
  margin-bottom: 16px;
  width: 100%;
`;

export const HighlightedText = styled.Text`
  font-weight: bold;
  color: ${Colors.darkblue};
`;

export const ModalMessage = styled.Text`
  font-size: 18px;
  text-align: justify;
  color: ${Colors.darkblue};
`;

export const ConfirmButton = styled.TouchableOpacity`
  background-color: ${Colors.darkblue};
  border-radius: 50px;
  padding: 16px 48px;
`;

export const ConfirmButtonText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${Colors.white};
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 24px;
`;

export const LikeDislikeView = styled.View`
  justify-content: space-between;
  align-items: center;
`;

export const LikeDislikeButton = styled.TouchableOpacity`
  height: 30px;
  width: 30px;
  align-items: center;
`;

export const LikeDislikeCount = styled.Text`
  font-size: 16px;
  color: ${Colors.darkblue};
`;
