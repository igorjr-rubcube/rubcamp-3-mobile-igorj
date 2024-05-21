import React, {useEffect} from 'react';
import {Mask} from 'react-native-mask-input';
import Colors from '../../styles/colors';
import {
  Currency,
  Field,
  IconContainer,
  Input,
  Label,
} from './TextInputField.styles';
import {Keyboard} from 'react-native';

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
  fontSize?: number;
  textAlign?: any;
  showInput?: boolean;
  error?: boolean;
  fixedPlaceholder?: string;
  type?: string;
  currency?: boolean;
};

function TextInputField({
  value,
  onChangeFunction,
  label,
  placeholder,
  secureText = false,
  secureTextFunction,
  icon,
  iconFunction,
  mask,
  inputMode,
  maxLength,
  disabled = false,
  editable = true,
  onFocus,
  onBlur,
  fontSize,
  textAlign,
  showInput = true,
  error = false,
  fixedPlaceholder,
  currency = false,
}: TextInputFieldProps) {
  return (
    <>
      <Label error={error}>{label}</Label>
      <Field
        style={
          fontSize && fontSize > 16
            ? {height: 'auto', alignItems: 'center'}
            : undefined
        }>
        {fixedPlaceholder && (
          <Label error={error} style={{paddingTop: 10, paddingRight: 10}}>
            {fixedPlaceholder}
          </Label>
        )}
        {!currency ? (
          <Input
            value={value}
            onChangeText={onChangeFunction}
            placeholder={placeholder}
            secureTextEntry={secureText}
            mask={mask}
            inputMode={inputMode}
            placeholderTextColor={error ? Colors.red : Colors.grey}
            maxLength={maxLength}
            editable={disabled ? false : editable}
            disabled={disabled}
            onBlur={onBlur}
            textAlign={textAlign || 'left'}
            onFocus={onFocus}
            onPress={onFocus}
            showSoftInputOnFocus={showInput}
            error={error}
            style={{fontSize: fontSize || 18}}
          />
        ) : (
          <Currency
            value={value}
            onChangeValue={onChangeFunction}
            placeholder={placeholder}
            maxLength={maxLength}
            editable={disabled ? false : editable}
            disabled={disabled}
            textAlign={textAlign || 'left'}
            error={error}
            style={{fontSize: fontSize || 18}}
            prefix=''
            delimiter='.'
            separator=','
            precision={2}
            minValue={0}
            keyboardType="numeric"
            maxValue={999999999.99}
          />
        )}
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
