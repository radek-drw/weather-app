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
  font-size: 1.6rem;
  text-align: center;
  margin-bottom: 10px;
`;

const DayContainer = styled.div`
  display: flex;
  align-items: center;
`;

const WeatherIcon = styled(CiCloudSun)`
  font-size: 28px;
  flex-basis: 20%;
  /* background-color: green; */
`;

const TemperatureValue = styled.div`
  flex-basis: 30%;
  text-align: center;
  /* background-color: cadetblue; */
  font-size: 1.2rem;
`;

const DateValue = styled.div`
  flex-grow: 1;
  text-align: center;
  /* background-color: violet; */
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
