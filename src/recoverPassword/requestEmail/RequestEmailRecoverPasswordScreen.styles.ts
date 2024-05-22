import styled from 'styled-components/native';
import Colors from '../../styles/colors';

export const Screen = styled.View`
  align-items: center;
  justify-content: flex-start;
  background-color: ${Colors.light};
  padding: 10%;
  height: 100%;
`;

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: ${Colors.darkblue};
`;

export const Subtitle = styled.Text`
  font-size: 28px;
  color: ${Colors.darkblue};
  margin-top: 10px;
`;

export const BottomWrapper = styled.View`
  flex: 1;
  justify-content: flex-end;
  width: 100%;
`;
