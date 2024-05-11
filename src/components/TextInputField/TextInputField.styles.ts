import styled from 'styled-components/native';
import Colors from '../../styles/colors';
import MaskInput from 'react-native-mask-input';

export const Field = styled.View`
  margin-bottom: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.darkblue};
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 40px;
`;

export const Label = styled.Text<{error: boolean}>`
  font-size: 16px;
  color: ${props => (props.error ? Colors.red : Colors.darkblue)};
  margin-bottom: 12px;
`;

export const Input = styled(MaskInput)<{disabled: boolean; error: boolean}>`
  flex: 1;
  font-size: 18px;
  padding: 0 0 8px 0;
  color: ${props => {
    if (props.disabled) return Colors.disabledText;
    if (props.error) return Colors.red;
    return Colors.darkblue;
  }};
`;

export const IconContainer = styled.TouchableOpacity`
  height: 25px;
  width: 25px;
`;
