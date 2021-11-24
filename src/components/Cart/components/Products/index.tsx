import React from 'react';
import { hotjar } from 'react-hotjar';
import TagManager from 'react-gtm-module';
// import { FaTimesCircle } from 'react-icons/fa';

import { useApp } from 'contexts/app';

import Container, {
  Product,
  ProductImage,
  ProductContent,
  ProductContentTitle,
  // ProductContentTitleLink,
  ProductContentDosage,
  ProductInfo,
  // ProductPrice,
  ProductBuy,
} from './styles';

const Products: React.FC = () => {
  const context = useApp();
  const { nutraceuticals, products } = context;

  return (
    <Container>
      {products.map(product => {
        const productNutraceutical = nutraceuticals.find(
          nutraceutical => nutraceutical.slug === product.nutraceutical,
        );

        return (
          <Product key={product.name}>
            {/* <ProductImage
              src={`${process.env.PUBLIC_URL}/svg/${currentProduct?.slug}.svg`}
              alt={currentProduct?.title}
              title={currentProduct?.title}
            /> */}
            <ProductImage
              src={product.image}
              alt={product.name}
              title={product.name}
            />
            <ProductContent>
              <ProductContentTitle>{product.name}</ProductContentTitle>
              <ProductContentDosage>
                {`${product.dosageCapsule}mg (${product.capsules} capsules)`}
              </ProductContentDosage>
            </ProductContent>
            <ProductInfo>
              <span>{`Why this ${productNutraceutical?.info.title}?`}</span>
              <p>{product.brand}</p>
            </ProductInfo>
            {productNutraceutical?.info.link && (
              <ProductInfo>
                <span>Read About</span>
                <a
                  href={productNutraceutical?.info.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {productNutraceutical?.info.title}
                </a>
              </ProductInfo>
            )}
            {/* <ProductPrice>
              {!!product.price && (
                <>
                  {`${new Intl.NumberFormat('es-ES', {
                    style: 'currency',
                    currency: 'EUR',
                  }).format(product.price)}`}
                </>
              )}
            </ProductPrice> */}
            <ProductBuy
              href={product.link}
              target="_blank"
              rel="norefereer noopener"
              className="buy-button"
              onClick={() => {
                hotjar.event('buy-button');
                TagManager.dataLayer({
                  dataLayer: {
                    event: '4.0 Click - Buy button',
                    nutraceutical: product.nutraceutical,
                    product: product.name,
                    price: product.price,
                  },
                });
                // TagManager.initialize({
                //   gtmId: 'GTM-PPMT6FP',
                //   events: {},
                //   dataLayer: {
                //     nutraceutical: product.nutraceutical,
                //     product: product.name,
                //     price: product.price,
                //   },
                // });
              }}
            >
              Buy from Amazon
            </ProductBuy>
          </Product>
        );
      })}
    </Container>
  );
};

export default Products;
