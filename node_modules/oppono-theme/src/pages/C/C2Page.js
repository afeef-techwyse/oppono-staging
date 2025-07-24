import React from "react";
import {Address} from "../../components/form-components/Address";
import Form from "../../components/form-components/Form";
import Input from "../../components/form-components/Input";
import {connect, css, styled} from "frontity";
import {beaconScore} from "../../functions/beaconScore";
import {productTypeToFullName} from "../../functions/productTypeToFullName";
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
import ProductsTable from "../../components/form-components/ProductsTable";
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
import FormFilter from "../../components/form-components/FormFilter";
import FormRepeatableInput from "../../components/form-components/FormRepeatableInput";
import ProductsMobileOption from "../../components/form-components/ProductsMobileOption";
import LastStep from "../../components/form-components/LastStep";
import upload from "../../assets/images/upload.png";
import Appraiser from "../../components/form-components/Appraiser";
import useStoredFormValue from "../../hooks/useStoredFormValue";
import AppraiserInput from "../../components/AppraiserInput";
import opponoApi from "../../opponoApi";
import useFlowAppraisers from "../../hooks/useFlowAppraisers";
import useProductsTable from "../../hooks/useProductsTable";
import {monthlyPayments} from "../../functions/monthlyPayment";
import CheckMark from "../../components/reusable/CheckMark";
import {numberWithCommas} from "../../functions/numberWithCommas";
import Link from "../../components/reusable/Link";
import {fixCharacters} from "../../functions/fixCharacters";
import FormBlurb from "../../components/form-components/FormBlurb";
import { forEach } from "lodash";

const pageName = "c-2";
const C2Page = ({className, setCurrentTheme, state, actions, formData}) => {
  const getC2Values = useStoredFormValue(pageName);
  const section1Values = getC2Values(formData.section_1?.section_name),
      section2Values = getC2Values(formData.section_2?.section_name);
  const [step1Valid, setStep1Valid] = React.useState([false, false]);

  const media = useMedia();
  
  const [verifyProducts, setVerifyProducts] = React.useState(false)
  const [trigger_qualification, triggerQualification] = React.useState(false)

  const lowestScore = (scores) => {
    let lowest = scores[0];
    for (var score of scores) {
      if (score < lowest) {
        lowest = score
      }
    }
    return lowest;
  }

  React.useEffect(() => {
    actions.theme.setSubHeader(formData.sub_header);
  }, [formData]);
  React.useEffect(() => {
    actions.theme.setLeadId();
    actions.theme.setStepResponse({});

    const data = new FormData();

    let scores = [];
    [
      ...Array(+section2Values("applicants_number") || 0).keys(),
    ].map((index, personIndex) => {
      const applicantScore = section2Values(
        `applicant_score_${index + 1}`
      );
      scores.push(applicantScore);
    })

    data.append('type', '1st Mortgage 2nd Mortgage')
    data.append('beacon', lowestScore(scores))
    data.append('ltv', (totalDebt / homeValue * 100))
    data.append('property_details_2', section1Values('property_details_2'))

    opponoApi.post("/product-qualification", data).then((response) => {
      const products = {
        first: response.data.first,
        second: response.data.second,
      };

      response.data.data = products;
      actions.theme.setStepResponse(response);

      if (verifyProducts && !products.first.products.length && !products.second.products.length) {
        actions.router.set('/not-qualified');
      }
    });
  }, [trigger_qualification]);

  React.useEffect(() => {
    actions.theme.checkUser();
  }, [state.theme.user.logged]);
  const [productsTable, productsFilter] = useProductsTable(
      state.theme.stepResponse
  );

	const [homeValue, setHomeValue] = React.useState(0)
	const [totalDebt, setTotalDebt] = React.useState(0)

  const refNumber = React.useRef("");
  state.theme.stepResponse.data?.["reference-number"] &&
  (refNumber.current = state.theme.stepResponse.data?.["reference-number"]);

  return (
      <div className={className}>
        <Form setCurrentTheme={setCurrentTheme} endPoint={"/purchase"}>
          <FormStep
              endPoint={null}
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
                    width: 10,
                    alt: "alt",
                  },
                  {
                    imageUrl: intro_ball_1,
                    left: "80%",
                    level: 1,
                    top: "5%",
                    type: "image",
                    width: 15,
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
            <Input
                noScroll
                onKeyUp={(value) => {
                  setHomeValue(value)
                }}
                onChange={(e) => {
                  setStep1Valid(e.target.validity.valid)
                }}
                className={"big-input"}
                type={"number"}
                isCurrency
                name={"home_value"}
                {...formData.section_1?.home_value_input}
            />
            <Input
                noScroll
                onKeyUp={(value) => {
                  setTotalDebt(value)
                }}
                onChange={(e) => {
                  setStep1Valid(e.target.validity.valid)
                }}
                type={"number"}
                isCurrency
                name={"total_debt"}
                {...formData.section_1?.total_debt_input}
            />
            
            <Select
                name={"property_details_2"}
                {...formData.section_1?.residential_status_dropdown}
            />
            <Button
                css={css`
              opacity: ${step1Valid ? 1 : 0};
              visibility: ${step1Valid ? "visible" : "hidden"};
            `}
                icon={true}
                className={"next-step"}
                label={"Next"}
            />
          </FormStep>
          <FormStep 
              endPoint={null}
              pageName={pageName}
              activeTheme={formData.section_2?.section_theme}
              stepName={formData.section_2?.section_name}
              onNext={() => {
                setVerifyProducts(true)
                triggerQualification(true)
              }}
          >
            <div className="form-text-wrapper">
              <h1 className={"form-headline-1 text-left"}>
                {formData.section_2?.title}
              </h1>
            </div>
            <FormRepeatableInput
                question={formData.section_2?.applicant_amount_label}
                number={4}
                initial={1}
                name={"applicants_number"}
            >
            <W50>
            <Input
                  type={"text"}
                  name={"applicant_score_{{number}}"}
                  label={formData.section_2?.applicant.score_label}
              /><div></div>
              </W50>
            </FormRepeatableInput>
            <div className="btn-group">
              <Button className={"bordered prev-step"} label={"Back"}/>
              <Button icon={true} label={"Next"} className={"next-step"}/>
            </div>
          </FormStep>
          <FormStep
              endPoint={null}
              pageName={pageName}
              activeTheme={formData.section_3?.section_theme}
              stepName={formData.section_3?.section_name}
          >
            <div className="form-text-wrapper">
              <h1 className={"form-headline-1 text-left"}>
                {formData.section_3?.title}
              </h1>
            </div>
            {state.theme.stepResponse.data?.data ? (
                media !== "mobile" ? (
                    <FormFilter
                        className={"form-wide-container"}
                        filters={productsFilter}
                    >
                      {Object.entries(state.theme.stepResponse.data?.data)
                          .filter(([, {products}])=>products?.length)
                          .map(
                          ([type, {products}], index) => (
                              <ProductsTable
                                  products={productsTable}
                                  key={type}
                                  dataFilter={type}
                              >
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
                                      ({ID, fields: {rate,variable_rate, maximum_ltv}}) => (
                                          <th scope={"col"} key={ID}>
                                            <p>
                                              $
                                              {numberWithCommas(
                                                  (homeValue * maximum_ltv / 100 ) - +section1Values("total_debt")
                                              )}{" "}
                                            </p>
                                            <p>
                                              $
                                              {numberWithCommas(
                                                  monthlyPayments(
                                                    (homeValue * maximum_ltv / 100) - +section1Values("total_debt"),
                                                      +variable_rate
                                                  )
                                              )}{" "}
                                              / month
                                            </p>
                                            <p className={"number"}>{variable_rate}%</p>
                                          </th>
                                      )
                                  )}
                                </tr>
                                </thead>
                                <tbody>
                                <tr className={"head"}>
                                  <td scope={"row"} className={"white"}>
                                    <strong>LTV</strong>
                                  </td>
                                  {products.map(({ID, fields: {maximum_ltv}}) => (
                                      <td key={ID} className={"details"} data-label="LTV">
                                        {maximum_ltv}%
                                      </td>
                                  ))}
                                </tr>
                                <tr className={"head last-head"}>
                                  <td scope={"row"} className={"white"}>
                                    <strong>Credit score</strong>
                                  </td>
                                  {products.map(({ID, fields: {beacon_score}}) => (
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
                                  <td scope={"row"} className={"white"}>
                                    <strong>Fixed rate</strong>
                                  </td>
                                  {products.map(({ID, fields: {rate}}) => (
                                      <td
                                          key={ID}
                                          className={"details"}
                                          data-label="Fixed rate"
                                      >
                                        {(+rate).toFixed?.(2)}%
                                      </td>
                                  ))}
                                </tr>
                                <tr className={"head"}>
                                  <td scope={"row"} className={"white"}>
																		<strong>Lender fee</strong>
                                  </td>
                                  {products.map(({ID, fields: {fee}}) => (
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
                                    ([id, {name, specificationProducts}]) => (
                                        <tr key={id}>
                                          <td scope={"row"}>{name}</td>
                                          {products.map(({ID}) =>
                                              specificationProducts.indexOf(ID) >= 0 ? (
                                                  <td key={ID}>
                                                    <CheckMark/>
                                                  </td>
                                              ) : (
                                                  <td key={ID}/>
                                              )
                                          )}
                                        </tr>
                                    )
                                )}
                                </tbody>
                              </ProductsTable>
                          )
                      )}
                    </FormFilter>
                ) : (
                    <div className="mortgage-options-mobile">
                      <FormFilter filters={productsFilter}>
                        {Object.entries(state.theme.stepResponse.data?.data)
                            .filter(([, {products}])=>products?.length)
                            .map(
                            ([type, {products}, index]) => (
                                <div key={type} data-filter={type}>
                                  {products.map(
                                      (
                                          {
                                            ID,
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
                                                    monthlyPayments(
                                                        (+section1Values("home_value") *
                                                            maximum_ltv) /
                                                        100,
                                                        +rate
                                                    )
                                                )}{" "}
                                                / month
                                              </p>
                                              <p>
                                                $
                                                {numberWithCommas(
                                                    (+section1Values("home_value") *
                                                        maximum_ltv) /
                                                    100
                                                )}{" "}
                                                max
                                              </p>
                                            </div>
                                            <div className="mortgage-body">
                                              <div className={"m-row m-head"}>
                                                <p className="white"><strong>Fixed rate</strong></p>
                                                <p>{(+rate + 0.75).toFixed?.(2)}%</p>
                                              </div>
                                              <div className={"m-row m-head"}>
                                                <p className="white"><strong>Lender fee</strong></p>
                                                <p>{fee}%</p>
                                              </div>
                                              <div className={"m-row m-head  m-head"}>
                                                <p className="white"><strong>LTV</strong></p>
                                                <p>{maximum_ltv}%</p>
                                              </div>
                                              <div
                                                  className={"m-row m-head  m-head last-head"}
                                              >
                                                <p>Credit score</p>
                                                <p>{beaconScore(beacon_score)}</p>
                                              </div>
                                              {specifications
                                                  .slice(0, 4)
                                                  .map(({term_id, name}) => (
                                                      <div key={term_id} className={"m-row"}>
                                                        <p>{name}</p>
                                                        <p>
                                                          <CheckMark/>
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
                                                          .map(({term_id, name}) => (
                                                              <div
                                                                  key={term_id}
                                                                  className={"m-row"}
                                                              >
                                                                <p>{name}</p>
                                                                <p>
                                                                  <CheckMark/>
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
              <Link className={"wide bordered"} href={state.theme.user.logged ? "/dashboard" : "/" }>
                <Button
                    className={"wide bordered"}
                    label={"Back to dashboard"}
                />
              </Link>
            </div>
          </FormStep>

          
        </Form>
      </div>
  );
};

export default styled(connect(C2Page))`
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
