import React, { useState, useEffect } from "react";
import { useWeather } from "../WeatherContext";
import styled from "styled-components";
import { LuMapPin } from "react-icons/lu";
import { useTranslation } from 'react-i18next';

const CityCard = styled.div`
  flex-basis: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CityName = styled.h1`
  margin-bottom: 0.4rem;
  font-size: 2rem;
  color: inherit;
`;

const CityLocationDetails = styled.div`
  color: ${({ theme }) => theme.colors.mutedText};
  font-size: 1rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const LocationIcon = styled(LuMapPin)`
  margin-left: 8px;
  font-size: 1.6rem;
`;

const CityTime = styled.div`
  margin-bottom: 0.5rem;
  font-size: 4rem;
  color: #00aaff; /* Light blue color for time */
`;

const CityDate = styled.div`
  color: ${({ theme }) => theme.colors.mutedText};
`;

const WeatherCurrentCity = () => {
  const { weatherData, error, isCurrentLocation } = useWeather();
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const { i18n } = useTranslation();

  useEffect(() => {
    if (weatherData?.timezone !== undefined) {
      const fetchTimeData = () => {
        try {
          const now = new Date();
          const utcOffsetInMs = weatherData.timezone * 1000;
          const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
          const localTime = new Date(utcTime + utcOffsetInMs);

          setCurrentTime(
            localTime.toLocaleTimeString(i18n.language, {
              hour: "2-digit",
              minute: "2-digit",
            })
          );
          setCurrentDate(
            localTime.toLocaleDateString(i18n.language, {
              weekday: "long",
              day: "numeric",
              month: "long",
            })
          );
        } catch (error) {
          console.error("Error calculating local time:", error);
        }
      };

      fetchTimeData();
    }
  }, [weatherData, i18n.language]);

  if (!weatherData) {
    return null;
  }

  const { additionalDetails = {} } = weatherData;

  return (
    <CityCard>
      <CityName>
        {weatherData.name}
        {isCurrentLocation && !error && <LocationIcon />}
      </CityName>
      <CityLocationDetails>
        {weatherData.name}
        {additionalDetails.county && `, ${additionalDetails.county}`}
        {additionalDetails.state && `, ${additionalDetails.state}`}
        {`, ${weatherData.sys.country}`}
      </CityLocationDetails>
      <CityTime>{currentTime}</CityTime>
      <CityDate>{currentDate}</CityDate>
    </CityCard>
  );
};

export default WeatherCurrentCity;