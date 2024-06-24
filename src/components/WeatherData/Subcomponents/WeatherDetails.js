import React from "react";
import styled from "styled-components";
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
  border: 1px solid white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  p {
    margin: auto 0 0 0;
    flex-grow: 1; /* Added to push p to the bottom */
    display: flex;
    align-items: flex-end;
  }
`;

const HumidityIcon = styled(WiHumidity)`
  height: 40%;
  font-size: 25px;
`;

const HumidityValue = styled.div``;

const WindIcon = styled(FaWind)`
  height: 40%;
  font-size: 21px;
`;
const WindValue = styled.div``;

const BarometerIcon = styled(WiBarometer)`
  height: 40%;
  font-size: 28px;
`;
const BarometerValue = styled.div``;

const SunIcon = styled(FaSun)`
  height: 40%;
  font-size: 24px;
`;
const SunValue = styled.div``;

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
          <HumidityValue>41%</HumidityValue>
          <p>Humidity</p>
        </Metric>
        <Metric>
          <WindIcon />
          <WindValue>2km/h</WindValue>
          <p>Wind Speed</p>
        </Metric>
        <Metric>
          <BarometerIcon />
          <BarometerValue>997hPa</BarometerValue>
          <p>Pressure</p>
        </Metric>
        <Metric>
          <SunIcon />
          <SunValue>8</SunValue>
          <p>UV</p>
        </Metric>
      </Panel>
    </DetailsCard>
  );
};

export default WeatherDetails;
