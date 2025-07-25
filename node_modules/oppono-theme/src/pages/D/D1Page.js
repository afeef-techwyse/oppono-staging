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
import FormRepeatableInput from "../../components/form-components/FormRepeatableInput";
import LastStep from "../../components/form-components/LastStep";
import upload from "../../assets/images/upload.png";
import Appraiser from "../../components/form-components/Appraiser";
import useStoredFormValue from "../../hooks/useStoredFormValue";
import useFlowAppraisers from "../../hooks/useFlowAppraisers";
import {monthlyPayments} from "../../functions/monthlyPayment";
import AppraiserInput from "../../components/AppraiserInput";
import {numberWithCommas} from "../../functions/numberWithCommas";
import Link from "../../components/reusable/Link";

const pageName = "d-1";
const D1Page = ({className, setCurrentTheme, state, actions, formData}) => {
  const getD1Values = useStoredFormValue(pageName);
  const section1Values = getD1Values(formData.section_1?.section_name),
      section2Values = getD1Values(formData.section_2?.section_name),
      section3Values = getD1Values(formData.section_3?.section_name);
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
      +section2Values("home_value") - +section2Values("down_payment") || 0;
  const firstProduct = state.theme.stepResponse.data?.data
      ? Object.values(state.theme.stepResponse.data?.data)?.[0]?.products?.[0]
      : {};
  const refNumber = React.useRef("");
  state.theme.stepResponse.data?.["reference-number"] &&
  (refNumber.current = state.theme.stepResponse.data?.["reference-number"]);
  return (
      <div className={className}>
        <Form setCurrentTheme={setCurrentTheme} endPoint={"/purchase"}>
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
            <Input
                type={"number"}
                isCurrency
                name={"down_payment"}
                {...formData.section_2?.down_payment_input}
            />
            <div className="btn-group">
              <Button className={"bordered prev-step"} label={"Back"}/>
              <Button icon={true} className={"next-step"} label={"Next"}/>
            </div>
          </FormStep>
          <FormStep
              sendSteps={[
                formData.section_1?.section_name,
                formData.section_2?.section_name,
              ]}
              apiStepNumber={3}
              pageName={pageName}
              activeTheme={formData.section_3?.section_theme}
              stepName={formData.section_3?.section_name}
              onNext={() => (state.theme.stepResponse.data?.data
                  ? Object.values(state.theme.stepResponse.data?.data)[0].products
                  : []).length || actions.router.set('/not-qualified')}

          >
            <input type={'hidden'} name={`ltv`} value={(mortgage / +section2Values('home_value') * 100).toFixed?.(2)}/>
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
              apiStepNumber={4}
              pageName={pageName}
              activeTheme={formData.section_4?.section_theme}
              stepName={formData.section_4?.section_name}
          >
            <input
                type={"hidden"}
                name={`product_name`}
                value={firstProduct?.title}
            />
            <input
                type={"hidden"}
                name={`maximum_mortgage`}
                value={Math.round(
                    (+section2Values("home_value") *
                        firstProduct?.fields?.maximum_ltv) /
                    100
                )}
            />

            <div className="form-text-wrapper wide-text">
              <h1 className={"form-headline-1 text-left"}>
                {formData.section_4?.title}
              </h1>
              <h2 className={"form-headline-3 primary "}>
                You are refinancing your
                {section1Values("property_details_1")} home which is located at{" "}
                <br/> {section1Values("address")}, {section1Values("city")},{" "}
                {section1Values("postal_code")}
              </h2>
            </div>
            <Finalize>
              <Top>
                {media !== "mobile" ? (
                    <FinalizeChild>
                      <P.Num>{+firstProduct?.fields?.rate + 0.25}%</P.Num>
                      <P.Dark>*Fixed rate</P.Dark>
                    </FinalizeChild>
                ) : (
                    <FinalizeChild className={"full"} order={1}>
                      <P.Dark>*Fixed rate</P.Dark>
                      <P.Dark>*Payment interest based on balance</P.Dark>
                      <P.Num>{+firstProduct?.fields?.rate + 0.25}%</P.Num>
                    </FinalizeChild>
                )}

                <FinalizeChild order={2}>
                  <P.Cost>${numberWithCommas(mortgage)}</P.Cost>
                  <P.Dark>*mortgage amount</P.Dark>
                </FinalizeChild>
                <FinalizeChild className={"wide"} order={3}>
                  <P.Cost>
                    $
                    {numberWithCommas(
                        monthlyPayments(
                            mortgage,
                            (+firstProduct?.fields?.rate + 0.25) / 100
                        )
                    )}
                  </P.Cost>
                  <P.Dark>*Monthly mortgage payment</P.Dark>
                </FinalizeChild>
              </Top>
              <Bottom>
                {media !== "mobile" ? (
                    <FinalizeChild order={1}>
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
                      <P.D>
                        You could qualify up to $
                        {numberWithCommas(
                            Math.round(
                                (+section2Values("home_value") *
                                    firstProduct?.fields?.maximum_ltv) /
                                100
                            )
                        )}
                      </P.D>
                      <P.D>
                        Your property value is $
                        {numberWithCommas(+section2Values("home_value"))}
                      </P.D>
											<P.D>
                        Your mortgage request is ${numberWithCommas(mortgage)}
                      </P.D>
                      <P.D>
                        Your down payment is $
                        {numberWithCommas(+section2Values("down_payment"))}
                      </P.D>
                      <P.D>
                        Your LTV is{" "}
                        {(
                            (mortgage / +section2Values("home_value")) *
                            100
                        ).toFixed?.(2)}
                        %
                      </P.D>
                    </FinalizeChild>
                ) : (
                    <FinalizeChild className={"full"} order={1}>
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
                        <tr>
                          <P.Dark as={"td"}>Mortgage request</P.Dark>
                          <P.D as={"td"}>{numberWithCommas(mortgage)}</P.D>
                        </tr>
                        <tr>
                          <P.Dark as={"td"}>You could qualify up to</P.Dark>
                          <P.D as={"td"}>
                            {numberWithCommas(
                                Math.round(
                                    (+section2Values("home_value") *
                                        firstProduct?.fields?.maximum_ltv) /
                                    100
                                )
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
                          <P.Dark as={"td"}>Down Payment</P.Dark>
                          <P.D as={"td"}>
                            ${numberWithCommas(+section2Values("down_payment"))}
                          </P.D>
                        </tr>
                        <tr>
                          <P.Dark as={"td"}>LTV</P.Dark>
                          <P.D as={"td"}>
                            {(
                                (mortgage / +section2Values("home_value")) *
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
                      <P.Dark as={"td"}>Max LTV</P.Dark>
                      <P.D as={"td"}>
                        Up to {firstProduct?.fields?.maximum_ltv}%
                      </P.D>
                    </tr>
                    <tr>
                      <P.Dark as={"td"}>Credit score</P.Dark>
                      <P.D as={"td"}>
                        {beaconScore(firstProduct?.fields?.beacon_score)}
                      </P.D>
                    </tr>
                    <tr>
                      <P.Dark as={"td"}>Lender fee</P.Dark>
                      <P.D as={"td"}>{firstProduct?.fields?.fee}%</P.D>
                    </tr>
                    </tbody>
                  </FinalizeTable>
                </FinalizeChild>
                <FinalizeChild order={3} className={"wide m-pr-40"}>
                  {firstProduct?.fields?.specifications.map(
                      ({term_id, name}) => (
                          <P.Border key={term_id}>{name}</P.Border>
                      )
                  )}
									<P.Border>Purchase</P.Border>
                </FinalizeChild>
              </Bottom>
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
              apiStepNumber={5}
              pageName={pageName}
              activeTheme={formData.section_5?.section_theme}
              stepName={formData.section_5?.section_name}
          >
            <div className="upload-step-wrapper">
              <img src={upload}/>
              <h1 className={"form-headline-1 text-left"}>
                {formData.section_5?.title}
              </h1>
              <FormConditionalInput
                  noScroll
                  name={"mortgages_1"}
                  showOn={"1"}
                  checked={"0"}
                  {...formData.section_5?.have_appraisal_report_yes_no}
              >
                <FileInput
                    name="appraisal_report_file"
                    label={formData.section_5?.appraisal_report_upload_label}
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
                  {...formData.section_5?.additional_notes_input}
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
              activeTheme={formData.section_6?.section_theme}
              stepName={formData.section_6?.section_name}
          >
            <LastStep>
              <img
                  src={formData.section_6?.image.url}
                  alt={formData.section_6?.image.alt}
              />
              <div className="text">
                <h1 className={"form-headline-1 text-left"}>
                  {formData.section_6?.title}
                </h1>
                <p className={"form-headline-3 primary lighter"}>
                  {formData.section_6?.subtitle}
                </p>
                <Wysiwyg
                    dangerouslySetInnerHTML={{
                      __html: formData.section_6?.steps.replace(
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

export default styled(connect(D1Page))`
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
`;
