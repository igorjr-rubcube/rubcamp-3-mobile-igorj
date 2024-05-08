import styled from 'styled-components/native';
import Colors from '../../styles/colors';

export const ModalView = styled.Modal`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ModalBackground = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  background-color: ${Colors.white};
`;

export const TopWrapper = styled.View`
  width: 100%;
  padding-top: 15px;
  padding-left: 30px;
  padding-right: 30px;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: ${Colors.black};
  margin-bottom: 20px;
  align-self: center;
`;

export const Subtitle = styled.Text`
  align-self: center;

  font-size: 18px;
  color: ${Colors.black};
  margin-bottom: 20px;
`;

export const RuleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  max-width: 80%;
  margin-bottom: 40px;
`;

export const RuleText = styled.Text`
  font-size: 18px;
  color: ${Colors.black};
  margin-left: 20px;
  box-sizing: border-box;
`;

export const RuleIcon = styled.View`
  width: 20px;
  height: 20px;
`;

export const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  left: 20px;
  height: 20px;
  width: 20px;
  align-items: center;
  justify-content: center;
`;
