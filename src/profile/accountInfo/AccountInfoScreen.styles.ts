import styled from 'styled-components/native';
import Colors from '../../styles/colors';

export const Container = styled.View`
  flex: 1;
  background-color: ${Colors.light};
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

export const TopWrapper = styled.View`
  width: 100%;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: ${Colors.grey};
`;

export const Highlight = styled.Text`
  font-size: 20px;
  color: ${Colors.grey};
  font-weight: bold;
`;

export const AccountInfoContainer = styled.View`
  margin-top: 24px;
  width: 100%;
`;

export const AccountInfoField = styled.View`
  margin-bottom: 22px;
`;

export const AccountInfoRow = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const AccountInfoLabel = styled.Text`
  font-size: 16px;
  color: ${Colors.black};
`;

export const AccountInfoText = styled.Text`
  font-size: 20px;
  color: ${Colors.grey};
  margin-top: 5px;
`;

export const CopyButton = styled.TouchableOpacity`
  margin-left: 10px;
  width: 36px;
  height: 48px;
  align-items: center;
  justify-content: center;
`;

export const CopyIconView = styled.View`
  width: 22px;
  height: 22px;
`;

export const CopyText = styled.Text`
  font-size: 12px;
  color: ${Colors.default};
  margin-top: 5px;
`;
