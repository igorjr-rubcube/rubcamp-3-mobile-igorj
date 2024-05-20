import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootStackParamList} from '../../navigation/RootStack';
import {RootState} from '../../redux/store';
import {
  AccountCard,
  AccountField,
  AccountInfo,
  AccountLabel,
  Container,
  Screen,
  Scroll,
  Title,
} from './SelectAccountScreenToTransfer.styles';
import {RouteProp} from '@react-navigation/native';
import {setSelectedAccount} from '../../redux/slices/TransferSlice';
import DefaultModal from '../../components/DefaultModal/DefaultModal';
import Colors from '../../styles/colors';
import AlertIcon from '../../components/icons/AlertIcon';

type Props = {
  navigation: StackNavigationProp<
    RootStackParamList,
    'SelectAccountToTransfer'
  >;
  route: RouteProp<RootStackParamList, 'SelectAccountToTransfer'>;
};

function SelectAccountToTransferScreen({navigation, route}: Props) {
  let accountsTo = [...route.params.accounts];
  const dispatch = useDispatch();
  const accountId = useSelector(
    (state: RootState) => state.accountId.accountId,
  );
  const accountsFrom = useSelector(
    (state: RootState) => state.accounts.accounts,
  );


  const handleSelectAccount = (accountIndex: number) => {
    dispatch(setSelectedAccount(accountsTo[accountIndex]));
    navigation.navigate('InsertAmount');
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {    
    if (accountsTo.length === 1) {
      dispatch(setSelectedAccount(accountsTo[0]));
      navigation.navigate('InsertAmount');
    }
  }, []);

  return (
    <>
      <DefaultModal
        visible={modalVisible}
        setVisible={() => {
          setModalVisible(false);
          navigation.goBack();
        }}
        title="Atenção"
        message={modalMessage}
        buttonLabel="VOLTAR"
        icon={<AlertIcon fill={Colors.alert} />}
      />
      <Screen>
        <Title></Title>
        <Scroll>
          <Container>
            {accountsTo.map((account, index) => (
              <AccountCard
                key={account.number}
                onPress={() => handleSelectAccount(index)}>
                <AccountField>
                  <AccountLabel>CONTA: </AccountLabel>
                  <AccountInfo>
                    {index + 1} de {accountsTo.length}
                  </AccountInfo>
                </AccountField>
                <AccountField>
                  <AccountLabel>AGÊNCIA: </AccountLabel>
                  <AccountInfo>{account.branch}</AccountInfo>
                </AccountField>
                <AccountField>
                  <AccountLabel>Nº DA CONTA: </AccountLabel>
                  <AccountInfo>
                    {account.number.replace(/(\d{5})(\d{3})/, '$1-$2')}
                  </AccountInfo>
                </AccountField>
                <AccountField>
                  <AccountLabel>BANCO: </AccountLabel>
                  <AccountInfo>{account.bankName}</AccountInfo>
                </AccountField>
              </AccountCard>
            ))}
          </Container>
        </Scroll>
      </Screen>
    </>
  );
}

export default SelectAccountToTransferScreen;
