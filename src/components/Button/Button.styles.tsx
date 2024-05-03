import styled from 'styled-components/native';
import Colors from '../../styles/colors';

export const DefaultButton = styled.TouchableOpacity<{color?: string}>`
  flex: 2;
  align-self: flex-end;
  width: 100%;
  max-height: 55px;
  max-width: 350px;
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