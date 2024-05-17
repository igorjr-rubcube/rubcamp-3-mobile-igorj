import dayjs, {Dayjs} from 'dayjs';
import {useState} from 'react';
import Button from '../../components/Button/Button';
import DatePickerModal from '../../components/DatePicker/DatePickerModal';
import DropdownArrowIcon from '../../components/icons/DropdownArrowIcon';
import XIcon from '../../components/icons/XIcon';
import Colors from '../../styles/colors';
import {
  BottomWrapper,
  ButtonsWrapper,
  CleanButton,
  CleanButtonText,
  CloseButton,
  Container,
  DateButton,
  DateButtonText,
  Dropdown,
  DropdownIconView,
  DropdownText,
  Field,
  FilterRule,
  FilterRuleText,
  ModalBackground,
  ModalView,
  OrderText,
  PeriodPicker,
  RadioButton,
  RadioButtonCenter,
  RadioField,
  RadioText,
  RadioView,
  Title,
  TopWrapper,
} from './FilterModal.styles';
import TextInputField from '../../components/TextInputField/TextInputField';

interface SafePasswordModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  filterFunction: (
    period: number,
    initialDate: string,
    finalDate: string,
    order: string,
  ) => void;
}

function FilterModal({
  visible,
  setVisible,
  filterFunction,
}: SafePasswordModalProps) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [modalDateInitialVisible, setModalDateInitialVisible] = useState(false);
  const [modalDateFinalVisible, setModalDateFinalVisible] = useState(false);
  const [periodSelected, setPeriodSelected] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [orderSelected, setOrderSelected] = useState([false, false]);

  const [initialDate, setInitialDate] = useState<Dayjs>(dayjs());
  const [finalDate, setFinalDate] = useState<Dayjs>(dayjs());

  const handlePeriod = (index: number) => {
    const newPeriodSelected = [false, false, false, false];
    newPeriodSelected[index] = true;
    setPeriodSelected(newPeriodSelected);
  };

  const handleOrder = (index: number) => {
    const newOrderSelected = [false, false];
    newOrderSelected[index] = true;
    setOrderSelected(newOrderSelected);
  };

  const handleContinue = () => {
    const period = periodSelected.findIndex(value => value);
    const order =
      orderSelected.findIndex(value => value) === 0 ? 'asc' : 'desc';
    filterFunction(
      period,
      initialDate.format('YYYY-MM-DD'),
      finalDate.format('YYYY-MM-DD'),
      order,
    );
    setVisible(false);
  };

  const handleClean = () => {
    setPeriodSelected([false, false, false, false]);
    setOrderSelected([false, false]);
    setInitialDate(dayjs());
    setFinalDate(dayjs());
    filterFunction(
      -1,
      dayjs().format('YYYY-MM-DD'),
      dayjs().format('YYYY-MM-DD'),
      'desc',
    );
    setVisible(false);
  };

  return (
    <>
      <DatePickerModal
        visible={modalDateInitialVisible}
        setVisible={setModalDateInitialVisible}
        onDateSelected={(date: Dayjs) => {
          setInitialDate(date);
        }}
      />
      <DatePickerModal
        visible={modalDateFinalVisible}
        setVisible={setModalDateFinalVisible}
        onDateSelected={(date: Dayjs) => {
          setFinalDate(date);
        }}
      />
      <ModalView transparent={true} visible={visible} animationType="slide">
        <ModalBackground>
          <TopWrapper>
            <CloseButton onPress={() => setVisible(false)}>
              <XIcon fill={Colors.black} />
            </CloseButton>
            <Title>Filtro</Title>
            <Container>
              <FilterRule>Período</FilterRule>
              <FilterRuleText>
                Período máximo de 90 dias a partir da data inicial
              </FilterRuleText>
              <ButtonsWrapper>
                <DateButton
                  onPress={() => handlePeriod(0)}
                  selected={periodSelected[0]}>
                  <DateButtonText>15 dias</DateButtonText>
                </DateButton>
                <DateButton
                  onPress={() => handlePeriod(1)}
                  selected={periodSelected[1]}>
                  <DateButtonText>30 dias</DateButtonText>
                </DateButton>
                <DateButton
                  onPress={() => handlePeriod(2)}
                  selected={periodSelected[2]}>
                  <DateButtonText>60 dias</DateButtonText>
                </DateButton>
                <DateButton
                  onPress={() => handlePeriod(3)}
                  selected={periodSelected[3]}>
                  <DateButtonText>90 dias</DateButtonText>
                </DateButton>
              </ButtonsWrapper>
              <Dropdown onPress={() => setDropdownVisible(!dropdownVisible)}>
                <DropdownText>outros períodos</DropdownText>
                <DropdownIconView>
                  <DropdownArrowIcon
                    fill={Colors.black}
                    style={{
                      transform: [
                        {rotate: dropdownVisible ? '180deg' : '0deg'},
                      ],
                    }}
                  />
                </DropdownIconView>
              </Dropdown>
              {dropdownVisible && (
                <PeriodPicker>
                  <Field>
                    <TextInputField
                      label="Data inicial"
                      value={initialDate.toDate().toLocaleDateString('pt-BR')}
                      onChangeFunction={setInitialDate}
                      placeholder={''}
                      showInput={false}
                      onFocus={() => setModalDateInitialVisible(true)}
                    />
                  </Field>
                  <Field>
                    <TextInputField
                      label="Data final"
                      value={finalDate.toDate().toLocaleDateString('pt-BR')}
                      onChangeFunction={setFinalDate}
                      placeholder={''}
                      showInput={false}
                      onFocus={() => setModalDateFinalVisible(true)}
                    />
                  </Field>
                </PeriodPicker>
              )}
              <OrderText>Por Ordem</OrderText>
              <RadioView>
                <RadioField style={{borderBottomWidth: 1}}>
                  <RadioText>Mais antigos</RadioText>
                  <RadioButton onPress={() => handleOrder(0)}>
                    <RadioButtonCenter
                      pressed={orderSelected[0]}></RadioButtonCenter>
                  </RadioButton>
                </RadioField>
                <RadioField>
                  <RadioText>Mais novos</RadioText>
                  <RadioButton onPress={() => handleOrder(1)}>
                    <RadioButtonCenter
                      pressed={orderSelected[1]}></RadioButtonCenter>
                  </RadioButton>
                </RadioField>
              </RadioView>
            </Container>
          </TopWrapper>
          <BottomWrapper>
            <Button onPress={handleContinue} text={'CONTINUAR'} />
            <CleanButton onPress={handleClean}>
              <CleanButtonText>Limpar Filtro</CleanButtonText>
            </CleanButton>
          </BottomWrapper>
        </ModalBackground>
      </ModalView>
    </>
  );
}

export default FilterModal;
