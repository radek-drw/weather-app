import React from "react";
import { useWeather } from "../../WeatherContext";
import WeatherCurrentCity from "../WeatherCurrentCity/WeatherCurrentCity";
import WeatherDetails from "../WeatherDetails/WeatherDetails";
import Weather5day from "../Weather5day/Weather5day";
import WeatherHourly from "../WeatherHourly/WeatherHourly";
import LoadingOverlay from "../../features/LoadingOverlay";
import { Main, ErrorContainer, ErrorIcon } from "./WeatherDataContainer.styles";

const WeatherDataContainer = () => {
  const { error, loading } = useWeather();

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
