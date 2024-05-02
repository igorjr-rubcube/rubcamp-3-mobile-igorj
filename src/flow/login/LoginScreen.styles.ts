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
  font-weight: bold;
  color: ${Colors.text.primary};
`;

export const Message = styled.Text`
  font-size: 16px;
  color: ${Colors.text.primary};
`;

export const Form = styled.View`
  flex: 4;
  width: 100%;
  padding: 0;
`;

export const Field = styled.View`
  margin-bottom: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.text.primary};
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 40px;
`;

export const Label = styled.Text`
  font-size: 16px;
  color: ${Colors.text.primary};
  margin-bottom: 12px;
`;

export const Input = styled.TextInput`
  flex: 1;
  font-size: 18px;
  padding: 0 0 8px 0;
  color: ${Colors.text.primary};
`;

export const IconContainer = styled.TouchableOpacity`
  height: 25px;
  width: 25px;
`;

export const Link = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${Colors.text.tertiary};
`;

export const Button = styled.TouchableOpacity`
  flex: 2;
  align-self: flex-end;
  width: 100%;
  padding: 16px;
  border-radius: 50px;
  background-color: ${Colors.button.primary};
  align-items: center;
  margin-bottom: 20px;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  color: ${Colors.text.secondary};
`;
