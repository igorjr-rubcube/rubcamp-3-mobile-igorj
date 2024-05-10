import styled from 'styled-components/native';
import Colors from '../../styles/colors';

export const Modal = styled.Modal`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ModalBackground = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.darkTransparent};
`;

export const ModalContainer = styled.View`
  background-color: ${Colors.white};
  padding: 20px;
  padding-top: 48px;
  border-radius: 10px;
  width: 90%;
`;

export const CloseButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: ${Colors.darkblue};
  border-radius: 50px;
  padding: 10px;
`;

export const CloseButtonText = styled.Text`
  font-size: 18px;
  color: ${Colors.white};
`;
