import React from "react";
import styled from "styled-components";
import { useTheme } from "../../ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";

const ToggleContainer = styled.button`
  background: #e3e3e3;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  position: relative;
  width: 6rem;
  height: 2.5rem;
  outline: none;
`;

const ToggleButton = styled.div`
  position: absolute;
  top: 50%;
  left: ${({ isLight }) => (isLight ? "3px" : "calc(100% - 23px)")};
  transform: translateY(-50%);
  background: #999;
  border-radius: 50%;
  height: 2rem;
  width: 2rem;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.iconColor};
  font-size: 2rem;
  transition: all 0.3s ease;
`;

const Toggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <ToggleContainer onClick={toggleTheme}>
      <ToggleButton isLight={isLight}>
        {isLight ? <FaSun /> : <FaMoon />}
      </ToggleButton>
    </ToggleContainer>
  );
};

export default Toggle;
