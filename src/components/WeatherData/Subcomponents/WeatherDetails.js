import React from "react";
import styled from "styled-components";

import sunriseImg from "../../../assets/images/sunrise.svg";

const DetailsCard = styled.div`
  flex-basis: 65%;
  display: flex;
  justify-content: space-between;
`;

const Panel = styled.div`
  flex-basis: 33%;
  text-align: center;
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
  background-color: cadetblue;
  border-bottom: 1px solid white;
`;

const Time = styled.div``;

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
            <img src={sunriseImg} alt="Sunrise" />
            <p>Sunrise</p>
            <Time>06:37</Time>
          </SunriseSunset>
          <SunriseSunset>
            {/* sunset icon here */}
            <p>Sunset</p>
            <Time>21:40</Time>
          </SunriseSunset>
        </Twilight>
      </Panel>

      {/* PANEL MIDDLE */}
      <Panel>
        {/* sun icon here */}
        <SkyCondition>Sunny</SkyCondition>
      </Panel>

      {/* PANEL RIGHT */}
      <Panel>
        <Metric>
          {/* humidity icon here */}
          <span>41%</span>
          <p>Humidity</p>
        </Metric>
        <Metric>
          {/* wind icon here */}
          <span>2km/h</span>
          <p>Wind Speed</p>
        </Metric>
        <Metric>
          {/* pressure icon here */}
          <span>997hPa</span>
          <p>Pressure</p>
        </Metric>
        <Metric>
          {/* uv icon here */}
          <span>8</span>
          <p>UV</p>
        </Metric>
      </Panel>
    </DetailsCard>
  );
};

export default WeatherDetails;
