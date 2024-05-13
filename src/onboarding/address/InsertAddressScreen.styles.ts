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

export const HighlightedText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${Colors.black};
`;

export const HorizontalWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const LeftWrapper = styled.View<{flex: number}>`
  flex: ${props => props.flex};
  margin-right: 10px;
`;

export const RightWrapper = styled.View<{flex: number}>`
  flex: ${props => props.flex};
  margin-left: 10px;
`;

export const Field = styled.View`
  margin-bottom: 20px;
`;
