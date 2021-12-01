import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { hotjar } from 'react-hotjar';

import { useApp } from 'contexts/app';

import Container, {
  // Title,
  // Details,
  // Description,
  // Shipping,
  CheckoutButton,
  // SaveRecommendation,
} from './styles';

const Summary: React.FC = () => {
  const context = useApp();
  const { labels, products } = context;

  const cartParams = products.reduce((acc, product, index) => {
    // Skip 0 to avoid link issues
    const linkIndex = index + 1;

    const linkArgs = product.link.match(
      /^http[s]?:\/\/.*?\/product\/(.*)\/[a-zA-Z-_]+.*$/,
    );

    const linkAsin = linkArgs ? linkArgs[1] : '';

    return `${acc}&ASIN.${linkIndex}=${linkAsin}&Quantity.${linkIndex}=1`;
  }, '');

  const cartLink = `https://www.amazon.es/gp/aws/cart/add.html?AssociateTag=healthprote04-21&tag=healthprote04-21${cartParams}`;

  return (
    <Container>
      {/* <Title>
        <span>{labels.summary_total}</span> $50.68
      </Title>
      <Details>0.54/day</Details>
      <Description>{labels.summary_description}</Description>
      <Shipping>{labels.summary_shipping}</Shipping> */}
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
