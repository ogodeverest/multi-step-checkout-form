import { Fragment, useCallback, useMemo, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import _ from "lodash";
import {
  User,
  MapPin,
  CreditCard,
  ArrowLeft,
  ArrowRight,
  Check,
} from "react-feather";
import { PersonalDetailsForm, AddressForm, PaymentForm } from "..";
import { Stepper, Step, CircleButton } from "@components";
import schema from "./validationSchema";

interface Step {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

const stepData: Step[] = [
  {
    id: "personalDetails",
    label: "Personal details",
    icon: <User />,
    content: <PersonalDetailsForm />,
  },
  {
    id: "address",
    label: "Address",
    icon: <MapPin />,
    content: <AddressForm />,
  },

  {
    id: "payment",
    label: "Payment",
    icon: <CreditCard />,
    content: <PaymentForm />,
  },
];

interface CheckoutFormProps {
  onSubmit: (data: object) => void;
}

export default function CheckoutForm({
  onSubmit,
}: CheckoutFormProps): JSX.Element {
  const [activeStep, setActiveStep] = useState<number>(0);

  const methods = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const { errors } = methods.formState;

  const invalidSteps: boolean[] = stepData.map(
    (step: Step) => !_.isEmpty(errors[step.id as keyof typeof errors])
  );

  const invalid: boolean = !_.isEmpty(errors);

  const isFirst: boolean = activeStep === 0;
  const isLast: boolean = activeStep === stepData.length - 1;

  const handleBack = useCallback(() => {
    setActiveStep((activeStep) => activeStep - 1);
  }, []);

  const handleNext = useCallback(() => {
    setActiveStep((activeStep) => activeStep + 1);
  }, []);

  const handleSetActive = useCallback((index: number) => {
    setActiveStep(index);
  }, []);

  function handleSubmit() {
    methods.handleSubmit(() => onSubmit(methods.getValues()))();
  }

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      switch (event.key) {
        case "ArrowUp":
        case "ArrowLeft": {
          if (!isFirst) handleBack();
          break;
        }
        case "ArrowDown":
        case "ArrowRight": {
          if (!isLast) handleNext();
          break;
        }
        case "Enter": {
          handleSubmit();
          break;
        }
      }
    },
    [isLast, isFirst, handleNext, handleBack]
  );

  const steps = useMemo(
    () =>
      stepData.map((step: Step, index: number) => {
        const invalid: boolean = invalidSteps[index];

        const label: string = invalid
          ? `${step.label} need revision`
          : step.label;
        return (
          <Step
            index={index}
            label={label}
            key={step.id}
            onClick={handleSetActive}
            error={invalid}
          >
            {step.icon}
          </Step>
        );
      }),
    [handleSetActive, ...invalidSteps]
  );

  const content = useMemo(() => stepData[activeStep].content, [activeStep]);

  const footer = useMemo(
    () => (
      <Fragment>
        <CircleButton
          onClick={handleBack}
          disabled={isFirst}
          place="bottom"
          theme="info"
          label="Back"
        >
          <ArrowLeft />
        </CircleButton>
        {!isLast ? (
          <CircleButton
            onClick={handleNext}
            disabled={isLast}
            theme="info"
            place="bottom"
            label="Next"
          >
            <ArrowRight />
          </CircleButton>
        ) : (
          <CircleButton
            onClick={handleSubmit}
            theme="success"
            place="bottom"
            label="Finish"
            disabled={invalid}
          >
            <Check />
          </CircleButton>
        )}
      </Fragment>
    ),
    [handleBack, handleNext, isLast, isFirst, invalid, handleSubmit]
  );

  return (
    <FormProvider {...methods}>
      <Stepper
        activeStep={activeStep}
        onKeyDown={handleKeyDown}
        steps={steps}
        content={content}
        footer={footer}
      />
    </FormProvider>
  );
}
