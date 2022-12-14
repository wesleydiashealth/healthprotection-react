import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { FaTimes } from 'react-icons/fa';
import { BiRefresh } from 'react-icons/bi';

interface InfoSuboutcomesItemProps {
  color?: string;
}

interface InfoTagsListProps {
  hasSibling?: boolean;
}

const Container = styled.div`
  display: flex;
  flex-flow: column;

  flex: 1;

  & ~ div {
    margin-top: 20px;
    border-top: 1px solid #e5e5e5;
    padding-top: 20px;
  }

  @media screen and (min-width: 768px) {
    flex-flow: row nowrap;
    align-items: center;
  }
`;

export const ProductIntro = styled.div`
  display: flex;
  align-items: center;
`;

export const ImageContainer = styled.div`
  margin: 0 20px 0 0;

  display: flex;
  justify-content: center;

  overflow: hidden;

  @media screen and (min-width: 768px) {
    width: 80px;
  }
`;

export const Image = styled.img`
  width: auto;
  height: 80px;

  @media screen and (min-width: 768px) {
    height: 120px;
  }
`;

export const Content = styled.div`
  text-align: left;

  max-width: 200px;

  @media screen and (min-width: 768px) {
    margin: 0 20px;
  }
`;

export const ContentTitle = styled.h4`
  font-size: 14px;
  line-height: 22px;

  font-weight: 600;

  @media screen and (min-width: 768px) {
    margin: 0;

    font-size: 22px;
    line-height: 32px;
  }
`;

export const ContentBrand = styled.h5``;

export const ContentDosage = styled.span`
  font-size: 12px;
  line-height: 20px;
`;

export const Info = styled.div`
  margin: 10px 0 0;

  position: relative;
  max-width: 100%;

  display: flex;
  flex-flow: row nowrap;
  align-items: initial;
  text-align: center;

  flex: 1;

  p {
    margin-bottom: 10px;

    font-size: 10px;
    font-weight: 600;
    color: #565656;
  }

  span {
    margin: 0 5px 10px;
    margin-bottom: 10px;
    border-radius: 20px;
    padding: 2px 10px;

    background: #f5f5f5;
    color: #565656;
    text-decoration: none;
    font-weight: 600;
    font-size: 11px;
    line-height: 1.2;
  }

  > div {
    width: 33.33%;

    & ~ div {
      margin-left: 20px;
    }
  }

  @media screen and (min-width: 768px) {
    margin: 0 20px 0 0;

    flex-flow: column wrap;

    p {
      margin-bottom: 20px;

      font-size: 14px;
    }

    > div {
      width: initial;
    }
  }

  @media screen and (min-width: 1600px) {
    flex-flow: row nowrap;

    div {
      margin: 0 10px;

      flex-basis: 33.33%;

      & ~ div {
        border-left: 2px solid #ffae30;
      }
    }
  }
`;

export const InfoSuboutcomesLabel = styled.p``;

export const InfoTags = styled.div``;

export const InfoTagsLabel = styled.p``;

export const InfoTagsList = styled.div<InfoTagsListProps>`
  display: flex;
  justify-content: center;

  ${props =>
    props.hasSibling &&
    css`
      & ~ div {
        margin-right: 10px;
        border-right: 1px solid #c6c6c6;
        padding-right: 10px;
      }
    `}
`;

export const InfoCategories = styled.div``;

export const InfoCategoriesLabel = styled.p``;

export const InfoCategoriesList = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;

export const InfoSuboutcomes = styled.div`
  @media screen and (min-width: 768px) {
    margin-top: 10px;
  }
`;

export const InfoSuboutcomesList = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;

  span {
    font-size: 8px;
  }

  @media screen and (min-width: 768px) {
    span {
      font-size: 14px;
    }
  }
`;

export const InfoSuboutcomesItem = styled.span<InfoSuboutcomesItemProps>`
  background-color: transparent !important;

  max-width: 100%;

  ${props =>
    props.color &&
    css`
      border-width: 3px;
      border-style: solid;
      border-color: ${transparentize(0.5, props.color)};
    `}
`;

export const Rating = styled.div`
  margin-top: 5px;

  display: flex;
  align-items: center;

  > span {
    margin-right: 5px;
  }

  a {
    position: relative;
    display: inline-block;
    background-image: url('/svg/stars_v1.svg');
    height: 16px;
    width: 80px;
    background-size: 16px 16px;

    span {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;

      display: block;
      background-image: url('/svg/stars_v1-active.svg');
      height: 16px;
      width: 80px;
      background-size: 16px 16px;
    }
  }
`;

export const Reviews = styled.span`
  font-size: 12px;
  line-height: 1;
`;

export const ProductActions = styled.div`
  display: flex;
  align-self: center;
  align-items: center;
`;

export const PriceGroup = styled.div`
  display: flex;

  align-items: center;
  text-align: center;

  @media screen and (min-width: 768px) {
    flex-flow: column wrap;
  }
`;

export const Price = styled.div`
  margin-right: 20px;

  min-width: 80px;

  span {
    font-size: 12px;
    line-height: 20px;
  }
`;

export const PriceValue = styled.div`
  display: inline-flex;

  max-width: 80px;

  font-size: 22px;
  line-height: 32px;
`;

export const PriceCurrency = styled.span`
  margin-left: 5px;
`;

export const Quantity = styled.div`
  border: 1px solid #c6c6c6;
  border-radius: 24px;
  padding: 6px 12px;

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    cursor: pointer;

    &:hover {
      fill: #ffae30;
    }
  }

  @media screen and (min-width: 768px) {
    margin-right: 20px;
  }
`;

export const QuantityValue = styled.span`
  margin: 0 14px;
`;

// export const Buy = styled.a`
//   margin: 20px 0 0;
//   border: none;
//   border-radius: 32px;
//   padding: 8px 16px;

//   cursor: pointer;

//   font-weight: 700;
//   font-size: 14px;
//   color: white;
//   text-transform: uppercase;
//   text-decoration: none;

//   background: #ffae30;

//   &:hover {
//     opacity: 0.7;
//   }

//   @media screen and (min-width: 768px) {
//     margin: 0 0 0 20px;

//     font-size: 16px;
//   }
// `;

export const Replace = styled(BiRefresh)`
  color: #ffae30;

  cursor: pointer;

  @media screen and (min-width: 768px) {
    margin-right: 10px;
  }
`;

export const Remove = styled(FaTimes)`
  margin-left: 10px;
  color: #ffae30;

  cursor: pointer;
`;

export default Container;
