import styled from 'styled-components/native';
import Colors from '../../styles/colors';

export const Container = styled.View`
  flex: 1;
  background-color: ${Colors.white};
`;

export const Content = styled.View`
  flex: 1;
  padding-left: 24px;
  padding-right: 24px;
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
  margin-top: 96px;
`;

export const HighlightedText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${Colors.black};
`;

export const InputContainer = styled.View`
  width: 90%;
  margin-top: 24px;
`;

export const TopWrapper = styled.View`
  width: 100%;
  align-items: center;
`;

export const ButtonContainer = styled.View`
  width: 90%;
  height: 60px;
  justify-content: center;
  align-items: center;
`;
