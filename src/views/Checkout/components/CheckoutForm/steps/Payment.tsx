import creditCardType from "credit-card-type";
import { ChangeEvent, useState } from "react";
import { User, Lock, Hash, Calendar } from "react-feather";
import { Input, Form } from "@components";
import useStepFormData from "@hooks/useStepFormData";
import cards from "../CreditCards";

function getCurrentCard(value: string) {
  return value && creditCardType(value)[0]?.type;
}

export default function Payment(): JSX.Element {
  const { register, formErrors, values, touchedInputs } =
    useStepFormData("payment");

  const [cardType, setCardType] = useState<string | null>(
    getCurrentCard(values?.cardNumber)
  );

  const { onChange, ...rest } = register("cardNumber");

  function handleCardNoChange(e: ChangeEvent<HTMLInputElement>) {
    onChange(e);
    setCardType(getCurrentCard(e.target.value));
  }

  return (
    <Form>
      <Input
        type="text"
        placeholder="Credit card holder name"
        icon={<User />}
        label="Credit card holder name"
        {...register("holderName")}
        helperText={formErrors?.holderName?.message as string}
        error={!!formErrors?.holderName}
        done={!formErrors?.holderName && touchedInputs?.holderName}
      />
      <Input
        type="number"
        placeholder="Credit card number"
        label="Credit card number"
        icon={cards[cardType as keyof typeof cards] || <Hash />}
        {...rest}
        onChange={handleCardNoChange}
        helperText={formErrors?.cardNumber?.message as string}
        error={!!formErrors?.cardNumber}
        done={!formErrors?.cardNumber && touchedInputs?.cardNumber}
      />
      <Input
        type="text"
        placeholder="MM/YY"
        icon={<Calendar />}
        label="Expiry date"
        {...register("expiryDate")}
        helperText={formErrors?.expiryDate?.message as string}
        error={!!formErrors?.expiryDate}
        done={!formErrors?.expiryDate && touchedInputs?.expiryDate}
      />
      <Input
        type="number"
        placeholder="Security code"
        icon={<Lock />}
        label="Security code"
        {...register("securityCode")}
        helperText={
          (formErrors?.securityCode?.message as string) ||
          "Copy your CVV/CVC code from the back of your card"
        }
        error={!!formErrors?.securityCode}
        done={!formErrors?.securityCode && touchedInputs?.securityCode}
      />
    </Form>
  );
}
