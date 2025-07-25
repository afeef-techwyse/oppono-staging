import React, { useEffect } from "react";
import { connect, styled } from "frontity";
import PropTypes from "prop-types";
import Container from "./reusable/Container";
import { size } from "../functions/size";
import Link from "./reusable/Link";
import ControlledPopup from "./ControlledPopup";
import awardsImage from "../assets/images/awards.png";

const FooterRight = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  opacity: 1;
  transition: opacity 500ms;

	@media (max-width: 450px) {
		width: 100%;
	}

  @media (max-width: 991.98px) {
    margin-left: ${size(-17)};
    margin-right: ${size(-17)};
    flex-wrap: wrap;
  }

  a {
    color: #b5d2ff;
    font-size: ${size(14)};
    font-weight: 300;
    margin-left: ${size(36)};
    display: flex;
    @media (max-width: 991.98px) {
      margin-left: ${size(12)};
      margin-right: ${size(12)};
      margin-top: ${size(17)};
      font-size: ${size(12)};
    }

		@media (max-width: 450px) {
			margin: 0;
		}

    svg {
      margin-left: ${size(6)};
      width: ${size(18)};
      height: ${size(18)};
    }
`;

const SocialLinks = styled(
    connect(({ state, className }) => {
        const { acf } = state.source.get("acf-options-page");
        return (
            <div className={className}>
                {acf?.social?.facebook && (
                    <a href={acf?.social?.facebook} className="facebook" target="_blank">
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fab"
                            data-icon="facebook"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            className="svg-inline--fa fa-facebook fa-w-16 fa-3x"
                        >
                            <path
                                fill="currentColor"
                                d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"
                            />
                        </svg>
                    </a>
                )}
                {acf?.social?.twitter && (
                    <a href={acf?.social?.twitter} className="twitter" target="_blank">
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fab"
                            data-icon="twitter"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            className="svg-inline--fa fa-twitter fa-w-16 fa-3x"
                        >
                            <path
                                fill="currentColor"
                                d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                            />
                        </svg>
                    </a>
                )}
                {acf?.social?.linkedin && (
                    <a href={acf?.social?.linkedin} className="linkedin" target="_blank">
                        <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="linkedin-in" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="svg-inline--fa fa-linkedin-in fa-w-14 fa-3x"><path fill="currentColor" d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path></svg>
                    </a>
                )}
            </div>
        );
    })
)`
  margin-left: 3rem;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;

  a {
    margin-left: 1rem;
  }

  @media (max-width: 558.98px) {
    display: none;
  }
`;
const Footer = React.forwardRef(({ state, className }, forwardRef) => {
    if (window.location.pathname === '/') {
        useEffect(() => {
            setTimeout(() => {
                $GrwJS.init({
                    target: '#review_widget',
                    placeid: 'ChIJNUfSf8fU1IkRXaUk9dBZaac', //Google place ID
                    theme: 'dark', //dark or light
                    numOfWords: 20, //max number of words for each review. default:20,
                    horizontal: true, //display reviews in a horizontal slider if true; otherwise, display reviews vertically; true as default 
                    autoScroll: true, //automatically scroll the reivew horizontally; horizontal has to be set to true; false as default
                    scrollInterval: 8 //an interval on how often to scroll the review horizontally; default: 8s
                });
            }, 3000);
        }, [])
    }

    return (
        <footer ref={forwardRef} className={className + " footer"}>
            <Container>
                {/* <ControlledPopup state={state} /> */}
                <div className="footer-content">
                    <div className="footer-left">
                        {/* <div className="guid select">
              <h4 className={"primary"}>Select</h4>
              <svg viewBox="0 0 63 20">
                <path
                  className={"primary-fill"}
                  fill="#b5d2ff"
                  d="M48.409 7.71l.72.77-1.84 1.81h4.55V6.25h1.05v5.11h-5.58l1.82 1.8-.72.75-3.08-3.1zm-10.992-.44v2.17h1.26c1.09 0 1.71-.22 1.71-1.09 0-.95-.75-1.08-1.75-1.08zm1.61 3.17c-.12.01-.25.01-.38.01h-1.23v3.05h-1.27V6.25h2.31c2.13 0 3.23.48 3.23 2.09 0 .93-.45 1.56-1.36 1.87l1.66 3.29h-1.43zm-9.432-4.19h5.13v1.06h-3.86v1.94h3.65v1.05h-3.65v2.13h3.86v1.07h-5.13zm-4.728 1.06h-2.28V6.25h5.83v1.06h-2.28v6.19h-1.27zm-5.161 6.19l-3.07-5.79v5.79h-1.23V6.25h1.7l3.07 5.79V6.25h1.23v7.25zM8.854 6.25h5.13v1.06h-3.86v1.94h3.65v1.05h-3.65v2.13h3.86v1.07h-5.13z"
                />
                <path
                  className={"primary-stroke"}
                  fill="none"
                  stroke="#b5d2ff"
                  strokeMiterlimit="20"
                  strokeOpacity=".4"
                  d="M2.124 19a1.5 1.5 0 0 1-1.5-1.5v-15a1.5 1.5 0 0 1 1.5-1.5h58a1.5 1.5 0 0 1 1.5 1.5v15a1.5 1.5 0 0 1-1.5 1.5z"
                />
              </svg>
            </div>
            <div className="guid nav">
              <h4 className={"primary"}>Nav</h4>
              <svg viewBox="0 0 54 20">
                <path
                  className={"primary-fill"}
                  fill="#b5d2ff"
                  d="M8.194 10.81l3.09 3.1.72-.75-1.83-1.8h5.58v-1.07h-5.6l1.85-1.81-.72-.77z"
                />
                <path
                  className={"primary-stroke"}
                  fill="none"
                  stroke="#b5d2ff"
                  strokeMiterlimit="20"
                  strokeOpacity=".4"
                  d="M2.124 19a1.5 1.5 0 0 1-1.5-1.5v-15a1.5 1.5 0 0 1 1.5-1.5h20a1.5 1.5 0 0 1 1.5 1.5v15a1.5 1.5 0 0 1-1.5 1.5z"
                />
                <path
                  className={"primary-fill"}
                  fill="#b5d2ff"
                  d="M41.954 7.71l-.72.77 1.84 1.81h-5.6v1.07h5.57l-1.81 1.8.72.75 3.08-3.1z"
                />
                <path
                  className={"primary-stroke"}
                  fill="none"
                  stroke="#b5d2ff"
                  strokeMiterlimit="20"
                  strokeOpacity=".4"
                  d="M31.124 19a1.5 1.5 0 0 1-1.5-1.5v-15a1.5 1.5 0 0 1 1.5-1.5h20a1.5 1.5 0 0 1 1.5 1.5v15a1.5 1.5 0 0 1-1.5 1.5z"
                />
              </svg>
            </div> */}
                    </div>
                    <div id="review_widget"></div>
                    <img src={awardsImage} class="awards-image desktop"></img>
                    <FooterRight className={"footer-right"}>
                        <Link className={"primary"} href="/careers/">
                            Careers
                        </Link>
                        <Link className={"primary"} href="/terms/">
                            T&C
                        </Link>
                        <Link className={"primary"} href="/privacy-policy/">
                            Privacy
                        </Link>
                        <Link className={"primary disabled"}>License # 11887/12558</Link>
                        <SocialLinks />
                    </FooterRight>
                </div>
            </Container>
        </footer>
    );
});

Footer.propTypes = {
    className: PropTypes.string,
};

export default styled(Footer)`
&.homepage {
    .awards-image {
        display: block;
        position: fixed;
        bottom: 50px;
        right: 50px;
        width: 100px;

        @media(max-width: 991.98px) {
            position: relative;
            bottom: 0;
            right: 0;
        }
    }
}
.awards-image {
    display: none;
}


position: fixed !important;
  bottom: 0;
  padding-top: ${size(10)};
  padding-bottom: ${size(10)};
  width: 100%;
  z-index: 100;

  @media(max-width: 575px) {
    position: relative !important;
  }

  .disabled {
    pointer-events: none !important;
  }
  .footer-content {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 991.98px) {
      justify-content: center;
      flex-direction: column;
    }

    .footer-left {
      display: flex;
      @media (max-width: 991.98px) {
        display: none;
      }

      .guid {
        display: flex;

        &:first-of-type {
          margin-right: ${size(38)};
        }

        &.select {
          svg {
            width: ${size(63)};
            height: ${size(20)};
          }
        }

        &.nav {
          svg {
            width: ${size(54)};
            height: ${size(20)};
          }
        }

        h4 {
          color: #b5d2ff;
          opacity: 0.7;
          font-size: ${size(14)};
          font-weight: 300;
          margin-right: ${size(18)};
        }
      }
    }
  }
`;
