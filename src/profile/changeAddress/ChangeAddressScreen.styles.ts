import styled from 'styled-components/native';
import Colors from '../../styles/colors';

export const Container = styled.View`
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;

export const Title = styled.Text`
  text-align: center;
  font-size: 26px;
  font-weight: 400;
  color: ${Colors.grey};
  margin-bottom: 20px;
`;

export const SubtitleWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
`;

export const SubtitleIcon = styled.View`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

export const Subtitle = styled.Text`
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: ${Colors.darkblue};
`;

export const Form = styled.View`
  width: 100%;
  margin-top: 50px;
  padding-left: 20px;
  padding-right: 20px;
`;

export const TopWrapper = styled.View`
  align-items: flex-start;
  justify-content: space-between;
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

