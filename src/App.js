import React from "react";

import styled from "styled-components";
import { theme, GlobalStyle } from "./styles/index";
import { ThemeProvider } from "styled-components";

import Navbar from "./components/Navbar";
import WeatherData from "./components/WeatherData/WeatherData";

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
          <WeatherData />
        </AppContainer>
      </ThemeProvider>
    </>
  );
};

export default App;
