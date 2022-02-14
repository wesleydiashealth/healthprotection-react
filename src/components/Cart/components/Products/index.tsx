import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { useApp } from 'contexts/app';

import ProductData from 'dtos/ProductData';

import Product from './components/Product';

import Container from './styles';

interface ProductsGroupData {
  [key: string]: ProductData[];
}

interface ProductsData {
  selectedProducts: ProductData[];
}

const Products: React.FC<ProductsData> = props => {
  const { selectedProducts } = props;

  const context = useApp();
  const { labels } = context;

  // Temporary
  const productsGroups = selectedProducts.reduce(
    (acc: ProductsGroupData, selectedProduct) => {
      const { interactions } = selectedProduct;

      const updatedInteractions = interactions.reduce(
        (subAcc: ProductsGroupData, interaction) => {
          const existentValues =
            Object.entries(acc)
              .filter(({ 0: key }) => key === interaction.dietarySupplement)
              ?.reduce((subAcc2: ProductData[], { 1: values }) => {
                return [...subAcc2, ...values];
              }, []) || [];

          return {
            ...subAcc,
            ...{
              [interaction.dietarySupplement]: [
                ...existentValues,
                selectedProduct,
              ],
            },
          };
        },
        {},
      );

      return {
        ...acc,
        ...updatedInteractions,
      };
    },
    {},
  );

  return (
    <Container>
      {Object.entries(productsGroups).map(
        ({ 0: nutraceutical, 1: products }) => {
          const bestRatingProduct = products.reduce(
            (acc: ProductData, curr) => {
              return acc.rating > curr.rating ? acc : curr;
            },
          );

          const cheapestProduct = products.reduce((acc: ProductData, curr) => {
            const prevProductArray = acc.price.split(' ');
            const prevProductPrice = parseFloat(
              prevProductArray[0].replace(/,/g, '.'),
            );

            const currProductArray = curr.price.split(' ');
            const currProductPrice = parseFloat(
              currProductArray[0].replace(/,/g, '.'),
            );

            return prevProductPrice > currProductPrice ? curr : acc;
          });

          return (
            products && (
              <Tabs key={nutraceutical}>
                <TabList>
                  <Tab>{labels.cart_product_recommended}</Tab>
                  <Tab>{labels.cart_product_cheapest}</Tab>
                  <Tab>{labels.cart_product_best_rating}</Tab>
                  <Tab>{labels.cart_product_see_all}</Tab>
                </TabList>
                <TabPanel>
                  <Product
                    dietarySupplement={nutraceutical}
                    {...bestRatingProduct}
                  />
                </TabPanel>
                <TabPanel>
                  <Product
                    dietarySupplement={nutraceutical}
                    {...cheapestProduct}
                  />
                </TabPanel>
                <TabPanel>
                  <Product
                    dietarySupplement={nutraceutical}
                    {...bestRatingProduct}
                  />
                </TabPanel>
                <TabPanel>
                  {products.map((product: ProductData) => (
                    <Product
                      key={product.asin}
                      dietarySupplement={nutraceutical}
                      {...product}
                    />
                  ))}
                </TabPanel>
              </Tabs>
            )
          );
        },
      )}
    </Container>
  );
};

export default Products;
