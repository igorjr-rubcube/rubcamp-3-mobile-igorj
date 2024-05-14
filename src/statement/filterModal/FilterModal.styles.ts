import styled from 'styled-components/native';
import Colors from '../../styles/colors';

export const ModalView = styled.Modal`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ModalBackground = styled.View`
  top: 15px;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: ${Colors.white};
  padding-bottom: 24px;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
`;

export const TopWrapper = styled.View`
  width: 100%;
  padding-top: 15px;
  padding-left: 30px;
  padding-right: 30px;
  align-items: center;
`;

export const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  left: 20px;
  height: 20px;
  width: 20px;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: ${Colors.black};
  align-self: center;
`;

export const Container = styled.View`
  width: 100%;
  margin-top: 48px;
  align-items: flex-start;
  padding: 0 12px;
`;

export const FilterRule = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${Colors.grey};
`;

export const FilterRuleText = styled.Text`
  font-size: 18px;
  color: ${Colors.grey};
`;

export const ButtonsWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const DateButton = styled.TouchableOpacity<{selected: boolean}>`
  width: 68px;
  height: 68px;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
  border-width: 1.5px;
  border-color: ${Colors.lightGrey};
  background-color: ${props => props.selected ? Colors.default : Colors.white};
  border-radius: 10px;
`;

export const DateButtonText = styled.Text`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: ${Colors.black};
`;

export const Dropdown = styled.TouchableOpacity`
  flex-direction: row;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

export const DropdownText = styled.Text`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: ${Colors.orange};
`;

export const DropdownIconView = styled.View`
  margin-left: 8px;
  width: 18px;
  height: 18px;
`;

export const PeriodPicker = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;

export const Field = styled.View`
  width: 45%;
`;

export const OrderText = styled.Text`
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  color: ${Colors.grey};
`;

export const BottomWrapper = styled.View`
  width: 100%;
  height: 100px;
  margin-bottom: 16px;
`;

export const CleanButton = styled.TouchableOpacity`
  height: 50px;
  padding: 0 20px;
  align-items: center;
  justify-content: center;
`;

export const CleanButtonText = styled.Text`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: ${Colors.orange};
`;

export const RadioView = styled.View`
  width: 100%;
  margin-top: 12px;
`;

export const RadioField = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  padding-bottom: 16px;
  border-color: ${Colors.darkblue};
`;

export const RadioText = styled.Text`
  font-size: 18px;
  color: ${Colors.grey};
`; 

export const RadioButtonCenter = styled.View<{pressed: boolean}>`
  height: 15px;
  width: 15px;
  border-radius: 10px;
  background-color: ${props => props.pressed ? Colors.darkblue : Colors.white};
`;

export const RadioButton = styled.TouchableOpacity`
  height: 25px;
  width: 25px;
  border-radius: 15px;
  border-width: 2px;
  border-color: ${Colors.darkblue};
  align-items: center;
  justify-content: center;
`;
