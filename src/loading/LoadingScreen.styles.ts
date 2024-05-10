import styled from 'styled-components/native';
import Colors from '../styles/colors';

export const Screen = styled.View<{background: string}>`
  align-items: center;
  justify-content: flex-start;
  background-color: ${props => props.background};
  padding: 10%;
  height: 100%;
`;

export const Modal = styled.Modal`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const Logo = styled.Image`
  width: 250px;
  resize-mode: contain;
`;

export const Container = styled.View`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const Spinner = styled.ActivityIndicator`
  align-self: center;
`;
