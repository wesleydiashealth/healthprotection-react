import React, { useCallback } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { useApp } from 'contexts/app';

import ProductData from 'dtos/ProductData';

import Loading from 'components/Loading';
import Product from './components/Product';

import Container from './styles';

const Products: React.FC = () => {
  const context = useApp();
  const {
    labels,
    steps,
    productsGroups,
    selectedProducts,
    updateSelectedProducts,
  } = context;

  const { step1: firstStep, step2: secondStep, step3: previousStep } = steps;

  const isReady =
    !firstStep.isLoading && !secondStep.isLoading && !previousStep.isLoading;

  const productTabClick = useCallback(
    (product: ProductData) => {
      const productDietarySupplement = product.interactions.reduce(
        (acc, curr) => curr.dietarySupplementSlug,
        '',
      );

      // Selected products without existent product for same nutraceutical (that will be replaced)
      const filteredSelectedProducts = selectedProducts.filter(
        selectedProduct =>
          selectedProduct.interactions.find(
            interaction =>
              interaction.dietarySupplementSlug !== productDietarySupplement,
          ),
      );

      updateSelectedProducts([...filteredSelectedProducts, product]);
    },
    [selectedProducts, updateSelectedProducts],
  );

  return (
    <Container>
      {!isReady ? (
        <Loading color="#ec903f" />
      ) : (
        Object.entries(productsGroups).map(
          ({ 0: nutraceutical, 1: productsGroup }) => {
            const recommendedProduct = productsGroup.reduce(
              (acc: ProductData, curr) => {
                const { interactions } = curr;

                const previousOrder = acc.interactions.reduce(
                  (subAcc: number, interaction) =>
                    subAcc + parseInt(interaction.order, 10),
                  0,
                );

                const order = interactions.reduce(
                  (subAcc: number, interaction) =>
                    subAcc + parseInt(interaction.order, 10),
                  0,
                );

                return previousOrder > order ? acc : curr;
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

            const bestRatingProduct = productsGroup.reduce(
              (acc: ProductData, curr) =>
                acc.rating > curr.rating ? acc : curr,
            );

            return (
              productsGroup && (
                <Tabs key={nutraceutical}>
                  <TabList>
                    <Tab
                      onClick={() => {
                        productTabClick(recommendedProduct);
                      }}
                    >
                      {labels.cart_product_recommended || 'We recommended'}
                    </Tab>
                    <Tab
                      onClick={() => {
                        productTabClick(cheapestProduct);
                      }}
                    >
                      {labels.cart_product_cheapest || 'Cheapest'}
                    </Tab>
                    <Tab
                      onClick={() => {
                        productTabClick(bestRatingProduct);
                      }}
                    >
                      {labels.cart_product_best_rating || 'Best rating'}
                    </Tab>
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
                    {productsGroups[nutraceutical].map(
                      (product: ProductData) => (
                        <Product
                          key={`${nutraceutical}-${product.asin}`}
                          dietarySupplement={nutraceutical}
                          {...product}
                        />
                      ),
                    )}
                  </TabPanel>
                </Tabs>
              )
            );
          },
        )
      )}
    </Container>
  );
};

export default Products;
