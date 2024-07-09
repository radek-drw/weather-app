import React from "react";
import styled from "styled-components";

const SuggestionsContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 150px;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0 0 5px 5px;
  z-index: 1000;
`;

const SuggestionItem = styled.div`
  padding: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.hoverBackground};
  }
`;

const CitySuggestions = ({ suggestions, onSelect }) => {
  return (
    <SuggestionsContainer>
      {suggestions.map((city, index) => (
        <SuggestionItem key={index} onClick={() => onSelect(city)}>
          {city.name}, {city.country}
        </SuggestionItem>
      ))}
    </SuggestionsContainer>
  );
};

export default CitySuggestions;
