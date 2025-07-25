import React from "react";
import { css, Global } from "frontity";
import BGGreen from "../assets/images/bg-green.png";
import BGDarkGreen from "../assets/images/bg-dark-green.png";
import BGBlue from "../assets/images/bg-blue.png";
import BGLightGreen from "../assets/images/bg-light-green.png";
import BGGray from "../assets/images/bg-gray.png";
import BGBlack from "../assets/images/bg-black.png";
import { P } from "../components/form-components/StyledComponent";
import Header from "../components/Header";
import { Top } from "../components/form-components/Finalize";
import Footer from "../components/Footer";


const Themes = () => (
  <>
    <img src={BGGreen} alt="bg-holder" className="bg-holder green" />
    <img src={BGDarkGreen} alt="bg-holder" className="bg-holder dark-green" />
    <img src={BGBlue} alt="bg-holder" className="bg-holder blue" />
    <img src={BGLightGreen} alt="bg-holder" className="bg-holder light-green" />
    <img src={BGGray} alt="bg-holder" className="bg-holder gray" />
    <img src={BGBlack} alt="bg-holder" className="bg-holder black" />
    <Global
      styles={css`
    :root {
      --oppono-bg-image: url(${BGGray}) !important;
    }

    img.bg-holder {
      //visibility: hidden;
      opacity: 0;
      pointer-events: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      transition: opacity 750ms;
      z-index: -1;
    }

    body {
      position: relative;
    }

    .loading-page, .floating-menu, ${Header}, ${Footer} {
      background-size: 100% 100% !important;
      background-repeat: no-repeat !important;
      background-position: top center !important;
      background-attachment: fixed !important;
      background-image: var(--oppono-bg-image) !important;
      //transition: background-image 750ms;
      position: relative;
    }

      // ${Header} ,${Footer}{
    //   transition: background-image 0ms;
    // }

    .loading-page {
      width: 100%;
      position: fixed;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 9999999;
      background-repeat: no-repeat !important;
      background-size: cover !important;
      background-position: top center;
      transition: background-image 400ms;
      background-attachment: fixed;
    }

    .dark-green-theme {
      --oppono-bg-image: url(${BGDarkGreen}) !important;

      img.bg-holder.dark-green{
        opacity: 1;
      }
      .loading-page {
        --oppono-bg-image: url(${BGDarkGreen}) !important;
      }


      .primary {
        color: #d2f5e9 !important;

        &.oppono-btn:hover {
          border-color: #fe412d !important;
          color: #ffffff !important;
        }
      }

      ${P.D}, ${P.Dark}, ${P.Cost}, ${P.Border}, ${P.Num}, td {
        color: #d2f5e9 !important;
      }

      .primary-border {
        border-color: #d2f5e9 !important;
      }

      .primary-bg {
        background: #d2f5e9 !important;
      }

      .primary-fill {
        fill: #d2f5e9 !important;
      }

      .primary-stroke, .swiper-arrows-container svg path {
        stroke: #d2f5e9 !important;
      }

      ${Header} {
        .logo {
          path, polygon {
            fill: #d2f5e9;
          }
        }
      }

      ${Top} {
        &:after {
          background: #d2f5e9 !important
        }
      }
    }

    .green-theme {
      --oppono-bg-image: url(${BGGreen}) !important;
      img.bg-holder.green{
        opacity: 1;
      }
      .loading-page {
        --oppono-bg-image: url(${BGGreen}) !important;
      }


      .primary {
        color: #d2f5e9 !important;

        &.oppono-btn:hover {
          border-color: #fe412d !important;
          color: #ffffff !important;
        }
      }

      ${P.D}, ${P.Dark}, ${P.Cost}, ${P.Border}, ${P.Num}, td {
        color: #d2f5e9 !important;
      }

      .primary-border {
        border-color: #d2f5e9 !important;
      }

      .primary-bg {
        background: #d2f5e9 !important;
      }

      .primary-fill {
        fill: #d2f5e9 !important;
      }

      .primary-stroke, .swiper-arrows-container svg path {
        stroke: #d2f5e9 !important;
      }

      ${Header} {
        .logo {
          path, polygon {
            fill: #d2f5e9;
          }
        }
      }

      ${Top} {
        &:after {
          background: #d2f5e9 !important
        }
      }
    }

    .blue-theme {
      --oppono-bg-image: url(${BGBlue}) !important;
      img.bg-holder.blue{
        opacity: 1;
      }
      .loading-page {
        --oppono-bg-image: url(${BGBlue}) !important;
      }



			a .logout {
				color: #B5D2FF !important;
				border-color: #B5D2FF !important;
			}

      .primary-select {
        .label-text {
          color: #b5d2ff !important;
        }

        .oppono-select {
          &__single-value, &__input, &__placeholder {
            color: #b5d2ff;
          }

          &__menu {
            background: #10397c;
          }

          &__indicator {
            svg {
              path {
                fill: #b5d2ff;
              }
            }
          }

          &__option {
            color: #b5d2ff;

            &--is-focused {
              background-color: #b5d2ff;
              color: #10397c;
            }
          }
        }
      }

      .primary-input {
        .label-text, input, input::placeholder, textarea, textarea::placeholder {
          color: #b5d2ff !important;
        }

        textarea {
          &:focus {
            border-color: #b5d2ff;
          !important;
          }
        }

        &:after {
          background: #b5d2ff !important;
        }
      }

      .primary {
        &.oppono-btn:hover {
          border-color: #fe412d !important;
          color: #ffffff !important;
        }

        color: #b5d2ff !important;
      }

      .primary-border {
        border-color: #b5d2ff !important;
      }

      .primary-bg {
        background: #b5d2ff !important;
      }

      .primary-fill {
        fill: #b5d2ff !important;
      }

      .primary-stroke {
        stroke: #b5d2ff !important;
      }

      ${Header} {
        .logo {
          path, polygon {
            fill: #b5d2ff;
          }
        }
      }
    }

    .light-green-theme {
      --oppono-bg-image: url(${BGLightGreen}) !important;
      img.bg-holder.light-green{
        opacity: 1;
      }

      .primary {
        color: #b5d2ff !important;

        &.oppono-btn {
          border-color: #b5d2ff !important;

          &:hover {
            border-color: #fe412d !important;
            color: #ffffff !important;
          }
        }
      }

      ${P.D}, ${P.Dark}, ${P.Cost}, ${P.Border}, ${P.Num}, td {
        color: #d2f5e9 !important;
      }

      .loading-page {
        --oppono-bg-image: url(${BGLightGreen}) !important;
      }

      ${Header} {
        .logo {
          path, polygon {
            fill: #b5d2ff;
          }
        }
      }
    }

    .black-theme {
      --oppono-bg-image: url(${BGBlack}) !important;
     img.bg-holder.black{
        opacity: 1;
      }
      .loading-page {
        --oppono-bg-image: url(${BGBlack}) !important;
      }


      ${Header} {
        .logo {
          path, polygon {
            fill: #bfb6b4;
          }
        }
      }
    }

    .gray-theme {
      --oppono-bg-image: url(${BGGray}) !important;
      img.bg-holder.gray{
        opacity: 1;
      }
      .loading-page {
        --oppono-bg-image: url(${BGGray}) !important;
      }


      .primary,
	  svg {
        &.oppono-btn:hover {
          border-color: #fe412d !important;
          color: #ffffff !important;
        }

        color: #BFB6B4 !important;
      }

      .primary-border {
        border-color: #FFF !important;
      }

      .primary-bg {
        background: #bfb6b4 !important;
      }

      .primary-fill {
        fill: #bfb6b4 !important;
      }

      .primary-stroke {
        stroke: #bfb6b4 !important;
      }

      ${Header} {
        .logo {
          path, polygon {
            fill: #bfb6b4;
          }
        }
      }
    }
  `}
    />
  </>
);

export default Themes;
