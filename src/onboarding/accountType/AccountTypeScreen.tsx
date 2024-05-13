import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createUser} from '../../api/onboarding';
import Button from '../../components/Button/Button';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import InfoIcon from '../../components/icons/InfoIcon';
import {RootStackParamList} from '../../navigation/RootStack';
import {setLoading} from '../../redux/slices/LoadingSlice';
import {RootState} from '../../redux/store';
import Colors from '../../styles/colors';
import {
  AccountSelection,
  AccountSelectionBorder,
  AccountTypeContainer,
  AccountTypeIconContainer,
  AccountTypeText,
  ButtonContainer,
  Container,
  Content,
  FieldWrapper,
  Form,
  Title,
  TopWrapper,
} from './AccountTypeScreen.styles';
import { setAccountData } from '../../redux/slices/OnboardingSlice';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'AccountType'>;
};

function AccountTypeScreen({navigation}: Props) {
  const [accountType, setAccountType] = useState('');
  const [checkingPressed, setCheckingPressed] = useState(true);
  const [savingPressed, setSavingPressed] = useState(false);

  const dispatch = useDispatch();

  const userData = useSelector((state: RootState) => state.onboarding.userData);
  const addressData = useSelector(
    (state: RootState) => state.onboarding.addressData,
  );
  const password = useSelector((state: RootState) => state.onboarding.password);
  const accountData = useSelector(
    (state: RootState) => state.onboarding.accountData,
  );
  
  const handlePress = (type: string) => {
    if (type === 'CHECKING') {
      setCheckingPressed(true);
      setSavingPressed(false);
      setAccountType('CHECKING');
    } else {
      setSavingPressed(true);
      setCheckingPressed(false);
      setAccountType('SAVING');
    }
    dispatch(setAccountData({type: accountType, transactionPassword: accountData.transactionPassword}));
  };


  const handleConfirm = async () => {
    accountData.type = accountType;
    const body = {
      ...userData,
      address: addressData,
      password: password,
      account: accountData,
    };
    dispatch(setLoading(true));
    console.log('Body');
    console.log(body);
    const response = await createUser(body);
    if (response) {
      if (response.code === 201) {
        dispatch(setLoading(false));
        navigation.navigate('Success', {
          title: 'Sua conta digital RubBank foi criada com sucesso!',
          message: 'Acesse agora com seu CPF ou CNPJ e senha cadastados.',
          navigateTo: 'Login',
        });
      } else {
        dispatch(setLoading(false));
      }
    }
  };
    
    

  return (
    <Container>
        <Content>
          <TopWrapper>
            <ProgressBar progress={0.86} />
            <Title>
              Selecione qual será o tipo de conta que você deseja criar
            </Title>
            <Form>
              <FieldWrapper>
                <AccountSelectionBorder>
                  <AccountSelection
                    activeOpacity={0.8}
                    onPress={() => handlePress('CHECKING')}>
                    <AccountTypeContainer
                      isPressed={checkingPressed}></AccountTypeContainer>
                  </AccountSelection>
                </AccountSelectionBorder>
                <AccountTypeText>CONTA CORRENTE</AccountTypeText>
                <AccountTypeIconContainer>
                  <InfoIcon fill={Colors.darkblue} />
                </AccountTypeIconContainer>
              </FieldWrapper>
              <FieldWrapper>
                <AccountSelectionBorder>
                  <AccountSelection
                    activeOpacity={0.8}
                    onPress={() => handlePress('SAVING')}>
                    <AccountTypeContainer
                      isPressed={savingPressed}></AccountTypeContainer>
                  </AccountSelection>
                </AccountSelectionBorder>
                <AccountTypeText>CONTA POUPANÇA</AccountTypeText>
                <AccountTypeIconContainer>
                  <InfoIcon fill={Colors.darkblue} />
                </AccountTypeIconContainer>
              </FieldWrapper>
            </Form>
          </TopWrapper>
          <ButtonContainer>
            <Button onPress={handleConfirm} text="CRIAR CONTA" />
          </ButtonContainer>
        </Content>
      </Container>
  );
}
export default AccountTypeScreen;
