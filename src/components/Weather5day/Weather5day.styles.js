import styled from "styled-components";

export const FiveDaysCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-basis: 30%;
`;

export const Title = styled.h3`
  margin-bottom: 10px;
  text-align: center;
  font-size: 1.6rem;
`;

export const DayContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const WeatherIcon = styled.img`
  flex-basis: 25%;
  height: 28px;
`;

export const TemperatureValue = styled.div`
  flex-basis: 30%;
  text-align: center;
  font-size: 1.1rem;
`;

export const DateValue = styled.div`
  flex-grow: 1;
  text-align: center;
`;
