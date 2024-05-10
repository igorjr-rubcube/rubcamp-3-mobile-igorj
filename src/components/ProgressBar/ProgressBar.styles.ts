import styled from 'styled-components/native';
import Colors from '../../styles/colors';

export const Container = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  height: 5px;
  width: 100%;
  background-color: ${Colors.lightGrey};
`;

export const ProgressBarSize = styled.View<{progress: number}>`
  flex: ${props => props.progress};
  background-color: ${Colors.default};
  height: 5px;
  width: 100%;
`;
