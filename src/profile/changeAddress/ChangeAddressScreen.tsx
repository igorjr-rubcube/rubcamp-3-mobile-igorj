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
import cep, { CEP } from 'cep-promise';
import {getAddress} from '../../api/address';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import { setAddress } from '../../redux/slices/AddressSlice';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ChangeAddress'>;
};

const cepMask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

function ChangeAddressScreen({navigation}: Props) {
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

  const [cepState, setCepState] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

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
    return false;
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

  const token = useSelector((state: RootState) => state.token.token);
  const id = useSelector((state: RootState) => state.userId.userId);
  const addressState = useSelector((state: RootState) => state.address);
  const dispatch = useDispatch();

  const handleAddressChange = async () => {};

  useEffect(() => {
    if (addressState) {
      
    }
    const fetchData = async () => {
      const address = await getAddress(token, id);
      setCepState(address?.data.cep);
      if (address && address.code === 200) {
        setStreet(address.data.street);
        setNumber(address.data.number);
        setComplement(address.data.complement);
        setNeighborhood(address.data.neighborhood);
        setCity(address.data.city);
        setState(address.data.state);
        dispatch(setAddress(address.data));
        console.log('here');
      }
    };
    fetchData();
  }, []);

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
