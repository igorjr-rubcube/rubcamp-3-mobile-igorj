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
  width: 250px;
  resize-mode: contain;
`;

export const Container = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;
