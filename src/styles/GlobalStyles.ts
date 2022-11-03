import { createGlobalStyle } from "styled-components";
import { css } from "styled-components";

const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const flexAlignCenter = css`
  display: flex;
  align-items: center;
`;

const flexColumn = css`
  display: flex;
  flex-direction: column;
`;

const device = {
  tablet: `(max-width: 768px)`,
};

const GlobalStyles = createGlobalStyle`
 /* css reset */
 :root{
     --clr-info: #77d0ee;
     --clr-success:#6fd86f;
     --clr-error:#ff3333;
     --clr-dark:#A9A9A9;
     --clr-text:#1a2027;
}

::selection{
    background-color: var(--clr-info);
    color:white;
}

 *, *::before, *::after {
     box-sizing: border-box;
}

 body, h1, h2, h3, h4, p, figure, blockquote, dl, dd {
     margin: 0;
}
 ul[role="list"], ol[role="list"] {
     list-style: none;
}

 html:focus-within {
     scroll-behavior: smooth;
}

 body {
     min-height: 100vh;
     text-rendering: optimizeSpeed;
     line-height: 1.5;
     font-family: "Montserrat";
     ${flexCenter}
     color:var(--clr-text);
}
 a:not([class]) {
     text-decoration-skip-ink: auto;
}
 input, button, textarea, select {
     font: inherit;
}

 @media (prefers-reduced-motion: reduce) {
     html:focus-within {
         scroll-behavior: auto;
    }
     *, *::before, *::after {
         animation-duration: 0.01ms !important;
         animation-iteration-count: 1 !important;
         transition-duration: 0.01ms !important;
         scroll-behavior: auto !important;
    }
}

#root{
    width: 100%;
}
`;

export default GlobalStyles;
export { flexCenter, flexColumn, flexAlignCenter, device };
