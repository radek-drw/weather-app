import React from "react";
import styled from "styled-components";
import media from "../styles/media";
import { useWeather } from "../WeatherContext";
import WeatherCurrentCity from "./WeatherCurrentCity";
import WeatherDetails from "./WeatherDetails";
import Weather5day from "./Weather5day";
import WeatherHourly from "./WeatherHourly";
import LoadingOverlay from "./subcomponent/LoadingOverlay";
import { FaExclamationTriangle } from "react-icons/fa";

const Main = styled.main`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
  height: 420px;
  margin-top: 20px;

  ${media.mobile`
    margin-top: 0;
  `}

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

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  text-align: center;
  color: orange;
  height: 60vh;
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

const WeatherDataContainer = () => {
  const { error, loading } = useWeather();

  if (loading) {
    return <LoadingOverlay />;
  }

  if (error) {
    return (
      <ErrorContainer>
        {error}
        <ErrorIcon/>
      </ErrorContainer>
    );
  }

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
