import styled from 'styled-components/native';
import Colors from '../../styles/colors';

export const Screen = styled.View`
  align-items: center;
  justify-content: flex-start;
  background-color: ${Colors.background.primary};
  padding: 10%;
  height: 100%;
`;

export const IconContainer = styled.View`
  height: 100px;
  width: 100px;
  margin-bottom: 32px;
`;

export const Container = styled.View`
  flex: 3;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${Colors.text.primary};
`;

export const Message = styled.Text`
  font-size: 18px;
  color: ${Colors.text.primary};
`;
