import { toast, ToastContainer, ToastOptions } from "react-toastify";
import styled from "styled-components";
import { CheckoutForm } from "./components";
import { flexColumn } from "@styles/GlobalStyles";

const StyledH1 = styled.h1`
  color: var(--clr-info);
`;

const StyledH2 = styled.h2`
  color: var(--clr-dark);
`;

const StyledContainer = styled.main`
  ${flexColumn}
  gap: 4rem;
`;

export default function Checkout(): JSX.Element {
  function handleSubmit(data: object) {
    const options: ToastOptions = {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    };
    toast.success("Success!", options);
    toast.info(`Your data: ${JSON.stringify(data)}`, options);
  }

  return (
    <StyledContainer>
      <header>
        <StyledH1>Checkout</StyledH1>
        <StyledH2>Please finish your payment</StyledH2>
      </header>
      <CheckoutForm onSubmit={handleSubmit} />
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </StyledContainer>
  );
}
