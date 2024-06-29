import React from "react";

import styled from "styled-components";

const CityCard = styled.div`
  flex-basis: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CityName = styled.h1`
  margin-bottom: 1rem;
  font-size: 2rem;
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
  return (
    <CityCard>
      <CityName>Athens</CityName>
      <CityTime>09:03</CityTime>
      <CityDate>Thursday, 31 Aug</CityDate>
    </CityCard>
  );
};

export default WeatherCurrentCity;
