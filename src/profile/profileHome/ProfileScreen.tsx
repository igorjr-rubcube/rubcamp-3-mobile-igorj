import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getUserInfo} from '../../api/profile';
import Button from '../../components/Button/Button';
import {
  Background,
  BottomView,
} from '../../components/DefaultScreen/DefaultScreen';
import RightArrowIcon from '../../components/icons/RightArrowIcon';
import {UserInfoState, setUserInfo} from '../../redux/slices/UserInfoSlice';
import {RootState} from '../../redux/store';
import Colors from '../../styles/colors';
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
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/RootStack';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

function ProfileScreen({navigation}: Props) {
  const userInfo = useSelector((state: RootState) => state.userInfo);
  let profilePicText = userInfo?.fullName
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase();
  profilePicText =
    profilePicText.length > 2 ? profilePicText.slice(0, 2) : profilePicText;

  let fullName = userInfo?.fullName;

  let cpf = userInfo?.cpf;
  cpf = `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(
    9,
  )}`;

  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.token.token);
  const id = useSelector((state: RootState) => state.userId.userId);

  useEffect(() => {
    const fetchData = async () => {
      const userResponse = await getUserInfo(token, id);
      if (userResponse && userResponse.code === 200) {
        const userInfo = userResponse.data as UserInfoState;
        dispatch(setUserInfo(userInfo));
      }
    };
    fetchData();
    return () => {};
  }, []);

  return (
    <Background>
      <BottomView flexSize={1}>
        <Container>
          <ProfilePicture>
            <ProfilePicText>{profilePicText}</ProfilePicText>
          </ProfilePicture>
          <ProfileName>{fullName}</ProfileName>
          <CpfText>CPF: {cpf}</CpfText>
          <Button
            onPress={() => {}}
            text="VER DADOS BANCÁRIOS"
            color="transparent"
            borderColor={Colors.grey}
            textColor={Colors.grey}
          />
          <MenuContainer>
            <MenuItem>
              <MenuItemTouchable
                onPress={() => navigation.navigate('ChangeAppPassword')}>
                <MenuItemText>Alterar senha do App</MenuItemText>
                <MenuItemIcon>
                  <RightArrowIcon />
                </MenuItemIcon>
              </MenuItemTouchable>
            </MenuItem>
            <MenuItem>
              <MenuItemTouchable
                onPress={() => navigation.navigate('ChangeTransactionalPassword')}>
                <MenuItemText>Alterar senha transacional</MenuItemText>
                <MenuItemIcon>
                  <RightArrowIcon fill={Colors.grey} />
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
