import dayjs, {Dayjs} from 'dayjs';
import {useState} from 'react';
import DateTimePicker from 'react-native-ui-datepicker';
import {
  CloseButton,
  CloseButtonText,
  Modal,
  ModalBackground,
  ModalContainer,
} from './DatePickerModal.styles';
import Colors from '../../styles/colors';

type Props = {
  visible: boolean;
  setVisible: (visible: false) => void;
  onDateSelected: (date: Dayjs) => void;
};

function DatePickerModal({visible, setVisible, onDateSelected}: Props) {
  const [date, setDate] = useState<Dayjs>(dayjs());

  const handleDateSelected = () => {
    onDateSelected(date);
    setVisible(false);
  }

  return (
    <Modal transparent={true} visible={visible}>
      <ModalBackground>
        <ModalContainer>
          <DateTimePicker
            mode="single"
            date={date}
            onChange={params => setDate(params.date as Dayjs)}
            calendarTextStyle={{color: Colors.darkblue}}
            headerTextStyle={{color: Colors.darkblue}}
            selectedItemColor={Colors.default}
          />
          <CloseButton onPress={handleDateSelected}>
            <CloseButtonText>SELECIONAR</CloseButtonText>
          </CloseButton>
        </ModalContainer>
      </ModalBackground>
    </Modal>
  );
}

export default DatePickerModal;
