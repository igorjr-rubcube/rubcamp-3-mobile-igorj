import styled from 'styled-components/native';
import Colors from '../../styles/colors';

// FIXME - change size of button
export const DefaultButton = styled.TouchableOpacity<{color?: string}>`
  flex: 2;
  align-self: flex-end;
  width: 100%;
  padding: 16px;
  border-radius: 50px;
  background-color: ${props => props.color || Colors.button.primary};
  align-items: center;
  margin-bottom: 20px;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  color: ${Colors.text.secondary};
`;