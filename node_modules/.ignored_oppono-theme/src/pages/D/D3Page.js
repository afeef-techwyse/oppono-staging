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
  Top,
} from "../../components/form-components/Finalize";
import useMedia from "../../hooks/useMedia";
import FormConditionalInput from "../../components/form-components/FormConditionalInput";
import FormFilter from "../../components/form-components/FormFilter";
import FormRepeatableInput from "../../components/form-components/FormRepeatableInput";
import intro_ball_3 from "../../assets/images/fly-image-4.png";
import intro_ball_4 from "../../assets/images/fly-image-3.png";
import LastStep from "../../components/form-components/LastStep";
import upload from "../../assets/images/upload.png";
import Appraiser from "../../components/form-components/Appraiser";
import useStoredFormValue from "../../hooks/useStoredFormValue";
import useFlowAppraisers from "../../hooks/useFlowAppraisers";
import AppraiserInput from "../../components/AppraiserInput";
import {numberWithCommas} from "../../functions/numberWithCommas";
import Link from "../../components/reusable/Link";

const pageName = "d-3";
const D3Page = ({state, setCurrentTheme, actions, className, formData}) => {
  const getD3Values = useStoredFormValue(pageName);
  const section1Values = getD3Values(formData.section_1?.section_name),
      section2Values = getD3Values(formData.section_2?.section_name),
      section3Values = getD3Values(formData.section_3?.section_name),
      section4Values = getD3Values(formData.section_4?.section_name);

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

  const mortgage =
      (+section2Values("mortgage_value_1") || 0) +
      (+section2Values("mortgage_value_2") || 0) +
      +section2Values("outstanding_amount_value") ||
      0 ||
      0;
  const firstProduct = state.theme.stepResponse.data?.data?.heloc?.products[0] || {}
  const refNumber = React.useRef("");
  state.theme.stepResponse.data?.["reference-number"] &&
  (refNumber.current = state.theme.stepResponse.data?.["reference-number"]);

  return (
      <div className={className}>
        <Form setCurrentTheme={setCurrentTheme} endPoint={"/heloc"}>
          <FormStep
              apiStepNumber={1}
              pageName={pageName}
              activeTheme={formData.section_1?.section_theme}
              stepName={formData.section_1?.section_name}
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
                {formData.section_1?.title}
              </h1>
              <h2 className={"form-headline-2 primary"}>
                {formData.section_1?.subtitle}
              </h2>
            </div>
            <Address
                address={{
                  name: "address",
                  noScroll: true,
                  ...formData.section_1?.address_input,
                }}
                city={{name: "city", ...formData.section_1?.city_input}}
                postalCode={{
                  name: "postal_code",
                  ...formData.section_1?.postal_code_input,
                }}
                postalCodeOnChange={postalCodeOnChange}
            />
            <Select
                name={"property_details_1"}
                {...formData.section_1?.property_details_1_dropdown}
            />
            <Select
                name={"property_details_2"}
                {...formData.section_1?.property_details_2_dropdown}
            />
            <Button icon={true} className={"next-step"} label={"Next"}/>
          </FormStep>
          <FormStep
              apiStepNumber={2}
              pageName={pageName}
              activeTheme={formData.section_2?.section_theme}
              stepName={formData.section_2?.section_name}
          >
            <div className="form-text-wrapper">
              <h1 className={"form-headline-1 text-left"}>
                {formData.section_2?.title}
              </h1>
            </div>
            <Input
                type={"number"}
                isCurrency
                name={"home_value"}
                {...formData.section_2?.estimated_value_input}
            />

            <FormConditionalInput
                name={"have_mortgage_1"}
                showOn={"1"}
                checked={"0"}
                {...formData.section_2?.any_mortgage_yes_no}
            >
              <>
                <Input
                    type={"number"}
                    isCurrency
                    name={"mortgage_value_1"}
                    {...formData.section_2?.first_mortgage_amount_input}
                />
                <FormConditionalInput
                    name={"have_mortgage_2"}
                    showOn={"1"}
                    checked={"0"}
                    {...formData.section_2?.second_mortgage_yes_no}
                >
                  <Input
                      type={"number"}
                      isCurrency
                      name={"mortgage_value_2"}
                      {...formData.section_2?.second_mortgage_amount_input}
                  />
                </FormConditionalInput>
              </>
            </FormConditionalInput>

            <FormConditionalInput
                name={"have_outstanding_amount"}
                showOn={"1"}
                checked={"0"}
                {...formData.section_2?.outstanding_balance_yes_no}
            >
              <Input
                  type={"number"}
                  isCurrency
                  name={"outstanding_amount_value"}
                  {...formData.section_2?.outstanding_balance_amount_input}
              />
            </FormConditionalInput>

            <div className="btn-group">
              <Button className={"bordered prev-step"} label={"Back"}/>
              <Button icon={true} className={"next-step"} label={"Next"}/>
            </div>
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
              <h1 className={"form-headline-2 primary"}>
                {formData.section_3?.subtitle}
              </h1>
            </div>
            <FormRepeatableInput
                question={formData.section_3?.applicant_amount_label}
                number={4}
                initial={1}
                name={"applicants_number"}
            >
              <W50>
                <Input
                    type={"text"}
                    name={"applicant_fname_{{number}}"}
                    {...formData.section_3?.applicant.first_name_input}
                />
                <Input
                    type={"text"}
                    name={"applicant_lname_{{number}}"}
                    {...formData.section_3?.applicant.last_name_input}
                />
                <Input
                    type={"text"}
                    pattern={
                      "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
                    }
                    name={"applicant_mail_{{number}}"}
                    {...formData.section_3?.applicant.email_input}
                />
                <Input
                    type={"phone"}
                    isPhoneNumber
                    name={"applicant_phone_{{number}}"}
                    {...formData.section_3?.applicant.phone_input}
                />
              </W50>
              <RadioGroup
                  radioText={formData.section_3?.applicant.score_label}
                  checked={"<650"}
              >
                <RadioInput
                    label={"<650"}
                    value={"<650"}
                    name={`applicant_score_{{number}}`}
                    type={"radio"}
                />
                <RadioInput
                    label={"650-679"}
                    value={"650-679"}
                    name={`applicant_score_{{number}}`}
                    type={"radio"}
                />
                <RadioInput
                    label={"680-749"}
                    value={"680-749"}
                    name={`applicant_score_{{number}}`}
                    type={"radio"}
                />
                <RadioInput
                    label={"750-799"}
                    value={"750-799"}
                    name={`applicant_score_{{number}}`}
                    type={"radio"}
                />
                <RadioInput
                    label={"800+"}
                    value={"800+"}
                    name={`applicant_score_{{number}}`}
                    type={"radio"}
                />
              </RadioGroup>
            </FormRepeatableInput>
            <div className="btn-group">
              <Button className={"bordered prev-step"} label={"Back"}/>
              <Button icon={true} label={"Next"} className={"next-step"}/>
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
              onNext={() => state.theme.stepResponse.data?.data?.heloc?.products?.length || actions.router.set('/not-qualified')}
          >
            <input type={'hidden'} name={`ltv`} value={((section4Values('confirm_qualify_amount') === '0' ? +section4Values('amount_wanted') : mortgage) / +section2Values('home_value') * 100)}/>
            <FlyingObjsContainer
                childrenList={[
                  {
                    imageUrl: intro_ball_3,
                    left: "20%",
                    level: 1,
                    top: "25%",
                    type: "image",
                    width: 5,
                    alt: "alt",
                  },
                  {
                    imageUrl: intro_ball_4,
                    left: "70%",
                    level: 1,
                    top: "5%",
                    type: "image",
                    width: 6,
                    alt: "alt",
                  },
                ]}
            />
            <div className="form-text-wrapper">
              <h1 className={"form-headline-1 primary"}>
                {formData.section_4?.qualify_for}
              </h1>
              <div className={"biggest-number"}>
                <p>
                  <sup>$</sup>
                  {numberWithCommas(
                      +section2Values("home_value") -
                      (+section2Values("mortgage_value_1") || 0)
                  )}
                </p>
              </div>
            </div>

            <FormConditionalInput
                name={"confirm_qualify_amount"}
                showOn={"0"}
                checked={"0"}
                {...formData.section_4?.amount_like_yes_no}
            >
              <Input
                  type={"text"}
                  name={"amount_wanted"}
                  {...formData.section_4?.amount_want_input}
              />
            </FormConditionalInput>

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
            <div className="form-text-wrapper wide-text">
              <h1 className={"form-headline-1 text-left"}>
                {formData.section_5?.title}
              </h1>
              <h2 className={"form-headline-2 primary"}>
                {formData.section_5?.subtitle}
              </h2>
              <h2 className={"form-headline-3 primary"}>
                You are requesting a home equity line of credit against your{" "}

                {section1Values("property_details_1")} home which is located at{" "}
                <br/> {section1Values("address")}, {section1Values("city")},{" "}
                {section1Values("postal_code")}
              </h2>
            </div>
            <Finalize>
              <Top>
                {media !== "mobile" ? (
                    <FinalizeChild>
                      <P.D>Your Info</P.D>
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
                            <P.D key={`person-desktop-${personIndex}`}>
                              {applicantFName} {applicantLName} {applicantScore}
                            </P.D>
                        );
                      })}
                    </FinalizeChild>
                ) : (
                    <FinalizeChild className={"full m-mt-24"} order={3}>
                      <FinalizeTable>
                        <tbody>
                        {[
                          ...Array(
                              +section3Values("applicants_number") || 0
                          ).keys(),
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
                              <tr key={`person-mobile-${personIndex}`}>
                                <P.Dark as={"td"}>
                                  {applicantFName} {applicantLName}
                                </P.Dark>
                                <P.D as={"td"}> {applicantScore}</P.D>
                              </tr>
                          );
                        })}
                        </tbody>
                      </FinalizeTable>
                    </FinalizeChild>
                )}

                <FinalizeChild order={1}>
                  <P.Dark>*Fixed rate</P.Dark>
                  <P.Dark>*Payment interest based on balance</P.Dark>
                  <p className="primary form-headline-3 text-left heloc-var">{String(firstProduct.title).split(" ")[0]} HELOC</p>
                  <P.Num>
                    {(+firstProduct.fields?.rate + 0.25).toFixed?.(2)}%
                  </P.Num>
                  <Button label={"I’m good to go"} className={"next-step"}/>
                </FinalizeChild>
                <FinalizeChild order={2} className={"wide"}>
                  <Button
                      className={"bordered prev-step"}
                      label={"No, edit the details"}
                  />
                </FinalizeChild>
              </Top>
              <Bottom>
                {media !== "mobile" ? (
                    <FinalizeChild order={1}>
                      <P.D>
                        Your HELOC request is for $
                        {numberWithCommas(
                            section4Values("confirm_qualify_amount") === "0"
                                ? +section4Values("amount_wanted")
                                : mortgage
                        )}
                      </P.D>
                      <P.D>
                        Your property value is $
                        {numberWithCommas(+section2Values("home_value"))}
                      </P.D>
                      <P.D>
                        Your LTV is{" "}
                        {(
                            ((section4Values("confirm_qualify_amount") === "0"
                                ? +section4Values("amount_wanted")
                                : mortgage) /
                                +section2Values("home_value")) *
                            100
                        ).toFixed?.(2)}
                        %
                      </P.D>
                    </FinalizeChild>
                ) : (
                    <FinalizeChild className={"full"} order={1}>
                      <FinalizeTable>
                        <tbody>
                        <tr>
                          <P.Dark as={"td"}>HELOC Request</P.Dark>
                          <P.D as={"td"}>
                            $
                            {numberWithCommas(
                                section4Values("confirm_qualify_amount") === "0"
                                    ? +section4Values("amount_wanted")
                                    : mortgage
                            )}
                          </P.D>
                        </tr>
                        <tr>
                          <P.Dark as={"td"}>Property Value</P.Dark>
                          <P.D as={"td"}>
                            ${numberWithCommas(+section2Values("home_value"))}
                          </P.D>
                        </tr>
                        <tr>
                          <P.Dark as={"td"}>LTV</P.Dark>
                          <P.D as={"td"}>
                            {(
                                ((section4Values("confirm_qualify_amount") === "0"
                                    ? +section4Values("amount_wanted")
                                    : mortgage) /
                                    +section2Values("home_value")) *
                                100
                            ).toFixed?.(2)}
                            %
                          </P.D>
                        </tr>
                        </tbody>
                      </FinalizeTable>
                    </FinalizeChild>
                )}

                <FinalizeChild order={2} className={"full m-border"}>
                  <FinalizeTable>
                    <tbody>
                    <tr>
                      <P.Dark as={"td"}>Lender fee</P.Dark>
                      <P.D as={"td"}>{firstProduct.fields?.fee}%</P.D>
                    </tr>
                    <tr>
                      <P.Dark as={"td"}>Credit score</P.Dark>
                      <P.D as={"td"}>
                        {beaconScore(firstProduct.fields?.beacon_score)}
                      </P.D>
                    </tr>
                    </tbody>
                  </FinalizeTable>
                </FinalizeChild>
                <FinalizeChild order={3} className={"wide m-pr-40"}>
                  {firstProduct.fields?.specifications.map(
                      ({term_id, name}) => (
                          <P.Border key={term_id}>{name}</P.Border>
                      )
                  )}
									<P.Border>Purchase</P.Border>
                </FinalizeChild>
              </Bottom>
            </Finalize>
          </FormStep>
          <FormStep
              apiStepNumber={6}
              pageName={pageName}
              activeTheme={formData.section_6?.section_theme}
              stepName={formData.section_6?.section_name}
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
                  <div className="row">
                    <div className="col-left">
                      <p className="form-headline-2 text-left">Your BDM is</p>
												<div className="appraiser-container">
													<p className="label">BDM Contact</p>
													<p className={'name'} dangerouslySetInnerHTML={{__html: appraiser?.fields?.bdm.name}}/>
													<p className={'phone'} dangerouslySetInnerHTML={{__html: appraiser?.fields?.bdm.phone}}/>
													<p className={'email'} dangerouslySetInnerHTML={{__html: appraiser?.fields?.bdm.email}}/>
												</div>
                    </div>
                    <div className="col-right">
                      <P.D className="greyedText">Here is a list of our top appraisers servicing the area.</P.D>
                      <RadioGroup
                          className={"vertical-radio"}
                          radioText={"*Click to call"}
                      >
                        {appraiser?.fields?.preferred_appraisal_company.map(
                            ({post_name}, index) => {
                              return (
                                  <AppraiserInput
                                      key={index}
                                      appraiserName={post_name}
                                      value={post_name}
                                  />
                              );
                            }
                        )}
                      </RadioGroup>
                      <P.D className="greyedText mb-0">
                        *Disclaimer - <br/>If the city you are looking for is not
                        listed please contact your BDM directly or email us at
                        info@oppono.com
                      </P.D>
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
                    label={"I want my pre-approval"}
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

export default styled(connect(D3Page))`
width: 100%;
height: 100%;
${Bottom}{
  padding-top: 0;
  .full{
    @media(max-width: 991px){
        flex-basis: 72%;
    width: 72%;
    margin-left: auto;
    }
    @media(max-width: 575px){
        flex-basis: 100%;
    width: 100%;
    }
  }
}
.lighter {
		color: #FFF !important;
	}
.wide-text{
  max-width: 85rem;
  .form-headline-3{
    max-width: ${size(400)};
    @media(max-width: 575.98px){
      max-width: 90%;
    }
  }
}
// ${FormFilter}{
//   .radio-input {
//     svg{
//         display: none;
//     }
//     .radio-text{
//       color: rgb(191, 182, 180)!important;
//     }
//   }
// }
`;
