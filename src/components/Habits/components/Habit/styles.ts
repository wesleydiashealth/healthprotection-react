import styled from 'styled-components';

const Container = styled.div`
  margin-bottom: 40px;

  display: flex;
  flex-flow: column;
  justify-content: center;

  @media screen and (min-width: 768px) {
    width: calc(50% - 20px);

    flex-flow: row nowrap;

    &:nth-child(odd) {
      margin-right: 40px;
    }
  }
`;

export const Intro = styled.div`
  text-align: center;

  img {
    max-width: 60px;
    height: auto;
  }

  @media screen and (min-width: 768px) {
    margin-right: 20px;

    img {
      max-width: 100px;
    }
  }
`;

export const Content = styled.div`
  text-align: center;

  flex: 1;

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
    text-align: left;

    .Dropdown-root {
      font-size: 12px;
      line-height: 20px;
    }
  }
`;

export const Title = styled.h4`
  margin-bottom: 10px;

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
`;

export const Question = styled.span`
  display: block;

  font-size: 14px;
  line-height: 22px;
`;

export const Dosages = styled.span`
  margin-bottom: 5px;

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

export const Nutraceutical = styled.div`
  margin: 5px 0;
  border-radius: 10px;
  padding: 5px 10px;

  background-color: #e5e5e5;

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
`;

export default Container;
