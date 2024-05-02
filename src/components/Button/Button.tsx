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
    color={disabled ? '#ccc' : (color|| undefined)} // TODO - change disabled color
    onPress={onPress} 
    disabled={disabled}>
      <ButtonText>{text}</ButtonText>
    </DefaultButton>
  );
}

export default Button;
