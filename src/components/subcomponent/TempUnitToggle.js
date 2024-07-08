import React from "react";
import styled from "styled-components";
import { useWeather } from "../../WeatherContext";

const ToggleButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  margin-left: 10px;
  color: ${({ theme }) => theme.colors.text};
  transition: color 0.3s ease;

  &:hover {
    text-decoration: underline;
  }
`;

const TempUnitToggle = () => {
  const { tempUnit, toggleTempUnit } = useWeather();
  
  return (
    <ToggleButton onClick={toggleTempUnit}>
      Switch to {tempUnit === 'metric' ? '°F' : '°C'}
    </ToggleButton>
  );
};

export default TempUnitToggle;
