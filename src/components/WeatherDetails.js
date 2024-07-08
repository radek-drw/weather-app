import React from "react";
import styled, { css } from "styled-components";
import { WiSunrise, WiSunset, WiHumidity, WiBarometer } from "react-icons/wi";
import { MdOutlineVisibility } from "react-icons/md";
import { FaWind } from "react-icons/fa";
import media from "../styles/media";

import { useWeather } from "../WeatherContext";
import { weatherIcons } from '../utils/weatherIcons';

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

const SunTwilight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  &:first-of-type {
    margin-bottom: -5px;
  }

  div {
    text-align: left;
    margin-left: 4px;
  }
`;

const SunriseIcon = styled(WiSunrise)`
  font-size: 40px;
  color: ${twilightColors.sunrise};
`;

const SunsetIcon = styled(WiSunset)`
  font-size: 40px;
  color: ${twilightColors.sunset};
`;

const SkyCondIcon = styled.img`
  width: 100px;
  height: 100px;
  
  ${media.mobile`
    width: 75px;
    height: 75px;
  `}
`;

const SkyCondition = styled.h3`
  font-size: 1.6rem;
`;

const Metric = styled.div`
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

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

const VisibilityIcon = styled(MdOutlineVisibility)`
  ${MetricIconStyles}
  font-size: 25px;
`;


const WeatherDetails = () => {
  const { weatherData, tempUnit } = useWeather();

  if (!weatherData) {
    return null
  }

  const {
    main: { temp, feels_like, humidity, pressure },
    weather,
    wind: { speed },
    sys: { sunrise, sunset },
    visibility,
    timezone,
  } = weatherData;

  const weatherIconCode = weather[0].icon; 
  const WeatherIconUrl = weatherIcons[weatherIconCode]; 

  const roundedTemp = Math.round(temp);
  const roundedFeelsLike = Math.round(feels_like);

  const options = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC' };

  const sunriseTime = new Date((sunrise + timezone) * 1000).toLocaleTimeString('en-GB', options);
  const sunsetTime = new Date((sunset + timezone) * 1000).toLocaleTimeString('en-GB', options);

  return (
    <DetailsCard>
      {/* PANEL LEFT */}
      <Panel>
        <div>
          <CurrentTemp>{roundedTemp}&deg;{tempUnit === 'metric' ? 'C' : 'F'}</CurrentTemp>
          <FeelsLikeTemp>
            Feels like: <span>{roundedFeelsLike}&deg;{tempUnit === 'metric' ? 'C' : 'F'}</span>
          </FeelsLikeTemp>
        </div>
        <div>
          <SunTwilight>
            <SunriseIcon />
            <div>
              <p>Sunrise</p>
              <div>{sunriseTime}</div>
            </div>
          </SunTwilight>
          <SunTwilight>
            <SunsetIcon />
            <div>
              <p>Sunset</p>
              <div>{sunsetTime}</div>
            </div>
          </SunTwilight>
        </div>
      </Panel>

      {/* PANEL MIDDLE */}
      <Panel>
        <SkyCondIcon src={WeatherIconUrl} alt={weather[0].main} />
        <SkyCondition>{weather[0].main}</SkyCondition>
      </Panel>

      {/* PANEL RIGHT */}
      <Panel>
        <Metric>
          <HumidityIcon />
          <MetricValue>{humidity}%</MetricValue>
          <MetricLabel>Humidity</MetricLabel>
        </Metric>
        <Metric>
          <WindIcon />
          <MetricValue>{Math.round(speed)} km/h</MetricValue>
          <MetricLabel>Wind Speed</MetricLabel>
        </Metric>
        <Metric>
          <BarometerIcon />
          <MetricValue>{pressure} hPa</MetricValue>
          <MetricLabel>Pressure</MetricLabel>
        </Metric>
        <Metric>
          <VisibilityIcon />
          <MetricValue>{visibility / 1000} km</MetricValue>
          <MetricLabel>Visibility</MetricLabel>
        </Metric>
      </Panel>
    </DetailsCard>
  );
};

export default WeatherDetails;