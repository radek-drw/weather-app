import React from "react";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import {
  ThemeProvider as ThemeContextProvider,
  useTheme,
} from "./ThemeContext";
import { WeatherProvider, useWeather } from "./WeatherContext";
import { lightTheme } from "./styles/themes/lightTheme";
import { darkTheme } from "./styles/themes/darkTheme";
import { GlobalStyle } from "./styles/GlobalStyle";
import media from "./styles/media";
import LoadingOverlay from "./components/subcomponent/LoadingOverlay";
import Navbar from "./components/Navbar";
import WeatherDataContainer from "./components/WeatherDataContainer";
import { FaExclamationTriangle } from "react-icons/fa";

const AppContainer = styled.div`
  width: 70vw;
  max-width: 1024px;
  padding: 1.5rem 2.5rem;
  ${media.tablet`
    width: 100vw;
  `}
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  text-align: center;
  color: orange;
  height: 65vh;
  padding: 3rem;
  margin-top: 20px;
  border: 1px solid orange;
  border-radius: 8px;
  background-color: rgba(255, 165, 0, 0.1);
`;

const ErrorIcon = styled(FaExclamationTriangle)`
  font-size: 2.6rem;
  color: orange;
  margin-top: 10px;
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
  const { error } = useWeather();

  return (
    <AppContainer>
      <Navbar />
      {error ? (
        <>
          <ErrorContainer>{error}
            <ErrorIcon />
          </ErrorContainer> 
        </>
      ) : (
        <>
          <LoadingOverlay />
          <WeatherDataContainer />
        </>
      )}
    </AppContainer>
  );
};

const App = () => (
  <ThemeContextProvider>
    <ThemedApp />
  </ThemeContextProvider>
);

export default App;
