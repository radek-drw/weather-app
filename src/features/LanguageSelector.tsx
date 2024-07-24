import React, { useState, useCallback } from 'react';
import { MdLanguage } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Flag from 'react-world-flags';

interface Language {
  code: string;
  country: string;
}

const languages: Language[] = [
  { code: 'EN', country: 'GB' },
  { code: 'DE', country: 'DE' },
  { code: 'ES', country: 'ES' },
  { code: 'FR', country: 'FR' },
  { code: 'IT', country: 'IT' },
  { code: 'PL', country: 'PL' },
  { code: 'PT', country: 'PT' },
];

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
  padding: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  width: 50px;
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
  width: 100px;
  box-shadow: 0 2px 10px ${({ theme }) => theme.colors.search.shadow};
`;

const LanguageItem = styled.li`
  padding: 8px 12px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  border-bottom: 1px solid ${({ theme }) => theme.colors.suggestionList.itemBorderBottom};
  list-style-type: none;
  text-align: left;
  display: flex;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.suggestionList.itemHover};
  }
`;

const StyledFlag = styled(Flag)`
  width: 16px;
  height: 12px;
  margin-right: 10px;
`;

interface LanguageItemComponentProps {
  lang: Language;
  onClick: (code: string) => void;
}

const LanguageItemComponent: React.FC<LanguageItemComponentProps> = React.memo(({ lang, onClick }) => (
  <LanguageItem key={lang.code} onClick={() => onClick(lang.code)}>
    <StyledFlag code={lang.country} />
    {lang.code}
  </LanguageItem>
));

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const changeLanguage = useCallback((langCode: string) => {
    i18n.changeLanguage(langCode.toLowerCase());
    setIsOpen(false);
  }, [i18n]);

  const currentLanguage = languages.find(lang => lang.code.toLowerCase() === i18n.language.toLowerCase());

  return (
    <LanguageSelectorContainer>
      <LanguageButton onClick={() => setIsOpen(prev => !prev)}>
        <LngIcon />
        <LanguageCode>{currentLanguage?.code || i18n.language.toUpperCase()}</LanguageCode>
      </LanguageButton>
      {isOpen && (
        <LanguageList>
          {languages.map(lang => (
            <LanguageItemComponent key={lang.code} lang={lang} onClick={changeLanguage} />
          ))}
        </LanguageList>
      )}
    </LanguageSelectorContainer>
  );
};

export default LanguageSelector;