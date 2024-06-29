import React from "react";

import styled from "styled-components";
import media from "../styles/media";

import WeatherCurrentCity from "./WeatherCurrentCity";
import WeatherDetails from "./WeatherDetails";
import Weather5day from "./Weather5day";
import WeatherHourly from "./WeatherHourly";

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
    box-shadow: 0 4px 8px ${({ theme }) => theme.colors.cardShadow};

    ${media.mobile`
    flex-basis: 100%;
    padding: 15px 0;
    box-shadow: 0 4px 4px -4px ${({ theme }) => theme.colors.cardShadow};
    border-radius: 0;
  `}
  }
`;

const WeatherDataContainer = () => {
  return (
    <Main>
      <WeatherCurrentCity />
      <WeatherDetails />
      <Weather5day />
      <WeatherHourly />
    </Main>
  );
};

export default WeatherDataContainer;
