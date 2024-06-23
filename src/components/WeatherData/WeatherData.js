import React from "react";
import styled from "styled-components";

import WeatherCurrentCity from "./Subcomponents/WeatherCurrentCity";
import WeatherDetails from "./Subcomponents/WeatherDetails";
import Weather5day from "./Subcomponents/Weather5day";
import WeatherHourly from "./Subcomponents/WeatherHourly";

const Main = styled.main`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
  height: 420px;
  > * {
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.7);
    min-height: 185px;
  }
`;

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
