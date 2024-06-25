import React from "react";
import styled, { css } from "styled-components";
import { WiSunrise, WiSunset, WiHumidity, WiBarometer } from "react-icons/wi";
import { FaWind, FaSun } from "react-icons/fa";

const DetailsCard = styled.div`
  flex-basis: 65%;
  display: flex;
  justify-content: space-between;
`;

const Panel = styled.div`
  flex-basis: 33%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &:last-of-type {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const TempContainer = styled.div``;

const CurrentTemp = styled.div`
  font-size: 3.5rem;
`;

const FeelsLikeTemp = styled.div`
  color: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: 1.6rem;
    margin: 5px;
  }
`;

const Twilight = styled.div``;

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
  color: #ffd700; /*goldenyellow*/
  font-size: 40px;
`;

const SunsetIcon = styled(WiSunset)`
  color: #ff6347; /*deep red*/
  font-size: 40px;
`;

const SunriseSunsetLabel = styled.p``;

const SunriseSunsetTime = styled.div``;

const SkyCondition = styled.p``;

const Metric = styled.div`
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: #ddd;
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
  font-size: 0.9rem;
  flex-grow: 1;
  display: flex;
  align-items: flex-end;
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
  font-size: 50px;
`;

const SunIcon = styled(FaSun)`
  ${MetricIconStyles}
  font-size: 27px;
`;

const WeatherDetails = () => {
  return (
    <DetailsCard>
      {/* PANEL LEFT */}
      <Panel>
        <TempContainer>
          <CurrentTemp>24&deg;C</CurrentTemp>
          <FeelsLikeTemp>
            Feels like: <span>22&deg;C</span>
          </FeelsLikeTemp>
        </TempContainer>
        <Twilight>
          <SunriseSunsetWrapper>
            <SunriseSunsetIcon>
              <SunriseIcon />
            </SunriseSunsetIcon>
            <div>
              <SunriseSunsetLabel>Sunrise</SunriseSunsetLabel>
              <SunriseSunsetTime>06:37</SunriseSunsetTime>
            </div>
          </SunriseSunsetWrapper>
          <SunriseSunsetWrapper>
            <SunriseSunsetIcon>
              <SunsetIcon />
            </SunriseSunsetIcon>
            <div>
              <SunriseSunsetLabel>Sunset</SunriseSunsetLabel>
              <SunriseSunsetTime>21:40</SunriseSunsetTime>
            </div>
          </SunriseSunsetWrapper>
        </Twilight>
      </Panel>

      {/* PANEL MIDDLE */}
      <Panel>
        <SkyCondition>
          {/* sky condition icon here */}
          Sunny
        </SkyCondition>
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
