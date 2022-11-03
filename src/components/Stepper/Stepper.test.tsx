import { render, screen } from "@testing-library/react";
import Step from "./Step";
import { Stepper, StepperProps } from "./Stepper";

const props: StepperProps = {
  activeStep: 1,
  steps: [
    <Step index={0} key={0}>
      Test step 1
    </Step>,
    <Step index={1} key={1}>
      Test step 2
    </Step>,
    <Step index={2} key={2}>
      Test step 3
    </Step>,
  ],
  content: <p>Test content</p>,
  footer: <footer>Test footer</footer>,
  onKeyDown: () => null,
};

describe("Stepper", () => {
  beforeEach(() => {
    render(<Stepper {...props} />);
  });
  it("Should render correctly.", () => {
    expect(true).toBeTruthy();
  });
  it("Should render correct steps.", () => {
    expect(screen.getByText("Test step 1")).toBeInTheDocument();
    expect(screen.getByText("Test step 2")).toBeInTheDocument();
    expect(screen.getByText("Test step 3")).toBeInTheDocument();
  });
  it("Should render correct content.", () => {
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });
  it("Should render correct footer.", () => {
    expect(screen.getByText("Test footer")).toBeInTheDocument();
  });
});
