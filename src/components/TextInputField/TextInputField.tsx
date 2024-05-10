import React from 'react';
import {Mask} from 'react-native-mask-input';
import Colors from '../../styles/colors';
import {Field, IconContainer, Input, Label} from './TextInputField.styles';

type TextInputFieldProps = {
  value: any;
  onChangeFunction: any;
  label: string;
  placeholder: string;
  secureText?: boolean;
  secureTextFunction?: any;
  icon?: JSX.Element;
  iconFunction?: any;
  mask?: Mask;
  inputMode?: any;
  maxLength?: number;
  disabled?: boolean;
  editable?: boolean;
  onFocus?: any;
  onBlur?: any;
  textAlign?: any;
  showInput?: boolean;
};

function TextInputField({
  value,
  onChangeFunction,
  label,
  placeholder,
  secureText,
  secureTextFunction,
  icon,
  iconFunction,
  mask,
  inputMode,
  maxLength,
  disabled,
  editable,
  onFocus,
  onBlur,
  textAlign,
  showInput = true,
}: TextInputFieldProps) {
  return (
    <>
      <Label>{label}</Label>
      <Field>
        <Input
          value={value}
          onChangeText={onChangeFunction}
          placeholder={placeholder}
          secureTextEntry={secureText || false}
          mask={mask}
          inputMode={inputMode}
          placeholderTextColor={Colors.grey}
          maxLength={maxLength}
          editable={editable || (!disabled || true)}
          disabled={disabled || false}
          onBlur={onBlur}
          textAlign={textAlign || 'left'}
          onFocus={onFocus}
          onPress={onFocus}
          showSoftInputOnFocus={showInput}
        />
        {icon && iconFunction && (
          <IconContainer onPressIn={() => iconFunction(secureTextFunction)}>
            {icon}
          </IconContainer>
        )}
      </Field>
    </>
  );
}

export default TextInputField;
