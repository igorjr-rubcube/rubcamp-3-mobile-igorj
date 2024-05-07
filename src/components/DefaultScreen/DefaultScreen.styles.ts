import styled from 'styled-components/native';
import Colors from '../../styles/colors';

export const Screen = styled.ImageBackground`
  flex: 1;
`;

export const TopContainer = styled.View<{flexSize: number}>`
  flex: ${props => props.flexSize};
  padding: 20px 25px;
  justify-content: space-between;
  background-color: transparent;
`;

export const BottomContainer = styled.View<{flexSize: number}>`
  flex: ${props => props.flexSize};
  margin-top: ${props => (props.flexSize === 1 ? 70 : 0)}px;
  background-color: ${Colors.darkblue};
`;

export const BackgroundBottom = styled.View`
  background-color: ${Colors.light};
  height: 100%;
  width: 100%;
  padding: 20px 25px;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
`;
