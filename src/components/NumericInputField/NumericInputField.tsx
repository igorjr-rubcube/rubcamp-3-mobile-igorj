import React, {createRef, useEffect} from 'react';
import {Mask} from 'react-native-mask-input';
import Colors from '../../styles/colors';
import {
  Container,
  Field,
  IconContainer,
  Input,
  Label,
} from './NumericInputField.styles';

type NumericInputFieldProps = {
  inputs: string[];
  onChangeFunction: any;
  label: string;
  placeholder: string;
  secureText?: boolean;
  secureTextFunction?: any;
  icon?: JSX.Element;
  iconFunction?: any;
  inputMode?: any;
};

// FIXME - Fix change focus to next input
const SingleInput = React.forwardRef<typeof Input, any>((props, ref) => {
  return <Input ref={ref} {...props} />;
});

function NumericInputField({
  inputs: values,
  onChangeFunction,
  label,
  secureText,
  secureTextFunction,
  icon,
  iconFunction,
}: NumericInputFieldProps) {
  const inputRefs = createRef<any>();
  const handleFocus = (index: number) => {
    if (inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };
  return (
    <>
      <Label>{label}</Label>
      <Container>
        {values.map((input, index) => {
          return (
            <Field key={index}>
              <SingleInput
                key={index}
                value={input}
                // ref={ref => (inputRefs.current[index] = ref)}
                onChangeText={(text: string) => {
                  onChangeFunction(text, index);
                  // handleFocus(index);
                }}
                secureTextEntry={secureText || false}
                inputMode="numeric"
                maxLength={1}
              />
            </Field>
          );
        })}
      </Container>
      {icon && iconFunction && (
        <IconContainer onPressIn={() => iconFunction(secureTextFunction)}>
          {icon}
        </IconContainer>
      )}
    </>
  );
}

export default NumericInputField;
