import React, { useEffect } from 'react';
import { TiShoppingCart } from 'react-icons/ti';
import VisibilitySensor from 'react-visibility-sensor';
import { hotjar } from 'react-hotjar';

import { useApp } from 'contexts/app';

import ProductData from 'dtos/ProductData';

import Loading from 'components/Loading';
import StepIntro from 'components/StepIntro';

import Products from './components/Products';
import Sidebar from './components/Sidebar';

import Container, {
  StepContent,
  CheckoutProducts,
  AmazonPolicy,
} from './styles';

interface CartProps {
  queryProducts?: ProductData[] | null;
}

const Cart: React.FC<CartProps> = ({ queryProducts }) => {
  const context = useApp();
  const { steps, products, labels, updateSelectedProducts } = context;
  const { step1: initialStep, step2: previousStep } = steps;

  const isActive =
    (previousStep.isCompleted &&
      initialStep.isCompleted &&
      !!products.length) ||
    !!queryProducts?.length;

  useEffect(() => {
    if (queryProducts) {
      updateSelectedProducts(queryProducts);
    }
  }, [queryProducts, updateSelectedProducts]);

  // Show loading while fetching products
  if (queryProducts && !queryProducts.length) {
    return <Loading color="#ec903f" />;
  }

  return (
    <Container isActive={isActive}>
      <VisibilitySensor
        active={!!isActive}
        onChange={isVisible => {
          if (isVisible) {
            hotjar.event('scroll-cart');
          }
        }}
      >
        <>
          <StepIntro
            id="step_cart"
            title={labels?.cart_title}
            subtitle={labels?.cart_description}
            description={labels?.cart_tooltip}
            icon={TiShoppingCart}
            color="#ec903f"
            isActive={isActive}
          />
          <StepContent>
            {isActive && (
              <CheckoutProducts>
                <h4>{labels?.cart_subtitle}</h4>
                <Products />
                <AmazonPolicy>
                  Health Protection Europe S.L is a reader supported, all
                  products displayed earn us commission when purchased through
                  the links. Health Protection is a participant in the Amazon
                  Services LLC Associates Program and its affiliates around the
                  world.
                </AmazonPolicy>
              </CheckoutProducts>
            )}
            <Sidebar isCustom={!!queryProducts} />
          </StepContent>
        </>
      </VisibilitySensor>
    </Container>
  );
};

Cart.defaultProps = {
  queryProducts: null,
};

export default Cart;
