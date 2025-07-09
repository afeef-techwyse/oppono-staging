import React from "react";
import { Address } from "../../components/form-components/Address";
import Form from "../../components/form-components/Form";
import Input from "../../components/form-components/Input";
import { connect, styled } from "frontity";
import { beaconScore } from "../../functions/beaconScore";
import { size } from "../../functions/size";
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
import fly_image_8 from "../../assets/images/fly-image-8.png";
import fly_image_6 from "../../assets/images/fly-image-6.png";
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
    FinalizeRows,
    FinalizeRow,
    FinalizeCol,
    Top,
} from "../../components/form-components/Finalize";
import SelectSection, {
    SelectScreen,
    SelectHeading
} from "../../components/form-components/SelectSection";
import useMedia from "../../hooks/useMedia";
import FormConditionalInput from "../../components/form-components/FormConditionalInput";
import FormRepeatableInput from "../../components/form-components/FormRepeatableInput";
import LastStep from "../../components/form-components/LastStep";
import upload from "../../assets/images/upload.png";
import Appraiser from "../../components/form-components/Appraiser";
import useStoredFormValue from "../../hooks/useStoredFormValue";
import useFlowAppraisers from "../../hooks/useFlowAppraisers";
import { monthlyPayments } from "../../functions/monthlyPayment";
import AppraiserInput from "../../components/AppraiserInput";
import { numberWithCommas } from "../../functions/numberWithCommas";
import { fixCharacters } from "../../functions/fixCharacters";
import Link from "../../components/reusable/Link";
import FormBlurb from "../../components/form-components/FormBlurb";

const pageName = "a-2";
const A2Page = ({ className, setCurrentTheme, state, actions, formData }) => {
    const getA2Values = useStoredFormValue(pageName);

    const section1Values = getA2Values(formData.section_1?.section_name),
        section2Values = getA2Values(formData.section_2?.section_name),
        section3Values = getA2Values(formData.section_3?.section_name);

    const media = useMedia();
    const selectedProduct = React.useRef("");
    const maxMortgage = React.useRef("");

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

    const [vsRef, setVsRef] = React.useState(state.theme.reference);
    React.useEffect(() => {
        actions.theme.checkReference();
        setVsRef(state.theme.reference);

    }, []);

    const [[appraiser], postalCodeOnChange] = useFlowAppraisers();

    const [purchasePrice, setPurchasePrice] = React.useState(null)
    const [downPayment, setDownPayment] = React.useState(null)
    const [firstMortgageAmount, setfirstMortgageAmount] = React.useState(null)
    const [secondMortgageAmount, setSecondMortgage] = React.useState(0)
    const [show1stMortgageInput, setShow1stMortgageInput] = React.useState(false);
    const [show2ndMortgageInput, setShow2ndMortgageInput] = React.useState(true);
    const [amountWanted, setAmountWanted] = React.useState(0);

    const mortgage =
        parseFloat(firstMortgageAmount) +
        parseFloat(amountWanted > 0 && section2Values('confirm_qualify_amount') == 0 ? amountWanted : secondMortgageAmount)

    const refNumber = React.useRef("");
    state.theme.stepResponse.data?.["reference-number"] &&
        (refNumber.current = state.theme.stepResponse.data?.["reference-number"]);

    const [alternate, setAlternate] = React.useState(false);

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

                        <h2 className={"form-headline-2 is-darker"}>
                            {formData.section_1?.subtitle}
                        </h2>
                    </div>
                    <Address
                        address={{
                            name: "address",
                            noScroll: true,
                            ...formData.section_1?.address_input,
                        }}
                        city={{ name: "city", ...formData.section_1?.city_input }}
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
                    <Button icon={true} className={"next-step"} label={"Next"} />
                    <input type="hidden" name="vsrefdom" value={vsRef?.ref} />
                    <input type="hidden" name="vssource" value={vsRef?.source} />
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
                    <RadioGroup
                        radioText={formData.section_2?.looking_for_yes_no.label}
                        checked={"first"}
                    >
                        <RadioInput
                            label={formData.section_2?.looking_for_yes_no.yes}
                            value={"first"}
                            name={"looking_for"}
                            type={"radio"}
                            onClick={() => {
                                setShow1stMortgageInput(false)
                                setShow2ndMortgageInput(true)
                                setAlternate(false)
                                setSecondMortgage(0)
                                setAmountWanted(0)
                            }}

                        />
                        <RadioInput
                            label={formData.section_2?.looking_for_yes_no.no}
                            value={"second"}
                            name={"looking_for"}
                            type={"radio"}
                            onClick={() => {
                                setShow1stMortgageInput(true)
                                setShow2ndMortgageInput(false)
                                setDownPayment(0)
                                setAlternate(true)
                            }}
                        />
                    </RadioGroup>

                    <W50>
                        <Input
                            type={"number"}
                            isCurrency
                            alternate={alternate}
                            name={"purchase_price"}
                            {...formData.section_2?.purchase_price_input}
                            onKeyUp={(value) => {
                                setPurchasePrice(value);
                            }}
                        />
                        {show2ndMortgageInput && <Input
                            type={"number"}
                            isCurrency
                            name={"down_payment"}
                            {...formData.section_2?.down_payment_input}
                            onKeyUp={(value) => {
                                setDownPayment(value);
                                setfirstMortgageAmount(purchasePrice - value)
                                setSecondMortgage(0)
                                setAmountWanted(0)
                            }}
                        />}
                    </W50>

                    {show1stMortgageInput && <Input
                        type={"number"}
                        isCurrency
                        className={"mortgage_value_1"}
                        name={"mortgage_value_1"}
                        onKeyUp={(value) => {
                            setfirstMortgageAmount(value);
                            setSecondMortgage((+purchasePrice * (80 / 100)) - value || 0)
                        }}
                        {...formData.section_2?.mortgage_value_1_input}
                    />}

                    {
                        (show1stMortgageInput && firstMortgageAmount > 0) &&
                        <FormBlurb>
                            So you’re looking for a second mortgage up to <strong>${numberWithCommas(secondMortgageAmount)}</strong>.

                            <br />
                        </FormBlurb>
                    }

                    <input type={'hidden'} name={`mortgage_request`} value={show1stMortgageInput ? 0 : firstMortgageAmount} />
                    <input type={'hidden'} name={`mortgage_value_2`} value={secondMortgageAmount} />
                    {show1stMortgageInput && firstMortgageAmount > 0 &&
                        <FormConditionalInput
                            name={"confirm_qualify_amount"}
                            showOn={"0"}
                            checked={"0"}
                            {...formData.section_2?.amount_like_yes_no}
                        >
                            <Input
                                type={"number"}
                                isCurrency
                                name={"amount_wanted"}
                                onKeyUp={(value) => {
                                    setAmountWanted(value)
                                }}
                                compareValueTo={secondMortgageAmount}
                                compareValueToMessage={"Amount wanted cannot exceed the qualified amount."}
                                {...formData.section_2?.amount_want_input}
                            />
                        </FormConditionalInput>
                    }

                    <div className="btn-group">
                        <Button className={"bordered prev-step"} label={"Back"} />
                        <Button icon={true} className={"next-step"} label={"Next"} />
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
                >
                    <input type={'hidden'} name={`ltv`} value={(mortgage / +section2Values("purchase_price") * 100).toFixed?.(2)} />
                    <div className="form-text-wrapper">
                        <h1 className={"form-headline-1 text-left"}>
                            {formData.section_3?.title}
                        </h1>
                        <h1 className={"form-headline-2 is-darker"}>
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
                        <W50>
                            <Input
                                type={"text"}
                                name={"applicant_score_{{number}}"}
                                label={formData.section_3?.applicant.score_label}
                            /><div></div>
                        </W50>
                    </FormRepeatableInput>
                    <div className="btn-group">
                        <Button className={"bordered prev-step"} label={"Back"} />
                        <Button icon={true} label={"Next"} className={"next-step"} />
                    </div>
                </FormStep>

                <FormStep
                    endPoint={null}
                    pageName={pageName}
                    activeTheme={formData.section_4?.section_theme}
                    stepName={formData.section_4?.section_name}
                    onNext={() =>
                        state.theme.stepResponse.data?.data?.[section2Values("looking_for")]?.products?.length
                        || actions.router.set('/not-qualified')}
                >
                    <FlyingObjsContainer
                        childrenList={[
                            {
                                imageUrl: fly_image_8,
                                left: "17%",
                                level: 1,
                                top: "90%",
                                type: "image",
                                width: 5,
                                alt: "alt",
                            },
                            {
                                imageUrl: fly_image_6,
                                left: "80%",
                                level: 1,
                                top: "5%",
                                type: "image",
                                width: 11,
                                alt: "alt",
                            },
                        ]}
                    />

                    <Finalize className={"is-smaller"}>

                        <FinalizeHeading>
                            <h1 className={"form-headline-1 text-left"}>
                                {formData.section_4?.title}
                            </h1>

                            <p>
                                You are applying for a <span>{section2Values("looking_for")} mortgage purchase</span> on{" "}
                                {section1Values("property_details_1")} home which is located at:
                            </p>

                            <p className="bolder">{section1Values("address")}, {section1Values("city")},{" "}{section1Values("postal_code")}</p>
                        </FinalizeHeading>

                        <FinalizeRows>
                            <FinalizeRow className={"larger border"}>
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
                            <FinalizeRow className={"larger"}>
                                <FinalizeCol>
                                    <P.Large>
                                        <Span.isLightgreen>
                                            <strong>Your Info</strong>
                                        </Span.isLightgreen>
                                    </P.Large>
                                </FinalizeCol>
                            </FinalizeRow>

                            <FinalizeRow>
                                <FinalizeCol>
                                    {+section2Values("mortgage_value_1") > 0 ? (
                                        <P.White>
                                            Property value
                                        </P.White>
                                    ) : (
                                        <P.White>
                                            Purchase price
                                        </P.White>
                                    )}
                                </FinalizeCol>

                                <FinalizeCol>
                                    <P.White>
                                        <strong>
                                            ${numberWithCommas(+section2Values("purchase_price"))}
                                        </strong>
                                    </P.White>
                                </FinalizeCol>
                            </FinalizeRow>

                            {+section2Values("mortgage_value_1") > 0 ? (
                                <FinalizeRow>
                                    <FinalizeCol>
                                        <P.White>
                                            1st mortgage (existing)
                                        </P.White>
                                    </FinalizeCol>

                                    <FinalizeCol>
                                        <P.White>
                                            <strong>${numberWithCommas(+section2Values("mortgage_value_1"))}</strong>
                                        </P.White>
                                    </FinalizeCol>
                                </FinalizeRow>
                            ) : (
                                <FinalizeRow>
                                    <FinalizeCol>
                                        <P.White>
                                            1st mortgage (request)
                                        </P.White>
                                    </FinalizeCol>

                                    <FinalizeCol>
                                        <P.White>
                                            <strong>${numberWithCommas(firstMortgageAmount)}</strong>
                                        </P.White>
                                    </FinalizeCol>
                                </FinalizeRow>
                            )}

                            {section2Values("looking_for") === 'second' && secondMortgageAmount > 0 &&
                                <FinalizeRow>
                                    <FinalizeCol>
                                        <P.White>
                                            2nd mortgage (requested)
                                        </P.White>
                                    </FinalizeCol>

                                    <FinalizeCol>
                                        <P.White>
                                            <strong>
                                                ${numberWithCommas(amountWanted > 0 && section2Values('confirm_qualify_amount') == 0 ? amountWanted : secondMortgageAmount)}
                                            </strong>
                                        </P.White>
                                    </FinalizeCol>
                                </FinalizeRow>
                            }

                            {section2Values("looking_for") === 'first' &&
                                <FinalizeRow>
                                    <FinalizeCol>
                                        <P.White>
                                            Down payment
                                        </P.White>
                                    </FinalizeCol>

                                    <FinalizeCol>
                                        <P.White>
                                            <strong>${numberWithCommas(+section2Values("down_payment"))}</strong>
                                        </P.White>
                                    </FinalizeCol>
                                </FinalizeRow>

                            }

                            <FinalizeRow>
                                <FinalizeCol>
                                    <P.White>
                                        LTV {
                                            mortgage / +section2Values("purchase_price") * 100 > 80 && (
                                                <div>
                                                    <small>*Your BDM will be in contact with you, to discuss your options.</small>
                                                </div>
                                            )
                                        }
                                    </P.White>
                                </FinalizeCol>

                                <FinalizeCol>
                                    <P.White>
                                        <strong>
                                            {
                                                mortgage / +section2Values("purchase_price") * 100 > 80 && (
                                                    <span>*</span>
                                                )}
                                            {
                                                (mortgage / +section2Values("purchase_price") * 100).toFixed?.(2)
                                            }%
                                        </strong>
                                    </P.White>
                                </FinalizeCol>
                            </FinalizeRow>
                            <FinalizeRow>
                                <FinalizeCol>
                                    <P.White>
                                        <br />
                                        <small className="loan-amount-statement">*Loan amounts over $1 million may be subject to a 0.25% interest rate increase.</small>
                                    </P.White>
                                </FinalizeCol>
                            </FinalizeRow>
                            <FinalizeRow>
                                <FinalizeCol>
                                    <P.White>
                                        <br />
                                        <span>
                                            Please be advised that Oppono has made the following change to our underwriting policy.<br /><br />
                                            Effective immediately, Oppono's maximum LTV on most products will be 75%. For borrowers with credit scores above 680, the maximum LTV will be {80}%.<br /><br />
                                            We appreciate your understanding. If you require further information, please contact your BDM.
                                        </span>
                                    </P.White>
                                </FinalizeCol>
                            </FinalizeRow>
                        </FinalizeRows>

                    </Finalize>

                    <div className="btn-group">
                        <Button
                            className={"bordered reset-form"}
                            label={"No, edit the details"}
                        />
                        <Button label={"I’m good to go"} className={"next-step"} />
                    </div>
                </FormStep>
                <FormStep
                    apiStepNumber={4}
                    pageName={pageName}
                    activeTheme={formData.section_5?.section_theme}
                    stepName={formData.section_5?.section_name}
                >
                    <SelectScreen>
                        <SelectHeading>
                            <h1 className={"form-headline-1 text-left"}>
                                {formData.section_5?.title.replace(
                                    "{{number}}",
                                    state.theme.stepResponse.data?.data?.[
                                        section2Values("looking_for")
                                    ]?.products.length
                                )}
                            </h1>
                            <h2 className={"form-headline-3 text-left"}>
                                {formData.section_5?.subtitle}
                            </h2>
                            <h3 className={"form-headline-3 text-left"}>
                                {formData.section_5?.choose_one}
                            </h3>
                        </SelectHeading>
                        {section2Values("looking_for")
                            ? state.theme.stepResponse.data?.data?.[
                                section2Values("looking_for")
                            ]?.products.map((product, index) => (
                                <Finalize key={product.ID}>
                                    <Top>
                                        <FinalizeChild className={"size-sm"} order={1}>
                                            <P.Circle>{index + 1}</P.Circle>
                                        </FinalizeChild>

                                        <FinalizeChild className={"size-md"} order={1}>
                                            <P.Dark>
                                                <strong>*Variable Rate</strong>
                                            </P.Dark>

                                            <P.Num>{product.fields?.rate}%</P.Num>
                                            <Button
                                                onClick={() => {
                                                    selectedProduct.current.value = product.title
                                                    maxMortgage.current.value = Math.round(
                                                        (+section2Values("purchase_price") *
                                                            product.fields?.maximum_ltv) /
                                                        100
                                                    );
                                                    setTimeout(
                                                        () =>
                                                            actions.theme.setValidateAndNextCallback(
                                                                new Date().getTime()
                                                            ),
                                                        100
                                                    );
                                                }}
                                                className={"bordered next-step"}
                                                label={"I want this deal"}
                                            />
                                        </FinalizeChild>

                                        <FinalizeChild className={"size-lg align-self-start"} order={1}>
                                            <P.Dark>
                                                <strong>*Monthly mortgage payment</strong>
                                            </P.Dark>

                                            <P.Cost>
                                                $
                                                {numberWithCommas(
                                                    monthlyPayments((amountWanted > 0 || secondMortgageAmount > 0) ? (mortgage - firstMortgageAmount) : firstMortgageAmount, product.fields?.rate)
                                                )}
                                            </P.Cost>
                                        </FinalizeChild>
                                    </Top>

                                    <Bottom>
                                        {media === "mobile" ? null : <FinalizeChild className={"size-sm"} order={1} />}
                                        {media !== "mobile" ? (
                                            <FinalizeChild order={2} className={"size-md"}>
                                                <FinalizeTable>
                                                    <tbody>
                                                        <tr>
                                                            <P.White as={"td"}><strong>Max LTV</strong></P.White>
                                                            <P.D as={"td"}>
                                                                Up to {product.fields?.maximum_ltv}%
                                                            </P.D>
                                                        </tr>
                                                        <tr>
                                                            <P.White as={"td"}><strong>Credit score</strong></P.White>
                                                            <P.D as={"td"}>
                                                                {beaconScore(product.fields?.beacon_score)}
                                                            </P.D>
                                                        </tr>
                                                        <tr>
                                                            <P.White as={"td"}><strong>Fixed rate</strong></P.White>
                                                            <P.D as={"td"}>
                                                                {(+product.fields?.rate + 0.75).toFixed?.(2)}%
                                                            </P.D>
                                                        </tr>
                                                        <tr>
                                                            <P.White as={"td"}><strong>Lender fee</strong></P.White>
                                                            <P.D as={"td"}>{product.fields?.fee}%</P.D>
                                                        </tr>
                                                    </tbody>
                                                </FinalizeTable>
                                            </FinalizeChild>
                                        ) : (
                                            <FinalizeChild className={"size-md"} order={1}>
                                                <FinalizeTable>
                                                    <tbody>
                                                        <tr>
                                                            <P.White as={"td"}><strong>Max LTV</strong></P.White>
                                                            <P.D as={"td"}>
                                                                Up to {product.fields?.maximum_ltv}%
                                                            </P.D>
                                                        </tr>
                                                        <tr>
                                                            <P.White as={"td"}><strong>Credit score</strong></P.White>
                                                            <P.D as={"td"}>
                                                                {beaconScore(product.fields?.beacon_score)}
                                                            </P.D>
                                                        </tr>
                                                        <tr>
                                                            <P.White as={"td"}><strong>Fixed rate</strong></P.White>
                                                            <P.D as={"td"}>
                                                                {(+product.fields?.rate + 0.75).toFixed?.(2)}%
                                                            </P.D>
                                                        </tr>
                                                        <tr>
                                                            <P.White as={"td"}><strong>Lender fee</strong></P.White>
                                                            <P.D as={"td"}>{product.fields?.fee}%</P.D>
                                                        </tr>
                                                    </tbody>
                                                </FinalizeTable>
                                            </FinalizeChild>
                                        )}

                                        <FinalizeChild order={3} className={"size-lg"}>
                                            {product.fields?.specifications.map(
                                                ({ term_id, name }) => (
                                                    <P.Border key={term_id}>{name}</P.Border>
                                                )
                                            )}
                                            <P.Border>Purchase</P.Border>
                                            <P.Border> {fixCharacters(section1Values("property_details_2"))}</P.Border>
                                        </FinalizeChild>
                                    </Bottom>
                                </Finalize>
                            ))
                            : null}

                        <div className="btn-group">
                            <Button className={"bordered prev-step"} label={"Back"} />
                        </div>
                    </SelectScreen>
                </FormStep>
                <FormStep
                    apiStepNumber={5}
                    pageName={pageName}
                    activeTheme={formData.section_6?.section_theme}
                    stepName={formData.section_6?.section_name}
                    sendSteps={[
                        formData.section_1?.section_name,
                        formData.section_2?.section_name,
                        formData.section_3?.section_name,
                        formData.section_5?.section_name,
                        formData.section_6?.section_name
                    ]}
                >
                    <div className="upload-step-wrapper">
                        <h1 className={"form-headline-1 text-left"}>
                            {formData.section_6?.title}
                        </h1>
                        <input ref={selectedProduct} type={"hidden"} name={`product_name`} value={selectedProduct.current.value} />
                        <input ref={maxMortgage} type={"hidden"} name={`maximum_mortgage`} value={maxMortgage.current.value} />
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

                                        <div className="appraiser-container appraiser">
                                            <P.D>
                                                <Span.isGreen>BDM contact</Span.isGreen>
                                            </P.D>

                                            <p className="appraiser__name form-headline-3" dangerouslySetInnerHTML={{
                                                __html: appraiser?.fields?.bdm.name,
                                            }} />

                                            <P.White>
                                                <a href={`tel:${appraiser?.fields?.bdm.phone}`}>{appraiser?.fields?.bdm.phone}</a>
                                            </P.White>

                                            <P.White>
                                                <a href={`mailto:${appraiser?.fields?.bdm.email}`}>{appraiser?.fields?.bdm.email}</a>
                                            </P.White>
                                        </div>
                                    </div>

                                    <div className="col-right">
                                        <P.Large>Here is a list of our top appraisers servicing the area.</P.Large>

                                        <div className="col-right__inner">
                                            <RadioGroup
                                                className={"vertical-radio"}
                                                radioText={"*Click to call"}
                                            >
                                                {appraiser?.fields?.preferred_appraisal_company.map(
                                                    ({ post_name }, index) => {
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
                                                <strong>
                                                    *Disclaimer

                                                    <br />

                                                    If the city you are looking for is not
                                                    listed please contact your BDM directly or email us at
                                                    info@oppono.com
                                                </strong>
                                            </P.Dark>
                                        </div>
                                    </div>
                                </div>
                            </Appraiser>
                        </FormConditionalInput>
                        <hr />
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
    );
};

export default styled(connect(A2Page))`
  width: 100%;
  height: 100%;

  ${Bottom} {
    padding-top: 0;

    .full {
      table {
        padding-top: 0;
        width: 100%;
      }

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
  .align-self-start {
    align-self: flex-start;
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
