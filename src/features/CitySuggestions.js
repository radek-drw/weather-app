import React from "react";
import styled from "styled-components";

const SuggestionsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 150px;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.suggestionList.background};
  border: 1px solid ${({ theme }) => theme.colors.suggestionList.border};
  border-radius: 0 0 5px 5px;
  z-index: 1000;
  margin: 0;
  padding: 0;
  list-style: none;
  box-shadow: 0 0 10px ${({ theme }) => theme.colors.cardShadow};
`;

const SuggestionItem = styled.li`
  padding: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;
  color: ${({ theme }) => theme.colors.text};
  border-bottom: 1px solid ${({ theme }) => theme.colors.suggestionList.ItemBorderBottom};

  &:last-child {
    border: none;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.suggestionList.itemHover};
  }
`;

const CityName = styled.div`
  font-weight: bold;
`;

const LocationDetails = styled.div`
  font-size: 0.9em;
  color: ${({ theme }) => theme.colors.mutedText};
`;

const CitySuggestions = ({ suggestions, onSelect }) => {
  return (
    <SuggestionsList>
      {suggestions.map((suggestion, index) => (
        <SuggestionItem key={index} onClick={() => onSelect(suggestion)}>
          <CityName>{suggestion.description.split(',')[0]}</CityName>
          <LocationDetails>{suggestion.description.split(',').slice(1).join(',').trim()}</LocationDetails>
        </SuggestionItem>
      ))}
    </SuggestionsList>
  );
};

export default CitySuggestions;
