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

export const Form = styled.View`
  flex: 1;
  margin: 16px 32px;
  justify-content: space-between;
`;

export const Field = styled.View`
  margin-bottom: 16px;
`;

export const BottomWrapper = styled.View`
  flex: 1;
  justify-content: flex-end;
`;