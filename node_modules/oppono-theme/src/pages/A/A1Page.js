import React from "react";
import { Address } from "../../components/form-components/Address";
import Form from "../../components/form-components/Form";
import { connect, styled } from "frontity";
import CheckMark from "../../components/reusable/CheckMark";
import { beaconScore } from "../../functions/beaconScore";
import { monthlyPayments } from "../../functions/monthlyPayment";
import { productTypeToFullName } from "../../functions/productTypeToFullName";
import { size } from "../../functions/size";
import FormStep from "../../components/form-components/FormStep";
import Button from "../../components/form-components/Button";
import FlyingObjsContainer from "../../components/reusable/FlyingObjsContainer";
import { Wysiwyg, Span, P } from "../../components/form-components/StyledComponent";
import Input from "../../components/form-components/Input";
import Select from "../../components/form-components/Select";
import W50 from "../../components/form-components/W50";
import intro_ball_1 from "../../assets/images/form_1_img.png";
import intro_ball_2 from "../../assets/images/form_2_img.png";
import fly_image_8 from "../../assets/images/fly-image-8.png";
import fly_image_6 from "../../assets/images/fly-image-6.png";
import Finalize, {
    Bottom,
    FinalizeHeading,
    FinalizeRows,
    FinalizeRow,
    FinalizeCol,
} from "../../components/form-components/Finalize";
import SelectSection, {
    SelectScreen,
    SelectHeading
} from "../../components/form-components/SelectSection";
import useMedia from "../../hooks/useMedia";
import LastStep from "../../components/form-components/LastStep";
import useStoredFormValue from "../../hooks/useStoredFormValue";
import useProductsTable from "../../hooks/useProductsTable";
import useFlowAppraisers from "../../hooks/useFlowAppraisers";
import Link from "../../components/reusable/Link";
import RadioGroup from "../../components/form-components/RadioGroup";
import RadioInput from "../../components/form-components/RadioInput";
import FormConditionalInput from "../../components/form-components/FormConditionalInput";
import FormRepeatableInput from "../../components/form-components/FormRepeatableInput";
import ProductsTable from "../../components/form-components/ProductsTable";
import FormFilter from "../../components/form-components/FormFilter";
import ProductsMobileOption from "../../components/form-components/ProductsMobileOption";
import FileInput from "../../components/form-components/FileInput";
import Appraiser from "../../components/form-components/Appraiser";
import { numberWithCommas } from "../../functions/numberWithCommas";
import { fixCharacters } from "../../functions/fixCharacters";
import upload from "../../assets/images/upload.png";
import TextArea from "../../components/form-components/TextArea";
import AppraiserInput from "../../components/AppraiserInput";

const pageName = "a-1";
const A1Page = ({ className, setCurrentTheme, state, actions, formData }) => {
    const getA1Values = useStoredFormValue(pageName);
    const section1Values = getA1Values(formData.section_1?.section_name),
        section2Values = getA1Values(formData.section_2?.section_name),
        section3Values = getA1Values(formData.section_3?.section_name);

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

    const [vsRef, setVsRef] = React.useState(state.theme.reference);
    React.useEffect(() => {
        actions.theme.checkReference();
        setVsRef(state.theme.reference);
    }, []);

    const [[appraiser], postalCodeOnChange] = useFlowAppraisers();
    const selectedProduct = React.useRef("");
    const maxMortgage = React.useRef("");

    const [productsTable, productsFilter] = useProductsTable(
        state.theme.stepResponse
    );
    const mortgage =
        (+section2Values("mortgage_value_1") || 0) +
        (+section2Values("mortgage_value_2") || 0) +
        +section2Values("outstanding_amount_value") +
        +section2Values("sm_amount") ||
        0 ||
        0;
    const refNumber = React.useRef("");
    state.theme.stepResponse.data?.["reference-number"] &&
        (refNumber.current = state.theme.stepResponse.data?.["reference-number"]);
    return (
        <div className={className}>
            <Form setCurrentTheme={setCurrentTheme} endPoint={"/refinance"}>
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
                    <input type="hidden" name="vsrefdom" value={vsRef?.ref} />
                    <input type="hidden" name="vssource" value={vsRef?.source} />
                    <Button icon={true} className={"next-step"} label={"Next"} />
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
                        noScroll
                        type={"number"}
                        isCurrency
                        name={"home_value"}
                        {...formData.section_2?.estimated_value_input}
                    />

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

                    <FormConditionalInput
                        name={"add_mortgage_2"}
                        showOn={"1"}
                        checked={"0"}
                        {...formData.section_2?.add_mortgage_yes_no}
                    >
                        <Input
                            type={"number"}
                            isCurrency
                            name={"sm_amount"}
                            {...formData.section_2?.add_mortgage_amount_input}
                        />
                    </FormConditionalInput>

                    <div className="btn-group">
                        <Button className={"bordered prev-step"} label={"Back"} />
                        <Button icon={true} className={"next-step"} label={"Next"} />
                    </div>
                </FormStep>
                <FormStep
                    apiStepNumber={3}
                    pageName={pageName}
                    activeTheme={formData.section_3?.section_theme}
                    stepName={formData.section_3?.section_name}
                    sendSteps={[
                        formData.section_1?.section_name,
                        formData.section_2?.section_name,
                    ]}

                >
                    <input type={"hidden"} name={`home_equity`} value={+section2Values("home_value") - mortgage} />
                    <input type={'hidden'} name={`ltv`} value={((mortgage / +section2Values("home_value")) * 100).toFixed?.(2)} />
                    <input type={'hidden'} name={`total_loan_amount`} value={mortgage} />

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
                    onNext={() => {
                        const allProducts = [];
                        Object.values(state.theme.stepResponse.data?.data).map(d => allProducts.push(...d.products));
                        allProducts.length || actions.router.set('/not-qualified');
                    }}
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
                                You are applying for a <span>{section2Values("looking_for")} refinance</span> on{" "}
                                {section1Values("property_details_1")} home which is located at:
                            </p>

                            <p className="bolder">{section1Values("address")}, {section1Values("city")},{" "}
                                {section1Values("postal_code")}</p>
                        </FinalizeHeading>

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
                                    <P.White>Property value</P.White>
                                </FinalizeCol>

                                <FinalizeCol>
                                    <P.White>
                                        <strong>
                                            ${numberWithCommas(+section2Values("home_value"))}
                                        </strong>
                                    </P.White>
                                </FinalizeCol>
                            </FinalizeRow>

                            <FinalizeRow>
                                <FinalizeCol>
                                    <P.White>1st mortgage (existing)</P.White>
                                </FinalizeCol>

                                <FinalizeCol>
                                    <P.White>
                                        <strong>
                                            ${numberWithCommas(+section2Values("mortgage_value_1"))}
                                        </strong>
                                    </P.White>
                                </FinalizeCol>
                            </FinalizeRow>


                            {section2Values("mortgage_value_2") &&
                                <FinalizeRow>
                                    <FinalizeCol>
                                        <P.White>2nd mortgage (existing)</P.White>
                                    </FinalizeCol>

                                    <FinalizeCol>
                                        <P.White>
                                            <strong>
                                                ${numberWithCommas(section2Values("mortgage_value_2"))}
                                            </strong>
                                        </P.White>
                                    </FinalizeCol>
                                </FinalizeRow>
                            }

                            {section2Values("outstanding_amount_value") &&
                                <FinalizeRow>
                                    <FinalizeCol>
                                        <P.White>Outstanding liens (existing)</P.White>
                                    </FinalizeCol>

                                    <FinalizeCol>
                                        <P.White>
                                            <strong>
                                                ${numberWithCommas(section2Values("outstanding_amount_value"))}
                                            </strong>
                                        </P.White>
                                    </FinalizeCol>
                                </FinalizeRow>
                            }

                            {section2Values("sm_amount") &&
                                <FinalizeRow>
                                    <FinalizeCol>
                                        <P.White>Additional fund (request)</P.White>
                                    </FinalizeCol>

                                    <FinalizeCol>
                                        <P.White>
                                            <strong>
                                                ${numberWithCommas(section2Values("sm_amount"))}
                                            </strong>
                                        </P.White>
                                    </FinalizeCol>
                                </FinalizeRow>
                            }

                            <FinalizeRow>
                                <FinalizeCol>
                                    <P.White>Home equity</P.White>
                                </FinalizeCol>

                                <FinalizeCol>
                                    <P.White>
                                        <strong>
                                            ${numberWithCommas(+section2Values("home_value") - mortgage)}
                                        </strong>
                                    </P.White>
                                </FinalizeCol>
                            </FinalizeRow>

                            <FinalizeRow>
                                <FinalizeCol>
                                    <P.White>
                                        LTV
                                        {((mortgage / +section2Values("home_value")) * 100) > 80 && (
                                            <div>
                                                <small>*Your BDM will be in contact with you, to discuss your options.</small>
                                            </div>
                                        )}
                                    </P.White>
                                </FinalizeCol>

                                <FinalizeCol>
                                    <P.White>
                                        <strong>
                                            {((mortgage / +section2Values("home_value")) * 100) > 80 && (<span>*</span>)}
                                            {((mortgage / +section2Values("home_value")) * 100).toFixed?.(2)}%
                                        </strong>
                                    </P.White>
                                </FinalizeCol>
                            </FinalizeRow>

                            <FinalizeRow>
                                <FinalizeCol>
                                    <></>
                                </FinalizeCol>
                                <FinalizeCol>
                                    <></>
                                </FinalizeCol>
                            </FinalizeRow>
                            <FinalizeRow className="large-row">
                                <FinalizeCol>
                                    <P.White>
                                        Total loan amount
                                    </P.White>
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
                                            Effective immediately, Oppono's maximum LTV on most products will be 75%. For borrowers with credit scores above 680, the maximum LTV will be 80%.<br /><br />
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
                                {formData.section_5?.title}
                            </h1>
                            <h2 className={"form-headline-3 text-left"}>
                                {formData.section_5?.subtitle}
                            </h2>
                        </SelectHeading>
                        {state.theme.stepResponse.data?.data ? (
                            media !== "mobile" ? (
                                <FormFilter
                                    className={"form-wide-container"}
                                    filters={productsFilter}
                                >
                                    {Object.entries(state.theme.stepResponse.data?.data)
                                        .filter(([, { products }]) => products?.length)
                                        .map(
                                            ([type, { products }], index) => (
                                                <ProductsTable key={type} dataFilter={type}>
                                                    <thead>
                                                        <tr>
                                                            <th scope={"col"}>
                                                                <p className={"circle"}>{index + 1}</p>
                                                                <p>{productTypeToFullName(type)}</p>
                                                                <p className={"dark"}>Variable rates</p>
                                                                <div className="table-arrows">
                                                                    <span className={"prev disabled"}>
                                                                        <svg viewBox="0 0 49 16">
                                                                            <path
                                                                                fill="none"
                                                                                stroke="#bfb6b4"
                                                                                strokeWidth="2"
                                                                                strokeMiterlimit="20"
                                                                                d="M48.723 8.678H1"
                                                                            />
                                                                            <path
                                                                                fill="none"
                                                                                stroke="#bfb6b4"
                                                                                strokeWidth="2"
                                                                                strokeMiterlimit="20"
                                                                                d="M8.299 15.976v0L1 8.678C3.846 5.827 5.452 4.23 8.299 1.379"
                                                                            />
                                                                        </svg>
                                                                    </span>
                                                                    <span className={"slides-numbers"}>
                                                                        <span className="current-page">1</span>
                                                                        <span className="slash">/</span>
                                                                        <span className="total-pages">1</span>
                                                                    </span>
                                                                    <span className={"next"}>
                                                                        <svg viewBox="0 0 49 17">
                                                                            <path
                                                                                fill="none"
                                                                                stroke="#bfb6b4"
                                                                                strokeMiterlimit="20"
                                                                                strokeWidth="2"
                                                                                d="M0 8.677h47.723"
                                                                            />
                                                                            <path
                                                                                fill="none"
                                                                                stroke="#bfb6b4"
                                                                                strokeWidth="2"
                                                                                d="M40.424 15.976v0l7.299-7.299c-2.847-2.85-4.452-4.447-7.299-7.298"
                                                                            />
                                                                        </svg>
                                                                    </span>
                                                                </div>
                                                            </th>
                                                            {products.map(
                                                                ({ ID, title, fields: { rate, maximum_ltv } }) => (
                                                                    <th scope={"col"} key={ID}>
                                                                        <p>
                                                                            $
                                                                            {numberWithCommas(
                                                                                monthlyPayments(mortgage, +rate)
                                                                            )}{" "}
                                                                            / month
                                                                        </p>
                                                                        <p className={"number"}>{rate}%</p>
                                                                        <Button
                                                                            onClick={() => {
                                                                                selectedProduct.current.value = title;
                                                                                maxMortgage.current.value = Math.round(
                                                                                    (+section2Values("home_value") *
                                                                                        maximum_ltv) /
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
                                                                            className={"small next-step"}
                                                                            label={"I want this deal"}
                                                                        />
                                                                    </th>
                                                                )
                                                            )}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr className={"head"}>
                                                            <P.White as={"td"}>LTV</P.White>
                                                            {products.map(({ ID, fields: { maximum_ltv } }) => (
                                                                <td key={ID} className={"details"} data-label="LTV">
                                                                    {maximum_ltv}%
                                                                </td>
                                                            ))}
                                                        </tr>
                                                        <tr className={"head last-head"}>
                                                            <P.White as={"td"}>Credit Score</P.White>
                                                            {products.map(({ ID, fields: { beacon_score } }) => (
                                                                <td
                                                                    key={ID}
                                                                    className={"details"}
                                                                    data-label="beacon_score"
                                                                >
                                                                    {beaconScore(beacon_score)}
                                                                </td>
                                                            ))}
                                                        </tr>
                                                        <tr className={"head"}>
                                                            <P.White as={"td"}>Fixed Rate</P.White>
                                                            {products.map(({ ID, fields: { rate } }) => (
                                                                <td
                                                                    key={ID}
                                                                    className={"details"}
                                                                    data-label="Fixed rate"
                                                                >
                                                                    {(+rate + 80).toFixed?.(2)}%
                                                                </td>
                                                            ))}
                                                        </tr>
                                                        <tr className={"head"}>
                                                            <P.White as={"td"}>Lender Fee</P.White>
                                                            {products.map(({ ID, fields: { fee } }) => (
                                                                <td
                                                                    key={ID}
                                                                    className={"details"}
                                                                    data-label="Lender fee"
                                                                >
                                                                    {fee}%
                                                                </td>
                                                            ))}
                                                        </tr>

                                                        {productsTable[type] &&
                                                            Object.entries(productsTable[type]).map(
                                                                ([id, { name, specificationProducts }]) => (
                                                                    <tr key={id}>
                                                                        <td scope={"row"}>{name}</td>
                                                                        {products.map(({ ID }) =>
                                                                            specificationProducts.indexOf(ID) >= 0 ? (
                                                                                <td key={ID}>
                                                                                    <CheckMark />
                                                                                </td>
                                                                            ) : (
                                                                                <td key={ID} />
                                                                            )
                                                                        )}
                                                                    </tr>
                                                                )
                                                            )}
                                                        <tr>
                                                            <td>Refinance</td>
                                                            {products.map(
                                                                () => <td><CheckMark /></td>
                                                            )
                                                            }
                                                        </tr>
                                                        <tr>
                                                            <td>{fixCharacters(section1Values("property_details_2"))}</td>
                                                            {products.map(
                                                                () => <td><CheckMark /></td>
                                                            )
                                                            }
                                                        </tr>
                                                    </tbody>
                                                </ProductsTable>

                                            )
                                        )}
                                </FormFilter>
                            ) : (
                                <div className="mortgage-options-mobile">
                                    <FormFilter filters={productsFilter}>
                                        {Object.entries(state.theme.stepResponse.data?.data)
                                            .filter(([, { products }]) => products?.length)
                                            .map(
                                                ([type, { products }, index]) => (
                                                    <div key={type} data-filter={type}>
                                                        {products.map(
                                                            (
                                                                {
                                                                    ID,
                                                                    title,
                                                                    fields: {
                                                                        rate,
                                                                        fee,
                                                                        maximum_ltv,
                                                                        beacon_score,
                                                                        specifications,
                                                                    },
                                                                },
                                                                productIndex
                                                            ) => (
                                                                <ProductsMobileOption key={ID}>
                                                                    <div className="mortgage-title">
                                                                        <p className={"circle"}>{productIndex + 1}</p>
                                                                        <p>{productTypeToFullName(type)}</p>
                                                                        <p className={"dark"}>Variable rates</p>
                                                                    </div>
                                                                    <div className="mortgage-head">
                                                                        <p className={"number"}>{rate}%</p>
                                                                        <p>
                                                                            $
                                                                            {numberWithCommas(
                                                                                monthlyPayments(mortgage, +rate)
                                                                            )}{" "}
                                                                            / month
                                                                        </p>
                                                                        <Button
                                                                            onClick={() => {
                                                                                selectedProduct.current.value = title;
                                                                                setTimeout(
                                                                                    () =>
                                                                                        actions.theme.setValidateAndNextCallback(
                                                                                            new Date().getTime()
                                                                                        ),
                                                                                    100
                                                                                );
                                                                            }}
                                                                            className={"small next-step"}
                                                                            label={"I want this deal"}
                                                                        />
                                                                    </div>
                                                                    <div className="mortgage-body">
                                                                        <div className={"m-row m-head  m-head"}>
                                                                            <p>Max LTV</p>
                                                                            <p>{maximum_ltv}%</p>
                                                                        </div>
                                                                        <div
                                                                            className={"m-row m-head  m-head last-head"}
                                                                        >
                                                                            <p>Credit score</p>
                                                                            <p>{beaconScore(beacon_score)}</p>
                                                                        </div>
                                                                        <div className={"m-row m-head"}>
                                                                            <p>Fixed rate</p>
                                                                            <p>{(+rate + 0.75).toFixed?.(2)}%</p>
                                                                        </div>
                                                                        <div className={"m-row m-head"}>
                                                                            <p>Lender fee</p>
                                                                            <p>{fee}%</p>
                                                                        </div>
                                                                        {specifications
                                                                            .slice(0, 4)
                                                                            .map(({ term_id, name }) => (
                                                                                <div key={term_id} className={"m-row"}>
                                                                                    <p>{name}</p>
                                                                                    <p>
                                                                                        <CheckMark />
                                                                                    </p>
                                                                                </div>
                                                                            ))}
                                                                        {specifications.length > 4 ? (
                                                                            <>
                                                                                <div className={"show-all-specs"}>
                                                                                    Show all specifications
                                                                                    <svg viewBox="0 0 8 4">
                                                                                        <path
                                                                                            fill="none"
                                                                                            stroke="#d2f5e9"
                                                                                            strokeMiterlimit="20"
                                                                                            d="M1 .5v0l3 3c1.172-1.17 1.828-1.83 3-3"
                                                                                        />
                                                                                    </svg>
                                                                                </div>
                                                                                <div className="remaining-specs">
                                                                                    {specifications
                                                                                        .slice(4)
                                                                                        .map(({ term_id, name }) => (
                                                                                            <div
                                                                                                key={term_id}
                                                                                                className={"m-row"}
                                                                                            >
                                                                                                <p>{name}</p>
                                                                                                <p>
                                                                                                    <CheckMark />
                                                                                                </p>
                                                                                            </div>
                                                                                        ))}
                                                                                </div>
                                                                            </>
                                                                        ) : null}
                                                                    </div>
                                                                </ProductsMobileOption>
                                                            )
                                                        )}
                                                    </div>
                                                )
                                            )}
                                    </FormFilter>
                                </div>
                            )
                        ) : null}

                        <div className="btn-group">
                            <Button className={"bordered no-top-margin prev-step"} label={"Back"} />
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
                        <img src={upload} />
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
                                        <div className="appraiser-container">
                                            <p className="label">BDM Contact</p>
                                            <p className={'name'} dangerouslySetInnerHTML={{ __html: appraiser?.fields?.bdm.name }} />
                                            <p className={'phone'} dangerouslySetInnerHTML={{ __html: appraiser?.fields?.bdm.phone }} />
                                            <p className={'email'} dangerouslySetInnerHTML={{ __html: appraiser?.fields?.bdm.email }} />
                                        </div>
                                    </div>
                                    <div className="col-right">
                                        <P.D className="greyedText">Here is a list of our top appraisers servicing the area.</P.D>
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
                                        <P.D className="greyedText mb-0">
                                            *Disclaimer - <br />If the city you are looking for is not
                                            listed please contact your BDM directly or email us at
                                            info@oppono.com
                                        </P.D>
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

export default styled(connect(A1Page))`
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

  hr {
    max-width: 100% !important;
  }

  .underline {
    text-decoration: underline;
  }
	.no-top-margin {
		margin-top: -2rem;
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
  .large-row {
    font-size: 1.8rem;
  }
`;
