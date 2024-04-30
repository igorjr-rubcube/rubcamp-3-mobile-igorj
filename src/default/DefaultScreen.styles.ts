import styled from 'styled-components/native';
import Colors from '../styles/colors';

export const Screen = styled.View`
  align-items: center;
  justify-content: center;
  background-color: ${Colors.background.primary};
  height: 100%;
`;

export const Logo = styled.Image`
  flex: 2;
  aspect-ratio: 1;
  resize-mode: contain;
`;

export const Title = styled.Text`
  flex: 1;
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 16px;
  color: ${Colors.text.primary};
`;

export const Message = styled.Text`
  flex: 2;
  font-size: 16px;
  color: ${Colors.text.primary};
`;
