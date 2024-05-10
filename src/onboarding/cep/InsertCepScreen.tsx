import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/RootStack';
import {
  TopWrapper,
  ButtonContainer,
  Container,
  Content,
  HighlightedText,
  InputContainer,
  Title,
} from './InsertCepScreen.styles';
import TextInputField from '../../components/TextInputField/TextInputField';
import {useState} from 'react';
import Button from '../../components/Button/Button';
import ProgressBar from '../../components/ProgressBar/ProgressBar';

const cepMask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'InsertCep'>;
};

function InsertCepScreen({navigation}: Props) {
  const [cep, setCep] = useState<string>('');

  return (
    <Container>
      <Content>
        <TopWrapper>
          <ProgressBar progress={0.4} />
          <Title>
            Agora informe o seu endereço. Qual é o seu
            <HighlightedText> CEP</HighlightedText>?
          </Title>
          <InputContainer>
            <TextInputField
              value={cep}
              onChangeFunction={setCep}
              label={''}
              placeholder={''}
              textAlign={'center'}
              mask={cepMask}
              maxLength={9}
            />
          </InputContainer>
        </TopWrapper>
        <ButtonContainer>
          <Button onPress={undefined} text="CONFIRMAR" />
        </ButtonContainer>
      </Content>
    </Container>
  );
}
export default InsertCepScreen;
