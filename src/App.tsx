import { Fragment } from "react";
import GlobalStyles from "@styles/GlobalStyles";
import Checkout from "./views/Checkout";
import { Container } from "@components";
import "@fontsource/montserrat";
import "react-toastify/dist/ReactToastify.css";

function App(): JSX.Element {
  return (
    <Fragment>
      <GlobalStyles />
      <Container>
        <Checkout />
      </Container>
    </Fragment>
  );
}

export default App;
