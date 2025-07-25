
import React from "react";
import { connect, styled } from "frontity";
import PropTypes from "prop-types";
import classnames from "classnames";
import Container from "./reusable/Container";
import { size } from "../functions/size";
import mobileLogo from "../assets/images/mobile-logo.png";
import Link from "./reusable/Link";
import Button from "./form-components/Button";
import {
    allowPageScroll,
    preventPageScroll,
} from "../functions/prevent_allowPageScroll";
import StepsProgress from "./form-components/StepsProgress";

const SubHeader = styled(
    connect(({ state, className }) => {
        return (
            <div className={classnames(className, "sub-menu")}>
                <Container>
                    <div className="sub-menu__inner">
                        <p className={"back"}>
                            <svg viewBox="0 0 6 8">
                                <path
                                    fill="none"
                                    className={"primary-stroke"}
                                    stroke="#b5d2ff"
                                    strokeMiterlimit="20"
                                    d="M3 8V0"
                                />
                                <path
                                    fill="none"
                                    className={"primary-stroke"}
                                    stroke="#b5d2ff"
                                    strokeMiterlimit="20"
                                    d="M6 3v0L3 0 0 3"
                                />
                            </svg>
                            <Link className={"primary"} href={"/"}>
                                Back to dashboard
                            </Link>
                        </p>

                        <div>
                            <p className={"first-title"}>
                                {state.theme.subHeader.part_1}
                            </p>
                            <p className={"second-title"}>
                                {state.theme.subHeader.part_2}
                            </p>
                        </div>
                    </div>
                </Container>
            </div>
        );
    })
)`
	border-top: 1px solid rgba(191, 182, 180, 0.1);
	padding-bottom: ${size(21)};
	padding-top: ${size(21)};

	.sub-menu__inner{
		width: 100%;
		display: flex;
	}

	@media (max-width: 575.98px) {
    padding-top: ${size(20)};
    padding-bottom: ${size(40)};
  }

  .back {
    margin-right: ${size(100)};
    display: inline-block;

		@media (max-width: 575.98px) {
      margin-right: ${size(45)};
    }

    a {
      opacity: 0.5;
      font-size: ${size(12)};
      font-weight: 400;
      line-height: ${size(16)};
    }

    svg {
      width: ${size(6)};
      height: ${size(8)};
      margin-right: ${size(12)};
      @media (max-width: 575.98px) {
        margin-right: ${size(8)};
      }
    }
  }

	.first-title,
	.second-title {
		color: #BFB6B4;
		line-height: ${size(16)};
		font-weight: 500;
	}

  .first-title {
    font-size: ${size(12)};
    opacity: 0.5;
  }

  .second-title {
    font-size: ${size(10)};
    letter-spacing: ${size(0.44)};
  }
`;

const SocialLinks = styled(
    connect(({ state, className }) => {
        const { acf } = state.source.get("acf-options-page");
        return (
            <div className={classnames(className, "social-menu")}>
                {acf?.social?.facebook && (
                    <a target="_blank" href={acf?.social?.facebook} className="facebook mobile-social-menu">
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
                    <a target="_blank" href={acf?.social?.twitter} className="twitter mobile-social-menu">
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
                    <a href={acf?.social?.linkedin} className="linkedin mobile-social-menu" target="_blank">
                        <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="linkedin-in" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="svg-inline--fa fa-linkedin-in fa-w-14 fa-3x"><path fill="currentColor" d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path></svg>
                    </a>
                )}
            </div>
        );
    })
)`
  margin-top: 2.5rem;
  display: flex;

  @media (min-width: 575.98px) {
    display: none;
  }

  a {
    width: 2.2rem;
    margin: 0 0.8rem;
  }
`;
const RightPart = connect(({ state, actions }) =>
    state.theme.user.logged ? (
        <>
            <Link
                onClick={() => actions.theme.removeUser()}
                className={"links primary"}
                href={"/"}
            >
                <Button
                    className={"logout primary-border"}
                    focusable={false}
                    label={"Log Out"}
                />
            </Link>
        </>
    ) : (
        <>
            <Link className={"signup-btn"} href={"/sign-in/"}>
                <Button
                    className={"primary-border primary"}
                    focusable={false}
                    label={"Sign in"}
                />
            </Link>
        </>
    )
);
const LogoLink = connect(({ state }) =>
    state.theme.user.logged ? (
        <Link href={"/dashboard"}>
            <svg className={"logo"} viewBox="0 0 4302.4 813">
                <path d="M998.2,502.9c0-144.9,111.9-252,263.8-252c151.8,0,263.8,106.4,263.8,252s-111.9,252-263.8,252   C1110.1,754.9,998.2,647.8,998.2,502.9 M1434,502.9c0-100.1-73.5-172.2-172.1-172.2c-98.7,0-172.1,72.1-172.1,172.2   s73.5,172.2,172.1,172.2C1360.6,675.1,1434,603,1434,502.9" />
                <path d="M2032.2,432.2c0,107.8-79.8,174.3-208.5,174.3h-110.5v141.4h-91v-490h201.5   C1952.5,257.9,2032.2,323.7,2032.2,432.2 M1940.6,432.2c0-61.6-41.3-97.3-121-97.3h-106.3v194.6h106.3   C1899.3,529.5,1940.6,493.8,1940.6,432.2" />
                <path d="M2533.2,432.2c0,107.8-79.8,174.3-208.5,174.3h-110.5v141.4h-91v-490h201.5   C2453.4,257.9,2533.2,323.7,2533.2,432.2 M2441.5,432.2c0-61.6-41.3-97.3-121-97.3h-106.3v194.6h106.3   C2400.3,529.5,2441.5,493.8,2441.5,432.2" />
                <path d="M2596.2,502.9c0-144.9,111.9-252,263.8-252c151.8,0,263.8,106.4,263.8,252s-111.9,252-263.8,252   C2708.1,754.9,2596.2,647.8,2596.2,502.9 M3032.1,502.9c0-100.1-73.5-172.2-172.1-172.2c-98.7,0-172.1,72.1-172.1,172.2   s73.5,172.2,172.1,172.2C2958.6,675.1,3032.1,603,3032.1,502.9" />
                <polygon points="3655.4,257.9 3655.4,747.9 3580.6,747.9 3310.5,416.1 3310.5,747.9 3220.3,747.9 3220.3,257.9    3295.1,257.9 3565.2,589.7 3565.2,257.9  " />
                <path d="M3752,502.9c0-144.9,111.9-252,263.8-252c151.8,0,263.8,106.4,263.8,252s-111.9,252-263.8,252   C3863.9,754.9,3752,647.8,3752,502.9 M4187.9,502.9c0-100.1-73.5-172.2-172.1-172.2c-98.7,0-172.1,72.1-172.1,172.2   s73.5,172.2,172.1,172.2C4114.4,675.1,4187.9,603,4187.9,502.9" />
                <path
                    fill={"#EEEEEE"}
                    d="M371,812.9c-4.2-7.2-3.9-7.8,3.1-13.1c20-15,39.9-30.2,59.8-45.3c20.6-15.6,41.2-31.2,61.9-46.8   c2.9-2.2,6.2-2.9,9.8-2.9c56.8,0.1,113.6,0.2,170.4-0.1c18.3-0.1,33.8-12.3,36.1-32.4c0.7-6.3,0.8-12.6,0.8-18.9   c0-69.1,0.4-138.3-0.2-207.4c-0.1-18.3,0.1-36.6-1-54.8c-0.8-14.3-7.6-26.3-19-35.4c-17.2-13.8-34.4-27.5-51.7-41.2   c-15.3-12.1-30.8-24.1-46.1-36.2c-18.8-14.7-37.5-29.5-56.2-44.2c-31-24.4-62-48.7-93-73.1c-5.9-4.6-11.3-9.7-18-13.3   c-15.5-8.4-30.4-6.3-43.9,4c-28.6,22-56.8,44.6-85.2,66.9c-19.4,15.2-38.9,30.3-58.3,45.6c-21.6,17-43,34.2-64.6,51.3   c-15.4,12.2-31,24.3-46.4,36.7c-12.5,10-19.6,23.3-22.2,38.9c-1.8,11-2.1,22.1-2.1,33.2c0,125.6,0,251.2,0,376.8c0,4,0.3,8-2,11.5   h-32c-0.3-2.5-2.3-2-3.8-2c-15.8,0-31.5,0-47.3,0c-1.6,0-3.5-0.5-3.9,2h-13c-0.1-1.9-1.1-2.9-3-3V321c3.3-1.1,3.8-4.7,6.1-6.8   c11.3-10.3,23.9-18.9,35.8-28.4c28.4-22.7,57.3-44.9,86-67.3c19.8-15.5,39.7-31,59.5-46.5c13.7-10.7,27.4-21.4,41.1-32.1   c19.9-15.6,39.8-31.3,59.7-47c14.6-11.5,29.2-22.9,43.7-34.4c20-15.8,40.1-31.5,60-47.5c4.5-3.6,10.4-6,12.9-11.9h8   c0,1.9,1.3,3,2.6,4c4.9,3.9,9.9,7.8,14.8,11.7c18.1,14.2,36.2,28.4,54.3,42.6c19.6,15.5,39.2,31,58.9,46.5   c14.3,11.2,28.8,22.3,43.1,33.5c19.9,15.6,39.8,31.3,59.7,47c15.8,12.4,31.5,24.7,47.3,37.1c18.2,14.3,36.5,28.6,54.7,42.9   c15.9,12.5,31.8,24.9,47.7,37.4c7.4,5.9,15.5,11,21.8,18.3v490.9c-1.5,0-2.9,0-3,2H371z"
                />
                <path
                    fill={"#FCFCFC"}
                    d="M16.1,812.9c0.4-2.5,2.3-2,3.9-2c15.8,0,31.5,0,47.3,0c1.6,0,3.5-0.5,3.8,2H16.1z"
                />
                <path
                    fill={"#FCFCFC"}
                    d="M0.1,809.9c1.9,0.1,2.9,1.1,3,3C0.6,813.4-0.4,812.4,0.1,809.9"
                />
                <path
                    fill={"#FEFEFE"}
                    d="M814.9,812.9c0.1-2,1.5-2,3-2C818.5,814,816.2,812.6,814.9,812.9"
                />
            </svg>
            {/*<img src={lightLogo} alt={'logo'} className={'logo'}/>*/}
            <img src={mobileLogo} alt={"logo"} className={"mobile-logo"} />
        </Link>
    ) : (
        <>
            <Link href={"/"}>
                <svg className={"logo"} viewBox="0 0 4302.4 813">
                    <path d="M998.2,502.9c0-144.9,111.9-252,263.8-252c151.8,0,263.8,106.4,263.8,252s-111.9,252-263.8,252   C1110.1,754.9,998.2,647.8,998.2,502.9 M1434,502.9c0-100.1-73.5-172.2-172.1-172.2c-98.7,0-172.1,72.1-172.1,172.2   s73.5,172.2,172.1,172.2C1360.6,675.1,1434,603,1434,502.9" />
                    <path d="M2032.2,432.2c0,107.8-79.8,174.3-208.5,174.3h-110.5v141.4h-91v-490h201.5   C1952.5,257.9,2032.2,323.7,2032.2,432.2 M1940.6,432.2c0-61.6-41.3-97.3-121-97.3h-106.3v194.6h106.3   C1899.3,529.5,1940.6,493.8,1940.6,432.2" />
                    <path d="M2533.2,432.2c0,107.8-79.8,174.3-208.5,174.3h-110.5v141.4h-91v-490h201.5   C2453.4,257.9,2533.2,323.7,2533.2,432.2 M2441.5,432.2c0-61.6-41.3-97.3-121-97.3h-106.3v194.6h106.3   C2400.3,529.5,2441.5,493.8,2441.5,432.2" />
                    <path d="M2596.2,502.9c0-144.9,111.9-252,263.8-252c151.8,0,263.8,106.4,263.8,252s-111.9,252-263.8,252   C2708.1,754.9,2596.2,647.8,2596.2,502.9 M3032.1,502.9c0-100.1-73.5-172.2-172.1-172.2c-98.7,0-172.1,72.1-172.1,172.2   s73.5,172.2,172.1,172.2C2958.6,675.1,3032.1,603,3032.1,502.9" />
                    <polygon points="3655.4,257.9 3655.4,747.9 3580.6,747.9 3310.5,416.1 3310.5,747.9 3220.3,747.9 3220.3,257.9    3295.1,257.9 3565.2,589.7 3565.2,257.9  " />
                    <path d="M3752,502.9c0-144.9,111.9-252,263.8-252c151.8,0,263.8,106.4,263.8,252s-111.9,252-263.8,252   C3863.9,754.9,3752,647.8,3752,502.9 M4187.9,502.9c0-100.1-73.5-172.2-172.1-172.2c-98.7,0-172.1,72.1-172.1,172.2   s73.5,172.2,172.1,172.2C4114.4,675.1,4187.9,603,4187.9,502.9" />
                    <path
                        fill={"#EEEEEE"}
                        d="M371,812.9c-4.2-7.2-3.9-7.8,3.1-13.1c20-15,39.9-30.2,59.8-45.3c20.6-15.6,41.2-31.2,61.9-46.8   c2.9-2.2,6.2-2.9,9.8-2.9c56.8,0.1,113.6,0.2,170.4-0.1c18.3-0.1,33.8-12.3,36.1-32.4c0.7-6.3,0.8-12.6,0.8-18.9   c0-69.1,0.4-138.3-0.2-207.4c-0.1-18.3,0.1-36.6-1-54.8c-0.8-14.3-7.6-26.3-19-35.4c-17.2-13.8-34.4-27.5-51.7-41.2   c-15.3-12.1-30.8-24.1-46.1-36.2c-18.8-14.7-37.5-29.5-56.2-44.2c-31-24.4-62-48.7-93-73.1c-5.9-4.6-11.3-9.7-18-13.3   c-15.5-8.4-30.4-6.3-43.9,4c-28.6,22-56.8,44.6-85.2,66.9c-19.4,15.2-38.9,30.3-58.3,45.6c-21.6,17-43,34.2-64.6,51.3   c-15.4,12.2-31,24.3-46.4,36.7c-12.5,10-19.6,23.3-22.2,38.9c-1.8,11-2.1,22.1-2.1,33.2c0,125.6,0,251.2,0,376.8c0,4,0.3,8-2,11.5   h-32c-0.3-2.5-2.3-2-3.8-2c-15.8,0-31.5,0-47.3,0c-1.6,0-3.5-0.5-3.9,2h-13c-0.1-1.9-1.1-2.9-3-3V321c3.3-1.1,3.8-4.7,6.1-6.8   c11.3-10.3,23.9-18.9,35.8-28.4c28.4-22.7,57.3-44.9,86-67.3c19.8-15.5,39.7-31,59.5-46.5c13.7-10.7,27.4-21.4,41.1-32.1   c19.9-15.6,39.8-31.3,59.7-47c14.6-11.5,29.2-22.9,43.7-34.4c20-15.8,40.1-31.5,60-47.5c4.5-3.6,10.4-6,12.9-11.9h8   c0,1.9,1.3,3,2.6,4c4.9,3.9,9.9,7.8,14.8,11.7c18.1,14.2,36.2,28.4,54.3,42.6c19.6,15.5,39.2,31,58.9,46.5   c14.3,11.2,28.8,22.3,43.1,33.5c19.9,15.6,39.8,31.3,59.7,47c15.8,12.4,31.5,24.7,47.3,37.1c18.2,14.3,36.5,28.6,54.7,42.9   c15.9,12.5,31.8,24.9,47.7,37.4c7.4,5.9,15.5,11,21.8,18.3v490.9c-1.5,0-2.9,0-3,2H371z"
                    />
                    <path
                        fill={"#FCFCFC"}
                        d="M16.1,812.9c0.4-2.5,2.3-2,3.9-2c15.8,0,31.5,0,47.3,0c1.6,0,3.5-0.5,3.8,2H16.1z"
                    />
                    <path
                        fill={"#FCFCFC"}
                        d="M0.1,809.9c1.9,0.1,2.9,1.1,3,3C0.6,813.4-0.4,812.4,0.1,809.9"
                    />
                    <path
                        fill={"#FEFEFE"}
                        d="M814.9,812.9c0.1-2,1.5-2,3-2C818.5,814,816.2,812.6,814.9,812.9"
                    />
                </svg>
                {/*<img src={lightLogo} alt={'logo'} className={'logo'}/>*/}
                <img src={mobileLogo} alt={"logo"} className={"mobile-logo"} />
            </Link>
        </>
    )
);
const LoginBtn = connect(
    ({ state, menuHandler }) =>
        state.theme.user.logged || (
            <Link
                onClick={() => menuHandler(false)}
                className={"primary member-login"}
                href={"/sign-in/"}
            >
                I'm an oppono member
            </Link>
        )
);

const SignupBtn = connect(
    ({ state, menuHandler }) =>
        state.theme.user.logged || (
            <Link
                onClick={() => menuHandler(false)}
                className={"signup-btn"}
                href={"/sign-in/"}
            >
                <Button
                    className={"secondary-border primary"}
                    focusable={false}
                    label={"Become a member"}
                />
            </Link>
        )
);

const SignedLinks = connect(
    ({ state, menuHandler }) =>
        state.theme.user.logged && (
            <>
                <Link
                    onClick={() => menuHandler(false)}
                    className={"primary"}
                    href={"/dashboard/a/"}>
                    Submit an application
                </Link>
                <Link
                    onClick={() => menuHandler(false)}
                    className={"primary"}
                    href={"/b/"}>
                    Business equity line
                </Link>
                <Link
                    onClick={() => menuHandler(false)}
                    className={"primary"}
                    href={"/dashboard/c/"}>
                    Qualify my client
                </Link>
            </>
        )
);

const BrokerCatalogueLink = connect(
    ({ state, menuHandler }) => {
        const { acf } = state.source.get("acf-options-page");
        let vancouverBrokerCatalogueUrl = acf?.metro_vancouver_broker_catalogue
        let vancouverBrokerCatalogueUrlLogged = acf?.metro_vancouver_broker_catalogue_logged_user

        if (vancouverBrokerCatalogueUrl)
            return (
                state.theme.user.logged ? (
                    <a
                        onClick={() => menuHandler(false)}
                        className={"primary"}
                        target={`_blank`}
                        href={vancouverBrokerCatalogueUrlLogged}
                    >
                        Vancouver
                    </a>
                )
                    :
                    <a
                        onClick={() => menuHandler(false)}
                        className={"primary"}
                        target={`_blank`}
                        href={vancouverBrokerCatalogueUrl}
                    >
                        Vancouver
                    </a>
            )
    }
);

const Header = React.forwardRef(
    ({ className, hasSubMenu = true, hasProgress = false, state, }, forwardRef) => {
        const [menuOpened, setMenuOpened] = React.useState(false);
        const menuHandler = (value) => {
            setMenuOpened(value);
            value ? preventPageScroll() : allowPageScroll();
        };
        return (
            <header ref={forwardRef} className={className + " header"}>
                {hasProgress ? (
                    <div className="header__inner">
                        <Container>
                            <StepsProgress horizontal />
                        </Container>
                    </div>
                ) : null}
                <div className={classnames("menu-content", { menuOpened })}>
                    <Container>
                        <div className="menu-content__inner">
                            <div className="menu-left">
                                <LogoLink />
                            </div>
                            <div className="menu-right">
                                <div className="desktop-menu">
                                    <Link
                                        onClick={() => menuHandler(false)}
                                        className={"primary"}
                                        href="/what-we-do/"
                                    >
                                        What we do
                                    </Link>
                                    {state.theme.user.logged ? (
                                        <Link
                                            onClick={() => menuHandler(false)}
                                            className={"primary"}
                                            href={"/products/"}
                                        >
                                            Products & rates
                                        </Link>
                                    )
                                        :
                                        <Link
                                            onClick={() => menuHandler(false)}
                                            className={"primary"}
                                            href={"/sign-in/"}
                                        >
                                            Products & rates
                                        </Link>
                                    }
                                    <Link
                                        onClick={() => menuHandler(false)}
                                        className={"primary"}
                                        href={"/dashboard/e/"}
                                    >
                                        Find an appraiser
                                    </Link>
                                    <Link
                                        onClick={() => menuHandler(false)}
                                        className={"primary"}
                                        href={"/map/"}
                                    >
                                        Lending areas
                                    </Link>
                                    <BrokerCatalogueLink />
                                    <Link
                                        onClick={() => menuHandler(false)}
                                        className={"primary"}
                                        href={"/get-in-touch/"}
                                    >
                                        Get in touch
                                    </Link>
                                </div>
                                <RightPart />
                                <div onClick={() => menuHandler(true)} className={"three-dots"}>
                                    <span className={"primary-bg"} />
                                    <span className={"primary-bg"} />{" "}
                                    <span className={"primary-bg"} />
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>

                {hasSubMenu ? <SubHeader /> : null}

                <div className={classnames("floating-menu", { menuOpened })}>
                    <Container>
                        <svg
                            onClick={() => menuHandler(false)}
                            className={"close-menu"}
                            viewBox="0 0 20 20"
                        >
                            <path
                                fill="none"
                                stroke="#b5d2ff"
                                className={"primary-stroke"}
                                strokeMiterlimit="20"
                                strokeWidth="2"
                                d="M1.053 18.957L19.502.507"
                            />
                            <path
                                fill="none"
                                stroke="#b5d2ff"
                                className={"primary-stroke"}
                                strokeMiterlimit="20"
                                strokeWidth="2"
                                d="M1.053.508l18.449 18.449"
                            />
                        </svg>
                        <div className="links">
                            <Link
                                onClick={() => menuHandler(false)}
                                className={"primary"}
                                href="/what-we-do/"
                            >
                                What we do
                            </Link>
                            {state.theme.user.logged ? (
                                <Link
                                    onClick={() => menuHandler(false)}
                                    className={"primary"}
                                    href={"/products/"}
                                >
                                    Products & rates
                                </Link>
                            )
                                :
                                <Link
                                    onClick={() => menuHandler(false)}
                                    className={"primary"}
                                    href={"/sign-in/"}
                                >
                                    Products & rates
                                </Link>
                            }
                            <SignedLinks />
                            <Link
                                onClick={() => menuHandler(false)}
                                className={"primary"}
                                href={"/dashboard/e/"}
                            >
                                Find an appraiser
                            </Link>
                            <Link
                                onClick={() => menuHandler(false)}
                                className={"primary"}
                                href={"/map/"}
                            >
                                Lending areas
                            </Link>
                            <BrokerCatalogueLink />
                            <Link
                                onClick={() => menuHandler(false)}
                                className={"primary"}
                                href={"/get-in-touch/"}
                            >
                                Get in touch
                            </Link>
                            <LoginBtn menuHandler={menuHandler} />
                            <SignupBtn menuHandler={menuHandler} />
                        </div>
                        <div className="links social">
                            <SocialLinks />
                        </div>
                    </Container>
                </div>
            </header>
        );
    }
);

Header.propTypes = {
    className: PropTypes.string,
    hasSubMenu: PropTypes.bool,
    hasProgress: PropTypes.bool,
};

export default styled(Header)`
  position: fixed !important;
  z-index: 1000;
  width: 100%;
  opacity: 1;
  top: 0;
  transition: opacity 500ms;

	.header__inner {
		position: absolute;
		left: 0;
		bottom: 20px;
		width: 100%;
	}

  .menu-content {
		border-bottom: 1px solid #B5D2FF33;

		.menu-content__inner {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: ${size(75)};
		}

    .menu-left {
      .logo {
        width: ${size(133)};
        @media (max-width: 575.98px) {
          display: none;
        }
      }

      .mobile-logo {
        filter: grayscale(1);
        @media (min-width: 576px) {
          display: none;
        }
        width: ${size(24)};
        height: ${size(24)};
        object-fit: contain;
      }

      @media (max-width: 991.98px) {
        z-index: 9;
      }
    }

    .menu-right {
      display: flex;
      align-items: center;

			.desktop-menu {
				a {
					font-size: ${size(15)};
					margin-right: ${size(35)};
				}
				@media (max-width: 991.98px) {
					display: none;
				}
			}

      .links {
        color: #b5d2ff;
        font-size: ${size(16)};
        font-weight: 400;
        font-style: normal;
      }

      ${Button} {
        margin-top: 0;
        padding: ${size(8)} ${size(22)};
      }

      .three-dots {
        display: flex;
        align-items: center;
        flex-direction: column;
        margin-left: ${size(28)};
        cursor: pointer;
        width: ${size(20)};

				@media (min-width: 991.98px) {
					display: none;
				}

        span {
          border-radius: 50%;
          width: ${size(3)};
          height: ${size(3)};
          background-color: #b5d2ff;
          margin: ${size(2)} 0;
        }
      }
    }
  }

	button {
		min-width: 14rem;
		padding: 0.8rem;
	}

	.menuOpened {
		.three-dots {
			opacity: 0;
			z-index: -1;
		}
	}

  .floating-menu {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transition: opacity 200ms, visibility 200ms;
    opacity: 0;
    visibility: hidden;
    margin-top: 76px;
    height: calc(100% - 76px);

    ${Container} {
      position: relative;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      @media (max-width: 991.98px) {
        flex-direction: column;
        padding-top: 0;
      }
    }

    &.menuOpened {
      opacity: 1;
      transition: opacity 200ms, visibility 200ms;
      visibility: visible;
      z-index: 10000;
    }

    .close-menu {
      position: absolute;
      top: -4rem;
      right: ${size(15)};
      transform: translateY(-50%);
      width: ${size(19)};
      height: ${size(19)};
      cursor: pointer;
      @media (max-width: 991.98px) {
        transform: translate(-50%, -50%);
      }
    }

    .logo {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: ${size(96)};
      border-bottom: ${size(1)} solid #b5d2ff;

      img {
        width: unset;
        height: ${size(26)};
      }
    }

    .links {
      display: flex;
      flex-direction: column;
      align-items: center;

      &.social {
        position: absolute;
        bottom: 2rem;
        left: 0;
        width: 100%;
      }

      .signup-btn {
        width: 100%;

        button {
          width: 100%;
          margin-top: 0;
          min-height: 5rem;
        }
      }

      @media (max-width: 991px) {
        width: 90%;
      }

      a {
        color: #b5d2ff;
        font-size: ${size(32)};
        font-weight: 400;
        margin-bottom: ${size(25)};
        transition: opacity 300ms;

        &:last-of-type {
          margin-bottom: 0;
        }

        &:hover {
          opacity: 0.6;
        }

        @media (max-width: 991.98px) {
          font-size: ${size(32)};
          margin-bottom: ${size(40)};
        }
        @media (max-width: 575.98px) {
          font-size: ${size(22)};
          margin-bottom: ${size(30)};
        }

        &.member-login {
          width: auto;
          font-size: ${size(27)};
          max-width: 100%;
					width: 100%;
          min-height: ${size(50)};
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: ${size(45)};
          background-color: #fe412d;
          color: #fff !important;
          cursor: pointer;
          white-space: nowrap;
          @media (max-width: 991.98px) {
            font-size: ${size(28)};
						padding: 1rem 0;
            border-radius: ${size(32)};
          }
          @media (max-width: 575.98px) {
            font-size: ${size(16)};
						padding: 0;
            margin-bottom: ${size(20)};
          }
        }
      }
    }

    .social-icons {
      margin-top: 2.5rem;
      display: flex;

      @media (min-width: 575.98px) {
        display: none;
      }

      a {
        width: 2.2rem;
        margin: 0 0.8rem;
      }
    }
  }

	.social-menu {
		width: 80%;
    justify-content: space-evenly;
	}

	.mobile-social-menu {
		justify-content: flex-end;
    align-items: flex-end;
    display: flex;
    margin-bottom: 0 !important;
	}

	.logout {
		color: #BFB6B4;
		border-color: #BFB6B4 !important;
	}

  ${StepsProgress} {
    display: none;

		@media (max-width: 575.98px) {

			.current .step-name {
        top: ${size(12)};
        left: 50%;
        transform: translateX(-50%);
      }
    }
	}
`;
