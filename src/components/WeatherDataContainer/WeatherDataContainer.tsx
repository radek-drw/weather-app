import React from "react";

import { useWeather } from "../../WeatherContext";

import Weather5day from "../Weather5day/Weather5day";
import WeatherCurrentCity from "../WeatherCurrentCity/WeatherCurrentCity";
import WeatherDetails from "../WeatherDetails/WeatherDetails";
import WeatherHourly from "../WeatherHourly/WeatherHourly";

import LoadingOverlay from "../../features/LoadingOverlay";

import { ErrorContainer, ErrorIcon, Main } from "./WeatherDataContainer.styles";

interface WeatherContextType {
  error: string | null;
  loading: boolean;
}

const WeatherDataContainer: React.FC = () => {
  const { error, loading } = useWeather() as WeatherContextType;

  return (
    <Main>
      {loading ? ( // If data is loading, display a loading overlay
        <LoadingOverlay />
      ) : error ? ( // If there's an error, display an error message with an icon
        <ErrorContainer>
          <ErrorIcon />
          {error}
        </ErrorContainer>
      ) : (
        // If data is loaded without error, display weather components
        <>
          <WeatherCurrentCity data-testid="weather-current-city" />
          <WeatherDetails data-testid="weather-details" />
          <Weather5day data-testid="weather-5day" />
          <WeatherHourly data-testid="weather-hourly" />
        </>
      )}
    </Main>
  );
};

export default WeatherDataContainer;
