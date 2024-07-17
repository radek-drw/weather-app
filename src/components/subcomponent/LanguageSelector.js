import React, { useState } from 'react';
import { MdLanguage } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const LanguageSelectorContainer = styled.div`
  position: relative;
  align-self: center;
`;

const LanguageButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.search.btnBackground};
  color: ${({ theme }) => theme.colors.search.btnText};
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  width: 60px;
  height: 28px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.search.btnHover};
  }
`;

const LngIcon = styled(MdLanguage)`
  width: 16px;
  height: 16px;
  color: ${({ theme }) => theme.colors.search.btnText};
  flex-shrink: 0;
`;

const LanguageCode = styled.span`
  flex-grow: 1;
  text-align: right;
`;

const LanguageList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: ${({ theme }) => theme.colors.suggestionList.background};
  border: 1px solid ${({ theme }) => theme.colors.suggestionList.border};
  border-radius: 4px;
  padding: 0;
  margin: 5px 0 0;
  z-index: 1000;
  width: 60px;
  box-shadow: 0 2px 10px ${({ theme }) => theme.colors.search.shadow};
`;

const LanguageItem = styled.li`
  padding: 8px 12px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  border-bottom: 1px solid ${({ theme }) => theme.colors.suggestionList.ItemBorderBottom};
  list-style-type: none;
  text-align: center;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.suggestionList.itemHover};
  }
`;

const languages = ['EN', 'DE', 'ES', 'FR', 'IT', 'PL', 'PT'];

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang.toLowerCase());
    setIsOpen(false);
  };

  return (
    <LanguageSelectorContainer>
      <LanguageButton onClick={() => setIsOpen(!isOpen)}>
        <LngIcon />
        <LanguageCode>{i18n.language.toUpperCase()}</LanguageCode>
      </LanguageButton>
      {isOpen && (
        <LanguageList>
          {languages.map((lang) => (
            <LanguageItem key={lang} onClick={() => changeLanguage(lang)}>
              {lang}
            </LanguageItem>
          ))}
        </LanguageList>
      )}
    </LanguageSelectorContainer>
  );
};

export default LanguageSelector;