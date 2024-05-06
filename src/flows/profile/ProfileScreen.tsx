import {Text, View} from 'react-native';
import { Background, BottomView, TopView } from '../../components/DefaultScreen/DefaultScreen';

function ProfileScreen() {
  return (
    <Background>
      <TopView>
        <Text>PERFIL</Text>
      </TopView>
      <BottomView>
        <Text>TOMA TEU PERFIL</Text>
      </BottomView>
    </Background>
  );
}

export default ProfileScreen;