import styled from 'styled-components/native';
import Colors from '../styles/colors';

export const ModalView = styled.Modal`
  width: 100%;
  height: 100%;
`;

export const ModalBackground = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContainer = styled.View`
  justify-content: center;
  align-items: center;
  background-color: ${Colors.background.primary};
  border-radius: 12px;
  width: 80%;
  height: 35%;
  align-items: center;
`;

export const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 0px;
  right: 10px;
`;

export const CloseButtonText = styled.Text`
  font-family: monospace;
  font-size: 28px;
  color: ${Colors.text.primary};
`;

export const CenterContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 75%;
`;

export const ModalIcon = styled.View`
  width: 30%;
  height: 30%;
  margin-bottom: 10%;
`;

export const ModalTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${Colors.text.primary};
`;

export const ModalMessage = styled.Text`
  font-size: 18px;
  text-align: center;
  color: ${Colors.text.primary};
`;

export const ConfirmButton = styled.TouchableOpacity`
  background-color: ${Colors.background.secondary};
  border-radius: 50px;
  padding: 16px 48px;
  margin-top: 16px;
`;

export const ConfirmButtonText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${Colors.text.secondary};
`;
