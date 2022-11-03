import { createContext, memo, useContext } from "react";
import styled from "styled-components";
import * as PropTypes from "prop-types";
import { AnimatePresence, motion, Variants } from "framer-motion";
import ReactTooltip from "react-tooltip";
import { StepProps } from "./Step";
import {
  device,
  flexAlignCenter,
  flexCenter,
  flexColumn,
} from "@styles/GlobalStyles";

const StyledStepper = styled.div`
  display: grid;
  grid-template-columns: min-content 3fr;
  grid-template-areas:
    "header content"
    "header content"
    "header footer";

  column-gap: 3rem;
  outline: none;

  @media ${device.tablet} {
    grid-template-columns: 1fr;
    grid-template-areas:
      "header"
      "content"
      "footer";
    row-gap: 1.5rem;
  }
`;

const StyledHeader = styled.header`
  grid-area: header;
  align-self: center;
`;

const StyledList = styled.ul`
  ${flexCenter}
  ${flexColumn}
  margin: 0;
  padding: 0;
  @media ${device.tablet} {
    width: 100%;
    flex-direction: row;
    overflow-x: auto;
  }
`;

const StyledFooter = styled.footer`
  grid-area: footer;
  justify-self: end;
  ${flexAlignCenter}
  gap: 1rem;
  @media ${device.tablet} {
    justify-self: center;
  }
`;
const StyledContent = styled.section`
  grid-area: content;
`;

const MotionContent = motion(StyledContent);

const contentVariants: Variants = {
  hidden: {
    y: 50,
    opacity: 0,
    transition: {
      duration: 0.25,
    },
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.25,
    },
  },
};

const StepperContext = createContext<number>(0);

export function useStepperContext() {
  return useContext(StepperContext);
}

export interface StepperProps {
  activeStep: number;
  steps: React.ReactElement<StepProps> | Array<React.ReactElement<StepProps>>;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
}

export function Stepper({
  activeStep,
  steps,
  content,
  footer,
  onKeyDown,
}: StepperProps): JSX.Element {
  return (
    <StepperContext.Provider value={activeStep}>
      <StyledStepper onKeyDown={onKeyDown} tabIndex={0}>
        <StyledHeader>
          <nav>
            <StyledList role="list">{steps}</StyledList>
          </nav>
        </StyledHeader>
        <AnimatePresence>
          <MotionContent
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={contentVariants}
            key={activeStep}
          >
            {content}
          </MotionContent>
        </AnimatePresence>

        <StyledFooter>{footer}</StyledFooter>
        <ReactTooltip place="left" offset={{ left: 20 }} />
      </StyledStepper>
    </StepperContext.Provider>
  );
}

Stepper.propTypes = {
  activeStep: PropTypes.number.isRequired,
  steps: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  content: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  footer: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  onKeyDown: PropTypes.func,
};

export default memo(Stepper);
