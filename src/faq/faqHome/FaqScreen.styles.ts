import styled from 'styled-components/native';
import Colors from '../../styles/colors';

export const Screen = styled.View`
  align-items: center;
  justify-content: flex-start;
  background-color: ${Colors.light};
  height: 100%;
`;

export const IconButton = styled.TouchableOpacity`
  width: 25px;
  height: 25px;
`;

export const FaqView = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  margin: 64px 0;
`;
export const FaqCard = styled.TouchableOpacity`
  width: 90%;
  background-color: ${Colors.light};
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 20px;
  elevation: 5;
`;

export const FaqTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${Colors.darkblue};
  text-align: center;
`;

export const FaqText = styled.Text`
  font-size: 16px;
  color: ${Colors.grey};
`;