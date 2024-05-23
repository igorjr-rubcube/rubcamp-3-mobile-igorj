import styled from 'styled-components/native';
import Colors from '../../styles/colors';

export const IconButton = styled.TouchableOpacity`
  width: 25px;
  height: 25px;
`;

export const Wrapper = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

export const BalanceWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-size: 18px;
  color: ${Colors.white};
`;

export const Balance = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 90%;
`;

export const BalanceText = styled.Text`
  font-size: 24px;
  color: ${Colors.white};
`;

export const Bottom = styled.View`
  width: 100%;
  margin: 0;
  flex: 8;
`;

export const Content = styled.View`
  flex: 1;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  background-color: ${Colors.white};
  padding: 16px 0;
`;

export const Form = styled.View`
  flex: 1;
  margin: 16px 32px;
  justify-content: space-between;
`;

export const BottomWrapper = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

export const InfoContainer = styled.View`
  flex: 1;
  padding: 0 32px;
`;

export const Info = styled.View`
  align-items: flex-start;
  margin-top: 16px;
`;

export const InfoTitle = styled.Text`
  font-size: 14px;
  color: ${Colors.black};
  margin-bottom: 4px;
`;

export const InfoText = styled.Text`
  font-size: 16px;
  color: ${Colors.grey};
`;

export const Field = styled.View`
  margin-top: 16px;
`;

export const TransferDateView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const SwitchTransferDate = styled.Switch`
`;
