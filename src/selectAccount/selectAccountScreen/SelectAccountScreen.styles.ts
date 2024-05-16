import styled from 'styled-components/native';
import Colors from '../../styles/colors';

export const Screen = styled.View`
  height: 100%;
  align-items: center;
  justify-content: space-around;
  background-color: ${Colors.light};
  padding: 10% 0;
`;

export const Scroll = styled.ScrollView`
  width: 100%;
`;

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  background-color: ${Colors.light};
  width: 100%;
  height: 100%;
  padding: 0 40px;
`;

export const Title = styled.Text`
  text-align: center;
  font-size: 26px;
  font-weight: 400;
  color: ${Colors.grey};
`;

export const AccountCard = styled.TouchableOpacity`
  width: 95%;
  height: 200px;
  background-color: ${Colors.light};
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 15px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  margin-top: 24px;
  elevation: 5;
`;

export const AccountField = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const AccountLabel = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${Colors.darkblue};
`;

export const AccountInfo = styled.Text`
  font-size: 18px;
  color: ${Colors.darkblue};
`;
