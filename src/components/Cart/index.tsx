import React, { useEffect } from 'react';
import { HiQuestionMarkCircle, HiLockClosed } from 'react-icons/hi';
import { TiShoppingCart } from 'react-icons/ti';

import { useApp } from 'contexts/app';

import ProductData from 'dtos/ProductData';

import Loading from 'components/Loading';
import Products from './components/Products';
import Sidebar from './components/Sidebar';

import Container, {
  StepIntro,
  StepTitle,
  StepTooltip,
  StepDescription,
  StepContent,
  CheckoutProducts,
  AmazonPolicy,
} from './styles';

interface CartProps {
  queryProducts?: ProductData[] | null;
}

const Cart: React.FC<CartProps> = ({ queryProducts }) => {
  const context = useApp();
  const { steps, products, labels, selectedProducts, updateSelectedProducts } =
    context;
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
      <StepIntro>
        <TiShoppingCart size={52} color={isActive ? '#ec903f' : '#565656'} />
        <StepTitle>
          {!isActive && <HiLockClosed size={20} className="locked-icon" />}
          {labels.cart_title}
          <HiQuestionMarkCircle
            className="tooltip-icon"
            size={20}
            color={isActive ? '#ec903f' : '#565656'}
            data-tip={`<strong>${labels.cart_title}</strong><span>${labels.cart_tooltip}</span>`}
            data-for="cart-title-tooltip"
          />
          <StepTooltip
            id="cart-title-tooltip"
            className="cart-title-tooltip"
            place="bottom"
            type="light"
            effect="solid"
            offset={{ top: 10, left: 10 }}
            html
            backgroundColor="#fff"
          />
        </StepTitle>
        {!isActive && (
          <div className="step-disabled">
            <strong>{labels?.step_3_disabled.split('.')[0]}</strong>.
            {labels?.step_3_disabled.substr(
              labels?.step_3_disabled.indexOf('.') + 1,
            )}
          </div>
        )}
        {labels.cart_description && (
          <StepDescription>
            <strong>{labels.cart_description.split(' ')[0]}</strong>{' '}
            {labels.cart_description.substr(
              labels.cart_description.indexOf(' ') + 1,
            )}
          </StepDescription>
        )}
      </StepIntro>
      <StepContent>
        {isActive && (
          <CheckoutProducts>
            <h4>{labels?.cart_subtitle}</h4>
            <Products selectedProducts={selectedProducts} />
            <AmazonPolicy>
              Health Protection Europe S.L is a reader supported, all products
              displayed earn us commission when purchased through the links.
              Health Protection is a participant in the Amazon Services LLC
              Associates Program and its affiliates around the world..
            </AmazonPolicy>
          </CheckoutProducts>
        )}
        <Sidebar isCustom={!!queryProducts} />
      </StepContent>
    </Container>
  );
};

Cart.defaultProps = {
  queryProducts: null,
};

export default Cart;
