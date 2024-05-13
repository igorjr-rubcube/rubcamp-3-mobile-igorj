import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {validateAddress} from '../../api/onboarding';
import DefaultModal from '../../components/DefaultModal/DefaultModal';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import TextInputField from '../../components/TextInputField/TextInputField';
import AlertIcon from '../../components/icons/AlertIcon';
import {RootStackParamList} from '../../navigation/RootStack';
import {setLoading} from '../../redux/slices/LoadingSlice';
import {setAddressData} from '../../redux/slices/OnboardingSlice';
import {RootState} from '../../redux/store';
import Colors from '../../styles/colors';
import {
  Container,
  Content,
  Field,
  HighlightedText,
  HorizontalWrapper,
  LeftWrapper,
  RightWrapper,
  Title,
} from './InsertAddressScreen.styles';
import {ButtonContainer} from '../cep/InsertCepScreen.styles';
import Button from '../../components/Button/Button';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'InsertAddress'>;
};

const cepMask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

function InsertAddressScreen({navigation}: Props) {
  const addressState = useSelector(
    (state: RootState) => state.onboarding.addressData,
  );
  const dispatch = useDispatch();

  const [cepState, setCepState] = useState(addressState.cep);
  const [street, setStreet] = useState(addressState.street);
  const [number, setNumber] = useState(addressState.number);
  const [complement, setComplement] = useState(addressState.complement);
  const [neighborhood, setNeighborhood] = useState(addressState.neighborhood);
  const [city, setCity] = useState(addressState.city);
  const [state, setState] = useState(addressState.state);

  const [modalInvalidFields, setModalInvalidFields] = useState(false);

  const fieldsEnabled = {
    cep: true,
    number: false,
    complement: false,
    street: true,
    neighborhood: true,
    city: true,
    state: true,
  };

  const isButtonDisabled = () => {
    return (
      cepState === '' ||
      street === '' ||
      number === '' ||
      neighborhood === '' ||
      city === '' ||
      state === ''
    );
  };

  const handleConfirm = async () => {
    dispatch(setLoading(true));
    const newAddress = {
      cep: cepState,
      street: street,
      number: number,
      complement: complement,
      neighborhood: neighborhood,
      city: city,
      state: state,
    };
    const response = await validateAddress(newAddress);
    if (response) {
      if (response.code === 204) {
        dispatch(setAddressData(newAddress));
        navigation.navigate('InsertAppPassword');
      } else {
        setModalInvalidFields(true);
      }
    }
    dispatch(setLoading(false));
  };

  useEffect(() => {
    setCepState(addressState.cep);
    setStreet(addressState.street);
    setNumber(addressState.number);
    setComplement(addressState.complement);
    setNeighborhood(addressState.neighborhood);
    setCity(addressState.city);
    setState(addressState.state);
  }, [addressState]);

  return (
    <>
      <DefaultModal
        visible={modalInvalidFields}
        setVisible={setModalInvalidFields}
        icon={<AlertIcon fill={Colors.alert} />}
        title="Atenção"
        message="Preencha todos os campos corretamente"
        hasButton={true}
        buttonLabel="TENTAR DE NOVO"
      />
      <Container>
        <Content>
          <ProgressBar progress={0.43} />
          <Title>
            Preencha o <HighlightedText>número</HighlightedText> e o{' '}
            <HighlightedText>complemento</HighlightedText>.
          </Title>
          <Field>
            <TextInputField
              label="CEP"
              placeholder=""
              value={cepState}
              onChangeFunction={setCepState}
              maxLength={9}
              inputMode={'numeric'}
              mask={cepMask}
              disabled={fieldsEnabled.cep}
            />
          </Field>
          <Field>
            <TextInputField
              label="Endereço"
              placeholder=""
              value={street}
              onChangeFunction={setStreet}
              disabled={fieldsEnabled.street}
            />
          </Field>
          <HorizontalWrapper>
            <LeftWrapper flex={1}>
              <TextInputField
                label="Número"
                placeholder=""
                value={number}
                onChangeFunction={setNumber}
                disabled={fieldsEnabled.number}
              />
            </LeftWrapper>
            <RightWrapper flex={1}>
              <TextInputField
                label="Complemento"
                placeholder=""
                value={complement}
                onChangeFunction={setComplement}
                disabled={fieldsEnabled.complement}
              />
            </RightWrapper>
          </HorizontalWrapper>
          <Field>
            <TextInputField
              label="Bairro"
              placeholder=""
              value={neighborhood}
              onChangeFunction={setNeighborhood}
              disabled={fieldsEnabled.neighborhood}
            />
          </Field>
          <HorizontalWrapper>
            <LeftWrapper flex={4}>
              <TextInputField
                label="Cidade"
                placeholder=""
                value={city}
                onChangeFunction={setCity}
                disabled={fieldsEnabled.city}
              />
            </LeftWrapper>
            <RightWrapper flex={1}>
              <TextInputField
                label="UF"
                placeholder=""
                value={state}
                onChangeFunction={setState}
                disabled={fieldsEnabled.state}
              />
            </RightWrapper>
          </HorizontalWrapper>
          <ButtonContainer>
            <Button
              onPress={handleConfirm}
              text="CONFIRMAR"
              disabled={isButtonDisabled()}
            />
          </ButtonContainer>
        </Content>
      </Container>
    </>
  );
}

export default InsertAddressScreen;
