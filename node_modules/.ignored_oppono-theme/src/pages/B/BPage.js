import React from "react";
import {Address} from "../../components/form-components/Address";
import Form from "../../components/form-components/Form";
import Input from "../../components/form-components/Input";
import {connect, styled} from "frontity";
import {beaconScore} from "../../functions/beaconScore";
import {size} from "../../functions/size";
import Select from "../../components/form-components/Select";
import RadioInput from "../../components/form-components/RadioInput";
import RadioGroup from "../../components/form-components/RadioGroup";
import FormStep from "../../components/form-components/FormStep";
import Button from "../../components/form-components/Button";
import FileInput from "../../components/form-components/FileInput";
import W50 from "../../components/form-components/W50";
import TextArea from "../../components/form-components/TextArea";
import intro_ball_1 from "../../assets/images/form_1_img.png";
import intro_ball_2 from "../../assets/images/form_2_img.png";
import FlyingObjsContainer from "../../components/reusable/FlyingObjsContainer";
import {
  Li,
  Ol,
  P,
  Span,
  Wysiwyg,
} from "../../components/form-components/StyledComponent";
import Alert from "../../components/form-components/Alert";
import Finalize, {
  Bottom,
  FinalizeChild,
  FinalizeTable,
	FinalizeHeading,
	FinalizeCol,
	FinalizePercentage,
	FinalizeRows,
	FinalizeRow,
  Top,
} from "../../components/form-components/Finalize";
import useMedia from "../../hooks/useMedia";
import FormConditionalInput from "../../components/form-components/FormConditionalInput";
import FormRepeatableInput from "../../components/form-components/FormRepeatableInput";
import LastStep from "../../components/form-components/LastStep";
import upload from "../../assets/images/upload.png";
import Appraiser from "../../components/form-components/Appraiser";
import useStoredFormValue from "../../hooks/useStoredFormValue";
import useFlowAppraisers from "../../hooks/useFlowAppraisers";
import AppraiserInput from "../../components/AppraiserInput";
import {numberWithCommas} from "../../functions/numberWithCommas";
import {fixCharacters} from "../../functions/fixCharacters";
import Link from "../../components/reusable/Link";

const pageName = "b";
const BPage = ({className, setCurrentTheme, state, actions, formData}) => {
  const getBValues = useStoredFormValue(pageName);
  const section1Values = getBValues(formData.section_1?.section_name),
      section2Values = getBValues(formData.section_2?.section_name),
      section3Values = getBValues(formData.section_3?.section_name),
      section4Values = getBValues(formData.section_4?.section_name);

  const media = useMedia();

  React.useEffect(() => {
    actions.theme.setSubHeader(formData.sub_header);
  }, [formData]);

  React.useEffect(() => {
    actions.theme.setLeadId();
    actions.theme.setStepResponse({});
  }, []);

  React.useEffect(() => {
    actions.theme.checkUser();
  }, [state.theme.user.logged]);
  const [[appraiser], postalCodeOnChange] = useFlowAppraisers();
  const [[businessAppraiser], businessPostalCodeOnChange] = useFlowAppraisers();
  const getAppraiser = () => section2Values('business_address_same_as_property') === '1' ? businessAppraiser : appraiser;
  const mortgage = (+section3Values('down_payment')) || 0;
  const firstProduct = state.theme.stepResponse.data?.data?.beloc?.products[0] || {};
  const refNumber = React.useRef('');
  state.theme.stepResponse.data?.['reference-number'] && (refNumber.current = state.theme.stepResponse.data?.['reference-number'])

  return <div className={className}>
    <Form setCurrentTheme={setCurrentTheme} endPoint={'/beloc'}>
      <FormStep apiStepNumber={1} pageName={pageName} activeTheme={formData.section_1?.section_theme} stepName={formData.section_1?.section_name}>
        <FlyingObjsContainer childrenList={[
          {
            imageUrl: intro_ball_2,
            left: '10%',
            level: 1,
            top: '55%',
            type: 'image',
            width: 5,
            alt: 'alt',
          },
          {
            imageUrl: intro_ball_1,
            left: '80%',
            level: 1,
            top: '5%',
            type: 'image',
            width: 9,
            alt: 'alt',
          }]}/>
        <div className="form-text-wrapper">
          <h1 className={'form-headline-1 text-left'}>{formData.section_1?.title}</h1>
          <h2 className={'form-headline-2 primary'}>{formData.section_1?.subtitle}</h2>
        </div>
        <Input noScroll type={'text'} name={'business_name'} {...formData.section_1?.legal_business_name_input}/>
        <Select
            name={'business_type'}
            {...formData.section_1?.type_of_business_dropdown}/>

        <Address
            address={{name: 'business_address', ...formData.section_1?.address_input}}
            city={{name: 'business_city', ...formData.section_1?.city_input}}
            postalCode={{name: 'business_postal_code', ...formData.section_1?.postal_code_input}}
            postalCodeOnChange={businessPostalCodeOnChange}
        />
        <Button icon={true} className={"next-step"} label={"Next"}/>
      </FormStep>
      <FormStep
          apiStepNumber={2}
          pageName={pageName}
          activeTheme={formData.section_2?.section_theme}
          stepName={formData.section_2?.section_name}
      >
        <FlyingObjsContainer
            childrenList={[
              {
                imageUrl: intro_ball_2,
                left: "10%",
                level: 1,
                top: "55%",
                type: "image",
                width: 5,
                alt: "alt",
              },
              {
                imageUrl: intro_ball_1,
                left: "80%",
                level: 1,
                top: "5%",
                type: "image",
                width: 9,
                alt: "alt",
              },
            ]}
        />
        <div className="form-text-wrapper">
          <h1 className={"form-headline-1 text-left"}>
            {formData.section_2?.title}
          </h1>
        </div>
        <FormConditionalInput
            name={"business_address_same_as_property"}
            showOn={"0"}
            checked={"0"}
            {...formData.section_2?.same_business_address_yes_no}
        >
          <>
            <Address
                address={{
                  name: "address",
                  ...formData.section_2?.address_input,
                }}
                city={{name: "city", ...formData.section_2?.city_input}}
                postalCode={{
                  name: "postal_code",
                  ...formData.section_2?.postal_code_input,
                }}
                postalCodeOnChange={postalCodeOnChange}
            />
          </>
        </FormConditionalInput>
        <Select
            name={"property_details_1"}
            {...formData.section_2?.property_details_1_dropdown}
        />
        <Select
            name={"property_details_2"}
            {...formData.section_2?.property_details_2_dropdown}
        />
        <Button icon={true} className={"next-step"} label={"Next"}/>
      </FormStep>
      <FormStep
          apiStepNumber={3}
          pageName={pageName}
          activeTheme={formData.section_3?.section_theme}
          stepName={formData.section_3?.section_name}
      >
        <div className="form-text-wrapper">
          <h1 className={"form-headline-1 text-left"}>
            {formData.section_3?.title}
          </h1>
        </div>

        <W50>
          <Input
              type={"number"}
              isCurrency
              name={"purchase_price"}
              {...formData.section_3?.purchase_price_input}
          />
          <Input
              type={"number"}
              isCurrency
              name={"down_payment"}
              {...formData.section_3?.down_payment_input}
          />
        </W50>

        <div className="btn-group">
          <Button className={"bordered prev-step"} label={"Back"}/>
          <Button icon={true} className={"next-step"} label={"Next"}/>
        </div>
      </FormStep>
      <FormStep
          sendSteps={[
            formData.section_1?.section_name,
            formData.section_2?.section_name,
            formData.section_3?.section_name,
          ]}
          apiStepNumber={4}
          pageName={pageName}
          activeTheme={formData.section_4?.section_theme}
          stepName={formData.section_4?.section_name}
          onNext={() => state.theme.stepResponse.data?.data?.beloc?.products?.length || actions.router.set('/not-qualified')}
      >
        <input type={'hidden'} name={`ltv`} value={((mortgage) / +section3Values('purchase_price') * 100).toFixed?.(2)}/>
        <div className="form-text-wrapper">
          <h1 className={"form-headline-1 text-left"}>
            {formData.section_4?.title}
          </h1>
          <h1 className={"form-headline-2 primary"}>
            {formData.section_4?.subtitle}
          </h1>
        </div>
        <FormRepeatableInput
            question={formData.section_4?.applicant_amount_label}
            number={4}
            initial={1}
            name={"applicants_number"}
        >
          <W50>
            <Input
                type={"text"}
                name={"applicant_fname_{{number}}"}
                {...formData.section_4?.applicant.first_name_input}
            />
            <Input
                type={"text"}
                name={"applicant_lname_{{number}}"}
                {...formData.section_4?.applicant.last_name_input}
            />
            <Input
                type={"text"}
                pattern={
                  "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
                }
                name={"applicant_mail_{{number}}"}
                {...formData.section_4?.applicant.email_input}
            />
            <Input
                type={"phone"}
                isPhoneNumber
                name={"applicant_phone_{{number}}"}
                {...formData.section_4?.applicant.phone_input}
            />
          </W50>
              <W50>
              <Input
                    type={"text"}
                    name={"applicant_score_{{number}}"}
                    label={formData.section_4?.applicant.score_label}
                /><div></div>
                </W50>
        </FormRepeatableInput>
        <div className="btn-group">
          <Button className={"bordered prev-step"} label={"Back"}/>
          <Button icon={true} label={"Next"} className={"next-step"}/>
        </div>
      </FormStep>
      <FormStep
          apiStepNumber={5}
          pageName={pageName}
          activeTheme={formData.section_5?.section_theme}
          stepName={formData.section_5?.section_name}
      >
        <input
            type={"hidden"}
            name={`product_name`}
            value={firstProduct.title}
        />
        <input
            type={"hidden"}
            name={`maximum_mortgage`}
            value={Math.round(
                (+section3Values("purchase_price") *
                    firstProduct.fields?.maximum_ltv) /
                100
            )}
        />
        <Finalize className={"is-smaller"}>
					<FinalizeHeading>
						<h1 className={"form-headline-1 text-left"}>
							{formData.section_5?.title}
						</h1>

						<h2 className={"form-headline-2 text-left"}>
						{formData.section_5?.subtitle}
						</h2>

						<p>
						You are requesting a <span>secured business equity line of credit</span> against your {section2Values("property_details_1")} home, which is located at:
						</p>

						<p className="bolder">
						{section2Values("business_address_same_as_property") === "1"
                ? section1Values("business_address")
                : section2Values("address")}
            ,{" "}
            {section2Values("business_address_same_as_property") === "1"
                ? section1Values("business_city")
                : section2Values("city")}
            ,{" "}
            {section2Values("business_address_same_as_property") === "1"
                ? section1Values("business_postal_code")
                : section2Values("postal_code")}
						</p>
					</FinalizeHeading>
					<FinalizePercentage>
							<P.Num>{(+firstProduct.fields?.rate + 0.75).toFixed?.(2)}%</P.Num>

							<P.Small className="meta">*Fixed rate</P.Small>

							<P.Small className="meta">*Payent interest based on balance</P.Small>

							{/* <p className="primary form-headline-3 text-left heloc-var"> {String(firstProduct.title).split(" ")[0]} HELOC</p> */}
					</FinalizePercentage>
					<FinalizeRows>
						<FinalizeRow>
							<FinalizeCol>
							{[
										...Array(+section3Values("applicants_number") || 0).keys(),
									].map((index, personIndex) => {
										const applicantFName = section3Values(
												`applicant_fname_${index + 1}`
										);
										const applicantLName = section3Values(
												`applicant_lname_${index + 1}`
										);
										const applicantScore = section3Values(
												`applicant_score_${index + 1}`
										);
										return (
											<P.Large key={`person-desktop-${personIndex}`}>
												<Span.isWhite>
													<strong>{applicantFName} {applicantLName} {applicantScore}</strong>
												</Span.isWhite>
											</P.Large>
										);
									})}
							</FinalizeCol>
						</FinalizeRow>
					</FinalizeRows>
							<FinalizeRows>
								<FinalizeRow>
									<FinalizeCol>
										<P.D>
											<Span.isLightgreen>
												<strong>Your Info</strong>
											</Span.isLightgreen>
										</P.D>
									</FinalizeCol>
								</FinalizeRow>

                <FinalizeRow>
                  <FinalizeCol>
                    <P.White>
                      Property value
                    </P.White>
                  </FinalizeCol>

                  <FinalizeCol>
                    <P.White>
                      <strong>${numberWithCommas(+section3Values("purchase_price"))}</strong>
                    </P.White>
                  </FinalizeCol>
                </FinalizeRow>

								<FinalizeRow>
									<FinalizeCol>
										<P.White>BLOC (request)</P.White>
									</FinalizeCol>

									<FinalizeCol>
										<P.White>
											<strong>
												${numberWithCommas(mortgage)}
											</strong>
										</P.White>
									</FinalizeCol>
								</FinalizeRow>

								<FinalizeRow>
									<FinalizeCol>
										<P.White>
											LTV {
                        (mortgage / +section3Values("purchase_price") * 100) > 80 && (
                      <div>
                      <small>*Your BDM will be in contact with you, to discuss your options.</small>
                      </div>
                      )}
										</P.White>
									</FinalizeCol>

									<FinalizeCol>
										<P.White>
											<strong>
											{(mortgage / +section3Values("purchase_price") * 100) > 80 && (<span>*</span>)}
                      {(
                        (mortgage / +section3Values("purchase_price")) *
												100
											).toFixed?.(2)}
											%
											</strong>
										</P.White>
									</FinalizeCol>
								</FinalizeRow>
								<FinalizeRow>
									<FinalizeCol>
										<P.White>
                      <br/>
                      <small className="loan-amount-statement">*Loan amounts over $1 million may be subject to a 0.25% interest rate increase.</small>
										</P.White>
									</FinalizeCol>
								</FinalizeRow>
                <FinalizeRow>
									<FinalizeCol>
										<P.White>
                      <br/>
                      <span>
                      Please be advised that Oppono has made the following change to our underwriting policy.<br/><br/>
                      Effective immediately, Oppono's maximum LTV on most products will be 75%. For borrowers with credit scores above 680, the maximum LTV will be {80}%.<br/><br/>
                We appreciate your understanding. If you require further information, please contact your BDM.
                        </span>
                    </P.White>
									</FinalizeCol>
								</FinalizeRow>
							</FinalizeRows>
							<FinalizeRows>
								<FinalizeRow className={"border"}>
									<FinalizeCol>
										<P.D>
											<Span.isLightgreen>
												<strong>Product Info</strong>
											</Span.isLightgreen>
										</P.D>
									</FinalizeCol>
								</FinalizeRow>

								<FinalizeRow>
									<FinalizeCol>
										<P.D>
											<strong>Lender fee</strong>
										</P.D>
									</FinalizeCol>

									<FinalizeCol>
										<P.D >
											<strong>{firstProduct.fields?.fee}%</strong>
										</P.D>
									</FinalizeCol>
								</FinalizeRow>

								<FinalizeRow>
									<FinalizeCol>
										<P.D >
											<strong>Credit score</strong>
										</P.D>
									</FinalizeCol>

									<FinalizeCol>
										<P.D>
											<strong>{beaconScore(firstProduct.fields?.beacon_score)}</strong>
										</P.D>
									</FinalizeCol>
								</FinalizeRow>

								{firstProduct.fields?.specifications.map(
									({term_id, name}) => (
											<FinalizeRow key={term_id}>
												<FinalizeCol>
													<P.D >{name}</P.D>
												</FinalizeCol>
											</FinalizeRow>
									)
								)}
								<FinalizeRow>
									<FinalizeCol>
										<P.D >
											Purchase
										</P.D>
									</FinalizeCol>
								</FinalizeRow>
								<FinalizeRow>
									<FinalizeCol>
										<P.D >
										{ fixCharacters(section2Values("property_details_2")) }
										</P.D>
									</FinalizeCol>
								</FinalizeRow>
							</FinalizeRows>
        </Finalize>
        <div className="btn-group">
          <Button
              className={"bordered reset-form small"}
              label={"No, edit the details"}
          />
          <Button label={"I’m good to go"} className={"next-step small"}/>
        </div>
      </FormStep>
      <FormStep
          apiStepNumber={6}
          pageName={pageName}
          activeTheme={formData.section_6?.section_theme}
          stepName={formData.section_6?.section_name}
          sendSteps={[
            formData.section_1?.section_name,
            formData.section_2?.section_name,
            formData.section_3?.section_name,
            formData.section_4?.section_name,
            formData.section_5?.section_name,
            formData.section_6?.section_name
          ]}
      >
        <div className="upload-step-wrapper">
          <img src={upload}/>
          <h1 className={"form-headline-1 text-left"}>
            {formData.section_6?.title}
          </h1>
          <FormConditionalInput
              noScroll
              name={"mortgages_1"}
              showOn={"1"}
              checked={"0"}
              {...formData.section_6?.have_appraisal_report_yes_no}
          >
            <FileInput
                name="appraisal_report_file"
                label={formData.section_6?.appraisal_report_upload_label}
                acceptText={"PDF, JPG, or PNG"}
            />
            <Appraiser>
						<p className="form-headline-2 text-left">Your BDM is</p>
							<p
									className={"form-headline-4 text-left"}
									dangerouslySetInnerHTML={{
										__html: getAppraiser()?.fields?.bdm.name,
									}}
							/>
              <div className="row">
                <div className="col-left">
								<P.D>Select an Appraiser:</P.D>
                </div>
                <div className="col-right">
                  <RadioGroup
                      className={"vertical-radio"}
                      radioText={"*Click to call"}
                  >
                    {getAppraiser()?.fields?.preferred_appraisal_company.map(
                        ({post_name}, index) => {
                          return (
                              <AppraiserInput
                                  key={index}
                                  appraiserName={post_name}
                                  value={post_name}
                                  className={"noRadio"}
                              />
                          );
                        }
                    )}
                  </RadioGroup>
                  <P.Dark>
                    *Disclaimer - If the city you are looking for is not
                    listed please contact your BDM directly or email us at
                    info@oppono.com
                  </P.Dark>
                </div>
              </div>
            </Appraiser>
          </FormConditionalInput>
          <hr/>
          <TextArea
              name={"additional_notes"}
              {...formData.section_6?.additional_notes_input}
          />
          <div className="btn-group">
            <Button
                className={"next-step"}
                label={"I want my broker pre-approval"}
            />
          </div>
        </div>
      </FormStep>
      <FormStep
          pageName={pageName}
          activeTheme={formData.section_7?.section_theme}
          stepName={formData.section_7?.section_name}
      >
        <LastStep>
          <img
              src={formData.section_7?.image.url}
              alt={formData.section_7?.image.alt}
          />
          <div className="text">
            <h1 className={"form-headline-1 text-left"}>
              {formData.section_7?.title}
            </h1>
            <p className={"form-headline-3 primary lighter"}>
              {formData.section_7?.subtitle}
            </p>
            <Wysiwyg
                dangerouslySetInnerHTML={{
                  __html: formData.section_7?.steps.replace(
                      "{{number}}",
                      refNumber.current
                  ),
                }}
            />
            <div className="btn-group">
              <Link
                  className={"wide bordered"}
                  href={"https://expert.filogix.com/expert/view/SignOn"}
              >
                <Button
                    className={"wide filled"}
                    label={"Connect to Filogix"}
                />
              </Link>
              <Link
                  className={"wide bordered velocity"}
                  href={"https://velocity.newton.ca/members/login"}
              >
                <Button
                    className={"wide filled"}
                    label={"Connect to Velocity"}
                />
              </Link>
            </div>
            <div className="btn-group">
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
};

export default styled(connect(BPage))`
  width: 100%;
  height: 100%;

  ${Bottom} {
    padding-top: 0;

    .full {
      @media (max-width: 991px) {
        flex-basis: 72%;
        width: 72%;
        margin-left: auto;
      }
      @media (max-width: 575px) {
        flex-basis: 100%;
        width: 100%;
      }
    }
  }


  .wide-text {
    max-width: 85rem;

    .form-headline-3 {
      max-width: ${size(400)};
      @media (max-width: 575.98px) {
        max-width: 90%;
      }
    }
  }

  .loan-amount-statement {
    font-style: italic;
  }
  
  a.velocity {
    button {
      background-color: rgb(71 47 146);
      border-color: #221645 !important;
      &:hover { 
        border-color: #221645;
      }
    }
  }
`;
