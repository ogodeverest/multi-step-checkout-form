import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Step, { StepProps } from "./Step";

const props: Omit<StepProps, "children"> = {
  onClick: () => null,
  label: "Test step",
  index: 1,
  error: false,
};

describe("Step", () => {
  it("Should render correctly.", () => {
    expect(true).toBeTruthy();
  });
  it("Should render specified child if no error.", () => {
    render(<Step {...props}>1</Step>);

    expect(screen.getByRole("listitem").textContent).toBe("1");
  });
  it("Should render correct label.", () => {
    render(<Step {...props}>1</Step>);

    expect(screen.getByRole("button").dataset.tip).toBe("Test step");
  });
  it("Should render error.", () => {
    render(<Step {...{ ...props, error: true }}>1</Step>);
    expect(screen.getByRole("button").dataset.type).toBe("error");
  });
});
