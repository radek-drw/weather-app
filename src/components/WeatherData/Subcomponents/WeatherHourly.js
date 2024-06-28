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
  margin-bottom: 15px;
  text-align: center;
  font-size: 1.6rem;
`;

const HourlyContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
`;

const HourlyItem = styled.div`
  flex-basis: 18%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0.5rem;
  background-color: #1e2127;
  border-radius: 15px;
`;

const SkyCondIcon = styled(CiCloudSun)`
  flex-basis: 20%;
  font-size: 28px;
`;

const WindSpeedIndicator = styled(CiLocationArrow1)`
  flex-basis: 20%;
  font-size: 22px;
`;

const WeatherHourly = () => {
  return (
    <HourlyCard>
      <Title>Hourly Forecast</Title>
      <HourlyContainer>
        <HourlyItem>
          <span>12:00</span>
          <SkyCondIcon />
          <span>26&deg;C</span>
          <WindSpeedIndicator />
          <span>3km/h</span>
        </HourlyItem>
        <HourlyItem>
          <span>15:00</span>
          <SkyCondIcon />
          <span>27&deg;C</span>
          <WindSpeedIndicator />
          <span>2km/h</span>
        </HourlyItem>
        <HourlyItem>
          <span>18:00</span>
          <SkyCondIcon />
          <span>27&deg;C</span>
          <WindSpeedIndicator />
          <span>2km/h</span>
        </HourlyItem>
        <HourlyItem>
          <span>21:00</span>
          <SkyCondIcon />
          <span>25&deg;C</span>
          <WindSpeedIndicator />
          <span>3km/h</span>
        </HourlyItem>
        <HourlyItem>
          <span>00:00</span>
          <SkyCondIcon />
          <span>22&deg;C</span>
          <WindSpeedIndicator />
          <span>3km/h</span>
        </HourlyItem>
      </HourlyContainer>
    </HourlyCard>
  );
};

export default WeatherHourly;
