import styled from "styled-components";
import { FaLocationArrow } from "react-icons/fa";

export const HourlyCard = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 65%;
`;

export const Title = styled.h3`
  margin-bottom: 15px;
  font-size: 1.6rem;
  text-align: center;
`;

export const HourlyContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
`;

export const HourlyItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-basis: 18%;
  padding: 1rem 0.5rem;
  background-color: ${({ theme }) => theme.colors.hourlyItemBackground};
  border-radius: 15px;
`;

export const WeatherIcon = styled.img`
  width: 34px;
  height: 34px;
`;

export const WindSpeedIndicator = styled(FaLocationArrow)`
  font-size: 15px;
  color: #00aaff;
`;
