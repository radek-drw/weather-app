import React from "react";
import styled from "styled-components";

const DetailsCard = styled.div``;

const Panel = styled.div``;

const TempContainer = styled.div``;

const CurrentTemp = styled.div``;

const FeelsLikeTemp = styled.div``;

const Twilight = styled.div``;

const SunriseSunset = styled.div``;

const Time = styled.div``;

const SkyCondition = styled.p``;

const Metric = styled.div``;

const WeatherDetails = () => {
  return (
    <DetailsCard>
      {/* PANEL LEFT */}
      <Panel>
        <TempContainer>
          <CurrentTemp>24C</CurrentTemp>
          <FeelsLikeTemp>
            Feels like: <span>22C</span>
          </FeelsLikeTemp>
        </TempContainer>
        <Twilight>
          <SunriseSunset>
            {/* sunrise icon here */}
            <p>Sunrise</p>
            <Time>08:37 AM</Time>
          </SunriseSunset>
          <SunriseSunset>
            {/* sunset icon here */}
            <p>Sunset</p>
            <Time>09:40 PM</Time>
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
