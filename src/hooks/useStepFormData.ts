import { FieldErrors, useFormContext } from "react-hook-form";

export default function useStepFormData(stepId: string) {
  const {
    register,
    formState: { errors, touchedFields },
    getValues,
  } = useFormContext();

  const formErrors: FieldErrors = errors[stepId] as FieldErrors;
  const touchedInputs = touchedFields[stepId];

  return {
    register: (field: string) => register(`${stepId}.${field}`),
    values: getValues(stepId),
    formErrors,
    touchedInputs,
  };
}
