import styled from 'styled-components/native';
import Colors from '../../styles/colors';

export const DefaultButton = styled.TouchableOpacity<{color?: string, borderColor?: string}>`
  flex: 2;
  width: 100%;
  align-self: center;
  max-height: 55px;
  max-width: 350px;
  padding: 16px;
  border-radius: 50px;
  align-items: center;
  background-color: ${props => props.color || Colors.darkblue};
  border: ${props => props.borderColor ? "1.5px solid " + props.borderColor : "none"};
`;

export const ButtonText = styled.Text<{textColor?: string}>`
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.textColor || Colors.white};
`;