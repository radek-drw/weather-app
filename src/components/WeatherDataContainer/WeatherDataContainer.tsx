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
      {loading ? (
        <LoadingOverlay />
      ) : error ? (
        <ErrorContainer>
          <ErrorIcon />
          {error}
        </ErrorContainer>
      ) : (
        <>
          <WeatherCurrentCity />
          <WeatherDetails />
          <Weather5day />
          <WeatherHourly />
        </>
      )}
    </Main>
  );
};

export default WeatherDataContainer;
