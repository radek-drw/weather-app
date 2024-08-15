import styled from "styled-components";
import media from "../../styles/media";
import { LuMapPin } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  height: 35px;

  ${media.mobile`
    flex-wrap: wrap;
  `}
`;

export const SettingsPanel = styled.div`
  display: flex;
  justify-content: space-between;
  flex-basis: 24%;

  ${media.mobile`
    flex-basis: 100%;
    justify-content: flex-start;
    margin-bottom: 18px
  `}

  & > * {
    ${media.mobile`
    margin-right: 5%;
  `}
  }
`;

export const SearchContainer = styled.form`
  flex-basis: 70%;
  position: relative;
  display: flex;
  justify-content: space-between;
  max-width: 350px;
  border-radius: 5px;
  box-shadow: 0 0 10px ${({ theme }) => theme.colors.search.shadow};
  transition: box-shadow 0.3s ease;

  &:focus-within {
    box-shadow: 0 0 15px ${({ theme }) => theme.colors.search.shadowFocus};
  }

  ${media.mobile`
    padding: 0.5rem;
    margin: 0 auto;
    flex-basis: 75%;
    height: 40px;
  `}
`;

export const SearchIcon = styled(CiSearch)`
  align-self: center;
  flex-basis: 10%;
  font-size: 2.2rem;
  color: ${({ theme }) => theme.colors.mutedText};
`;

export const SearchInput = styled.input`
  flex-grow: 1;
  padding: 0 0.5rem;
  border: none;
  font-size: 1.2rem;
  background-color: inherit;
  color: ${({ theme }) => theme.colors.text};
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.mutedText};
  }
`;

export const SearchButton = styled.button`
  height: 100%;
  flex-basis: 20%;
  background-color: ${({ theme }) => theme.colors.search.btnBackground};
  color: ${({ theme }) => theme.colors.search.btnText};
  font-size: 1.3rem;
  border: none;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  transition: background-color 0.3s;
  padding: 0 1rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.search.btnHover};
  }

  ${media.mobile`
    display: none;
  `}
`;

export const CurrentLocationButton = styled.button`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  min-height: 25px;
  align-self: center;
  background-color: rgb(0, 128, 0);
  font-size: 1.2rem;
  color: white;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgb(0, 114, 0);
  }

  ${media.mobile`
    position: relative;
    margin-right: auto;
    background-color: transparent;

    &:hover, &:active, &:focus {
      background-color: transparent;
      box-shadow: none;
    }
  `}
`;

export const LocationIcon = styled(LuMapPin)`
  width: 14px;
  height: 14px;

  ${media.mobile`
    color:  ${({ theme }) => theme.colors.text};
    width: 18px;
    height: 18px;
  `}
`;

export const LocationLabel = styled.p`
  margin-left: 5px;

  ${media.mobile`
    display: none;
  `}
`;

export const ErrorText = styled.p`
  position: absolute;
  top: 103%;
  left: 0;
  color: red;
  font-size: 1.05rem;
  background-color: rgba(255, 0, 0, 0.1);
  border: 1px solid red;
  padding: 0.4rem 0.8rem;
  border-radius: 3px;
`;
