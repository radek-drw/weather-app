import { css } from "styled-components";

const sizes = {
  mobile: "768px",
  tablet: "1024px",
};

const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label]}) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});

export default media;
