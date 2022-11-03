import { ChangeEvent, forwardRef } from "react";
import { ChevronDown } from "react-feather";
import styled from "styled-components";
import FormControl, { FormControlProps, inputStyles } from "./FormControl";
import { InputProps } from "./Input";

export interface SelectProps
  extends Omit<InputProps, "onChange" | "onBlur" | "onFocus"> {
  children?: React.ReactNode;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (event: ChangeEvent<HTMLSelectElement>) => void;
  onFocus?: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const StyledSelect = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  ${inputStyles}
`;

const Select = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  {
    const {
      children,
      type,
      label,
      placeholder,
      icon,
      helperText,
      error,
      done,
      onChange,
      onBlur,
      onFocus,
      className,
      id,
      name,
      style,
      value,
      required,
    }: SelectProps = props;

    const selectProps = {
      type,
      name,
      value,
      required,
      placeholder,
      onBlur: (e: ChangeEvent<HTMLSelectElement>) => onBlur && onBlur(e),
      onChange: (e: ChangeEvent<HTMLSelectElement>) => onChange && onChange(e),
      onFocus: (e: ChangeEvent<HTMLSelectElement>) => onFocus && onFocus(e),
      ref,
    };

    const controlProps: Omit<FormControlProps, "children"> = {
      id,
      className,
      style,
      label,
      icon,
      adorment: <ChevronDown />,
      helperText,
      error: !!error,
      done: !!done,
    };

    return (
      <FormControl {...controlProps}>
        <StyledSelect {...selectProps}>{children}</StyledSelect>
      </FormControl>
    );
  }
});

export default Select;
