import styled from 'styled-components/native';
import Colors from '../../styles/colors';

export const ShareView = styled.View`
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

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
  background-color: ${Colors.light};
  border-radius: 12px;
  width: 85%;
  height: 90%;
  align-items: center;
  justify-content: space-around;
  padding: 2% 0;
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
  font-size: 24px;
  margin-bottom: 16px;
  font-weight: bold;
  color: ${Colors.darkblue};
`;

export const ButtonsContainer = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  width: 100%;
`;

export const ConfirmButton = styled.TouchableOpacity`
  background-color: ${Colors.darkblue};
  border-radius: 50px;
  margin-top: 16px;
  align-items: center;
  justify-content: center;
  padding: 16px 16px;
  width: 120px;
`;

export const ConfirmButtonText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${Colors.white};
`;

export const CancelButton = styled.TouchableOpacity`
  background-color: ${Colors.red};
  border-radius: 50px;
  margin-top: 16px;
  align-items: center;
  justify-content: center;
  padding: 16px 16px;
  width: 120px;
`;

export const CancelButtonText = styled.Text`
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  color: ${Colors.white};
`;

export const DetailsContainer = styled.View`
  width: 100%;
  padding: 0 24px;
`;

export const DetailsRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
  width: 100%;
  background-color: ${Colors.light};
`;

export const DetailsTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${Colors.darkblue};
`;

export const DetailsValue = styled.Text`
  font-size: 18px;
  color: ${Colors.grey};
`;

export const FromToContainer = styled.View`
  width: 100%;
  margin-top: 10px;
`;

export const FromToTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${Colors.darkblue};
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.darkblue};
  padding-bottom: 8px;
  margin-bottom: 12px;
`;

export const FromToText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${Colors.darkblue};
`;

export const FromToValue = styled.Text`
  font-size: 16px;
  color: ${Colors.grey};
`;

export const ShareButton = styled.TouchableOpacity`
  background-color: ${Colors.darkblue};
  border-radius: 50px;
  margin-top: 16px;
  align-items: center;
  justify-content: center;
  padding: 16px 16px;
  width: 50px;
`;

export const IconContainer = styled.View`
  height: 18px;
  width: 18px;
  align-items: center;
  justify-content: center;
`;

export const ViewShotContainer = styled.View`
  width: 100%;
  padding: 0 24px;
  margin: 10% 0;
  background-color: ${Colors.light};
`;
