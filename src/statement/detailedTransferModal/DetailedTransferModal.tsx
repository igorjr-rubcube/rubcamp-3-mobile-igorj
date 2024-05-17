import dayjs from 'dayjs';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {cancelTransfer, getTransferById} from '../../api/transfer';
import ShareIcon from '../../components/icons/ShareIcon';
import {setLoading} from '../../redux/slices/LoadingSlice';
import {RootState} from '../../redux/store';
import Colors from '../../styles/colors';
import {
  ButtonsContainer,
  CancelButton,
  CancelButtonText,
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
  IconContainer,
  ModalBackground,
  ModalContainer,
  ModalTitle,
  ModalView,
  ShareButton,
} from './DetailedTransferModal.styles';

type defaultModalProps = {
  visible: boolean;
  setVisible: any;
  transferId: string;
};

const status = {
  COMPLETED: 'Confirmada',
  SCHEDULED: 'Agendada',
};

interface Transfer {
  date: string;
  amount: string;
  description: string;
  status: string;
  fromAccount: {
    bankName: string;
    branch: string;
    number: string;
    user: {
      fullName: string;
      cpf: string;
    };
  };
  toAccount: {
    bankName: string;
    branch: string;
    number: string;
    user: {
      fullName: string;
      cpf: string;
    };
  };
  operation: string;
}

function DetailedTransferModal({
  visible,
  setVisible,
  transferId,
}: defaultModalProps) {
  const token = useSelector((state: RootState) => state.token.token);
  const userId = useSelector((state: RootState) => state.userId.userId);
  const accountId = useSelector(
    (state: RootState) => state.accountId.accountId,
  );
  const userCpf = useSelector((state: RootState) => state.userInfo.cpf);
  const [transfer, setTransfer] = useState<Transfer>({} as Transfer);

  const loading = useSelector((state: RootState) => state.loading.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    if (!transferId) {
      dispatch(setLoading(false));
      return;
    }
    const fetchTransfer = async () => {
      const response = await getTransferById(
        token,
        userId,
        accountId,
        transferId,
      );
      if (response) {
        if (response.code === 200) {
          setTransfer(response.data);
        }
      }
      dispatch(setLoading(false));
    };
    fetchTransfer();
    return () => {};
  }, [transferId]);

  const handleCancel = async () => {
    dispatch(setLoading(true));
    const response = await cancelTransfer(token, userId, accountId, transferId);
    if (response) {
      if (response.code === 204) {
        setVisible(false);
      }
    }
    dispatch(setLoading(false));
  };


  return (
    <ModalView
      visible={visible}
      animationType="none"
      transparent={true}
      onRequestClose={setVisible}>
      <ModalBackground>
        <ModalContainer>
          <ShareButton onPress={undefined}>
            <IconContainer>
              <ShareIcon fill={Colors.white} />
            </IconContainer>
          </ShareButton>
          {loading ||
            (transferId && transfer.fromAccount && (
              <>
                <ModalTitle>Detalhes:</ModalTitle>
                <DetailsContainer>
                  <DetailsRow>
                    <DetailsTitle>Data:</DetailsTitle>
                    <DetailsValue>
                      {dayjs(transfer.date)
                        .toDate()
                        .toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}
                    </DetailsValue>
                  </DetailsRow>
                  <DetailsRow>
                    <DetailsTitle>Valor:</DetailsTitle>
                    <DetailsValue>
                      {parseFloat(transfer.amount)
                        .toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })
                        .replace('R$', 'RC')}
                    </DetailsValue>
                  </DetailsRow>
                  <DetailsRow>
                    <DetailsTitle>Status:</DetailsTitle>
                    <DetailsValue>
                      {status[transfer.status as keyof typeof status]}
                    </DetailsValue>
                  </DetailsRow>
                  <DetailsRow>
                    <DetailsTitle>Operação:</DetailsTitle>
                    <DetailsValue>
                      {transfer.operation === 'IN' ? 'Entrada' : 'Saída'}
                    </DetailsValue>
                  </DetailsRow>
                  <DetailsRow>
                    <DetailsTitle>Descrição:</DetailsTitle>
                    <DetailsValue>{transfer.description || ''}</DetailsValue>
                  </DetailsRow>
                  <FromToContainer>
                    <FromToTitle>De:</FromToTitle>
                    <DetailsRow>
                      <FromToText>Banco:</FromToText>
                      <FromToValue>{transfer.fromAccount.bankName}</FromToValue>
                    </DetailsRow>
                    <DetailsRow>
                      <FromToText>Agência:</FromToText>
                      <FromToValue>{transfer.fromAccount.branch}</FromToValue>
                    </DetailsRow>
                    <DetailsRow>
                      <FromToText>Conta:</FromToText>
                      <FromToValue>{transfer.fromAccount.number}</FromToValue>
                    </DetailsRow>
                    <DetailsRow>
                      <FromToText>Nome:</FromToText>
                      <FromToValue>
                        {transfer.fromAccount.user.fullName}
                      </FromToValue>
                    </DetailsRow>
                    <DetailsRow>
                      <FromToText>CPF:</FromToText>
                      <FromToValue>
                        {transfer.fromAccount.user.cpf.replace(
                          /(\d{3})(\d{3})(\d{3})(\d{2})/,
                          '$1.$2.$3-$4',
                        )}
                      </FromToValue>
                    </DetailsRow>
                  </FromToContainer>
                  <FromToContainer>
                    <FromToTitle>Para:</FromToTitle>
                    <DetailsRow>
                      <FromToText>Banco:</FromToText>
                      <FromToValue>{transfer.toAccount.bankName}</FromToValue>
                    </DetailsRow>
                    <DetailsRow>
                      <FromToText>Agência:</FromToText>
                      <FromToValue>{transfer.toAccount.branch}</FromToValue>
                    </DetailsRow>
                    <DetailsRow>
                      <FromToText>Conta:</FromToText>
                      <FromToValue>{transfer.toAccount.number}</FromToValue>
                    </DetailsRow>
                    <DetailsRow>
                      <FromToText>Nome:</FromToText>
                      <FromToValue>
                        {transfer.toAccount.user.fullName}
                      </FromToValue>
                    </DetailsRow>
                    <DetailsRow>
                      <FromToText>CPF:</FromToText>
                      <FromToValue>
                        {transfer.toAccount.user.cpf.replace(
                          /(\d{3})(\d{3})(\d{3})(\d{2})/,
                          '$1.$2.$3-$4',
                        )}
                      </FromToValue>
                    </DetailsRow>
                  </FromToContainer>
                </DetailsContainer>
                <ButtonsContainer>
                  {transfer.status === 'SCHEDULED' && (
                    <CancelButton onPress={handleCancel}>
                      <CancelButtonText>CANCELAR</CancelButtonText>
                    </CancelButton>
                  )}
                  <ConfirmButton onPress={setVisible}>
                    <ConfirmButtonText>FECHAR</ConfirmButtonText>
                  </ConfirmButton>
                </ButtonsContainer>
              </>
            ))}
        </ModalContainer>
      </ModalBackground>
    </ModalView>
  );
}

export default DetailedTransferModal;
