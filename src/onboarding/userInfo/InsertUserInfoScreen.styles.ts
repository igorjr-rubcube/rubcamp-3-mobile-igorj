import styled from 'styled-components/native';
import Colors from '../../styles/colors';

export const Container = styled.View`
  flex: 1;
  background-color: ${Colors.white};
`;

export const Content = styled.View`
  flex: 1;
  padding-left: 36px;
  padding-right: 36px;
  padding-bottom: 24px;
  padding-top: 48px;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: 400;
  color: ${Colors.black};
  text-align: center;
  width: 300px;
  margin-top: 18px;
`;

export const InputContainer = styled.View`
  width: 100%;
  margin-top: 36px;
`;

export const TopWrapper = styled.View`
  width: 100%;
  align-items: center;
`;

export const ButtonContainer = styled.View`
  width: 100%;
  height: 60px;
  justify-content: center;
  align-items: center;
`;
