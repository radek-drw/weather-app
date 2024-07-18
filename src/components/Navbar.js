import React, { useState, useEffect, useRef } from "react";
import { useWeather } from "../WeatherContext";
import CitySuggestions from "./subcomponent/CitySuggestions";
import ThemeToggle from "./subcomponent/ThemeToggle";
import TempUnitToggle from "./subcomponent/TempUnitToggle";
import LanguageSelector from "./subcomponent/LanguageSelector";
import { useTranslation } from 'react-i18next';
import {
  Nav,
  SearchContainer,
  SearchIcon,
  SearchInput,
  SearchButton,
  CurrentLocationButton,
  LocationIcon,
  LocationLabel,
  ErrorText
} from "./NavbarStyles";

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

const Navbar = () => {
  const { fetchWeatherData, fetchWeatherByCoordinates, error, setError } = useWeather();
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [localError, setLocalError] = useState("");
  const inputRef = useRef(null);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&language=${i18n.language}`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      console.log("Google Maps API loaded");
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [i18n.language]);

  const handleFetchWeather = (e) => {
    e.preventDefault();
    const trimmedCity = city.trim();
    const cityRegex = /^[a-zA-Z\s-,]+$/;

    if (trimmedCity.length < 2) {
      setLocalError(t('errors.shortCityName'));
      inputRef.current.focus();
    } else if (trimmedCity.length > 50) {
      setLocalError(t('errors.longCityName'));
      inputRef.current.focus();
    } else if (!cityRegex.test(trimmedCity)) {
      setLocalError(t('errors.invalidCityName'));
      inputRef.current.focus();
    } else {
      fetchWeatherData(trimmedCity);
      setCity("");
      setSuggestions([]);
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
    setLocalError("");
    if (e.target.value.length >= 3) {
      const service = new window.google.maps.places.AutocompleteService();
      service.getPlacePredictions(
        { input: e.target.value, types: ["(cities)"], language: i18n.language },
        (predictions, status) => {
          if (status !== window.google.maps.places.PlacesServiceStatus.OK || !predictions) {
            console.error("Error fetching city suggestions:", status);
            return;
          }

          const suggestions = predictions.map(prediction => ({
            description: prediction.description,
            placeId: prediction.place_id
          }));
          setSuggestions(suggestions);
        }
      );
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectCity = async (selectedCity) => {
    const service = new window.google.maps.places.PlacesService(document.createElement('div'));
    service.getDetails(
      { placeId: selectedCity.placeId, fields: ['address_components', 'geometry'] },
      (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const cityName = place.address_components.find(component => component.types.includes("locality"))?.long_name;
          const countryName = place.address_components.find(component => component.types.includes("country"))?.short_name;
          const state = place.address_components.find(component => component.types.includes("administrative_area_level_1"))?.long_name;
          const county = place.address_components.find(component => component.types.includes("administrative_area_level_2"))?.long_name;
          const fullCityName = `${cityName}, ${countryName}`;
          const additionalDetails = { state, county };
          const coordinates = {
            lat: place.geometry.location.lat(),
            lon: place.geometry.location.lng()
          };
          fetchWeatherData(fullCityName, additionalDetails, coordinates);
        } else {
          console.error("Place details error:", status);
          setError(t('errors.cityNotFound'));
        }
      }
    );
    setCity("");
    setSuggestions([]);
  };

  const handleFetchWeatherByLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoordinates(latitude, longitude);
          setError("");
          setLocalError("");
          setCity("");
          inputRef.current.focus();
        },
        (err) => {
          console.error("Geolocation error:", err);
          setError(t('errors.geolocationFailure'));
          setLocalError("");
        }
      );
    } else {
      setError(t('errors.geolocationUnavailable'));
      setLocalError("");
    }
  };

  useEffect(() => {
    if (error) {
      inputRef.current.focus();
    }
  }, [error]);

  return (
    <Nav>
      <ThemeToggle />
      <TempUnitToggle />
      <LanguageSelector />
      <SearchContainer onSubmit={handleFetchWeather}>
        <SearchIcon />
        <SearchInput
          id="city-search"
          name="city"
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder={t('placeholders.input')}
          ref={inputRef}
        />
        <SearchButton type="submit">{t('labels.searchBtn')}</SearchButton>
        {localError && <ErrorText>{localError}</ErrorText>}
        {suggestions.length > 0 && (
          <CitySuggestions suggestions={suggestions} onSelect={handleSelectCity} />
        )}
      </SearchContainer>
      <CurrentLocationButton onClick={handleFetchWeatherByLocation}>
        <LocationIcon />
        <LocationLabel>{t('labels.currentLocation')}</LocationLabel>
      </CurrentLocationButton>
    </Nav>
  );
};

export default Navbar;
