import styled, { css } from 'styled-components';

interface NutraceuticalProps {
  isReduced?: boolean;
  isRemoved?: boolean;
}

const Container = styled.div`
  margin-bottom: 20px;

  display: flex;
  flex-flow: column wrap;
  justify-content: center;

  .Dropdown-root {
    width: 360px;
    max-width: 100%;

    text-align: left;
    font-size: 12px;
    line-height: 18px;

    .Dropdown-control {
      border-radius: 12px;
      padding: 8px 52px 8px 20px;

      min-height: 44px;

      display: flex;
      align-items: center;
    }

    .Dropdown-menu {
      border-radius: 12px;
    }

    .Dropdown-arrow {
      top: 19px;
    }
  }

  @media screen and (min-width: 768px) {
    margin-bottom: 80px;

    width: calc(50% - 20px);

    &:nth-child(odd) {
      margin-right: 40px;
    }

    .Dropdown-root {
      margin-top: 10px;

      width: 100%;

      font-size: 12px;
      line-height: 20px;
    }
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: flex-start;

  @media screen and (min-width: 768px) {
    align-items: center;

    text-align: left;
  }
`;

export const Image = styled.img`
  margin-right: 10px;

  max-width: 48px;
  height: auto;

  @media screen and (min-width: 768px) {
    margin-right: 20px;

    max-width: 100px;
  }
`;

export const Column = styled.div``;

export const Title = styled.h4`
  font-size: 16px;
  line-height: 24px;

  svg {
    margin-left: 5px;
  }

  .__react_component_tooltip {
    border-radius: 20px;
    padding: 20px;

    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.11);
  }

  @media screen and (min-width: 768px) {
    margin-bottom: 5px;
  }
`;

export const Question = styled.span`
  display: block;

  font-size: 12px;
  line-height: 20px;

  @media screen and (min-width: 768px) {
    font-size: 14px;
    line-height: 22px;
  }
`;

export const Dosages = styled.span`
  margin: 5px 0;

  display: block;

  font-size: 12px;
  line-height: 18px;

  @media screen and (min-width: 768px) {
    font-size: 14px;
    line-height: 20px;
  }
`;

export const Nutraceuticals = styled.div`
  margin: 10px 0;

  display: flex;
  flex-flow: row wrap;
  align-items: center;
`;

export const NutraceuticalsLabel = styled.span`
  margin-right: 10px;

  font-size: 12px;
  line-height: 18px;

  @media screen and (min-width: 768px) {
    font-size: 14px;
    line-height: 20px;
  }
`;

export const Nutraceutical = styled.div<NutraceuticalProps>`
  margin: 5px 0;
  border-radius: 10px;
  padding: 5px 10px;

  border: 3px solid #e5e5e5;
  border-radius: 20px;

  display: inline-block;

  font-weight: 600;
  font-size: 11px;
  line-height: 18px;

  & ~ div {
    margin-left: 10px;
  }

  @media screen and (min-width: 768px) {
    font-size: 14px;
    line-height: 20px;
  }

  ${props =>
    props.isReduced &&
    css`
      border-color: orange;
      color: orange;
    `}

  ${props =>
    props.isRemoved &&
    css`
      border-color: red;
      color: red;
      text-decoration: line-through;
    `}
`;

export default Container;
