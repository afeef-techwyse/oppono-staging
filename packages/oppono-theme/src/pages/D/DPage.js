import React from "react";
import Form from "../../components/form-components/Form";
import { connect, styled } from "frontity";
import FormStep from "../../components/form-components/FormStep";
import Button from "../../components/form-components/Button";
import ProductsTable from "../../components/form-components/ProductsTable";
import { beaconScore } from "../../functions/beaconScore";
import { productTypeToFullName } from "../../functions/productTypeToFullName";
import useMedia from "../../hooks/useMedia";
import FormFilter from "../../components/form-components/FormFilter";
import ProductsMobileOption from "../../components/form-components/ProductsMobileOption";
import useProductsTable from "../../hooks/useProductsTable";
import opponoApi from "../../opponoApi";
import CheckMark from "../../components/reusable/CheckMark";
import { size } from "../../functions/size";
import Link from "../../components/reusable/Link";
import Header from "../../components/Header";

import classnames from "classnames";

const DPage = ({ className, state, actions }) => {
    const media = useMedia();

    const [currentTheme, setCurrentTheme] = React.useState("gray-theme");
    React.useEffect(() => {
        actions.theme.setActiveTheme(currentTheme);
    }, [currentTheme]);

    React.useEffect(() => {
        actions.theme.setLeadId();
        actions.theme.setStepResponse({});
        opponoApi.post("/product-qualification", {}).then((response) => {
            response.data.data = { ...response.data };
            actions.theme.setStepResponse(response);
            // actions.theme.setStepResponse({data:{data:products}});
        });
    }, []);

    const [productsTable, productsFilter] = useProductsTable(
        state.theme.stepResponse
    );
    React.useEffect(() => {
        actions.theme.setSubHeader({
            part_1: "I’m just",
            part_2: "BROWSING",
        });
    }, []);
    return (

        <div className={classnames(className)}>
            <Header state={state} hasProgress={state.theme.activeStep.total > 1} />

            <div className={className}>
                <Form setCurrentTheme={setCurrentTheme}>
                    <FormStep activeTheme={"gray-theme"} stepName={"d"}>
                        <div className="form-text-wrapper">
                            <h1 className={"form-headline-1 text-left"}>
                                These are the mortgage products we offer!
                            </h1>
                        </div>
                        {state.theme.stepResponse.data?.data ? (
                            media !== "mobile" ? (
                                <FormFilter
                                    className={"form-wide-container"}
                                    filters={productsFilter}
                                >
                                    <div className={"want-deal"} data-filter={"*"}>
                                        <Link href={"/dashboard/a/"}>
                                            <Button
                                                className={"small next-step"}
                                                label={"See what your client qualifies for"}
                                            />
                                        </Link>
                                    </div>
                                    {Object.entries(state.theme.stepResponse.data?.data)
                                        .filter(([, { products }]) => products?.length)
                                        .map(
                                            ([type, { products }], index) => {

                                                const hasVariable = type === "first" || type === "second";
                                                return (
                                                    <ProductsTable
                                                        key={type}
                                                        dataFilter={type}
                                                        products={productsTable}
                                                    >
                                                        <thead>
                                                            <tr>
                                                                <th scope={"col"}>
                                                                    <p className={"circle"}>{index + 1}</p>
                                                                    <p>{productTypeToFullName(type)}</p>
                                                                    <p className={"dark"}>
                                                                        {hasVariable ? "Variable" : "Fixed"} rates
                                                                    </p>
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
                                                                {products.map(({ ID, title, fields: { rate, variable_rate } }) => {
                                                                    return (
                                                                        <th scope={"col"} key={ID}>
                                                                            <p className={"number"}>
                                                                                {(variable_rate === '0' ? +rate : +variable_rate).toFixed?.(
                                                                                    2
                                                                                )}
                                                                                %
                                                                            </p>
                                                                        </th>
                                                                    )
                                                                })}
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr className={"head"}>
                                                                <td scope={"row"} className={"dark"}>
                                                                    LTV
                                                                </td>
                                                                {products.map(({ ID, fields: { maximum_ltv } }) => (
                                                                    <td
                                                                        key={ID}
                                                                        className={"details"}
                                                                        data-label="LTV"
                                                                    >
                                                                        {maximum_ltv}%
                                                                    </td>
                                                                ))}
                                                            </tr>
                                                            <tr className={"head last-head"}>
                                                                <td scope={"row"} className={"dark"}>
                                                                    Credit score
                                                                </td>
                                                                {products.map(
                                                                    ({ ID, fields: { beacon_score } }) => (
                                                                        <td
                                                                            key={ID}
                                                                            className={"details"}
                                                                            data-label="beacon_score"
                                                                        >
                                                                            {beaconScore(beacon_score)}
                                                                        </td>
                                                                    )
                                                                )}
                                                            </tr>
                                                            {!hasVariable ? null : (
                                                                <tr className={"head"}>
                                                                    <td scope={"row"} className={"dark"}>
                                                                        Fixed rate
                                                                    </td>
                                                                    {products.map(({ ID, fields: { rate } }) => (
                                                                        <td
                                                                            key={ID}
                                                                            className={"details"}
                                                                            data-label="Fixed rate"
                                                                        >
                                                                            {(+rate).toFixed?.(2)}%
                                                                        </td>
                                                                    ))}
                                                                </tr>
                                                            )}
                                                            <tr className={"head"}>
                                                                <td scope={"row"} className={"dark"}>
                                                                    Lender fee
                                                                </td>
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
                                                        </tbody>
                                                    </ProductsTable>
                                                );
                                            }
                                        )}
                                </FormFilter>
                            ) : (
                                <div className="mortgage-options-mobile">
                                    <FormFilter filters={productsFilter}>
                                        <div className={"want-deal"} data-filter={"*"}>
                                            <Link href={"/qualifyfor/"}>
                                                <Button
                                                    className={"small next-step"}
                                                    label={"See if I qualify"}
                                                />
                                            </Link>
                                        </div>
                                        {Object.entries(state.theme.stepResponse.data?.data)
                                            .filter(([, { products }]) => products?.length)
                                            .map(
                                                ([type, { products }, index]) => {
                                                    const hasVariable = type === "first" || type === "second";

                                                    return (
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
                                                                            <p className={"dark"}>
                                                                                {hasVariable ? "Variable" : "Fixed"} rates
                                                                            </p>
                                                                        </div>
                                                                        <div className="mortgage-head">
                                                                            <p className={"number"}>
                                                                                {(
                                                                                    +rate + (hasVariable ? 0 : 0.75)
                                                                                ).toFixed?.(2)}
                                                                                %
                                                                            </p>
                                                                        </div>
                                                                        <div className="mortgage-body">
                                                                            {!hasVariable ? null : (
                                                                                <div className={"m-row m-head"}>
                                                                                    <p>Fixed rate</p>
                                                                                    <p>{(+rate + 0.75).toFixed?.(2)}%</p>
                                                                                </div>
                                                                            )}
                                                                            <div className={"m-row m-head"}>
                                                                                <p>Lender fee</p>
                                                                                <p>{fee}%</p>
                                                                            </div>
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
                                                    );
                                                }
                                            )}
                                    </FormFilter>
                                </div>
                            )
                        ) : null}
                    </FormStep>
                </Form>
            </div>
        </div>
    );
};

export default styled(connect(DPage))`
  width: 100%;
  height: 100%;

  .want-deal {
    ${Button} {
      margin: ${size(50)} auto;
      padding: ${size(20)} ${size(40)};
      font-size: ${size(25)};
    }
  }

  .filters {
    margin-bottom: 0;
  }

  .form-text-wrapper {
    margin-bottom: ${size(20)};
  }
`;
