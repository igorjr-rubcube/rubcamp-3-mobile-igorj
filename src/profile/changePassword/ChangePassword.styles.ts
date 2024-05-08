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
  padding-left: 20px;
  padding-right: 20px;
`;

export const TopWrapper = styled.View`
  align-items: center;
  justify-content: space-between;
`;
