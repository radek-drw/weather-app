import React from "react";

import styled from "styled-components";
import media from "../../styles/media";

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
    min-height: 185px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.7);

    ${media.mobile`
    flex-basis: 100%;
    padding: 15px 0;
    box-shadow: 0 4px 4px -4px rgba(0, 0, 0, 0.6);
    border-radius: 0;
  `}
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
