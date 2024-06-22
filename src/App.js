import React from "react";

import styled from "styled-components";
import { theme, GlobalStyle } from "./styles/index";
import { ThemeProvider } from "styled-components";

import Navbar from "./components/Navbar";

const AppContainer = styled.div`
  width: 70vw;
  height: 80vh;
  border: 1px solid white;
  padding: 1rem 2rem;
`;

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AppContainer>
          <Navbar />
        </AppContainer>
      </ThemeProvider>
    </>
  );
};

export default App;
