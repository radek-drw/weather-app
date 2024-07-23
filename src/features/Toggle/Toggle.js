import React from "react";
import styled from "styled-components";
import media from "../../styles/media";

const TOGGLE_WIDTH = "6rem";
const TOGGLE_HEIGHT = "2.5rem";
const TOGGLE_WIDTH_MOBILE = "3.6rem";
const TOGGLE_HEIGHT_MOBILE = "2rem";
const TOGGLE_BUTTON_SIZE = "1.8rem";
const TOGGLE_BUTTON_MOBILE_SIZE = "1.4rem";
const TOGGLE_BUTTON_PADDING = "0.4rem";
const ICON_SIZE = "1.5rem";
const ICON_SIZE_MOBILE = "1.1rem";

const ToggleContainer = styled.div`
  position: relative;
  width: ${TOGGLE_WIDTH};
  height: ${TOGGLE_HEIGHT};
  padding: 0.5rem;
  align-self: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.7rem;
  background-color: ${({ theme }) => theme.colors.toggleThemeBg};
  border-radius: 20px;
  cursor: pointer;
  outline: none;
  border: none;
  transition: background-color 0.3s ease;

  ${media.mobile`
    width: ${TOGGLE_WIDTH_MOBILE};
    height: ${TOGGLE_HEIGHT_MOBILE};
    font-size: 1.5rem;
  `}
`;

const ToggleButton = styled.span`
  position: absolute;
  top: 50%;
  left: ${({ $isToggled }) => ($isToggled ? `calc(${TOGGLE_WIDTH} - ${TOGGLE_BUTTON_SIZE} - ${TOGGLE_BUTTON_PADDING})` : TOGGLE_BUTTON_PADDING)};
  transform: translateY(-50%);
  width: ${TOGGLE_BUTTON_SIZE};
  height: ${TOGGLE_BUTTON_SIZE};
  background: #eee;
  border-radius: 50%;
  transition: all 0.3s ease;

  ${media.mobile`
    left: ${({ $isToggled }) => ($isToggled ? `calc(${TOGGLE_WIDTH_MOBILE} - ${TOGGLE_BUTTON_MOBILE_SIZE} - ${TOGGLE_BUTTON_PADDING})` : TOGGLE_BUTTON_PADDING)};
    height: ${TOGGLE_BUTTON_MOBILE_SIZE};
    width: ${TOGGLE_BUTTON_MOBILE_SIZE};
  `}
`;

const IconWrapper = styled.div`
  font-size: ${ICON_SIZE};
  color: #eee;
  display: flex;
  align-items: center;

  ${media.mobile`
    font-size: ${ICON_SIZE_MOBILE};
  `}
`;

const Toggle = ({ isToggled, onClick, Icon1, Icon2, ariaLabel }) => (
  <ToggleContainer onClick={onClick} aria-label={ariaLabel}>
    <ToggleButton $isToggled={isToggled} />
    <IconWrapper>
      <Icon1 />
    </IconWrapper>
    <IconWrapper>
      <Icon2 />
    </IconWrapper>
  </ToggleContainer>
);

export default Toggle;
