import React from "react";
import { connect, styled } from "frontity";
import intro_ball_1 from "../../assets/images/form_1_img.png";
import intro_ball_2 from "../../assets/images/form_2_img.png";
import { Address } from "../../components/form-components/Address";
import Form from "../../components/form-components/Form";
import FormStep from "../../components/form-components/FormStep";
import LastStep from "../../components/form-components/LastStep";
import { Wysiwyg } from "../../components/form-components/StyledComponent";
import Container from "../../components/reusable/Container";
import { size } from "../../functions/size";
import contact_obj from "../../assets/images/company-profile.png";
import FlyingObjsContainer from "../../components/reusable/FlyingObjsContainer";
import Input from "../../components/form-components/Input";
import TextArea from "../../components/form-components/TextArea";
import Button from "../../components/form-components/Button";
import Link from "../../components/reusable/Link";
import Select from "../../components/form-components/Select";

const Mail = ({ className, state, actions }) => {
    const data = state.source.get(state.router.link);
    const pageData =
        data.isReady && !data.isError ? state.source[data.type][data.id].acf : {};
    const [currentTheme, setCurrentTheme] = React.useState("gray-theme");
    const pageName = "contact";
    React.useEffect(() => {
        actions.theme.setSubHeader(pageData.sub_header);
    }, [pageData]);
    React.useEffect(() => {
        actions.theme.setActiveTheme(currentTheme);
    }, [currentTheme]);
    return (
        <div className={className}>
            <Form setCurrentTheme={setCurrentTheme} endPoint={"/contact"} hideStepsProgress>
                <FormStep
                    pageName={pageName}
                    activeTheme={pageData.section_1?.section_theme}
                    stepName={pageData.section_1?.section_name}
                >

                    <Container className={"contact-us-container"}>
                        <div className="details">
                            <div className="title-wrapper">
                                {pageData.section_1?.title ? (
                                    <h1 className={"contact-title"}>
                                        {pageData.section_1?.title}
                                    </h1>
                                ) : null}
                                {pageData.section_1?.sub_title ? (
                                    <h2 className={"contact-sub-title desktop-only"}>
                                        {pageData.section_1?.sub_title}
                                    </h2>
                                ) : null}
                                {/* <img className="contact-flying-obj" src={contact_obj} alt="flying object"/> */}
                            </div>
                            <div className="contact-info-wrapper">
                                <Link href={"tel:" + pageData.section_1?.oppono_phone}>
                                    <div className={"item-wrapper"}>
                                        <div className={"icon"}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25.298" height="25.298" viewBox="0 0 25.298 25.298">
                                                <path id="Icon_awesome-phone-alt" data-name="Icon awesome-phone-alt" d="M24.576,17.877l-5.534-2.372a1.186,1.186,0,0,0-1.383.341L15.208,18.84a18.314,18.314,0,0,1-8.755-8.755L9.447,7.634a1.183,1.183,0,0,0,.341-1.383L7.416.717A1.194,1.194,0,0,0,6.058.03L.919,1.216A1.186,1.186,0,0,0,0,2.372,22.924,22.924,0,0,0,22.926,25.3a1.186,1.186,0,0,0,1.156-.919l1.186-5.139A1.2,1.2,0,0,0,24.576,17.877Z" transform="translate(0 0)" fill="#b5d2ff" />
                                            </svg>
                                        </div>
                                        <div className="text">
                                            {pageData.section_1?.oppono_phone}
                                        </div>
                                        <div className="text">
                                            {pageData.section_1?.oppono_phone_2}
                                        </div>

                                    </div>
                                </Link>
                                <Link href={"mailto:" + pageData.section_1?.oppono_email}>
                                    <div className={"item-wrapper"}>
                                        <div className={"icon"}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="31.78" height="25.424" viewBox="0 0 31.78 25.424">
                                                <path id="Icon_metro-mail" data-name="Icon metro-mail" d="M33.744,7.712H8.319A3.164,3.164,0,0,0,5.157,10.89L5.141,29.958a3.177,3.177,0,0,0,3.178,3.178H33.744a3.177,3.177,0,0,0,3.178-3.178V10.89a3.177,3.177,0,0,0-3.178-3.178Zm0,6.356L21.032,22.013,8.319,14.068V10.89l12.712,7.945L33.744,10.89Z" transform="translate(-5.141 -7.712)" fill="#b5d2ff" />
                                            </svg>
                                        </div>
                                        <div className="text">
                                            {pageData.section_1?.oppono_email}
                                        </div>
                                    </div>
                                </Link>
                                <div className="askQuestion"
                                    onClick={function (e) {
                                        e.preventDefault()
                                        document.querySelector('.contact-form input[name="name"]').focus();
                                    }}>
                                    <div className={"item-wrapper"}>
                                        <div className={"icon"}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25.435" height="25.435" viewBox="0 0 25.435 25.435">
                                                <path id="Icon_awesome-exclamation-circle" data-name="Icon awesome-exclamation-circle" d="M26,13.28A12.718,12.718,0,1,1,13.28.563,12.717,12.717,0,0,1,26,13.28ZM13.28,15.844A2.359,2.359,0,1,0,15.639,18.2,2.359,2.359,0,0,0,13.28,15.844Zm-2.24-8.479.38,6.974a.615.615,0,0,0,.614.582h2.489a.615.615,0,0,0,.614-.582l.38-6.974a.615.615,0,0,0-.614-.649h-3.25A.615.615,0,0,0,11.041,7.365Z" transform="translate(-0.563 -0.563)" fill="#b5d2ff" />
                                            </svg>
                                        </div>
                                        <div className="text">
                                            Ask a question
                                        </div>
                                    </div>
                                </div>
                                <Link href={
                                    "http://maps.google.com/?q=" +
                                    pageData.section_1?.oppono_address_line_1 +
                                    " " +
                                    pageData.section_1?.oppono_address_line_2
                                }>
                                    <div className={"item-wrapper"}>
                                        <div className={"icon"}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="19.068" height="25.424" viewBox="0 0 19.068 25.424">
                                                <path id="Icon_awesome-map-marker-alt" data-name="Icon awesome-map-marker-alt" d="M8.554,24.911C1.339,14.452,0,13.378,0,9.534a9.534,9.534,0,0,1,19.068,0c0,3.844-1.339,4.918-8.554,15.377A1.192,1.192,0,0,1,8.554,24.911Zm.98-11.4A3.973,3.973,0,1,0,5.562,9.534,3.973,3.973,0,0,0,9.534,13.507Z" fill="#b5d2ff" />
                                            </svg>
                                        </div>
                                        <div className="text">
                                            {pageData.section_1?.oppono_address_line_1 ? (
                                                <div>{pageData.section_1?.oppono_address_line_1}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="floating-obj">
                                <FlyingObjsContainer
                                    childrenList={[
                                        {
                                            imageUrl: contact_obj,
                                            left: "20%",
                                            level: 1,
                                            top: "28%",
                                            type: "image",
                                            width: 18,
                                            alt: "flying object",
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                        <div className="contact-form">
                            <div className="contact-row">
                                <div className={"w-100"}>
                                    <Input
                                        name={"name"}
                                        className={"primary-input mt-1 w-100"}
                                        type={"text"}
                                        {...pageData.section_1?.name_input}
                                    />
                                    <div className={"split-inputs"}>
                                        <Input
                                            name={"email"}
                                            className={"primary-input w-45"}
                                            type={"text"}
                                            {...pageData.section_1?.email_input}
                                        />
                                        <Input
                                            name={"phone"}
                                            className={"primary-input w-45"}
                                            type={"phone"}
                                            isPhoneNumber
                                            {...pageData.section_1?.phone_input}
                                        />
                                    </div>
                                    <div className="cf"></div>
                                    <Select
                                        className={"primary-select w-100"}
                                        name={"discuss"}
                                        {...pageData.section_1?.discuss_dropdown}
                                    />
                                    <TextArea
                                        name={"questions"}
                                        className={"primary-input w-100"}
                                        {...pageData.section_1?.questions_input}
                                    />
                                    <Button
                                        icon={true}
                                        className={"next-step wide"}
                                        label={"Send message"}
                                    />
                                </div>
                            </div>
                        </div>
                    </Container>
                </FormStep>
                <FormStep
                    pageName={pageName}
                    activeTheme={pageData.section_2?.section_theme}
                    stepName={pageData.section_2?.section_name}
                >
                    <LastStep>
                        <img
                            src={pageData.section_2?.image.url}
                            alt={pageData.section_2?.image.alt}
                        />
                        <div style={{ flexBasis: "55%" }} className="text">
                            <h1 className={"form-headline-1 text-left"}>
                                {pageData.section_2?.title}
                            </h1>
                            <p className={"form-headline-3 primary lighter"}>
                                {pageData.section_2?.subtitle}
                            </p>
                            <Wysiwyg
                                dangerouslySetInnerHTML={{ __html: pageData.section_2?.steps }}
                            />
                            <div className="btn-group">
                                {/*<Link className={'wide bordered'} href={'https://expert.filogix.com/expert/view/SignOn'}>*/}
                                {/*  <Button className={'wide filled'} label={'Connect to Filogix'}/>*/}
                                {/*</Link>*/}
                                <Link className={"wide bordered"} href={"/dashboard"}>
                                    <Button
                                        className={"wide bordered"}
                                        label={"Back to dashboard"}
                                    />
                                </Link>
                            </div>
                        </div>
                    </LastStep>
                </FormStep>
            </Form>
        </div>
    );
};

export default styled(connect(Mail))`
  width: 100%;
  height: 100%;
  align-items: stretch;
  margin: 0 0 ${size(100)};

  @media (max-width: 991.98px) {
    padding: 0;
  }

  // .contact-obj {
  //   max-width: ${size(205)};
  //   display: none;
  //   margin: ${size(30)} auto 0;
  // }
  //

	.contact-us-container {
		max-width: 100% !important;
		display: flex;
    flex-direction: row;

    @media (max-width: 998px) {
      padding: 0;
			flex-direction: column;
    }

		.details {
      position: relative;
			padding-right: 12rem;

      .floating-obj {
        position: absolute;
        bottom: 8rem;
        right: 2rem;
        z-index: -1;
      }

			@media (max-width: 991.98px) {
				padding-right: 0;
			}
		}
	}

	.contact-flying-obj {
		position: absolute;
		max-width: 345px;
	}



  .contact-row {
    flex-direction: column;
    display: flex;
    align-items: flex-start;
    @media (max-width: 991.98px) {
      flex-direction: column;
      margin-top: ${size(25)};
      max-width: 90%;
    }
    @media (max-width: 575.98px) {
      max-width: ${size(400)};
      //margin: 0 auto;
      margin-top: 0;
    }

    .form-group {
      margin-top: 3.5rem;
    }
  }

  ${Input} {
    //&:first-of-type{
    //  margin-top: 0;
    //}
    .normal-input {
      font-size: ${size(28)};
      height: ${size(36)};
      border-color: #B5D2FF;

      &::placeholder {
        font-size: ${size(28)};
      }

      @media (max-width: 575.98px) {
        height: 3.3rem;
        font-size: 2rem;

        &::placeholder {
          font-size: 2rem;
        }
      }
    }
  }

  .oppono-select {
    border-color: #B5D2FF;
  }

  textarea {
    border-color: #B5D2FF;
    font-size: ${size(28)};
    @media (max-width: 575.98px) {
      font-size: 2rem;

      &::placeholder {
        font-size: 2rem;
      }
    }
  }

  ${Button} {
    margin: 3rem 0 0;
    background: #fe412d;

    &:hover {
      background: none;
    }

    @media (max-width: 991.98px) {
      padding: ${size(20)};
    }
    @media (max-width: 575.98px) {
      width: 100%;
    }
  }

  .d-flex {
    display: flex;
    align-items: center;
    @media (max-width: 991.98px) {
      flex-direction: column;
      align-items: flex-start;
    }
  }

	.title-wrapper {
		flex: 48%;
	}

  .details, .contact-form {
    width: 50%;

    @media (max-width: 991.98px) {
      width: 100%;

    &.contact-form {
        margin-top: 5rem;
      }
    }
  }

  .contact-info-wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    text-align: center;
    justify-content: space-between;
    margin-top: 3rem;

    a, .askQuestion {
      width: 47%;
      margin-bottom: 3rem;
			cursor: pointer;

      @media (max-width: 991px) {
        width: 49%;
        margin-bottom: 1rem;
      }
      .item-wrapper {
        background: #10397C80;
        min-height: 15rem;
        padding: 2rem 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 1px solid #B5D2FF;
        border-radius: 25px;

        @media (max-width: 991px) {
          min-height: 12rem;
          padding: 1rem 0;
        }

        .text {
          color: #B5D2FF;
          font-size: ${size(16)};
          max-width: 18rem;
          font-weight: 500;
          margin-top: 0.5rem;

          @media (max-width: 991.98px) {
            max-width: 12rem;
            font-size: 1.1rem;
            margin-top: 1rem;
          }
        }
      }
    }
  }

  .desktop-only {
    @media (max-width: 991.98px) {
      display: none;
    }
  }

  .mobile-only {
    @media (min-width: 992px) {
      display: none;
    }
  }

  .floating-obj {
    position: relative;
    width: 25%;
    height: 200px;

    @media (max-width: 991.98px) {
      position: absolute;
      width: 25%;
      height: 25%;
      right: 10%;
      top: 25%;
    }

    .flying-objs-container {
      top: 0 !important;

      > div {
        width: 100% !important;
        left: 15% !important;
        top: 0 !important;
				transform: none !important;
      }

      @media (max-width: 998px) {
        top: -7rem !important;
        right: -2rem;
        display: block !important;
      }
    }
  }

  ${Select} {
    .oppono-select {
      &__option,
      &__single-value,
      &__input,
      &__control {
        font-size: ${size(24)};

        @media (max-width: 575.98px) {
          font-size: 2rem;
        }
      }
    }

  ${Wysiwyg}{
    max-width: min(55%, ${size(310)});
    margin-bottom: ${size(32)};
  }

`;
