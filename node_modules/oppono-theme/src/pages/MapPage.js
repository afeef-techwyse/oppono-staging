import React from "react";
import { connect, styled } from "frontity";
import Footer from "../components/Footer";
import FormStep from "../components/form-components/FormStep";
import Header from "../components/Header";
import mapInfo from "../assets/images/map-info-bg.png";
import Input from "../components/form-components/Input";
import Button from "../components/form-components/Button";
import Container from "../components/reusable/Container";
import Link from "../components/reusable/Link";
import { size } from "../functions/size";
import Select from "../components/form-components/Select";
import useAddress from '../contexts/AddressProvider'

import cities from "../assets/cities assets/cities.json";
import opponoApi from "../opponoApi";
import debounce from "../functions/debounce";
import classnames from "classnames";

function copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    // to avoid breaking orgain page when copying more words
    // cant copy when adding below this code
    // dummy.style.display = 'none'
    document.body.appendChild(dummy);
    //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

const sortedCities = cities.sort((a, b) => (a.name > b.name ? 1 : -1));
const MapPage = ({ className, actions, state, libraries }) => {
    const generateMap = ({ windowSize, name, coordinates, enc, zoom }) => {
        let link = `https://maps.googleapis.com/maps/api/staticmap?map_id=3a82b8043ec69e1&zoom=${zoom || 7
            }&key=AIzaSyAQAH4EYrsNqXGeVZaBf4nUNADQd7UkuLM&size=${windowSize?.width || 1920
            }x${windowSize?.height || 1080}`;
        link += name
            ? `&center=canada+ontario+${name.replaceAll(" ", "+")}`
            : "&center=canada+toronto";
        link += coordinates
            ? `&path=color:0x0E9564FF|weight:2|fillcolor:0x26D69634|${coordinates
                .map((a) => a[0].toFixed?.(3) + "," + a[1].toFixed?.(3))
                .join("|")}`
            : "";
        link += enc
            ? `&path=color:0x0E9564FF|weight:2|fillcolor:0x26D69634|enc:${enc}`
            : "";
        return link;
    };
    const mapRef = React.useRef(null);
    const mapAPIRef = React.useRef(null);
    const polygonAPIRef = React.useRef(null);
    const [postalCodeErrorMessage, setPostalCodeErrorMessage] = React.useState(
        ""
    );

    const { address, handleAddressChange } = useAddress();

    // const geocoderAPIRef = React.useRef(null);

    const initMap = () => {
        mapAPIRef.current = new window.google.maps.Map(mapRef.current, {
            center: { lat: 43.653226, lng: -79.3831843 },
            zoom: 9,
            disableDefaultUI: true,
            draggable: true,
            mapId: "fc06fa36f5d8b58",
        });
        polygonAPIRef.current = new window.google.maps.Polygon({
            // paths: triangleCoords,
            strokeColor: "#0E9564",
            strokeOpacity: 1,
            strokeWeight: 2,
            fillColor: "#26D696",
            fillOpacity: 0.2,
            map: mapAPIRef.current,
        });
        polygonAPIRef.current.getBounds = function () {
            let bounds = new window.google.maps.LatLngBounds();
            let paths = polygonAPIRef.current.getPaths();
            let path;
            for (let i = 0; i < paths.getLength(); i++) {
                path = paths.getAt(i);
                for (let ii = 0; ii < path.getLength(); ii++) {
                    bounds.extend(path.getAt(ii));
                }
            }
            return bounds;
        };
    };

    React.useEffect(() => {
        actions.source.fetch("appraisers-map-lookup");
        if (!window.google) {
            const scriptElement = document.createElement("script");
            scriptElement.type = "text/javascript";
            scriptElement.src = `https://maps.google.com/maps/api/js?key=AIzaSyAQAH4EYrsNqXGeVZaBf4nUNADQd7UkuLM&map_ids=fc06fa36f5d8b58`;
            document.body.appendChild(scriptElement);
            scriptElement.addEventListener("load", initMap);
        } else {
            initMap();
        }
    }, []);

    // const windowSize = useWindowSize();
    const [appraiser, setAppraiser] = React.useState([{}]);
    const postal_city = React.useRef({ postalCode: "", city: "" });
    const appraisersLookup = state.source.get("appraisers-map-lookup");
    const postalCodeGetAppraiser = debounce((postalCode) => {
        if (postalCode.length < 3) {
            setAppraiser([{}]);
            setPostalCodeErrorMessage(true);
            return;
        }
        const data = new FormData();
        data.append("postal_code", postalCode.trim().slice(0, 3));
        opponoApi.post("/appraiser-lookup", data).then((response) => {
            if (response.data.length > 2) {
                setAppraiser([{}]);
                setPostalCodeErrorMessage(true);
            } else if (response.data.length == 0) {
                setAppraiser([{}]);
                setPostalCodeErrorMessage(true);
            } else {
                setAppraiser(response.data);
                setPostalCodeErrorMessage(false);
                const { coordinates } = cities.filter(
                    (city) => city.name === response.data[0]?.fields.city
                )[0];
                polygonAPIRef.current.setPaths(coordinates);
                mapAPIRef.current.fitBounds(polygonAPIRef.current.getBounds());
            }
        });
    }, 1000);
    React.useEffect(() => {
        actions.theme.setActiveTheme("gray-theme");
    }, []);

    const Html2React = libraries.html2react.Component;

    return (
        <div className={classnames(className)}>
            <div className="map" ref={mapRef} />
            <Header state={state} hasSubMenu={false} />
            <Container className="flexcontainer">
                <div className="map-wrapper">
                    <div className="col-left">
                        <div className="text-wrapper">
                            {/*<h2 className={'headline-2 dark'}>Looking within a specific city or region?</h2>*/}
                        </div>
                        <div className="inputs-group">
                            <Select
                                onChange={({ name, zoomed, coordinates }) => {
                                    postal_city.current.city = name;
                                    setAppraiser(appraisersLookup.data[name] || [{ fields: { city: name } }]);
                                    polygonAPIRef.current.setPaths(coordinates);
                                    if (zoomed == true) {
                                        mapAPIRef.current.fitBounds(
                                            polygonAPIRef.current.getBounds()
                                        );
                                        mapAPIRef.current.setZoom(14);
                                    } else {
                                        mapAPIRef.current.fitBounds(
                                            polygonAPIRef.current.getBounds()
                                        );
                                    }
                                }}
                                noOptionsMessage={() => "No City Found"}
                                options={sortedCities}
                                name={"city"}
                                label={"Select a city"}
                                value={cities.filter(
                                    (city) => city.name === appraiser[0]?.fields?.city
                                )}
                            />
                            <p>OR</p>
                            <Input
                                type={"text"}
                                name={"postal_code"}
                                onChange={(e) => {
                                    postal_city.current.postalCode = e.target.value;
                                    postalCodeGetAppraiser(e.target.value);
                                }}
                                placeholder={"L5H 3S4"}
                                label={"Type in your postal code"}
                            />
                        </div>
                        {postalCodeErrorMessage ? (
                            <p className={"error-message"}>
                                No appraisers found for this postal code<br />
                                <Link href={'/get-in-touch'}>Please contact us</Link>
                            </p>
                        ) : null}
                    </div>
                    <div className="col-right mobile-only">


                        {appraiser[0]?.fields &&
                            appraiser
                                .filter((v, i, a) => a.findIndex(t => (t.ID === v.ID)) === i)
                                .map((a) =>
                                    a.fields ? (
                                        <div key={a.ID} className="appraisal-block">
                                            <div className="appraiser-container">
                                                <p className="label">Lending Area</p>
                                                <p className="city">{a.title}</p>
                                                <p className="ltv">{a.fields.ltv}% LTV</p>
                                            </div>
                                            <div className="appraiser-container">
                                                <p className="label">Preferred Appraisers</p>
                                                {a.fields.preferred_appraisal_company &&
                                                    <p className="text mt-5">
                                                        {[...a.fields.preferred_appraisal_company]
                                                            ?.map?.((c) => c.post_title)
                                                            .join(", ")}
                                                    </p>
                                                }
                                            </div>
                                            <div className="appraiser-container">
                                                <p className="label">BDM Contact</p>
                                                <p className={'name'} dangerouslySetInnerHTML={{ __html: a.fields.bdm?.name }} />
                                                <p className={'phone'} dangerouslySetInnerHTML={{ __html: a.fields.bdm?.phone }} />
                                                <p className={'email'} dangerouslySetInnerHTML={{ __html: a.fields.bdm?.email }} />
                                            </div>
                                        </div>
                                    ) : null
                                )
                        }
                    </div>
                </div>
                <div className="map-wrapper desktop-only">
                    <div className="col-right">


                        {appraiser[0]?.fields &&
                            appraiser
                                .filter((v, i, a) => a.findIndex(t => (t.ID === v.ID)) === i)
                                .map((a) =>
                                    a.fields ? (
                                        <div key={a.ID} className="appraisal-block">
                                            <div className="appraiser-container">
                                                <p className="label">Lending Area</p>
                                                <p className="city">{a.title}</p>
                                                <p className="ltv">{a.fields.ltv?.includes('%') ? a.fields.ltv : a.fields.ltv + '%'} LTV</p>
                                            </div>
                                            <div className="appraiser-container">
                                                <p className="label">Preferred Appraisers</p>
                                                {a.fields.preferred_appraisal_company &&
                                                    <p className="text mt-5">
                                                        {[...a.fields.preferred_appraisal_company]
                                                            ?.map?.((c) => c.post_title)
                                                            .join(", ")}
                                                    </p>
                                                }
                                            </div>
                                            <div className="appraiser-container">
                                                <p className="label">BDM Contact</p>
                                                <p className={'name'} dangerouslySetInnerHTML={{ __html: a.fields.bdm?.name }} />
                                                <p className={'phone'} dangerouslySetInnerHTML={{ __html: a.fields.bdm?.phone }} />
                                                <p className={'email'} dangerouslySetInnerHTML={{ __html: a.fields.bdm?.email }} />
                                            </div>
                                        </div>
                                    ) : null
                                )
                        }
                    </div>
                </div>
            </Container>
            <Footer />
        </div>
    );
};

export default styled(connect(MapPage))`
  height: calc(var(--vh, 1vh) * 100);
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 0;
  }

  .mobile-only {
    display: none !important;
  }

  .desktop-only {
    justify-content: flex-end !important;
  }

  @media (max-width: 998px) {
    .mobile-only {
      display: block !important;
    }

    .desktop-only {
      display: none !important;
    }
  }

  ${Header} {
    background: none !important;
  }

  header .container,
  footer .container {
    margin-top: 0px;
  }

	.appraiser-container {
		background: #0F0F15;
		border: 1px solid #BFB6B4;
		border-radius: 23px;
		padding: 2rem;
		margin-left: 4.5rem;
		top: -2rem;
		max-width: 22rem;

		@media (max-width: 998px) {
			margin-top: 2rem;
			position: relative;
			margin-left: 0;
			max-width: 100%;
		}

		.label {
			font-weight: 500;
			color: #36808B;
			font-size: ${size(14)};
			margin-bottom: 0.5rem;
		}

		.name {
			font-weight: 300;
			color: #BFB6B4;
			font-size: ${size(23)};
			margin-bottom: 1.5rem;
		}

		.phone {
			font-weight: 500;
			color: #FFF;
			font-size: ${size(14)};
			margin-bottom: 1rem;
		}
		.email {
			font-weight: 500;
			color: #FFF;
			font-size: ${size(14)};
		}
	}

  .map-wrapper {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    position: relative;
    z-index: 6;

    &.desktop-only {
      position: absolute;
      right: 6rem;
      top: 46%;
      transform: translateY(-50%);

      .col-right {
        flex-direction: row;
      }
    }

    @media (max-width: 991.98px) {
      width: 100%;
      flex-direction: column;
    }
    @media (min-width: 1800px) {
      margin-top: -1rem;
    }

    @media (max-width: 575.98px) {
      margin: auto;
      left: 0;
      overflow: scroll;
      padding-bottom: 8rem;
      width: 100%;
      z-index: 100;
			height: 100%;
			-ms-overflow-style: none;  /* IE and Edge */
  		scrollbar-width: none;  /* Firefox */

			&::-webkit-scrollbar {
				display: none;
			}

			.col-left {
				margin-top: 4rem;
				width: 100%;
			}
    }

    .col-left {
      display: flex;
      flex-direction: column;
      max-width: ${size(660)};
      background: #0F0F15;
			padding: 1rem 2rem 3rem;
			border: 1px solid #BFB6B4;
			border-radius: 20px;
			opacity: 0.97;

      @media (max-width: 991.98px) {
        margin-bottom: ${size(50)};
      }

      @media (max-width: 575.98px) {
        padding: 2rem;
				margin-top: 0;
      }

      .inputs-group {
        display: flex;
        align-items: center;

        .form-group {
          margin: 0;
          flex-grow: 1;
          flex-basis: 50%;
          width: 100%;
        }

        p {
          color: #bfb6b4;
          font-size: ${size(16)};
          font-weight: 400;
          margin: 0 ${size(38)};
          @media (max-width: 575.98px) {
            margin: ${size(20)} 0;
          }
        }

        margin-top: ${size(15)};
        @media (max-width: 575.98px) {
          margin-top: ${size(2.5)};
          flex-direction: column;
          align-items: flex-start;
        }
      }

      .headline-1 {
        color: #bfb6b4;
        font-size: ${size(40)};
        font-weight: 300;
        line-height: ${size(48)};
        @media (max-width: 991.98px) {
          font-size: ${size(35)};
        }
        @media (max-width: 575.98px) {
          font-size: 1.8rem;
          line-height: 1.4;
          text-align: center;
        }
      }

      .headline-2 {
        color: rgba(191, 182, 180, 0.5);
        font-size: ${size(29)};
        font-weight: 300;
        line-height: ${size(40)};
        @media (max-width: 991.98px) {
          font-size: ${size(24)};
          line-height: normal;
        }
        @media (max-width: 575.98px) {
          font-size: ${size(28)};
        }
      }

      .btn-group {
        margin-top: ${size(80)};

        button {
          width: 50%;
          max-width: unset;
          margin: 0;

          &:first-of-type {
            margin-right: ${size(20)};
          }
        }

        @media (max-width: 991.98px) {
          display: none;
        }
      }
    }

    .col-right {
      display: flex;
      flex-direction: column;
			height: 100%;

			@media (max-width: 998px) {
				margin-top: 25rem;
				width: 100%;
			}

			.appraisal-block {
				height: 100%;
				width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
			}

      h3 {
        color: #bfb6b4;
        font-size: ${size(56)};
        font-weight: 200;
        line-height: ${size(64)};
        margin-bottom: ${size(17)};
        @media (max-width: 575.98px) {
          font-size: ${size(28)};
          text-align: center;
        }
      }

			.city {
				font-size: ${size(23)};
				color: #BFB6B4;
			}

      .text {
        color: #bfb6b4;
        font-size: ${size(14)};
        font-weight: 200;

				@media (max-width: 998.98px) {
					max-width: 22rem;
				}
      }

      .bold {
        font-weight: 500;
        margin-top: ${size(16)};
      }

      .ltv {
        color: #bfb6b4;
        font-size: ${size(30)};
        font-weight: 200;
        line-height: ${size(39)};
      }

      hr {
        background-color: rgba(191, 182, 180, 0.1);
        margin: ${size(20)} 0;
        height: 1px;
        display: inline-block;
        @media (max-width: 575.98px) {
          margin: ${size(15)} auto;
        }
      }

      button {
        display: none;
        @media (max-width: 991.98px) {
          display: block;
          margin-top: ${size(72)};
        }
        @media (max-width: 575.98px) {
          margin-top: ${size(30)};
          width: 100%;
        }
      }
    }
  }

  .cf {
    clear: both;
  }

  .map {
    width: 100%;
    height: 100%;
    position: fixed !important;
    top: 0;
    left: 0;
    z-index: 5;
    @media (max-width: 575.98px) {
      position: absolute !important;
    }
  }

  footer {
    @media (min-width: 575.98px) {
      background: none !important;
    }
  }

  ${Input} {
    .normal-input {
			min-width: 25rem;
      font-size: ${size(30)};

      &::placeholder {
        font-size: ${size(30)};
      }
    }

    .normal-input[name="postal_code"] {
      &::placeholder {
        color: #383838;
      }
    }

    @media (max-width: 450px) {
      .normal-input {
        font-size: ${size(20)};

        &::placeholder {
          font-size: ${size(20)};
        }
      }
    }
  }

  ${Select} {
    .oppono-select {
			min-width: 25rem;
      &__option,
      &__single-value,
      &__input,
      &__control {
        font-size: ${size(22)};
        padding-left: 8px !important;;
      }
    }

    @media (max-width: 450px) {
      .oppono-select {
        &__option,
        &__single-value,
        &__input,
        &__control {
          font-size: ${size(20)};
        }
      }
    }
  }

	.mt-5 {
		margin-top: 2rem;
	}

  ${Container}.flexcontainer {

		&.container {
			height: 72%;
			margin-top: 5rem;
			padding-top: 3rem;

      justify-content: space-between;

			@media (max-width: 998px) {
				margin-top: 0;
				padding-top: 0;
			}
		}
  }

  .error-message {
    color: red;
    font-size: ${size(16)};
    font-weight: 400;
    margin-top: ${size(50)};
    text-align: center;
    display: block;

    a {
      font-size: ${size(18)};
      color: #bfb6b4;
      font-weight: 700;
      text-decoration: underline;
    }
  }
`;
