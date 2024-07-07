import React from "react";
import styled from "styled-components";
import media from "../../styles/media";
import { useTheme } from "../../ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";

const TOGGLE_WIDTH = "6rem";
const TOGGLE_HEIGHT = "2.5rem";
const TOGGLE_BUTTON_SIZE = "2.3rem";
const TOGGLE_BUTTON_MOBILE_SIZE = "1.8rem";
const TOGGLE_BUTTON_PADDING = "0.3rem";

// This function ensures that 'isLight' is not passed down to the DOM element
const shouldForwardProp = (prop) => prop !== 'isLight';

const ToggleContainer = styled.button`
  position: relative;
  width: ${TOGGLE_WIDTH};
  height: ${TOGGLE_HEIGHT};
  padding: 0.5rem;
  align-self: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.9rem;
  background-color: ${({ theme }) => theme.colors.toggleThemeBg};
  border-radius: 20px;
  cursor: pointer;
  outline: none;
  border: none;
  transition: background-color 0.3s ease;

  ${media.mobile`
    width: 4.5rem;
    height: 2rem;
    font-size: 1.6rem;
  `}
`;

const ToggleButton = styled.div.withConfig({shouldForwardProp})`
  position: absolute;
  top: 50%;
  left: ${({ isLight }) => (isLight ? TOGGLE_BUTTON_PADDING : `calc(100% - ${TOGGLE_BUTTON_PADDING} - ${TOGGLE_BUTTON_SIZE})`)};
  transform: translateY(-50%);
  width: ${TOGGLE_BUTTON_SIZE};
  height: ${TOGGLE_BUTTON_SIZE};
  background: white;
  border-radius: 50%;
  transition: all 0.3s ease;

  ${media.mobile`
    height: ${TOGGLE_BUTTON_MOBILE_SIZE};
    width: ${TOGGLE_BUTTON_MOBILE_SIZE};
    left: ${({ isLight }) => (isLight ? TOGGLE_BUTTON_PADDING : `calc(100% - ${TOGGLE_BUTTON_PADDING} - ${TOGGLE_BUTTON_MOBILE_SIZE})`)};
  `}
`;

const Toggle = () => {
  const { toggleTheme, theme } = useTheme();
  const isLight = theme === "dark";

  return (
    <ToggleContainer onClick={toggleTheme} aria-label="Toggle theme">
      <ToggleButton isLight={isLight} />
      <FaSun color="#f39c12" />
      <FaMoon color="#f1c40f" />
    </ToggleContainer>
  );
};

export default Toggle;
