import styled from 'styled-components/native';
import Colors from '../../styles/colors';

export const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
`;

export const Field = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.darkblue};
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 60px;
  height: 60px;
  margin-right: 8px;
  margin-left: 8px;
`;

export const Label = styled.Text`
  font-size: 16px;
  color: ${Colors.darkblue};
  margin-bottom: 8px;
`;

export const Input = styled.TextInput`
  flex: 1;
  font-size: 18px;
  font-weight: bold;
  padding: 0 0 8px 0;
  color: ${Colors.darkblue};
  width: 1%;
  height: 100%;
  text-align: center;
  font-size: 32px;
`;

