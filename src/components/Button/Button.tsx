import Colors from '../../styles/colors';
import {DefaultButton, ButtonText} from './Button.styles';

type ButtonProps = {
  onPress: any;
  text: string;
  disabled?: boolean;
  color?: string;
};

function Button({onPress, text, disabled, color}: ButtonProps) {
  return (
    <DefaultButton 
    color={disabled ? Colors.button.disabled : (color|| undefined)}
    onPress={onPress} 
    disabled={disabled}>
      <ButtonText>{text}</ButtonText>
    </DefaultButton>
  );
}

export default Button;
