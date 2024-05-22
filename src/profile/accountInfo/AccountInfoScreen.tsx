import {StackNavigationProp} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import Button from '../../components/Button/Button';
import {
  Background,
  BottomView,
} from '../../components/DefaultScreen/DefaultScreen';
import CopyIcon from '../../components/icons/CopyIcon';
import {RootStackParamList} from '../../navigation/RootStack';
import {RootState} from '../../redux/store';
import Colors from '../../styles/colors';
import {
  AccountInfoContainer,
  AccountInfoField,
  AccountInfoLabel,
  AccountInfoRow,
  AccountInfoText,
  Container,
  CopyButton,
  CopyIconView,
  CopyText,
  Highlight,
  Title,
  TopWrapper,
} from './AccountInfoScreen.styles';
import Clipboard from '@react-native-clipboard/clipboard';
import {Share} from 'react-native';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const formatCPF = (cpf: string) => {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

const formatAccount = (account: string) => {
  return account.replace(/(\d{5})(\d{3})/, '$1-$2');
};

function AccountInfoScreen({navigation}: Props) {
  const accounts = useSelector((state: RootState) => state.accounts.accounts);
  const accountId = useSelector(
    (state: RootState) => state.accountId.accountId,
  );
  const account = accounts.find(account => account.id === accountId);
  const userInfo = useSelector((state: RootState) => state.userInfo);
  const fields = [
    {label: 'Agência', value: account?.branch || '', copy: true},
    {
      label: 'Conta',
      value: formatAccount(account?.number ?? '') || '',
      copy: true,
    },
    {label: 'CPF', value: formatCPF(userInfo?.cpf) || '', copy: true},
    {label: 'Favorecido', value: userInfo?.fullName || '', copy: true},
    {label: 'Instituição', value: account?.bankName || '', copy: false},
    {
      label: 'Tipo',
      value: account?.type == 'CHECKING' ? 'Conta Corrente' : 'Conta Poupança',
      copy: false,
    },
    {label: 'Método', value: 'TED ou DOC', copy: false},
  ];

  const handleCopy = (index: number) => {
    const text = fields[index].value;
    Clipboard.setString(text);
  };

  const handleShare = async () => {
    const text = fields
      .map(field => `${field.label}: ${field.value}`)
      .join('\n');
    try {
      const result = await Share.share(
        {
          message: text,
        },
        {
          dialogTitle: 'Compartilhar dados da conta',
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Background>
      <BottomView flexSize={1}>
        <Container>
          <TopWrapper>
            <Title>
              Use os dados abaixos para fazer um{' '}
              <Highlight>TED para a conta RubBank.</Highlight>
            </Title>
            <AccountInfoContainer>
              {fields.map((field, index) => (
                <AccountInfoRow key={index}>
                  <AccountInfoField>
                    <AccountInfoLabel>{field.label}</AccountInfoLabel>
                    <AccountInfoText>{field.value}</AccountInfoText>
                  </AccountInfoField>
                  {field.copy && (
                    <CopyButton onPress={() => handleCopy(index)}>
                      <CopyIconView>
                        <CopyIcon />
                      </CopyIconView>
                      <CopyText>Copiar</CopyText>
                    </CopyButton>
                  )}
                </AccountInfoRow>
              ))}
            </AccountInfoContainer>
          </TopWrapper>
          <Button
            onPress={handleShare}
            text={'COMPARTILHAR DADOS'}
            borderColor={Colors.grey}
            textColor={Colors.grey}
            color={Colors.transparent}
          />
        </Container>
      </BottomView>
    </Background>
  );
}

export default AccountInfoScreen;
