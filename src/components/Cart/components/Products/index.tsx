import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import 'react-tabs/style/react-tabs.css';

import { useApp } from 'contexts/app';

import ProductData from 'dtos/ProductData';

import Product from './components/Product';

import Container from './styles';

interface TempProductsData {
  [key: string]: ProductData[];
}

const Products: React.FC = () => {
  const context = useApp();
  const { selectedProducts } = context;

  // Temporary
  const tempProducts: TempProductsData = selectedProducts.reduce(
    (acc, curr) => {
      return { ...acc, [curr.nutraceutical || '']: [curr] };
    },
    {},
  );

  return (
    <Container>
      {Object.entries(tempProducts).map(({ 0: nutraceutical, 1: products }) => {
        const bestRatingProduct = products.reduce((acc: ProductData, curr) => {
          return acc.rating > curr.rating ? acc : curr;
        });

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
                <Tab>We recommended</Tab>
                <Tab>Cheapest</Tab>
                <Tab>Best rating</Tab>
                <Tab>See all</Tab>
              </TabList>
              <TabPanel>
                <Product {...bestRatingProduct} />
              </TabPanel>
              <TabPanel>
                <Product {...cheapestProduct} />
              </TabPanel>
              <TabPanel>
                <Product {...bestRatingProduct} />
              </TabPanel>
              <TabPanel>
                {products.map((product: ProductData) => (
                  <Product key={product.nutraceutical} {...product} />
                ))}
              </TabPanel>
            </Tabs>
          )
        );
      })}
    </Container>
  );
};

export default Products;
