import React, { useCallback } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import ReactHtmlParser from 'react-html-parser';
// import { hotjar } from 'react-hotjar';

import { useApp } from 'contexts/app';

// import ProductData from 'dtos/ProductData';

import Container, {
  Product,
  ProductImageContainer,
  ProductImage,
  ProductContent,
  ProductContentTitle,
  // ProductContentTitleLink,
  ProductContentDosage,
  ProductInfo,
  ProductQuantity,
  ProductRating,
  ProductReviews,
  ProductPrice,
  ProductPriceValue,
  ProductPriceCurrency,
  // ProductBuy,
  // ProductReplace,
  ProductRemove,
} from './styles';

const Products: React.FC = () => {
  const context = useApp();
  const { nutraceuticals, selectedProducts, updateSelectedProducts } = context;

  const handleQuantityButton = useCallback(
    (productAsin, value) => {
      const updatedSelectedProducts = [...selectedProducts];

      const selectedProductIndex = selectedProducts.findIndex(
        selectedProduct => selectedProduct.asin === productAsin,
      );

      const updatedSelectedProduct = {
        ...selectedProducts[selectedProductIndex],
      };

      if (!updatedSelectedProduct?.quantity) {
        updatedSelectedProduct.quantity = 1;
      }

      updatedSelectedProduct.quantity += value;

      updatedSelectedProducts[selectedProductIndex] = updatedSelectedProduct;

      updateSelectedProducts(updatedSelectedProducts);
    },
    [selectedProducts, updateSelectedProducts],
  );

  const handleRemoveButton = useCallback(
    (productAsin: string) => {
      const updatedProducts = selectedProducts.filter(
        selectedProduct => selectedProduct.asin !== productAsin,
      );
      updateSelectedProducts(updatedProducts);
    },
    [selectedProducts, updateSelectedProducts],
  );

  // const handleReplaceButton = useCallback(
  //   (selectedProduct: ProductData) => {
  //     const updatedSelectedProducts = [...selectedProducts];

  //     const selectedProductIndex = selectedProducts.findIndex(
  //       product => product.asin === selectedProduct.asin,
  //     );

  //     const replaceProducts = products.filter(
  //       product =>
  //         product.nutraceutical === selectedProduct.nutraceutical &&
  //         product.asin !== selectedProduct.asin,
  //     );

  //     if (replaceProducts.length) {
  //       updatedSelectedProducts[selectedProductIndex] =
  //         replaceProducts[Math.floor(Math.random() * replaceProducts.length)];

  //       updateSelectedProducts(updatedSelectedProducts);
  //     }
  //   },
  //   [products, selectedProducts, updateSelectedProducts],
  // );

  return (
    <Container>
      {selectedProducts.map(selectedProduct => {
        const productNutraceutical = nutraceuticals.find(
          nutraceutical =>
            nutraceutical.info.title === selectedProduct.nutraceutical,
        );

        const productPriceArray = selectedProduct.price.split(' ');
        const productPriceValue = parseFloat(
          productPriceArray[0].replace(/,/g, '.'),
        );
        const productPriceCurrency = productPriceArray[1];

        return (
          <Product key={selectedProduct.asin}>
            {/* <ProductImage
              src={`${process.env.PUBLIC_URL}/svg/${currentProduct?.slug}.svg`}
              alt={currentProduct?.title}
              title={currentProduct?.title}
            /> */}
            <ProductImageContainer>
              <ProductImage
                src={selectedProduct.image}
                alt={selectedProduct.nutraceutical}
                title={selectedProduct.nutraceutical}
              />
            </ProductImageContainer>
            <ProductContent>
              <ProductContentTitle>
                {selectedProduct.nutraceutical}
              </ProductContentTitle>
              <ProductContentDosage>
                {`${selectedProduct.capsuleDosage}${selectedProduct.capsuleDosageUnit} (${selectedProduct.capsules} capsules)`}
              </ProductContentDosage>
              {!!selectedProduct.rating && !!selectedProduct.starRating && (
                <ProductRating>
                  <span>{selectedProduct.rating}</span>
                  {ReactHtmlParser(selectedProduct.starRating)}
                </ProductRating>
              )}
              {!!selectedProduct.reviews && (
                <ProductReviews>{selectedProduct.reviews}</ProductReviews>
              )}
            </ProductContent>
            <ProductInfo>
              <span>{`Why this ${selectedProduct.nutraceutical}?`}</span>
              <p>{selectedProduct.brand}</p>
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
            <ProductQuantity>
              <FaMinus
                size={16}
                color="#565656"
                onClick={() => handleQuantityButton(selectedProduct.asin, -1)}
              />
              <span>{selectedProduct.quantity || 1}</span>
              <FaPlus
                size={16}
                color="#565656"
                onClick={() => handleQuantityButton(selectedProduct.asin, 1)}
              />
            </ProductQuantity>
            <ProductPrice>
              <ProductPriceValue>
                {!Number.isNaN(productPriceValue)
                  ? productPriceValue.toLocaleString('es-ES', {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    })
                  : selectedProduct.price}
              </ProductPriceValue>
              <ProductPriceCurrency>
                {!Number.isNaN(productPriceValue) && productPriceCurrency}
              </ProductPriceCurrency>
            </ProductPrice>
            {/* <ProductReplace
              size={20}
              onClick={() => {
                handleReplaceButton(selectedProduct);
              }}
            /> */}
            <ProductRemove
              size={20}
              onClick={() => {
                handleRemoveButton(selectedProduct.asin);
              }}
            />

            {/* <ProductBuy
              href={product.link}
              target="_blank"
              rel="norefereer noopener"
              className="buy-button"
              data-nutraceutical={product.nutraceutical}
              data-product={product.name}
              data-price={product.price.toFixed(2).toString().replace('.', ',')}
              onClick={() => {
                hotjar.event('buy-button');
              }}
            >
              Buy from Amazon
            </ProductBuy> */}
          </Product>
        );
      })}
    </Container>
  );
};

export default Products;
