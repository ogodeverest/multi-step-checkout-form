import * as PropTypes from "prop-types";
import styled from "styled-components";
import { AlertTriangle } from "react-feather";
import CircleButton, { Theme } from "../CircleButton";
import { useStepperContext } from "./Stepper";
import { device } from "@styles/GlobalStyles";

const StyledItem = styled.li`
  flex-basis: 6.5rem;
  @media ${device.tablet} {
    flex-shrink: 0;
  }
`;

interface StyledStepProps {
  theme: Theme;
  touched: boolean;
}

const StyledStep = styled(CircleButton)<StyledStepProps>`
  --step-clr: ${({ theme }) => `var(--clr-${theme})`};
  position: relative;
  background-color: ${({ touched }) =>
    touched ? "var(--step-clr)" : "transparent"};
  color: ${({ touched }: StyledStepProps) =>
    touched ? "white" : "var(--step-clr)"};

  &:hover,
  &:active {
    background-color: var(--step-clr);
    color: white;
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 2px;
    height: 1.75rem;
    background-color: var(--step-clr);
    @media ${device.tablet} {
      width: 1.75rem;
      height: 2px;
    }
  }

  &::before {
    bottom: 100%;
    @media ${device.tablet} {
      bottom: unset;
      right: 100%;
    }
  }

  &::after {
    top: 100%;
    @media ${device.tablet} {
      top: unset;
      left: 100%;
    }
  }
`;

export interface StepProps {
  children: React.ReactNode;
  onClick?: (index: number) => void;
  label?: string;
  index: number;
  error?: boolean;
}

export default function Step({
  children,
  onClick,
  label,
  index,
  error = false,
}: StepProps): JSX.Element {
  const activeStep: number = useStepperContext();
  const touched: boolean = activeStep >= index;

  let theme: Theme = "dark";

  if (error) theme = "error";
  else if (touched) theme = "info";
  else theme = "dark";

  return (
    <StyledItem>
      <StyledStep
        theme={theme}
        label={label}
        place="left"
        onClick={() => onClick && onClick(index)}
        touched={touched}
      >
        {error ? <AlertTriangle /> : children}
      </StyledStep>
    </StyledItem>
  );
}

Step.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  onClick: PropTypes.func,
  error: PropTypes.bool,
  index: PropTypes.number.isRequired,
};
