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
  margin-top: 24px;
`;

export const FieldWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
`;

export const AccountTypeContainer = styled.View<{
  isPressed: boolean;
}>`
  width: 18px;
  height: 18px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  background-color: ${props =>
    props.isPressed ? Colors.darkblue : Colors.white};
`;

export const AccountSelection = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.white};
`;

export const AccountSelectionBorder = styled.View`
  width: 34px;
  height: 34px;
  border-radius: 17px;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.darkblue};
  elevation: 5;
`;

export const AccountTypeText = styled.Text`
  font-size: 22px;
  font-weight: 500;
  color: ${Colors.grey};
  margin-left: 24px;
`;

export const AccountTypeIconContainer = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
  margin-left: 12px;
`;
