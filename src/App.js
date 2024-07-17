import React from "react";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import {
  ThemeProvider as ThemeContextProvider,
  useTheme,
} from "./ThemeContext";
import { WeatherProvider } from "./WeatherContext";
import { lightTheme } from "./styles/themes/lightTheme";
import { darkTheme } from "./styles/themes/darkTheme";
import { GlobalStyle } from "./styles/GlobalStyle";
import media from "./styles/media";
import Navbar from "./components/Navbar";
import WeatherDataContainer from "./components/WeatherDataContainer";


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
      <WeatherProvider>
        <GlobalStyle />
        <AppContent />
      </WeatherProvider>
    </ThemeProvider>
  );
};

const AppContent = () => {

  return (
    <AppContainer>
      <Navbar />
      <WeatherDataContainer />
    </AppContainer>
  );
};

const App = () => (
  <ThemeContextProvider>
    <ThemedApp />
  </ThemeContextProvider>
);

export default App;
