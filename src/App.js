import React from "react";

import styled from "styled-components";
import { GlobalStyle } from "./styles/GlobalStyle";

import Navbar from "./components/Navbar";
import WeatherData from "./components/WeatherData/WeatherData";

const AppContainer = styled.div`
  width: 70vw;
  max-width: 800px;
  min-width: 670px;
  border: 1px solid green;
  padding: 1.5rem 2.5rem;
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Navbar />
        <WeatherData />
      </AppContainer>
    </>
  );
};

export default App;
