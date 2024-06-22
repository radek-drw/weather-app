import React from "react";
import styled from "styled-components";

import WeatherCurrentCity from "./Subcomponents/WeatherCurrentCity";
import WeatherDetails from "./Subcomponents/WeatherDetails";
import Weather5day from "./Subcomponents/Weather5day";
import WeatherHourly from "./Subcomponents/WeatherHourly";

const Main = styled.main``;

const WeatherData = () => {
  return (
    <Main>
      <WeatherCurrentCity />
      <WeatherDetails />
      <Weather5day />
      <WeatherHourly />
    </Main>
  );
};

export default WeatherData;
