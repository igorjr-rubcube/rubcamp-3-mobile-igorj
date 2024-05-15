import styled from 'styled-components/native';
import Colors from '../../styles/colors';

export const IconButton = styled.TouchableOpacity`
  width: 25px;
  height: 25px;
`;

export const Wrapper = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

export const BalanceWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-size: 18px;
  color: ${Colors.white};
`;

export const Balance = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 90%;
`;

export const BalanceText = styled.Text`
  font-size: 24px;
  color: ${Colors.white};
`;

export const Bottom = styled.View`
  width: 100%;
  margin: 0;
  flex: 8;
`;

export const Content = styled.View`
  flex: 1;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  background-color: ${Colors.white};
  padding: 16px 0;
`;

export const TabsWrapper = styled.View`
  flex-direction: row;
  justify-content: space-around;
  border-bottom-width: 2px;
  border-bottom-color: ${Colors.lightGrey};
  padding: 0 16px;
`;

export const Tab = styled.TouchableOpacity<{selected: boolean}>`
  border-bottom-width: 4px;
  border-bottom-color: ${props =>
    props.selected ? Colors.default : 'transparent'};
  padding-bottom: 16px;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  position: relative;
  top: 3px;
`;

export const TabText = styled.Text<{selected: boolean}>`
  font-size: 18px;
  color: ${props => (props.selected ? Colors.default : Colors.grey)};
`;

export const TransfersContainer = styled.ScrollView`
  padding: 0 24px;
`;

export const DateWrapper = styled.View`
  justify-content: space-between;
  padding: 0 16px;
  margin-top: 16px;
`;

export const DateText = styled.Text`
  font-size: 18px;
  color: ${Colors.grey};
`;

export const Transfer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  margin-bottom: 8px;
`;

export const TransferIcon = styled.View`
  width: 35px;
  height: 35px;
  margin-top: 7px;
`;

export const LeftWrapper = styled.View`
  flex-direction: row;
  align-items: flex-start;
  flex: 1.5;
`;

export const RightWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
`;

export const TextWrapper = styled.View`
  padding-left: 16px;
`;

export const TransferTitle = styled.Text`
  font-size: 16px;
  color: ${Colors.black};
  font-weight: bold;
`;

export const TransferSubtitle = styled.Text`
  font-size: 12px;
  font-weight: 500;
  color: ${Colors.lightGrey};
`;

export const TransferValue = styled.Text<{color: string}>`
  font-size: 18px;
  font-weight: bold;
  color: ${props => props.color};
`;

export const TransferEndText = styled.Text`
  font-size: 14px;
  color: ${Colors.grey};
  text-align: center;
  margin-top: 24px;
`;

export const TransferNull = styled.View`
  height: 90%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const TransferNullText = styled.Text`
  width: 50%;
  text-align: center;
  font-size: 16px;
  color: ${Colors.grey};
`;

export const TransferNullIcon = styled.View`
  width: 60px;
  height: 60px;
  margin-top: 16px;
`;
