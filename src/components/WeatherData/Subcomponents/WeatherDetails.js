import React from "react";

import styled, { css } from "styled-components";

import { WiSunrise, WiSunset, WiHumidity, WiBarometer } from "react-icons/wi";
import { FaWind, FaSun } from "react-icons/fa";
import { PiSunFill } from "react-icons/pi";

const twilightColors = {
  sunrise: "#ffd700",
  sunset: "#ff6347",
};

const DetailsCard = styled.div`
  flex-basis: 65%;
  display: flex;
  justify-content: space-between;
`;

const Panel = styled.div`
  flex-basis: 33%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  &:nth-child(2) {
    justify-content: space-around;
    align-items: center;
  }
  &:nth-child(3) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const CurrentTemp = styled.div`
  font-size: 3.5rem;
`;

const FeelsLikeTemp = styled.div`
  color: ${({ theme }) => theme.colors.mutedText};
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    margin: 5px;
    font-size: 1.6rem;
  }
`;

const SunriseSunsetWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    text-align: left;
  }
  &:first-of-type {
    margin-bottom: 7px;
  }
`;

const SunriseSunsetIcon = styled.div`
  margin-right: 8px;
`;

const SunriseIcon = styled(WiSunrise)`
  font-size: 40px;
  color: ${twilightColors.sunrise};
`;

const SunsetIcon = styled(WiSunset)`
  font-size: 40px;
  color: ${twilightColors.sunset};
`;

const SkyCondIcon = styled(PiSunFill)`
  font-size: 8.6rem;
  color: ${twilightColors.sunrise};
`;

const SkyCondition = styled.p`
  font-size: 1.6rem;
`;

const Metric = styled.div`
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.mutedText};
  &:nth-child(1),
  &:nth-child(2) {
    margin-bottom: 14px;
  }
`;

const MetricIconStyles = css`
  height: 40px;
`;

const MetricValue = styled.div`
  font-size: 1.1rem;
`;

const MetricLabel = styled.p`
  display: flex;
  align-items: flex-end;
  font-size: 0.9rem;
  flex-grow: 1;
`;

const HumidityIcon = styled(WiHumidity)`
  ${MetricIconStyles}
  font-size: 37px;
`;

const WindIcon = styled(FaWind)`
  ${MetricIconStyles}
  font-size: 24px;
`;

const BarometerIcon = styled(WiBarometer)`
  ${MetricIconStyles}
  font-size: 44px;
`;

const SunIcon = styled(FaSun)`
  ${MetricIconStyles}
  font-size: 25px;
`;

const IconWithLabel = ({ icon: Icon, label, time }) => (
  <SunriseSunsetWrapper>
    <SunriseSunsetIcon>
      <Icon />
    </SunriseSunsetIcon>
    <div>
      <p>{label}</p>
      <div>{time}</div>
    </div>
  </SunriseSunsetWrapper>
);

const WeatherDetails = () => {
  return (
    <DetailsCard>
      {/* PANEL LEFT */}
      <Panel>
        <div>
          <CurrentTemp>24&deg;C</CurrentTemp>
          <FeelsLikeTemp>
            Feels like: <span>22&deg;C</span>
          </FeelsLikeTemp>
        </div>
        <div>
          <IconWithLabel icon={SunriseIcon} label="Sunrise" time="06:37" />
          <IconWithLabel icon={SunsetIcon} label="Sunset" time="21:40" />
        </div>
      </Panel>

      {/* PANEL MIDDLE */}
      <Panel>
        <SkyCondIcon />
        <SkyCondition>Sunny</SkyCondition>
      </Panel>

      {/* PANEL RIGHT */}
      <Panel>
        <Metric>
          <HumidityIcon />
          <MetricValue>41%</MetricValue>
          <MetricLabel>Humidity</MetricLabel>
        </Metric>
        <Metric>
          <WindIcon />
          <MetricValue>2km/h</MetricValue>
          <MetricLabel>Wind Speed</MetricLabel>
        </Metric>
        <Metric>
          <BarometerIcon />
          <MetricValue>997hPa</MetricValue>
          <MetricLabel>Pressure</MetricLabel>
        </Metric>
        <Metric>
          <SunIcon />
          <MetricValue>8</MetricValue>
          <MetricLabel>UV</MetricLabel>
        </Metric>
      </Panel>
    </DetailsCard>
  );
};

export default WeatherDetails;
