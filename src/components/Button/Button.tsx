import Colors from '../../styles/colors';
import {ButtonText, DefaultButton} from './Button.styles';

type ButtonProps = {
  onPress: any;
  text: string;
  disabled?: boolean;
  color?: string;
  borderColor?: string;
  textColor?: string;
};

function Button({
  onPress,
  text,
  disabled,
  color,
  borderColor,
  textColor,
}: ButtonProps) {
  return (
    <DefaultButton
      color={disabled ? Colors.disabled : color || undefined}
      onPress={onPress}
      disabled={disabled}
      borderColor={borderColor}>
      <ButtonText textColor={textColor}>{text}</ButtonText>
    </DefaultButton>
  );
}

export default Button;
