import React from 'react';

export default function useProductsTable(stepResponse = {}, productsTableInitialState = {}, productsFilterInitialState = { '*': 'All' }) {
    const [productsTable, setProductsTable] = React.useState(productsTableInitialState);
    const [productsFilter, setProductsFilter] = React.useState(productsFilterInitialState);

    React.useEffect(() => {
        try {
            const data = stepResponse.data?.data;
            if (data) {
                const specifications = Object.entries(data).reduce((combinedSpecifications, [type, { products }]) => {
                    (combinedSpecifications[type] || (combinedSpecifications[type] = {}));
                    products?.reduce((typeSpecifications, product) =>
                        product.fields.specifications.reduce((typeSpecifications, specification) => {
                            const id = specification.term_id === 13 ? 0 : specification.term_id;
                            return typeSpecifications[id]
                                ? (typeSpecifications[id].specificationProducts.push(product.ID) && typeSpecifications)
                                : (typeSpecifications[id] = {
                                    name: specification.name,
                                    specificationProducts: [product.ID]
                                }) && typeSpecifications;
                        }
                            , typeSpecifications)
                        , combinedSpecifications[type])
                    return combinedSpecifications;
                }, {});
                setProductsTable(specifications);
                const filters = { '*': 'All' };
                Object.entries(data).map(([type, { products }]) => products.length && (filters[type] = type));
                setProductsFilter(filters);
            }
        } catch (e) {

        }
    }, [stepResponse]);
    return [productsTable, productsFilter];
}