import React from "react";

import styled from "styled-components";
import media from "../styles/media";

import Toggle from "./WeatherData/Subcomponents/Toggle";

import { LuMapPin } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  height: 35px;
  margin-bottom: 20px;
`;

const InputContainer = styled.div`
  position: relative;
  width: 50%;
  min-width: 100px;
  max-width: 350px;
  border-radius: 5px;
  box-shadow: 0 0 10px ${({ theme }) => theme.colors.searchShadow};
  overflow: hidden;
  transition: box-shadow 0.3s ease;
  &:focus-within {
    box-shadow: 0 0 15px ${({ theme }) => theme.colors.searchShadowFocus};
  }
`;

const SearchIcon = styled(CiSearch)`
  position: absolute;
  top: 50%;
  left: 10px;
  width: 15px;
  height: 15px;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.mutedText};
`;

const SearchInput = styled.input`
  position: absolute;
  width: calc(100% - 30px);
  top: 0;
  height: 100%;
  left: 30px;
  padding: 0.5rem;
  border: none;
  background-color: inherit;
  color: ${({ theme }) => theme.colors.text};
  outline: none;
  font-size: 1.2rem;

  &::placeholder {
    color: ${({ theme }) => theme.colors.mutedText};
  }
`;

const CurrentLocationButton = styled.button`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  min-height: 25px;
  align-self: center;
  background-color: rgb(0, 128, 0);
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  transition: background-color 0.3s;
  &:hover {
    background-color: rgb(0, 114, 0);
  }

  ${media.mobile`
    background-color: transparent;
    position: relative;
    left: -10%;
  `}
`;

const LocationIcon = styled(LuMapPin)`
  width: 14px;
  height: 14px;
  color: white;
`;

const LocationLabel = styled.p`
  margin-left: 5px;

  ${media.mobile`
    display: none;
  `}
`;

const Navbar = () => {
  return (
    <Nav>
      <Toggle />
      <InputContainer>
        <SearchInput type="text" placeholder="Search for city..." />
        <SearchIcon />
      </InputContainer>
      <CurrentLocationButton>
        <LocationIcon />
        <LocationLabel>Current location</LocationLabel>
      </CurrentLocationButton>
    </Nav>
  );
};

export default Navbar;
