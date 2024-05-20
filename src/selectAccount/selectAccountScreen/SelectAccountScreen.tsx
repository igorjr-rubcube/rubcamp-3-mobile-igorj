import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootStackParamList} from '../../navigation/RootStack';
import {setAccountId} from '../../redux/slices/AccountIdSlice';
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
} from './SelectAccountScreen.styles';
import Button from '../../components/Button/Button';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'SelectAccount'>;
};

function SelectAccountScreen({navigation}: Props) {
  const accounts = useSelector((state: RootState) => state.accounts);
  const dispatch = useDispatch();
  const accountId = useSelector(
    (state: RootState) => state.accountId.accountId,
  );

  const handleSelectAccount = (accountIndex: number) => {
    dispatch(setAccountId(accounts.accounts[accountIndex].id));
    navigation.navigate('Home');
  };

  return (
    <Screen>
      <Title>Selecione a conta que deseja acessar</Title>
      <Scroll>
        <Container>
          {accounts.accounts.map((account, index) => (
            <AccountCard
              key={account.id}
              onPress={() => handleSelectAccount(index)}>
              <AccountField>
                <AccountLabel>CONTA: </AccountLabel>
                <AccountInfo>
                  {index + 1} de {accounts.accounts.length}
                </AccountInfo>
              </AccountField>
              <AccountField>
                <AccountLabel>AGÊNCIA: </AccountLabel>
                <AccountInfo>{account.branch}</AccountInfo>
              </AccountField>
              <AccountField>
                <AccountLabel>Nº DA CONTA: </AccountLabel>
                <AccountInfo>{account.number.replace(/(\d{5})(\d{3})/, '$1-$2')}</AccountInfo>
              </AccountField>
              <AccountField>
                <AccountLabel>BANCO: </AccountLabel>
                <AccountInfo>{account.bankName}</AccountInfo>
              </AccountField>
              <AccountField>
                <AccountLabel>TIPO: </AccountLabel>
                <AccountInfo>
                  {account.type == 'CHECKING'
                    ? 'Conta Corrente'
                    : 'Conta Poupança'}
                </AccountInfo>
              </AccountField>
            </AccountCard>
          ))}
        </Container>
      </Scroll>
      <Button onPress={() => navigation.navigate('CreateNewAccount')} text={'CRIAR NOVA CONTA'} />
    </Screen>
  );
}

export default SelectAccountScreen;
