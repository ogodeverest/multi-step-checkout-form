import * as yup from "yup";
import valid from "card-validator";

const phoneRegEx: RegExp =
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

const schema = yup
  .object()
  .shape({
    personalDetails: yup
      .object()
      .shape({
        firstName: yup
          .string()
          .test(
            "test-first-name",
            "Please enter a valid first name.",
            (value: string | undefined) => valid.cardholderName(value).isValid
          )
          .required("First name is a required field."),
        lastName: yup
          .string()
          .test(
            "test-last-name",
            "Please enter a valid last name.",
            (value: string | undefined) => valid.cardholderName(value).isValid
          )
          .required("Last name is a required field."),
        email: yup
          .string()
          .email("Please enter valid email.")
          .required("Email is a required field."),
        phone: yup
          .string()
          .matches(phoneRegEx, "Please enter valid phone number.")
          .required("Phone is a required field."),
      })
      .required(),
    address: yup
      .object()
      .shape({
        country: yup.string().required("Country is a required field."),
        city: yup.string().required("City is a required field."),
        zipcode: yup
          .string()
          .test(
            "test-zip-code",
            "Please enter a valid zip code.",
            (value: string | undefined) => valid.postalCode(value).isValid
          )
          .required("Zipcode is a required field."),
        houseNumber: yup.string().required("House number is a required field."),
        street: yup
          .string()
          .matches(/[^\s\\]/, "Please enter a valid street.")
          .required("Street is a required field."),
      })
      .required(),
    payment: yup
      .object()
      .shape({
        holderName: yup
          .string()
          .test(
            "test-holder-name",
            "Please enter a valid card holder name.",
            (value: string | undefined) => valid.cardholderName(value).isValid
          )
          .required("Credit card holder name is a required field."),
        cardNumber: yup
          .string()
          .test(
            "test-card-number",
            "Please enter a valid card number.",
            (value: string | undefined) => valid.number(value).isValid
          )
          .required("Credit card number is a required field."),
        expiryDate: yup
          .string()
          .test(
            "test-expiry-date",
            "Please enter a valid expiry date.",
            (value: string | undefined) => valid.expirationDate(value).isValid
          )
          .required("Expiry date is a required field."),
        securityCode: yup
          .string()
          .test(
            "test-security-code",
            "Please enter a valid security code.",
            (value: string | undefined) => valid.cvv(value, [3, 4]).isValid
          )
          .required("Security code is a required field."),
      })
      .required(),
  })
  .required();

export default schema;
