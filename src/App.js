import React from "react";

import styled from "styled-components";
import { GlobalStyle } from "./styles/GlobalStyle";
import media from "./styles/media";

import Navbar from "./components/Navbar";
import WeatherData from "./components/WeatherData/WeatherData";

const AppContainer = styled.div`
  width: 70vw;
  max-width: 1024px;
  border: 1px solid green;
  padding: 1.5rem 2.5rem;

  ${media.tablet`
    width: 100vw;
  `}
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
