import React, { useCallback } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { FaMinus, FaPlus } from 'react-icons/fa';

import { useApp } from 'contexts/app';

import ProductData from 'dtos/ProductData';

import Container, {
  ImageContainer,
  Image,
  Content,
  ContentTitle,
  // ContentTitleLink,
  ContentDosage,
  ContentSuboutcomes,
  Info,
  InfoTags,
  InfoCategories,
  Quantity,
  QuantityValue,
  Rating,
  Reviews,
  Price,
  PriceValue,
  PriceCurrency,
  // Buy,
  // Replace,
  Remove,
} from './styles';

const Product: React.FC<ProductData> = ({
  name,
  asin,
  image,
  rating,
  nutraceutical,
  star_rating: starRating,
  reviews,
  price,
  dosageCapsule,
  capsules,
  quantity,
}) => {
  const context = useApp();
  const {
    nutraceuticals,
    suboutcomes,
    selectedProducts,
    updateSelectedProducts,
  } = context;

  const productPriceArray = price.split(' ');
  const productPriceValue = parseFloat(productPriceArray[0].replace(/,/g, '.'));
  const productPriceCurrency = productPriceArray[1];

  const productSuboutcomes = Array.from(
    new Set(
      suboutcomes.reduce((acc: string[], curr) => {
        const nutraceuticalSlug = nutraceuticals.find(item => {
          return item.title === nutraceutical;
        })?.slug;

        const currNutraceuticals = Object.values(curr.nutraceuticals).reduce(
          (subAcc, subCurr) => {
            return [...subAcc, ...subCurr];
          },
          [],
        );

        const hasNutraceutical =
          nutraceuticalSlug && currNutraceuticals.includes(nutraceuticalSlug);

        return hasNutraceutical ? [...acc, curr.title] : acc;
      }, []),
    ),
  );

  const handleQuantityButton = useCallback(
    (productAsin, value) => {
      const updatedSelectedProducts = [...selectedProducts];

      const selectedProductIndex = selectedProducts.findIndex(
        selectedProduct => selectedProduct.asin === productAsin,
      );

      const updatedSelectedProduct = {
        ...selectedProducts[selectedProductIndex],
      };

      if (!updatedSelectedProduct.quantity) {
        updatedSelectedProduct.quantity = 1;
      }

      updatedSelectedProduct.quantity += value;

      updatedSelectedProducts[selectedProductIndex] = updatedSelectedProduct;

      updateSelectedProducts(updatedSelectedProducts);
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

  const handleRemoveButton = useCallback(
    (productName: string) => {
      const updatedProducts = selectedProducts.filter(
        selectedProduct => selectedProduct.name !== productName,
      );
      updateSelectedProducts(updatedProducts);
    },
    [selectedProducts, updateSelectedProducts],
  );

  return (
    <Container>
      <ImageContainer>
        <Image src={image} alt={name} title={name} />
      </ImageContainer>
      <Content>
        <ContentTitle>{name}</ContentTitle>
        <ContentDosage>
          {`${dosageCapsule}mg (${capsules} capsules)`}
        </ContentDosage>
        {!!rating && starRating && (
          <Rating>
            <span>{rating}</span>
            {ReactHtmlParser(starRating)}
          </Rating>
        )}
        {reviews && <Reviews>{reviews}</Reviews>}
        <ContentSuboutcomes>
          {productSuboutcomes.map(productSuboutcome => (
            <span key={productSuboutcome}>{productSuboutcome}</span>
          ))}
        </ContentSuboutcomes>
      </Content>
      <Info>
        <InfoTags>
          <span>Bioperine</span>
          <span>Sensoril</span>
        </InfoTags>
        <InfoCategories>
          <span>Vegan</span>
        </InfoCategories>
      </Info>
      <Quantity>
        <FaMinus
          size={16}
          color="#565656"
          onClick={() => handleQuantityButton(asin, -1)}
        />
        <QuantityValue>{quantity || 1}</QuantityValue>
        <FaPlus
          size={16}
          color="#565656"
          onClick={() => handleQuantityButton(asin, 1)}
        />
      </Quantity>
      <Price>
        <PriceValue>
          {!Number.isNaN(productPriceValue)
            ? productPriceValue.toLocaleString('es-ES', {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })
            : price}
        </PriceValue>
        <PriceCurrency>
          {!Number.isNaN(productPriceValue) && productPriceCurrency}
        </PriceCurrency>
      </Price>
      {/* <Replace
        size={20}
        onClick={() => {
          handleReplaceButton(selectedProduct);
        }}
      /> */}
      <Remove
        size={20}
        onClick={() => {
          handleRemoveButton(name);
        }}
      />
    </Container>
  );
};

export default Product;
