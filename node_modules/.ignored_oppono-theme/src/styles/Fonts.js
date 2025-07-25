import React from "react";
import { css, Global } from "frontity";
import bold from "../assets/fonts/suisseIntl-bold.woff";
import light from "../assets/fonts/suisseIntl-light.woff";
import lightItalic from "../assets/fonts/suisseIntl-lightItalic.woff";
import medium from "../assets/fonts/suisseIntl-medium.woff";
import regular from "../assets/fonts/suisseIntl-regular.woff";

const Fonts = () => (
  <Global
    styles={css`
      @font-face {
        font-family: "Suisse Int 'l";
        src: url(${bold});
        font-weight: 700;
        font-style: normal;
        font-display: swap;
      }
      @font-face {
        font-family: "Suisse Int 'l";
        src: url(${light});
        font-weight: 300;
        font-style: normal;
        font-display: swap;
      }
      @font-face {
        font-family: "Suisse Int 'l";
        src: url(${light});
        font-weight: 200;
        font-style: normal;
        font-display: swap;
      }
      @font-face {
        font-family: "Suisse Int 'l";
        src: url(${lightItalic});
        font-weight: 200;
        font-style: italic;
        font-display: swap;
      }
      @font-face {
        font-family: "Suisse Int 'l";
        src: url(${medium});
        font-weight: 500;
        font-style: normal;
        font-display: swap;
      }
      @font-face {
        font-family: "Suisse Int 'l";
        src: url(${regular});
        font-weight: 400;
        font-style: normal;
        font-display: swap;
      }
    `}
  />
);
export default Fonts;
