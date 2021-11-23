import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

import { ReactComponent as ChecklistSvg } from 'assets/check_list.svg';
import { ReactComponent as OutcomesSvg } from 'assets/jar.svg';
import { ReactComponent as NutraceuticalsSvg } from 'assets/pharmacy.svg';

interface ButtonProps {
  isDisabled?: boolean;
  background?: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;

  margin: 20px;
  border-radius: 20px;
  padding: 24px;

  width: 600px;

  text-align: center;

  background: ${transparentize(0.9, '#db71af')};

  color: #000;
`;

export const ChecklistIcon = styled(ChecklistSvg)``;

export const OutcomesIcon = styled(OutcomesSvg)``;

export const NutraceuticalsIcon = styled(NutraceuticalsSvg)``;

export const Title = styled.h3`
  margin: 20px 0;

  font-weight: 700;
  text-align: center;

  font-size: 14px;
  line-height: 22px;

  @media screen and (min-width: 768px) {
    font-size: 16px;
    line-height: 24px;
  }
`;

export const Description = styled.p`
  margin-bottom: 20px;

  &,
  p {
    font-size: 12px;
    line-height: 20px;
  }

  strong {
    font-weight: 600;
  }

  @media screen and (min-width: 768px) {
    &,
    p {
      font-size: 14px;
      line-height: 22px;
    }
  }
`;

export const Infos = styled.div`
  margin-bottom: 20px;

  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Info = styled.div`
  & ~ div {
    margin-left: 20px;
  }
`;

export const InfoTitle = styled.h4`
  text-transform: uppercase;
  font-weight: 600;

  font-size: 14px;
  line-height: 22px;
`;

export const InfoDescription = styled.span`
  font-weight: 600;

  font-size: 12px;
  line-height: 20px;
`;

export const Instruction = styled.p`
  &,
  p {
    font-size: 12px;
    line-height: 20px;
  }

  strong {
    font-weight: 600;
  }

  @media screen and (min-width: 768px) {
    &,
    p {
      font-size: 14px;
      line-height: 22px;
    }
  }
`;

export const Buttons = styled.div`
  margin-top: 20px;

  display: flex;
  align-items: center;

  @media screen and (min-width: 768px) {
    width: 100%;

    justify-content: space-between;
  }
`;

export const Button = styled.a<ButtonProps>`
  border: none;
  border-radius: 32px;
  padding: 12px;

  display: inline-block;
  box-sizing: border-box;

  text-decoration: none;
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  line-height: 1;
  background-color: #db71af;

  cursor: pointer;

  & ~ a {
    margin-left: 20px;
  }

  @media screen and (min-width: 768px) {
    padding: 16px 18px;
  }

  ${props =>
    props.background &&
    css`
      background-color: ${props.background};
    `}

  ${props =>
    props.isDisabled &&
    css`
      cursor: default;
      opacity: 0.4;
      pointer-events: none;
    `}

  @media screen and (min-width: 768px) {
    padding: 16px 24px;

    font-size: 18px;
  }
`;

export default Container;
