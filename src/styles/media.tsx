import { css } from "styled-components";

interface Sizes {
  [key: string]: string;
}

type MediaFunction = (...args: Parameters<typeof css>) => ReturnType<typeof css>;

interface Media {
  [key: string]: MediaFunction;
}

const sizes: Sizes = {
  mobile: "768px",
  tablet: "1024px",
};

const media: Media = Object.keys(sizes).reduce((acc: Media, label: string) => {
  acc[label] = (...args: Parameters<typeof css>) => css`
    @media (max-width: ${sizes[label]}) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});

export default media;