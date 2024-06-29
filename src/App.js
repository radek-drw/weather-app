import React from "react";

import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import {
  ThemeProvider as ThemeContextProvider,
  useTheme,
} from "./themeContext";
import { lightTheme } from "./styles/themes/lightTheme";
import { darkTheme } from "./styles/themes/darkTheme";
import { GlobalStyle } from "./styles/globalStyle";
import media from "./styles/media";

import Navbar from "./components/Navbar";
import WeatherData from "./components/WeatherData/WeatherData";

const AppContainer = styled.div`
  width: 70vw;
  max-width: 1024px;
  padding: 1.5rem 2.5rem;

  ${media.tablet`
    width: 100vw;
  `}
`;

const ThemedApp = () => {
  const { theme } = useTheme();
  const currentTheme = theme === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle />
      <AppContainer>
        <Navbar />
        <WeatherData />
      </AppContainer>
    </ThemeProvider>
  );
};

const App = () => (
  <ThemeContextProvider>
    <ThemedApp />
  </ThemeContextProvider>
);

export default App;
