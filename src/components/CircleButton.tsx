import React from "react";
import * as PropTypes from "prop-types";
import styled, { CSSProperties } from "styled-components";
import { flexCenter } from "@styles/GlobalStyles";

interface ButtonProps {
  theme: Theme;
}

const StyledButton = styled.button<ButtonProps>`
  ${flexCenter}
  width: 3.5em;
  aspect-ratio: 1;
  color: ${({ theme }) => `var(--clr-${theme})`};
  border: 2px solid currentColor;
  border-radius: 100%;
  background-color: transparent;
  cursor: pointer;
  transition: color ease-in-out 0.3s;
  transition: background-color ease-in-out 0.3s;

  &:hover:enabled,
  &:active:enabled {
    background-color: ${({ theme }) => `var(--clr-${theme})`};
    color: white;
  }
  &:disabled {
    cursor: not-allowed;
    filter: grayscale(10);
  }
`;

export type Theme = "dark" | "success" | "error" | "info";
export type Place = "top" | "right" | "bottom" | "left";

export interface CircleButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  className?: string;
  id?: string;
  theme: Theme;
  label?: string;
  place?: Place;
  style?: CSSProperties;
}

export default function CircleButton({
  children,
  disabled = false,
  onClick,
  className = "",
  theme = "info",
  label,
  place,
  style,
  id,
}: CircleButtonProps): JSX.Element {
  return (
    <StyledButton
      id={id}
      style={style}
      className={className}
      disabled={disabled}
      theme={theme}
      onClick={onClick}
      data-tip={label}
      data-type={theme}
      data-place={place}
    >
      {children}
    </StyledButton>
  );
}

CircleButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  theme: PropTypes.oneOf(["dark", "success", "error", "info"]),
  onClick: PropTypes.func,
  label: PropTypes.string,
  place: PropTypes.oneOf(["top", "right", "bottom", "left"]),
};
