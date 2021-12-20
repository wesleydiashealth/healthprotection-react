import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

interface CheckoutButtonProps {
  isActive?: boolean;
}

const Container = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
`;

export const Title = styled.h4`
  font-size: 24px;
  line-height: 32px;

  text-align: center;

  span {
    font-weight: 600;
  }
`;

export const TitlePrice = styled.div``;

export const TitlePriceValue = styled.span``;

export const TitlePriceCurrency = styled.span`
  margin-left: 5px;
`;

export const Details = styled.span`
  margin-bottom: 20px;

  color: #1bc9bd;

  font-size: 14px;
  line-height: 22px;
`;

export const Description = styled.em`
  margin-bottom: 20px;

  font-weight: 600;

  font-size: 14px;
  line-height: 22px;
`;

export const Shipping = styled.p`
  margin-bottom: 20px;

  text-align: center;

  font-size: 14px;
  line-height: 22px;
`;

export const CheckoutButton = styled.a<CheckoutButtonProps>`
  margin-bottom: 10px;
  border: none;
  border-radius: 32px;
  padding: 16px 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;

  font-weight: 700;
  color: white;
  text-transform: uppercase;
  text-decoration: none;

  background: #ffae30;

  svg {
    margin-left: 10px;
  }

  ${props =>
    !props.isActive &&
    css`
      pointer-events: none;
      background: ${transparentize(0.4, '#ffae30')};
    `}
`;

export const CheckoutAmazon = styled.img`
  margin: 0 0 20px;

  max-width: 100%;
  width: 240px;
`;

export default Container;
