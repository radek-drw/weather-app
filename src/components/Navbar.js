import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import media from "../styles/media";
import { useWeather } from "../WeatherContext";
import Toggle from "./subcomponent/Toggle";
import { LuMapPin } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  height: 35px;
  margin-bottom: 20px;
`;

const SearchContainer = styled.form`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 40%;
  min-width: 100px;
  max-width: 350px;
  border-radius: 5px;
  box-shadow: 0 0 10px ${({ theme }) => theme.colors.searchShadow};
  transition: box-shadow 0.3s ease;

  &:focus-within {
    box-shadow: 0 0 15px ${({ theme }) => theme.colors.searchShadowFocus};
  }
`;

const SearchIcon = styled(CiSearch)`
  align-self: center;
  flex-basis: 10%;
  font-size: 2.2rem;
  color: ${({ theme }) => theme.colors.mutedText};
`;

const SearchInput = styled.input`
  flex-grow: 1;
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

const SearchButton = styled.button`
  position: absolute;
  left: 100%;
  height: 100%;
  top: 0;
  padding: 0 1.2rem;
  background-color: ${({ theme }) => theme.colors.searchBtnBackground};
  color: ${({ theme }) => theme.colors.searchBtnText};
  border: none;
  border-radius: 0 5px 5px 0;
  font-size: 1.3rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.searchBtnHover};
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

const ErrorText = styled.p`
  position: absolute;
  top: 103%;
  left: 0;
  color: red;
  font-size: 1.05rem;
`;

const Navbar = () => {
  const { fetchWeatherData, fetchWeatherByCoordinates, error } = useWeather();
  const [city, setCity] = useState("");
  const [localError, setLocalError] = useState("");
  const inputRef = useRef(null);

  const handleFetchWeather = (e) => {
    e.preventDefault();
    const trimmedCity = city.trim();
    const cityRegex = /^[a-zA-Z\s-]+$/;

    if (trimmedCity.length < 2) {
      setLocalError("City name is too short. Please enter a valid city name.");
      inputRef.current.focus();
    } else if (trimmedCity.length > 50) {
      setLocalError("City name is too long. Please enter a valid city name.");
      inputRef.current.focus();
    } else if (!cityRegex.test(trimmedCity)) {
      setLocalError("City name contains invalid characters. Please enter a valid city name.");
      inputRef.current.focus();
    } else {
      fetchWeatherData(trimmedCity);
      setCity("");
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
    setLocalError("");
  };

  const handleFetchWeatherByLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoordinates(latitude, longitude);
        },
        (err) => {
          setLocalError("Unable to retrieve your location.");
        }
      );
    } else {
      setLocalError("Geolocation is not supported by this browser.");
    }
  };

  // Focus on the input when there's an error
  useEffect(() => {
    if (error) {
      inputRef.current.focus();
    }
  }, [error]);

  return (
    <Nav>
      <Toggle />
      <SearchContainer onSubmit={handleFetchWeather}>
        <SearchIcon />
        <SearchInput
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="Search for city..."
          ref={inputRef}
        />
        <SearchButton type="submit">Search</SearchButton>
        {localError && <ErrorText>{localError}</ErrorText>}
      </SearchContainer>
      <CurrentLocationButton onClick={handleFetchWeatherByLocation}>
        <LocationIcon />
        <LocationLabel>Current location</LocationLabel>
      </CurrentLocationButton>
    </Nav>
  );
};

export default Navbar;
