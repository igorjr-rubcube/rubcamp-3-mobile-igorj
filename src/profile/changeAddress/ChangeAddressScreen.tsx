import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useState} from 'react';
import Button from '../../components/Button/Button';
import DefaultModal from '../../components/DefaultModal/DefaultModal';
import {
  Background,
  BottomView,
} from '../../components/DefaultScreen/DefaultScreen';
import TextInputField from '../../components/TextInputField/TextInputField';
import AlertIcon from '../../components/icons/AlertIcon';
import {RootStackParamList} from '../../navigation/RootStack';
import Colors from '../../styles/colors';
import {
  Container,
  Field,
  Form,
  HorizontalWrapper,
  LeftWrapper,
  RightWrapper,
  TopWrapper,
} from './ChangeAddressScreen.styles';
import cep, {CEP} from 'cep-promise';
import {getAddress, updateAddress} from '../../api/address';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {setAddress} from '../../redux/slices/AddressSlice';
import {setLoading} from '../../redux/slices/LoadingSlice';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ChangeAddress'>;
};

const cepMask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

function ChangeAddressScreen({navigation}: Props) {
  const token = useSelector((state: RootState) => state.token.token);
  const id = useSelector((state: RootState) => state.userId.userId);
  const addressState = useSelector((state: RootState) => state.address);
  const dispatch = useDispatch();

  const [cepState, setCepState] = useState(addressState.cep);
  const [street, setStreet] = useState(addressState.street);
  const [number, setNumber] = useState(addressState.number);
  const [complement, setComplement] = useState(addressState.complement);
  const [neighborhood, setNeighborhood] = useState(addressState.neighborhood);
  const [city, setCity] = useState(addressState.city);
  const [state, setState] = useState(addressState.state);

  const [modalInvalidFields, setModalInvalidFields] = useState(false);

  const fieldsDisabledInitialState = {
    number: false,
    complement: false,
    street: true,
    neighborhood: true,
    city: true,
    state: true,
  };

  const [fieldsEnabled, setFieldsEnabled] = useState(
    fieldsDisabledInitialState,
  );

  const enableFields = (response: CEP) => {
    let newFields = {...fieldsEnabled};
    if (response.street === '') {
      newFields.street = false;
    } else {
      newFields.street = true;
    }
    if (response.neighborhood === '') {
      newFields.neighborhood = false;
    } else {
      newFields.neighborhood = true;
    }
    if (response.city === '') {
      newFields.city = false;
    } else {
      newFields.city = true;
    }
    if (response.state === '') {
      newFields.state = false;
    } else {
      newFields.state = true;
    }
    setFieldsEnabled(newFields);
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

  const updateCep = async (text: string) => {
    setCepState(text);
    if (text.length === 9) {
      try {
        const response = await cep(text);
        if (response) {
          setNumber('');
          setComplement('');
          setStreet(response.street);
          setNeighborhood(response.neighborhood);
          setCity(response.city);
          setState(response.state);
          enableFields(response);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleAddressChange = async () => {
    const newAddress = {
      cep: cepState,
      street: street,
      number: number,
      complement: complement,
      neighborhood: neighborhood,
      city: city,
      state: state,
    };
    dispatch(setLoading(true));
    const updatedAddressResponse = await updateAddress(token, id, newAddress);
    if (updatedAddressResponse && updatedAddressResponse.code === 204) {
      navigation.navigate({
        name: 'Success',
        params: {
          title: 'Alteração realizada',
          message: 'Seu endereço foi atualizado com sucesso!',
          navigateTo: 'Profile',
        },
      });
      dispatch(setAddress(newAddress));
      dispatch(setLoading(false));
    } else {
      setModalInvalidFields(true);
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const address = await getAddress(token, id);
      if (address && address.code === 200) {
        dispatch(setAddress(address.data));
      }
    };
    fetchData();
    return () => {};
  }, []);

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
        title="Dados inválidos"
        message="Por favor, verifique os dados inseridos e tente novamente."
        hasButton={true}
        buttonLabel="TENTAR DE NOVO"
      />
      <Background>
        <BottomView flexSize={1}>
          <Container>
            <Form>
              <TopWrapper>
                <Field>
                  <TextInputField
                    label="CEP"
                    placeholder=""
                    value={cepState}
                    onChangeFunction={updateCep}
                    maxLength={9}
                    inputMode={'numeric'}
                    mask={cepMask}
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
              </TopWrapper>
            </Form>
            <Button
              onPress={handleAddressChange}
              disabled={isButtonDisabled()}
              text={'CONFIRMAR'}
            />
          </Container>
        </BottomView>
      </Background>
    </>
  );
}

export default ChangeAddressScreen;
