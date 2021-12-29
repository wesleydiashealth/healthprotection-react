import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import { BiRefresh } from 'react-icons/bi';

const Container = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;

  & ~ div {
    margin-top: 20px;
    border-top: 1px solid #e5e5e5;
    padding-top: 20px;
  }

  @media screen and (min-width: 768px) {
    flex-flow: row nowrap;
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 80px;
`;

export const Image = styled.img`
  width: auto;
  height: 80px;

  @media screen and (min-width: 768px) {
    margin-right: 20px;
  }
`;

export const Content = styled.div`
  text-align: center;
  flex: 1;

  @media screen and (min-width: 768px) {
    text-align: left;
  }
`;

export const ContentTitle = styled.h4`
  margin: 20px 0 0;

  @media screen and (min-width: 768px) {
    margin: 0;
  }
`;

export const ContentDosage = styled.span`
  font-size: 12px;
  line-height: 20px;
`;

export const ContentSuboutcomes = styled.div`
  margin-top: 10px;

  display: flex;
  flex-flow: row wrap;

  span {
    margin: 5px;
    border-radius: 20px;
    padding: 4px 12px;

    background: #f5f5f5;
    color: #565656;
    text-decoration: none;
    font-weight: 600;
    font-size: 12px;
    line-height: 22px;
  }
`;

export const Info = styled.div`
  margin: 10px 0 0;

  display: flex;
  align-items: center;
  text-align: center;
  flex: 1;

  span {
    border-radius: 20px;
    padding: 4px 12px;

    background: #f5f5f5;
    color: #565656;
    text-decoration: none;
    font-weight: 600;
    font-size: 12px;
    line-height: 22px;

    & ~ span {
      margin-left: 10px;
    }
  }

  @media screen and (min-width: 768px) {
    margin: 0 20px 0 0;

    display: flex;
  }
`;

export const InfoTags = styled.div``;

export const InfoCategories = styled.div`
  margin-left: 10px;
  border-left: 1px solid #c6c6c6;
  padding-left: 10px;

  display: flex;
`;

export const Quantity = styled.div`
  border: 1px solid #c6c6c6;
  border-radius: 24px;
  padding: 6px 12px;

  display: flex;
  align-items: center;

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

export const Price = styled.div`
  min-width: 80px;

  @media screen and (min-width: 768px) {
    margin-right: 20px;
  }
`;

export const PriceValue = styled.span`
  display: inline-flex;

  max-width: 80px;
`;

export const PriceCurrency = styled.span`
  margin-left: 5px;
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
  color: #ffae30;

  cursor: pointer;
`;

export default Container;
