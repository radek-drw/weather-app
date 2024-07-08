import React from "react";
import styled from "styled-components";
import { FaLocationArrow } from "react-icons/fa";
import { useWeather } from "../WeatherContext";
import { weatherIcons } from "../utils/weatherIcons";

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
  background-color: ${({ theme }) => theme.colors.hourlyItemBackground};
  border-radius: 15px;
`;

const WeatherIcon = styled.img`
  width: 34px;
  height: 34px;
`;

const WindSpeedIndicator = styled(FaLocationArrow)`
  font-size: 15px;
  color: #00aaff;
`;

const WeatherHourly = () => {
  const { weatherData, forecastData, tempUnit } = useWeather();

  if (!weatherData || !forecastData) {
    return null
  }

  const cityTimezoneOffset = weatherData.timezone;
  const localTime = (unixUtcTimestamp) => {
    const dt = new Date(unixUtcTimestamp * 1000);
    dt.setUTCSeconds(dt.getUTCSeconds() + cityTimezoneOffset);
    return dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <HourlyCard>
      <Title>Hourly Forecast</Title>
      <HourlyContainer>
        {forecastData.slice(0, 5).map((forecast, index) => (
          <HourlyItem key={index}>
            <span>{localTime(forecast.dt)}</span>
            <WeatherIcon src={weatherIcons[forecast.weather[0].icon]} alt={forecast.weather[0].description} />
            <span>{Math.round(forecast.main.temp)}&deg;{tempUnit === 'metric' ? 'C' : 'F'}</span>
            <WindSpeedIndicator style={{ transform: `rotate(${forecast.wind.deg}deg)` }} />
            <span>{Math.round(forecast.wind.speed)}km/h</span>
          </HourlyItem>
        ))}
      </HourlyContainer>
    </HourlyCard>
  );
};

export default WeatherHourly;
