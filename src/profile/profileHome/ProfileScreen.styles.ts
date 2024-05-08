import styled from 'styled-components/native';
import Colors from '../../styles/colors';

export const Container = styled.View`
  flex: 1;
  background-color: ${Colors.light};
  align-items: center;
`;

export const ProfilePicture = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: ${Colors.lightpurple};
  align-items: center;
  justify-content: center;
`;

export const ProfilePicText = styled.Text`
  font-size: 42px;
  color: ${Colors.white};
  text-align: center;
`;

export const ProfileName = styled.Text`
  font-size: 22px;
  color: ${Colors.black};
  text-align: center;
  margin-top: 8px;
`;

export const CpfText = styled.Text`
  font-size: 16px;
  color: ${Colors.black};
  font-weight: 400;
  text-align: center;
  margin-bottom: 20px;
`;

export const MenuContainer = styled.View`
  width: 100%;
  flex: 1;
  align-items: center;
`;

export const MenuItem = styled.View`
  width: 350px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
  border-top-width: 1px;
  border-top-color: ${Colors.lightGrey};
`;

export const MenuItemTouchable = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;

export const MenuItemText = styled.Text`
  font-size: 18px;
  color: ${Colors.black};
  font-weight: 400;
`;

export const MenuItemIcon = styled.View`
  width: 18px;
  height: 18px;
`;