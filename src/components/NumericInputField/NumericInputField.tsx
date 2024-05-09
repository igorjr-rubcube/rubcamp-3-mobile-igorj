import React, {createRef, useState} from 'react';
import {Container, Field, Input, Label} from './NumericInputField.styles';

type NumericInputFieldProps = {
  onChangeFunction: any;
  size: number;
  label: string;
  secureText?: boolean;
};

const SingleInput = React.forwardRef<typeof Input, any>((props, ref) => {
  return <Input ref={ref} {...props} />;
});

function NumericInputField({
  onChangeFunction,
  size,
  label,
  secureText,
}: NumericInputFieldProps) {
  const state = [...Array(size).keys()].map(() => '');
  const [inputs, setInputs] = useState(state);

  const inputRefs = inputs.map(() => createRef<any>());

  const handleFocus = (index: number, text: string) => {
    if (text === '') {
      if (inputRefs[index - 1]?.current) {
        inputRefs[index - 1].current.focus();
      }
    } else if (inputRefs[index + 1]?.current) {
      inputRefs[index + 1].current.focus();
    }
  };

  const updateInputs = (text: string, index: number) => {
    const newPassword = [...inputs];
    newPassword[index] = text;
    setInputs(newPassword);
  };

  return (
    <>
      <Label>{label}</Label>
      <Container>
        {inputs.map((input, index) => {
          return (
            <Field key={index}>
              <SingleInput
                key={index}
                value={input}
                ref={inputRefs[index]}
                secureTextEntry={secureText || false}
                inputMode="numeric"
                maxLength={1}
                onChangeText={(text: string) => {
                  updateInputs(text, index);
                  inputs.push(text);
                  const newValue = inputs.join('').replace(/\D/g, '');
                  onChangeFunction(newValue);
                  handleFocus(index, text);
                }}
                onKeyPress={({nativeEvent}: any) => {
                  if (nativeEvent.key === 'Backspace') {
                    updateInputs('', index - 1);
                    handleFocus(index, '');
                  }
                }}
              />
            </Field>
          );
        })}
      </Container>
    </>
  );
}

export default NumericInputField;
