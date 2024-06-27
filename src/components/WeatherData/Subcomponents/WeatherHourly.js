import React from "react";
import styled from "styled-components";

import { CiCloudSun } from "react-icons/ci";
import { CiLocationArrow1 } from "react-icons/ci";

const HourlyCard = styled.div`
  flex-basis: 65%;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: 1.6rem;
  text-align: center;
  margin-bottom: 15px;
`;

const HourlyContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
`;

const HourlyItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #1e2127;
  border-radius: 15px;
  padding: 1rem 0.5rem;
  flex-basis: 18%;
`;

const TimeLabel = styled.span``;

const SkyCondIcon = styled(CiCloudSun)`
  font-size: 28px;
  flex-basis: 20%;
`;

const TemperatureValue = styled.span``;

const WindSpeedIndicator = styled(CiLocationArrow1)`
  font-size: 22px;
  flex-basis: 20%;
`;
const WindSpeedLabel = styled.span``;

const WeatherHourly = () => {
  return (
    <HourlyCard>
      <Title>Hourly Forecast</Title>
      <HourlyContainer>
        <HourlyItem>
          <TimeLabel>12:00</TimeLabel>
          <SkyCondIcon />
          <TemperatureValue>26&deg;C</TemperatureValue>
          <WindSpeedIndicator />
          <WindSpeedLabel>3km/h</WindSpeedLabel>
        </HourlyItem>
        <HourlyItem>
          <TimeLabel>15:00</TimeLabel>
          <SkyCondIcon />
          <TemperatureValue>27&deg;C</TemperatureValue>
          <WindSpeedIndicator />
          <WindSpeedLabel>2km/h</WindSpeedLabel>
        </HourlyItem>
        <HourlyItem>
          <TimeLabel>18:00</TimeLabel>
          <SkyCondIcon />
          <TemperatureValue>27&deg;C</TemperatureValue>
          <WindSpeedIndicator />
          <WindSpeedLabel>2km/h</WindSpeedLabel>
        </HourlyItem>
        <HourlyItem>
          <TimeLabel>21:00</TimeLabel>
          <SkyCondIcon />
          <TemperatureValue>25&deg;C</TemperatureValue>
          <WindSpeedIndicator />
          <WindSpeedLabel>3km/h</WindSpeedLabel>
        </HourlyItem>
        <HourlyItem>
          <TimeLabel>00:00</TimeLabel>
          <SkyCondIcon />
          <TemperatureValue>22&deg;C</TemperatureValue>
          <WindSpeedIndicator />
          <WindSpeedLabel>3km/h</WindSpeedLabel>
        </HourlyItem>
      </HourlyContainer>
    </HourlyCard>
  );
};

export default WeatherHourly;
