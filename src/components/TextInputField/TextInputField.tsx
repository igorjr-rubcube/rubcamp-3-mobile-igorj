import React from 'react';
import {Field, Input, Label, IconContainer} from './TextInputField.styles';

type TextInputFieldProps = {
  value: any;
  onChangeFunction: any;
  label: string;
  placeholder: string;
  secureText?: boolean;
  secureTextFunction?: any;
  icon?: JSX.Element;
  iconFunction?: any;
  mask?: RegExp[];
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
