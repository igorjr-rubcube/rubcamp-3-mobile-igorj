import {
  Background,
  BottomView,
  TopView,
} from '../../components/DefaultScreen/DefaultScreen';
import {
  Container,
  CpfText,
  MenuContainer,
  MenuItem,
  MenuItemIcon,
  MenuItemText,
  MenuItemTouchable,
  ProfileName,
  ProfilePicText,
  ProfilePicture,
} from './ProfileScreen.styles';
import Button from '../../components/Button/Button';
import Colors from '../../styles/colors';
import RightArrowIcon from '../../components/icons/RightArrowIcon';

function ProfileScreen() {
  return (
    <Background>
      <BottomView flexSize={1}>
        <Container>
          <ProfilePicture>
            <ProfilePicText>JS</ProfilePicText>
          </ProfilePicture>
          <ProfileName>João de Souza</ProfileName>
          <CpfText>CPF: 123.456.789-10</CpfText>
          <Button
            onPress={() => {}}
            text="VER DADOS BANCÁRIOS"
            color="transparent"
            borderColor={Colors.grey}
            textColor={Colors.grey}
          />
          <MenuContainer>
            <MenuItem>
              <MenuItemTouchable>
                <MenuItemText>Alterar senha do App</MenuItemText>
                <MenuItemIcon>
                  <RightArrowIcon />
                </MenuItemIcon>
              </MenuItemTouchable>
            </MenuItem>
            <MenuItem>
              <MenuItemTouchable>
                <MenuItemText>Alterar senha transacional</MenuItemText>
                <MenuItemIcon>
                  <RightArrowIcon fill={Colors.grey}/>
                </MenuItemIcon>
              </MenuItemTouchable>
            </MenuItem>
            <MenuItem>
              <MenuItemTouchable>
                <MenuItemText>Alterar endereço</MenuItemText>
                <MenuItemIcon>
                  <RightArrowIcon />
                </MenuItemIcon>
              </MenuItemTouchable>
            </MenuItem>
          </MenuContainer>
        </Container>
      </BottomView>
    </Background>
  );
}

export default ProfileScreen;
