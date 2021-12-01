import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';

const Container = styled.div``;

export const Product = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;

  & ~ div {
    margin-top: 40px;
  }

  @media screen and (min-width: 768px) {
    flex-flow: row nowrap;
  }
`;

export const ProductImage = styled.img`
  width: 64px;
  height: auto;

  @media screen and (min-width: 768px) {
    margin-right: 20px;
  }
`;

export const ProductContent = styled.div`
  text-align: center;
  flex: 1;

  @media screen and (min-width: 768px) {
    text-align: left;
  }
`;

export const ProductContentTitle = styled.h4`
  margin: 20px 0 0;

  @media screen and (min-width: 768px) {
    margin: 0;
  }
`;

export const ProductContentTitleLink = styled.a`
  color: #1bc9bd;
`;

export const ProductContentDosage = styled.span`
  font-size: 12px;
  line-height: 20px;
`;

export const ProductInfo = styled.div`
  margin: 10px 0 0;

  display: flex;
  flex-flow: column;
  align-items: center;
  text-align: center;
  flex: 1;

  span {
    margin-bottom: 10px;

    color: #565656;

    font-size: 14px;
    line-height: 1;
  }

  a,
  p {
    border-radius: 12px;
    padding: 8px 14px;

    background: #f5f5f5;
    color: #565656;
    text-decoration: none;
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
  }

  @media screen and (min-width: 768px) {
    margin: 0;
  }
`;

export const ProductPrice = styled.span`
  min-width: 60px;
`;

export const ProductBuy = styled.a`
  margin: 20px 0 0;
  border: none;
  border-radius: 32px;
  padding: 8px 16px;

  cursor: pointer;

  font-weight: 700;
  font-size: 14px;
  color: white;
  text-transform: uppercase;
  text-decoration: none;

  background: #ffae30;

  &:hover {
    opacity: 0.7;
  }

  @media screen and (min-width: 768px) {
    margin: 0 0 0 20px;

    font-size: 16px;
  }
`;

export const ProductRemove = styled(FaTimes)`
  color: #ffae30;

  cursor: pointer;
`;

export default Container;
