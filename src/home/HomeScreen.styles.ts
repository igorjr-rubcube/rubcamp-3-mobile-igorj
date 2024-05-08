import styled from 'styled-components/native';
import Colors from '../styles/colors';

export const IconButton = styled.TouchableOpacity`
  width: 25px;
  height: 25px;
`;

export const IconButtonTopBar = styled(IconButton)`
  margin-left: 12px;
`;

export const TopBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const RightWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 18px;
  color: ${Colors.white};
`;

export const BalanceWrapper = styled.View`
`;

export const Balance = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const BalanceText = styled.Text`
  font-size: 24px;
  color: ${Colors.white};
`;

export const BalanceHidden = styled.View``;

export const Image = styled.Image`
  width: 150px;
  height: 40px;
  resize-mode: contain;
`;

export const TabRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const TabButton = styled.TouchableOpacity`
  height: 100px;
  width: 48%;
  margin-bottom: 4%;
  justify-content: space-between;
  align-items: flex-start;
  padding: 12px 10px;
  background-color: ${Colors.light};
  border-radius: 10px;
  elevation: 5;
`;

export const TabButtonText = styled.Text`
  font-size: 18px;
  color: ${Colors.darkblue};
`;
