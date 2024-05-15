import React from 'react';
import {
  CloseButton,
  CloseButtonText,
  ConfirmButton,
  ConfirmButtonText,
  DetailsContainer,
  DetailsRow,
  DetailsTitle,
  DetailsValue,
  FromToContainer,
  FromToText,
  FromToTitle,
  FromToValue,
  ModalBackground,
  ModalContainer,
  ModalTitle,
  ModalView
} from './DetailedTransferModal.styles';

type defaultModalProps = {
  visible: boolean;
  setVisible: any;
};

function DetailedTransferModal({visible, setVisible}: defaultModalProps) {
  return (
    <ModalView
      visible={visible}
      animationType="none"
      transparent={true}
      onRequestClose={setVisible}>
      <ModalBackground>
        <ModalContainer>
          <CloseButton onPress={setVisible}>
            <CloseButtonText>x</CloseButtonText>
          </CloseButton>
          <ModalTitle>Detalhes:</ModalTitle>
          <DetailsContainer>
            <DetailsRow>
              <DetailsTitle>Data:</DetailsTitle>
              <DetailsValue>01/01/2021</DetailsValue>
            </DetailsRow>
            <DetailsRow>
              <DetailsTitle>Valor:</DetailsTitle>
              <DetailsValue>RC 10,00</DetailsValue>
            </DetailsRow>
            <DetailsRow>
              <DetailsTitle>Status:</DetailsTitle>
              <DetailsValue>Confirmada</DetailsValue>
            </DetailsRow>
            <DetailsRow>
              <DetailsTitle>Operação:</DetailsTitle>
              <DetailsValue>Entrada</DetailsValue>
            </DetailsRow>
            <FromToContainer>
              <FromToTitle>De:</FromToTitle>
              <DetailsRow>
                <FromToText>Banco:</FromToText>
                <FromToValue>Rubbank</FromToValue>
              </DetailsRow>
              <DetailsRow>
                <FromToText>Agência:</FromToText>
                <FromToValue>0001</FromToValue>
              </DetailsRow>
              <DetailsRow>
                <FromToText>Conta:</FromToText>
                <FromToValue>123456</FromToValue>
              </DetailsRow>
              <DetailsRow>
                <FromToText>Nome:</FromToText>
                <FromToValue>João da Silva</FromToValue>
              </DetailsRow>
              <DetailsRow>
                <FromToText>CPF:</FromToText>
                <FromToValue>123.456.789-00</FromToValue>
              </DetailsRow>
            </FromToContainer>
            <FromToContainer>
              <FromToTitle>Para:</FromToTitle>
              <DetailsRow>
                <FromToText>Banco:</FromToText>
                <FromToValue>Bank of Rub</FromToValue>
              </DetailsRow>
              <DetailsRow>
                <FromToText>Agência:</FromToText>
                <FromToValue>0002</FromToValue>
              </DetailsRow>
              <DetailsRow>
                <FromToText>Conta:</FromToText>
                <FromToValue>654321</FromToValue>
              </DetailsRow>
              <DetailsRow>
                <FromToText>Nome:</FromToText>
                <FromToValue>Maria da Silva</FromToValue>
              </DetailsRow>
              <DetailsRow>
                <FromToText>CPF:</FromToText>
                <FromToValue>987.654.321-00</FromToValue>
              </DetailsRow>
            </FromToContainer>
          </DetailsContainer>
          <ConfirmButton onPress={setVisible}>
            <ConfirmButtonText>FECHAR</ConfirmButtonText>
          </ConfirmButton>
        </ModalContainer>
      </ModalBackground>
    </ModalView>
  );
}

export default DetailedTransferModal;
