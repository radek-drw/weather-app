import React from "react";

import styled, { css } from "styled-components";
import media from "../../styles/media";

const TOGGLE_WIDTH = "5rem";
const TOGGLE_HEIGHT = "2.5rem";
const TOGGLE_WIDTH_MOBILE = "5rem";
const TOGGLE_HEIGHT_MOBILE = "2.8rem";
const TOGGLE_BUTTON_SIZE = "1.8rem";
const TOGGLE_BUTTON_SIZE_MOBILE = "2rem";
const TOGGLE_BUTTON_PADDING = "0.4rem";
const TOGGLE_BUTTON_PADDING_MOBILE = "0.5rem";
const ICON_SIZE = "1.5rem";
const ICON_SIZE_MOBILE = "1.6rem";

interface Theme {
  colors: {
    toggleThemeBg: string;
  };
}

const ToggleContainer = styled.button<{ theme: Theme }>`
  position: relative;
  width: ${TOGGLE_WIDTH};
  height: ${TOGGLE_HEIGHT};
  padding: 0 ${TOGGLE_BUTTON_PADDING};
  align-self: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.toggleThemeBg};
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  ${media.mobile`
    width: ${TOGGLE_WIDTH_MOBILE};
    height: ${TOGGLE_HEIGHT_MOBILE};
    padding: 0 ${TOGGLE_BUTTON_PADDING_MOBILE};
  `}
`;

const ToggleButton = styled.span<{ $isToggled: boolean }>`
  position: absolute;
  top: 50%;
  left: ${({ $isToggled }) =>
    $isToggled
      ? `calc(${TOGGLE_WIDTH} - ${TOGGLE_BUTTON_SIZE} - ${TOGGLE_BUTTON_PADDING})`
      : TOGGLE_BUTTON_PADDING};
  transform: translateY(-50%);
  width: ${TOGGLE_BUTTON_SIZE};
  height: ${TOGGLE_BUTTON_SIZE};
  background: #eee;
  border-radius: 50%;
  transition: all 0.3s ease;

  ${({ $isToggled }) => css`
    ${media.mobile`
      left: ${
        $isToggled
          ? `calc(100% - ${TOGGLE_BUTTON_SIZE_MOBILE} - ${TOGGLE_BUTTON_PADDING_MOBILE})`
          : TOGGLE_BUTTON_PADDING_MOBILE
      };
      height: ${TOGGLE_BUTTON_SIZE_MOBILE};
      width: ${TOGGLE_BUTTON_SIZE_MOBILE};
    `}
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

interface ToggleProps {
  isToggled: boolean;
  onClick: () => void;
  Icon1: React.ComponentType;
  Icon2: React.ComponentType;
  ariaLabel: string;
  testId: string;
}

const Toggle: React.FC<ToggleProps> = ({
  isToggled,
  onClick,
  Icon1,
  Icon2,
  ariaLabel,
  testId,
}) => (
  <ToggleContainer
    onClick={onClick}
    aria-label={ariaLabel}
    data-testid={testId}
  >
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
