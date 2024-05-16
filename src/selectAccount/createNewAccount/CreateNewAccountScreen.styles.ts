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

export const SubtitleWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
  margin-top: 12px;
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

export const Form = styled.View`
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
`;

export const FieldWrapper = styled.View`
  align-items: center;
  margin-bottom: 32px;
`;

export const RadioView = styled.View`
  width: 100%;
  margin-top: 12px;
  width: 65%;
  margin-left: 12px;
  align-items: center;
  justify-content: center;
`;

export const RadioField = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  padding-bottom: 16px;
  border-color: ${Colors.darkblue};
`;

export const RadioText = styled.Text`
  font-size: 18px;
  color: ${Colors.grey};
`;

export const RadioButtonCenter = styled.View<{pressed: boolean}>`
  height: 15px;
  width: 15px;
  border-radius: 10px;
  background-color: ${props =>
    props.pressed ? Colors.darkblue : Colors.white};
`;

export const RadioButton = styled.TouchableOpacity`
  height: 25px;
  width: 25px;
  border-radius: 15px;
  border-width: 2px;
  border-color: ${Colors.darkblue};
  align-items: center;
  justify-content: center;
`;
