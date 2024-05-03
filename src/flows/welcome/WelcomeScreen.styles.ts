import styled from 'styled-components/native';
import Colors from '../../styles/colors';

export const Screen = styled.View`
  align-items: center;
  justify-content: flex-start;
  background-color: ${Colors.background.primary};
  padding: 10%;
  height: 100%;
`;

export const Logo = styled.Image`
  width: 200px;
  height: 50px;
  resize-mode: contain;
  flex-direction: row;
`;

export const ContainerImage = styled.View`
  flex: 5;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${Colors.text.primary};
`;

export const Message = styled.Text`
  font-size: 16px;
  color: ${Colors.text.primary};
  margin-bottom: 10px;
`;