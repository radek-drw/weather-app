import styled from "styled-components";
import { LuMapPin } from "react-icons/lu";

export const CityCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-basis: 30%;
`;

export const CityName = styled.h1`
  margin-bottom: 0.4rem;
  text-align: center;
  font-size: 2rem;
  color: inherit;
`;

export const CityLocationDetails = styled.div`
  margin-bottom: 1rem;
  font-size: 1rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.mutedText};
`;

export const LocationIcon = styled(LuMapPin)`
  margin-left: 8px;
  font-size: 1.6rem;
`;

export const CityTime = styled.div`
  margin-bottom: 0.5rem;
  font-size: 4rem;
  color: #00aaff; /* Light blue color for time */
`;

export const CityDate = styled.div`
  color: ${({ theme }) => theme.colors.mutedText};
`;
