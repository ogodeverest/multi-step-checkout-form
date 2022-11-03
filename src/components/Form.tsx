import styled from "styled-components";

const FormWrapper = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 1rem;
`;

interface FormProps {
  children: React.ReactNode;
}

export default function Form({ children }: FormProps): JSX.Element {
  return <FormWrapper>{children}</FormWrapper>;
}
