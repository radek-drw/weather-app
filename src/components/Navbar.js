import React from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  height: 35px;
  margin-bottom: 20px;
`;

const DarkModeToggle = styled.div`
  width: 7%;
  min-width: 50px;
  max-width: 80px;
  height: 20px;
  align-self: center;
  background-color: #fff;
  border-radius: 10px;
  cursor: pointer;
`;

const InputContainer = styled.div`
  position: relative;
  width: 50%;
  min-width: 100px;
  max-width: 350px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.darkBackground};
  box-shadow: 0 0 10px ${(props) => props.theme.boxShadow};
  overflow: hidden;
`;

const IconMagnifyingGlass = styled(FontAwesomeIcon)`
  position: absolute;
  top: 50%;
  left: 10px;
  width: 15px;
  height: 15px;
  transform: translateY(-50%);
  color: #ccc;
`;

const SearchInput = styled.input`
  position: absolute;
  width: 100%;
  top: 0;
  height: 100%;
  left: 30px;
  padding: 0.5rem;
  border: none;
  background-color: inherit;
  color: white;
  outline: none;
  &::placeholder {
    font-size: 1.2rem;
    color: #ccc;
  }
`;

const CurrentLocationButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: rgb(0, 128, 0);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: background-color 0.3s;
  padding-left: 25px;
  position: relative;
  &:hover {
    background-color: rgb(0, 114, 0);
  }
`;

const IconLocation = styled(FontAwesomeIcon)`
  position: absolute;
  top: 50%;
  left: 6px;
  width: 15px;
  height: 15px;
  transform: translateY(-50%);
  color: #ccc;
`;

const Navbar = () => {
  return (
    <Nav>
      <DarkModeToggle>
        <div></div>
      </DarkModeToggle>
      <InputContainer>
        <SearchInput type="text" placeholder="Search for city..." />
        <IconMagnifyingGlass icon={faMagnifyingGlass} />
      </InputContainer>
      <CurrentLocationButton>
        <IconLocation icon={faLocationDot} />
        Current location
      </CurrentLocationButton>
    </Nav>
  );
};

export default Navbar;
