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
  const { steps, products, labels, updateSelectedProducts } = context;
  const { step1: initialStep, step2: previousStep } = steps;

  const stepDescriptionLabel =
    labels.cart_description ||
    'Click on the dietary supplements you want to be redirect to Amazon';

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
          {labels.cart_title || 'Buy your products'}
          <HiQuestionMarkCircle
            className="tooltip-icon"
            size={20}
            color={isActive ? '#ec903f' : '#565656'}
            data-tip={`<strong>${
              labels.cart_title || 'Buy your products'
            }</strong><span>${
              labels.cart_tooltip ||
              'Now that you have completed the 3 steps, we present the products suitable for the areas you want. Choose which ones you want to buy and click the "buy at Amazon" button to be redirected to Amazon\'s sales site. You can also read more about each dietary supplement and check out brand information.'
            }</span>`}
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
        {stepDescriptionLabel && (
          <StepDescription>
            <strong>{stepDescriptionLabel.split(' ')[0]}</strong>{' '}
            {stepDescriptionLabel.substr(stepDescriptionLabel.indexOf(' ') + 1)}
          </StepDescription>
        )}
      </StepIntro>
      <StepContent>
        {isActive && (
          <CheckoutProducts>
            <h4>{labels?.cart_subtitle}</h4>
            <Products {...{ products }} />
            <AmazonPolicy>
              Health Protection Europe S.L is a reader supported, all products
              displayed earn us commission when purchased through the links.
              Health Protection is a participant in the Amazon Services LLC
              Associates Program and its affiliates around the world.
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
