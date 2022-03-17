import React, { useCallback } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { FaMinus, FaPlus } from 'react-icons/fa';
import TagManager from 'react-gtm-module';

import { useApp } from 'contexts/app';

import ProductData from 'dtos/ProductData';

import Container, {
  ImageContainer,
  Image,
  Content,
  ProductIntro,
  ContentTitle,
  ContentBrand,
  // ContentTitleLink,
  ContentDosage,
  InfoSuboutcomes,
  InfoSuboutcomesLabel,
  InfoSuboutcomesList,
  InfoSuboutcomesItem,
  Info,
  InfoTags,
  InfoTagsLabel,
  InfoTagsList,
  InfoCategories,
  InfoCategoriesLabel,
  InfoCategoriesList,
  Quantity,
  QuantityValue,
  Rating,
  Reviews,
  ProductActions,
  PriceGroup,
  Price,
  PriceValue,
  PriceCurrency,
  // Buy,
  // Replace,
  Remove,
} from './styles';

const Product: React.FC<ProductData> = ({
  asin,
  brand,
  capsules,
  interactions,
  diets,
  allergies,
  additives,
  proprietaries,
  price,
  image,
  rating,
  starRating,
  reviews,
  dietarySupplement,
  quantity,
}) => {
  const context = useApp();
  const {
    connections,
    nutraceuticals,
    outcomes,
    suboutcomes,
    selectedProducts,
    updateSelectedProducts,
  } = context;

  const productDietarySupplement = nutraceuticals.find(
    nutraceutical => nutraceutical.slug === dietarySupplement,
  );

  const activeSuboutcomes = Object.values(connections)
    .reduce((acc: string[], connection) => {
      const aaa = Object.entries(connection).reduce(
        (subAcc: string[], { 0: subConnection, 1: values }) =>
          values.length ? [...subAcc, subConnection] : subAcc,
        [],
      );

      return [...acc, ...aaa];
    }, [])
    .map(
      connection =>
        suboutcomes.find(suboutcome => suboutcome.id === connection)?.title,
    );

  const productPriceArray = price.split(' ');
  const productPriceValue = parseFloat(productPriceArray[0].replace(/,/g, '.'));
  const productPriceCurrency = productPriceArray[1];

  const productSuboutcomes = Array.from(
    new Set(
      suboutcomes.reduce((acc: string[], curr) => {
        const nutraceuticalSlug = nutraceuticals.find(item => {
          return item.title === productDietarySupplement?.title;
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
  ).filter(suboutcome => activeSuboutcomes.includes(suboutcome));

  const productTags = [...additives, ...proprietaries];

  const productCategories = [...diets, ...allergies];

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
    (productAsin: string) => {
      const updatedProducts = selectedProducts.filter(
        selectedProduct => selectedProduct.asin !== productAsin,
      );
      updateSelectedProducts(updatedProducts);
    },
    [selectedProducts, updateSelectedProducts],
  );

  return (
    <Container>
      <ProductIntro>
        {image && (
          <ImageContainer>
            {image && <Image src={image} alt={asin} title={asin} />}
          </ImageContainer>
        )}
        <Content>
          <ContentTitle>{productDietarySupplement?.title}</ContentTitle>
          <ContentBrand>{brand}</ContentBrand>
          {!!interactions.length &&
            interactions.map(interaction => (
              <ContentDosage
                key={interaction.dietarySupplementSlug}
              >{`${interaction.capsuleDosage} ${interaction.capsuleDosageUnit} (${capsules} capsules)`}</ContentDosage>
            ))}
          {!!rating && starRating && (
            <Rating
              onClick={() => {
                TagManager.dataLayer({
                  dataLayer: {
                    event: 'starRatingClicked',
                    supplement: productDietarySupplement?.title,
                    asin,
                  },
                });
              }}
            >
              <span>{rating}</span>
              {ReactHtmlParser(starRating)}
            </Rating>
          )}
          {reviews && <Reviews>{reviews}</Reviews>}
        </Content>
      </ProductIntro>
      <Info>
        <InfoCategories>
          <InfoCategoriesLabel>Characteristics:</InfoCategoriesLabel>
          <InfoCategoriesList>
            {productCategories.map(productCategory => (
              <span>{productCategory}</span>
            ))}
          </InfoCategoriesList>
        </InfoCategories>
        <InfoTags>
          <InfoTagsLabel>Boosters:</InfoTagsLabel>
          <InfoTagsList
            hasSibling={!!productTags.length && !!productCategories.length}
          >
            {productTags.map(productTag => (
              <span>{productTag}</span>
            ))}
          </InfoTagsList>
        </InfoTags>
        <InfoSuboutcomes>
          <InfoSuboutcomesLabel>Address:</InfoSuboutcomesLabel>
          <InfoSuboutcomesList>
            {productSuboutcomes.map(productSuboutcome => {
              const selectedSuboutcome = suboutcomes.find(
                suboutcome => suboutcome.title === productSuboutcome,
              );

              const selectedOutcome =
                selectedSuboutcome &&
                outcomes.find(outcome =>
                  outcome.suboutcomes.includes(selectedSuboutcome.id),
                );

              return (
                <InfoSuboutcomesItem
                  key={productSuboutcome}
                  color={selectedOutcome?.color}
                >
                  {productSuboutcome}
                </InfoSuboutcomesItem>
              );
            })}
          </InfoSuboutcomesList>
        </InfoSuboutcomes>
      </Info>
      <ProductActions>
        <PriceGroup>
          <Price>
            {!Number.isNaN(productPriceValue) ? (
              <>
                <PriceValue>
                  {productPriceValue.toLocaleString('es-ES', {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  })}
                </PriceValue>
                <PriceCurrency>{productPriceCurrency}</PriceCurrency>
              </>
            ) : (
              <span>{price || 'Price not available'}</span>
            )}
          </Price>
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
        </PriceGroup>
        {/* <Replace
          size={20}
          onClick={() => {
            handleReplaceButton(selectedProduct);
          }}
        /> */}
        <Remove
          size={20}
          onClick={() => {
            handleRemoveButton(asin);
          }}
        />
      </ProductActions>
    </Container>
  );
};

export default Product;
