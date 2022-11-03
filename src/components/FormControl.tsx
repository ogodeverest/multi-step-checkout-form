import styled, { css, CSSProperties } from "styled-components";
import { flexAlignCenter, flexColumn } from "@styles/GlobalStyles";
import { AlertCircle, CheckCircle } from "react-feather";
import React from "react";

export interface ControlProps {
  error: boolean;
}

export const inputStyles = css`
  border: none;
  outline: none;
  padding: 0.3em;
  &::placeholder {
    color: var(--clr-dark);
  }
  width: 100%;
`;

export const StyledContainer = styled.div`
  position: relative;
  ${flexAlignCenter}
  padding: 0.5em;
  border: 1px solid currentColor;
`;

export const StyledControl = styled.label<ControlProps>`
  ${flexColumn}
  color: ${({ error }) => (error ? "var(--clr-error)" : "var(--clr-dark)")};
  &:has(input:focus, select:focus) {
    color: ${({ error }) => (error ? "var(--clr-error)" : "var(--clr-info)")};
  }
  cursor: pointer;
`;

export const StyledHelper = styled.p`
  font-size: 0.85rem;
`;

export const StyledIcon = styled.span`
  ${flexAlignCenter}
  font-size: 1rem;
  margin: 0.3em;
`;

export interface FormControlProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  label?: string;
  style?: CSSProperties;
  icon?: React.ReactNode;
  adorment?: React.ReactNode;
  error?: boolean;
  done?: boolean;
  helperText?: string;
}

export default function FormControl({
  children,
  id,
  className,
  label,
  icon,
  adorment,
  error,
  done,
  helperText,
  style,
}: FormControlProps) {
  return (
    <StyledControl error={!!error} id={id} className={className} style={style}>
      {label}
      <StyledContainer>
        {icon && <StyledIcon>{error ? <AlertCircle /> : icon}</StyledIcon>}
        {children}
        {done && (
          <StyledIcon style={{ color: "var(--clr-success)" }}>
            <CheckCircle />
          </StyledIcon>
        )}
        {adorment}
      </StyledContainer>
      {helperText && <StyledHelper>{helperText}</StyledHelper>}
    </StyledControl>
  );
}
