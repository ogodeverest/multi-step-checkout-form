import {
  ChangeEvent,
  CSSProperties,
  forwardRef,
  HTMLInputTypeAttribute,
} from "react";
import styled from "styled-components";
import FormControl, { FormControlProps, inputStyles } from "./FormControl";

export interface InputProps {
  type: HTMLInputTypeAttribute;
  className?: string;
  id?: string;
  label?: string;
  name?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  style?: CSSProperties;
  value?: string;
  icon?: React.ReactNode;
  error?: boolean;
  done?: boolean;
  helperText?: string;
  required?: boolean;
}

export const StyledInput = styled.input`
  ${inputStyles};
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
  }
`;

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  {
    const {
      type,
      label,
      placeholder,
      icon,
      helperText,
      error,
      onChange,
      onBlur,
      onFocus,
      className,
      id,
      name,
      style,
      value,
      required,
      done,
    }: InputProps = props;

    const inputProps = {
      type,
      name,
      value,
      required,
      placeholder,
      onBlur: (e: ChangeEvent<HTMLInputElement>) => onBlur && onBlur(e),
      onChange: (e: ChangeEvent<HTMLInputElement>) => onChange && onChange(e),
      onFocus: (e: ChangeEvent<HTMLInputElement>) => onFocus && onFocus(e),
      ref,
    };

    const controlProps: Omit<FormControlProps, "children"> = {
      id,
      className,
      style,
      label,
      icon,
      helperText,
      error: !!error,
      done: !!done,
    };

    return (
      <FormControl {...controlProps}>
        <StyledInput {...inputProps} />
      </FormControl>
    );
  }
});

export default Input;
