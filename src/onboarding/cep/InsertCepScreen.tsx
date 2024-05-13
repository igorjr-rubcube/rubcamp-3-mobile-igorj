import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/RootStack';
import {
  TopWrapper,
  ButtonContainer,
  Container,
  Content,
  HighlightedText,
  InputContainer,
  Title,
} from './InsertCepScreen.styles';
import TextInputField from '../../components/TextInputField/TextInputField';
import {useState} from 'react';
import Button from '../../components/Button/Button';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import cep from 'cep-promise';
import {useDispatch} from 'react-redux';
import {setLoading} from '../../redux/slices/LoadingSlice';
import {setAddressData} from '../../redux/slices/OnboardingSlice';
import Colors from '../../styles/colors';
import AlertIcon from '../../components/icons/AlertIcon';
import DefaultModal from '../../components/DefaultModal/DefaultModal';

const cepMask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'InsertCep'>;
};

function InsertCepScreen({navigation}: Props) {
  const [cepState, setCepState] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleConfirm = async () => {
    dispatch(setLoading(true));
    try {
      const cepResponse = await cep(cepState);
      const addressState = {
        cep: cepResponse.cep,
        street: cepResponse.street || '',
        number: '',
        complement: '',
        neighborhood: cepResponse.neighborhood || '',
        city: cepResponse.city || '',
        state: cepResponse.state || '',
      };
      dispatch(setAddressData(addressState));
      navigation.navigate('InsertAddress');
    } catch (error) {
      setModalVisible(true);
    }
    dispatch(setLoading(false));
  };

  return (
    <>
      <DefaultModal
        visible={modalVisible}
        setVisible={setModalVisible}
        title="Atenção"
        message="Preencha o campo com um CEP válido."
        buttonLabel="TENTAR DE NOVO"
        icon={<AlertIcon fill={Colors.alert} />}
      />
      <Container>
        <Content>
          <TopWrapper>
            <ProgressBar progress={0.28} />
            <Title>
              Agora informe o seu endereço. Qual é o seu
              <HighlightedText> CEP</HighlightedText>?
            </Title>
            <InputContainer>
              <TextInputField
                value={cepState}
                onChangeFunction={setCepState}
                label={''}
                placeholder={''}
                textAlign={'center'}
                mask={cepMask}
                maxLength={9}
              />
            </InputContainer>
          </TopWrapper>
          <ButtonContainer>
            <Button onPress={handleConfirm} text="CONFIRMAR" />
          </ButtonContainer>
        </Content>
      </Container>
    </>
  );
}
export default InsertCepScreen;
