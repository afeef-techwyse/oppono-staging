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

const Tradeshow = ({ className, state, actions }) => {
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
      <Form setCurrentTheme={setCurrentTheme} endPoint={"/tradeshow"} hideStepsProgress>
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
						</div>
						<div className="contact-form">
							<div className="contact-row">
                    <div className={"w-100"}>
                      <div className={"split-inputs"}>
                        <Input
                          name={"fname"}
                          className={"primary-input w-45"}
                          type={"text"}
                          {...pageData.section_1?.first_name_input}
                        />
                        <Input
                          name={"lname"}
                          className={"primary-input w-45"}
                          type={"text"}
                          {...pageData.section_1?.last_name_input}
                        />
                      </div>
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
                        <Input
                          name={"source"}
                          className={"primary-input w-45"}
                          type={"hidden"}
                          value={"Tradeshow 2022"}
                        />
                    <div className="cf"></div>
                    <Button
                      icon={true}
                      className={"next-step wide"}
                      label={"Sign Up"}
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
						</div>
						<div className="contact-form">
							<div className="contact-row">
                <h1 className={"form-headline-1 text-left"}>
                  {pageData.section_2?.title}
                </h1>
                <p className={"form-headline-3 primary lighter"}>
                  {pageData.section_2?.subtitle}
                </p>
              </div>
						</div>
					</Container>
        </FormStep>
      </Form>
    </div>
  );
};

export default styled(connect(Tradeshow))`
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
    padding: 5px; 
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
