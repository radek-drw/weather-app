import { createGlobalStyle, DefaultTheme } from "styled-components";
import media from "./media";

interface ThemeInterface extends DefaultTheme {
  colors: {
    background: string;
    text: string;
  };
}

export const GlobalStyles = createGlobalStyle<{ theme?: ThemeInterface }>`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&display=swap');

  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 10px;

    ${media.mobile`
      font-size: 9px;
    `}
  }

  body {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    min-height: 100vh;
    font-family: "Montserrat", sans-serif;

    ${media.mobile`
      display: block;
    `}
  }

  input,
  button {
    font-family: inherit;
  }

  h1, h2, h3, h4, h5, h6,
  p,
  ul, ol {
    margin: 0;
  }

  ul, ol {
    padding: 0;
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
  }
`;