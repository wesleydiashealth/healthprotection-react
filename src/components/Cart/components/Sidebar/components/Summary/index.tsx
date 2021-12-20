import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { hotjar } from 'react-hotjar';

import { useApp } from 'contexts/app';

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

const Summary: React.FC = () => {
  const context = useApp();
  const { steps, labels, selectedProducts } = context;
  const { step1: initialStep, step2: previousStep } = steps;

  const isActive =
    previousStep.isCompleted &&
    initialStep.isCompleted &&
    !!selectedProducts.length;

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

    return `${acc}&ASIN.${linkIndex}=${linkAsin}&Quantity.${linkIndex}=${product.quantity}`;
  }, '');

  const cartLink = `https://www.amazon.es/gp/aws/cart/add.html?AssociateTag=healthprote04-21&tag=healthprote04-21${cartParams}`;

  return (
    <Container>
      <CheckoutAmazon
        src={`${process.env.PUBLIC_URL}/images/available_at_amazon.png`}
        alt="Available at Amazon"
        title="Available at Amazon"
      />
      <Title>
        <span>{labels.summary_total}</span>{' '}
        <TitlePrice>
          <TitlePriceValue>{cartTotalPriceFormatted}</TitlePriceValue>
          <TitlePriceCurrency>€</TitlePriceCurrency>
        </TitlePrice>
      </Title>
      <Details>{`${cartDailyPriceFormatted} €/day`}</Details>
      <Description>{labels.summary_description}</Description>
      <Shipping>{labels.summary_shipping}</Shipping>
      <CheckoutButton
        href={cartLink}
        target="_blank"
        rel="nofollow noopener sponsored"
        className="buy-button"
        onClick={() => {
          hotjar.event('buy-button');
        }}
        isActive={isActive}
      >
        {labels.summary_button} <BsArrowRight size={18} />
      </CheckoutButton>

      {/* <SaveRecommendation>
        {labels.summary_save_recommendation}
      </SaveRecommendation> */}
    </Container>
  );
};

export default Summary;
