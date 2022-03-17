import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { hotjar } from 'react-hotjar';
import TagManager from 'react-gtm-module';

import { useApp } from 'contexts/app';

import ConvertLangToRegion from 'services/ConvertLangToRegion';
import GetAmazonTag from 'services/GetAmazonTag';
import GetSubdomain from 'services/GetSubdomain';

import Container, {
  Title,
  TitlePrice,
  TitlePriceValue,
  TitlePriceCurrency,
  Details,
  Description,
  Shipping,
  CheckoutButton,
  CheckoutAmazon,
} from './styles';

interface SummaryProps {
  isCustom?: boolean;
}

const Summary: React.FC<SummaryProps> = ({ isCustom }) => {
  const context = useApp();
  const { steps, labels, selectedProducts } = context;
  const { step1: initialStep, step2: previousStep } = steps;

  const isActive =
    (previousStep.isCompleted &&
      initialStep.isCompleted &&
      !!selectedProducts.length) ||
    isCustom;

  const cartTotalPrice = selectedProducts.reduce((acc, product) => {
    const productPriceArray = product.price.split(' ');
    const productPriceValue = parseFloat(
      productPriceArray[0].replace(/,/g, '.'),
    );

    const value = !Number.isNaN(productPriceValue) ? productPriceValue : 0;

    const quantity = product.quantity || 1;

    return acc + value * quantity;
  }, 0);

  const cartTotalPriceFormatted = cartTotalPrice.toLocaleString('es-ES', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

  const cartDailyPriceFormatted = (cartTotalPrice / 30).toLocaleString(
    'es-ES',
    {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    },
  );

  const cartParams = selectedProducts.reduce((acc, product, index) => {
    // Skip 0 to avoid link issues
    const linkIndex = index + 1;

    const linkAsin = product.asin;

    return `${acc}&ASIN.${linkIndex}=${linkAsin}&Quantity.${linkIndex}=${
      product.quantity || 1
    }`;
  }, '');

  const region = ConvertLangToRegion(GetSubdomain());
  const amazonTag = GetAmazonTag(region);

  const cartLink = `https://www.amazon.${region}/gp/aws/cart/add.html?AssociateTag=${amazonTag}&tag=${amazonTag}${cartParams}`;

  return (
    <Container>
      <CheckoutAmazon
        src={`${process.env.PUBLIC_URL}/images/available_at_amazon.png`}
        alt="Available at Amazon"
        title="Available at Amazon"
      />
      <Title>
        <span>{labels.summary_total || 'Total'}</span>{' '}
        <TitlePrice>
          <TitlePriceValue>{cartTotalPriceFormatted}</TitlePriceValue>
          <TitlePriceCurrency>€</TitlePriceCurrency>
        </TitlePrice>
      </Title>
      <Details>{`${cartDailyPriceFormatted} €/day`}</Details>
      <Description>
        {labels.summary_description ||
          'Your purchase serves for at least 30 days.'}
      </Description>
      <Shipping>
        {labels.summary_shipping ||
          'Shipping duties and taxes will be calculated at checkout'}
      </Shipping>
      <CheckoutButton
        href={cartLink}
        target="_blank"
        rel="nofollow noopener sponsored"
        className="buy-button"
        onClick={() => {
          hotjar.event('buy-button');

          TagManager.dataLayer({
            dataLayer: {
              event: 'goToCheckout',
            },
          });
        }}
        isActive={isActive}
      >
        {labels.summary_button || 'Go to checkout'} <BsArrowRight size={18} />
      </CheckoutButton>

      {/* <SaveRecommendation>
        {labels.summary_save_recommendation}
      </SaveRecommendation> */}
    </Container>
  );
};

Summary.defaultProps = {
  isCustom: false,
};

export default Summary;
