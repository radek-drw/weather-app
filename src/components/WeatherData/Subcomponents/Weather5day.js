import React from "react";
import styled from "styled-components";

import { CiCloudSun } from "react-icons/ci";

const FiveDaysCard = styled.div`
  flex-basis: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h3`
  margin-bottom: 10px;
  text-align: center;
  font-size: 1.6rem;
`;

const DayContainer = styled.div`
  display: flex;
  align-items: center;
`;

const WeatherIcon = styled(CiCloudSun)`
  flex-basis: 20%;
  font-size: 28px;
`;

const TemperatureValue = styled.div`
  flex-basis: 30%;
  text-align: center;
  font-size: 1.2rem;
`;

const DateValue = styled.div`
  flex-grow: 1;
  text-align: center;
`;

const Weather5day = () => {
  return (
    <FiveDaysCard>
      <Title>5 Days Forecast</Title>
      <DayContainer>
        <WeatherIcon />
        <TemperatureValue>20&deg;C</TemperatureValue>
        <DateValue>Friday, 1 Sep</DateValue>
      </DayContainer>
      <DayContainer>
        <WeatherIcon />
        <TemperatureValue>22&deg;C</TemperatureValue>
        <DateValue>Saturday, 2 Sep</DateValue>
      </DayContainer>
      <DayContainer>
        <WeatherIcon />
        <TemperatureValue>27&deg;C</TemperatureValue>
        <DateValue>Sunday, 3 Sep</DateValue>
      </DayContainer>
      <DayContainer>
        <WeatherIcon />
        <TemperatureValue>18&deg;C</TemperatureValue>
        <DateValue>Monday, 4 Sep</DateValue>
      </DayContainer>
      <DayContainer>
        <WeatherIcon />
        <TemperatureValue>16&deg;C</TemperatureValue>
        <DateValue>Tuesday, 5 Sep</DateValue>
      </DayContainer>
    </FiveDaysCard>
  );
};

export default Weather5day;
