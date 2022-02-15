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
  products: ProductData[];
}

const Products: React.FC<ProductsData> = props => {
  const { products } = props;

  const context = useApp();
  const { labels } = context;

  // Temporary
  const productsGroups = products.reduce((acc: ProductsGroupData, product) => {
    const { interactions } = product;

    const updatedInteractions = interactions.reduce(
      (subAcc: ProductsGroupData, interaction) => {
        const existentValues =
          Object.entries(acc)
            .filter(({ 0: key }) => key === interaction.dietarySupplementSlug)
            ?.reduce((subAcc2: ProductData[], { 1: values }) => {
              return [...subAcc2, ...values];
            }, []) || [];

        return {
          ...subAcc,
          ...{
            [interaction.dietarySupplementSlug]: [...existentValues, product],
          },
        };
      },
      {},
    );

    return {
      ...acc,
      ...updatedInteractions,
    };
  }, {});

  return (
    <Container>
      {Object.entries(productsGroups).map(
        ({ 0: nutraceutical, 1: productsGroup }) => {
          const bestRatingProduct = productsGroup.reduce(
            (acc: ProductData, curr) => {
              return acc.rating > curr.rating ? acc : curr;
            },
          );

          const cheapestProduct = productsGroup.reduce(
            (acc: ProductData, curr) => {
              const prevProductArray = acc.price.split(' ');
              const prevProductPrice = parseFloat(
                prevProductArray[0].replace(/,/g, '.'),
              );

              const currProductArray = curr.price.split(' ');
              const currProductPrice = parseFloat(
                currProductArray[0].replace(/,/g, '.'),
              );

              return prevProductPrice > currProductPrice ? curr : acc;
            },
          );

          return (
            productsGroup && (
              <Tabs key={nutraceutical}>
                <TabList>
                  <Tab>
                    {labels.cart_product_recommended || 'We recommended'}
                  </Tab>
                  <Tab>{labels.cart_product_cheapest || 'Cheapest'}</Tab>
                  <Tab>{labels.cart_product_best_rating || 'Best rating'}</Tab>
                  <Tab>{labels.cart_product_see_all || 'See all'}</Tab>
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
