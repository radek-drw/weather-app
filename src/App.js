import React from "react";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import {
  ThemeProvider as ThemeContextProvider,
  useTheme,
} from "./ThemeContext";
import { WeatherProvider } from "./WeatherContext";
import { useWeather } from "./WeatherContext";
import { lightTheme } from "./styles/themes/lightTheme";
import { darkTheme } from "./styles/themes/darkTheme";
import { GlobalStyle } from "./styles/GlobalStyle";
import { BeatLoader } from "react-spinners";
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

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  background: rgba(0, 0, 0, 0.2);
  z-index: 10;
  backdrop-filter: blur(3px);
`;

const ThemedApp = () => {
  const { theme } = useTheme();
  const currentTheme = theme === "dark" ? darkTheme : lightTheme;

  const { loading } = useWeather();

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle />
      <AppContainer>
        {loading && (
          <LoadingOverlay>
            <BeatLoader color="#00aaff" size={20} />
          </LoadingOverlay>
        )}
        <Navbar />
        <WeatherDataContainer />
      </AppContainer>
    </ThemeProvider>
  );
};

const App = () => (
  <ThemeContextProvider>
    <WeatherProvider>
      <ThemedApp />
    </WeatherProvider>
  </ThemeContextProvider>
);

export default App;
