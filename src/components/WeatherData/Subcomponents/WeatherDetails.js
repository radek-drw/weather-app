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

const SunriseSunset = styled.div`
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
  font-size: 2rem;
  color: red;
`;

const SunriseSunsetLabel = styled.p``;

const SunriseSunsetTime = styled.div``;

const SkyCondition = styled.p``;

const Metric = styled.div``;

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
          <SunriseSunset>
            <SunriseSunsetIcon>
              <WiSunrise />
            </SunriseSunsetIcon>
            <div>
              <SunriseSunsetLabel>Sunrise</SunriseSunsetLabel>
              <SunriseSunsetTime>06:37</SunriseSunsetTime>
            </div>
          </SunriseSunset>
          <SunriseSunset>
            <SunriseSunsetIcon>
              <WiSunset />
            </SunriseSunsetIcon>
            <div>
              <SunriseSunsetLabel>Sunset</SunriseSunsetLabel>
              <SunriseSunsetTime>21:40</SunriseSunsetTime>
            </div>
          </SunriseSunset>
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
          <WiHumidity size={30} /> <span>41%</span>
          <p>Humidity</p>
        </Metric>
        <Metric>
          <FaWind size={30} /> <span>2km/h</span>
          <p>Wind Speed</p>
        </Metric>
        <Metric>
          <WiBarometer size={30} /> <span>997hPa</span>
          <p>Pressure</p>
        </Metric>
        <Metric>
          <FaSun />
          <span>8</span>
          <p>UV</p>
        </Metric>
      </Panel>
    </DetailsCard>
  );
};

export default WeatherDetails;
