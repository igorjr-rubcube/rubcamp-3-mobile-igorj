import styled from 'styled-components/native';
import Colors from '../../styles/colors';

export const Screen = styled.View`
  align-items: center;
  justify-content: flex-start;
  background-color: ${Colors.light};
  padding: 10%;
  height: 100%;
`;

export const Logo = styled.Image`
  flex: 1;
  width: 200px;
  resize-mode: contain;
  align-self: flex-start;
`;

export const Container = styled.View<{
  flexDirection?: string;
  flexSize: number;
}>`
  flex-direction: ${props => props.flexDirection || 'column'};
  flex: ${props => props.flexSize};
  width: 100%;
  align-items: flex-start;
`;

export const Title = styled.Text`
  font-size: 32px;
  font-weight: 500;
  color: ${Colors.darkblue};
`;

export const Message = styled.Text`
  font-size: 16px;
  color: ${Colors.darkblue};
`;

export const Form = styled.View`
  flex: 4;
  width: 100%;
  padding: 0;
`;

export const Link = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${Colors.lightpurple};
`;
