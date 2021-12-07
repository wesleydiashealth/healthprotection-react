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
  SaveRecommendation,
} from './styles';

const Summary: React.FC = () => {
  const context = useApp();
  const { labels, selectedProducts } = context;

  const cartTotalPrice = selectedProducts.reduce((acc, product) => {
    const productPriceArray = product.price.split(' ');
    const productPriceValue = parseFloat(
      productPriceArray[0].replace(/,/g, '.'),
    );

    const quantity = product.quantity || 1;

    return acc + productPriceValue * quantity;
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
