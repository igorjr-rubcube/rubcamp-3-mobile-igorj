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
