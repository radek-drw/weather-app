import React from "react";
import styled from "styled-components";
import { useTheme } from "../../../themeContext";

const ToggleContainer = styled.button`
  background: ${({ theme }) => theme.colors.background};
  border: 2px solid black;
  border-radius: 20px;
  cursor: pointer;
  /* display: flex;
  align-items: center; */
  /* margin: 0 auto; */
  /* overflow: hidden; */
  /* padding: 0.5rem; */
  position: relative;
  width: 6rem;
  height: 2.5rem;
  outline: none;
`;

const ToggleButton = styled.div`
  background: red;
  border-radius: 50%;
  height: 2rem;
  width: 2rem;
  position: absolute;
  top: 50%;
  left: ${({ isLight }) => (isLight ? "3px" : "calc(100% - 23px)")};
  transform: translateY(-50%);
  transition: all 0.2s linear;
`;

const Toggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <ToggleContainer onClick={toggleTheme}>
      <ToggleButton isLight={theme === "light"} />
    </ToggleContainer>
  );
};

export default Toggle;
