import React, { useState, useEffect } from "react";
import { useWeather } from "../WeatherContext";
import styled from "styled-components";
import { FaExclamationTriangle } from "react-icons/fa";
import { BeatLoader } from "react-spinners"; // Import BeatLoader

const CityCard = styled.div`
  flex-basis: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CityName = styled.h1`
  margin-bottom: 1rem;
  font-size: ${({ isError }) => (isError ? "1.4rem" : "2rem")};
  color: ${({ isError }) => (isError ? "orange" : "inherit")};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ErrorIcon = styled(FaExclamationTriangle)`
  font-size: 2.6rem;
  color: orange;
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
  const { weatherData, loading, error } = useWeather();
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    if (weatherData?.timezone !== undefined) {
      const fetchTimeData = () => {
        try {
          const now = new Date();
          const utcOffsetInMs = weatherData.timezone * 1000;
          const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
          const localTime = new Date(utcTime + utcOffsetInMs);

          setCurrentTime(
            localTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          );
          setCurrentDate(
            localTime.toLocaleDateString("en-GB", {
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
  }, [weatherData]);

  if (loading) {
    return (
      <CityCard>
        <BeatLoader color="#00aaff" loading={loading} size={15} />
        <div>Loading weather data...</div>
      </CityCard>
    );
  }

  if (!weatherData) {
    return (
      <CityCard>
        <CityName isError={true}>No weather data available.</CityName>
        <ErrorIcon />
      </CityCard>
    );
  }

  return (
    <CityCard>
      <CityName isError={error}>
        {error ? error : `${weatherData.name}, ${weatherData.sys.country}`}
      </CityName>
      {error ? <ErrorIcon /> : null}
      {!error && (
        <>
          <CityTime>{currentTime}</CityTime>
          <CityDate>{currentDate}</CityDate>
        </>
      )}
    </CityCard>
  );
};

export default WeatherCurrentCity;
