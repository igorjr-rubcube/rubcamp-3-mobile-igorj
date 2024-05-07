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

export const Label = styled.Text`
  font-size: 16px;
  color: ${Colors.darkblue};
  margin-bottom: 12px;
`;

export const Input = styled(MaskInput)`
  flex: 1;
  font-size: 18px;
  padding: 0 0 8px 0;
  color: ${Colors.darkblue};
`;

export const IconContainer = styled.TouchableOpacity`
  height: 25px;
  width: 25px;
`;