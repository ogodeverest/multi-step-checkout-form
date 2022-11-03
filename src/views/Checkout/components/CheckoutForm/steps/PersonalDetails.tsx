import { Mail, Phone, User } from "react-feather";
import { Input, Form } from "@components";
import useStepFormData from "@hooks/useStepFormData";

export default function PersonalDetails(): JSX.Element {
  const { register, formErrors, touchedInputs } =
    useStepFormData("personalDetails");

  return (
    <Form>
      <Input
        type="text"
        placeholder="First name"
        icon={<User />}
        label="First name"
        {...register("firstName")}
        helperText={formErrors?.firstName?.message as string}
        error={!!formErrors?.firstName}
        done={!formErrors?.firstName && touchedInputs?.firstName}
      />
      <Input
        type="text"
        placeholder="Last name"
        icon={<User />}
        label="Last name"
        {...register("lastName")}
        helperText={formErrors?.lastName?.message as string}
        error={!!formErrors?.lastName}
        done={!formErrors?.lastName && touchedInputs?.lastName}
      />

      <Input
        type="email"
        placeholder="Email"
        icon={<Mail />}
        label="Email"
        {...register("email")}
        helperText={formErrors?.email?.message as string}
        error={!!formErrors?.email}
        done={!formErrors?.email && touchedInputs?.email}
      />
      <Input
        type="tel"
        placeholder="Phone"
        icon={<Phone />}
        label="Phone"
        {...register("phone")}
        helperText={formErrors?.phone?.message as string}
        error={!!formErrors?.phone}
        done={!formErrors?.phone && touchedInputs?.phone}
      />
    </Form>
  );
}
