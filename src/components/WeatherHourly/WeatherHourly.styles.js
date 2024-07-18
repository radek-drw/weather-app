import styled from "styled-components";
import { FaLocationArrow } from "react-icons/fa";

export const HourlyCard = styled.div`
  flex-basis: 65%;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h3`
  margin-bottom: 15px;
  text-align: center;
  font-size: 1.6rem;
`;

export const HourlyContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
`;

export const HourlyItem = styled.div`
  flex-basis: 18%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
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
