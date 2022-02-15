import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

interface ContainerProps {
  connections?: number;
  isActive?: boolean;
  color?: string;
}

interface FineTuneProps {
  isActive?: boolean;
  isEmpty?: boolean;
  color?: string;
}

export const Container = styled.div<ContainerProps>`
  padding: 5px 20px;

  position: relative;

  height: 58px;

  display: flex;
  flex-flow: column wrap;
  align-items: flex-start;
  justify-content: flex-start;

  background: #f2f2f2;

  & ~ div {
    margin-top: 20px;
  }

  .__react_component_tooltip {
    border-radius: 20px;
    padding: 20px;

    width: 460px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.11);

    text-align: justify;

    strong {
      margin-bottom: 5px;

      display: block;

      color: #7664c8;

      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
    }

    span {
      display: block;

      font-weight: normal;
      font-size: 14px;
      line-height: 22px;
    }
  }

  @media screen and (min-width: 768px) {
    flex-flow: row nowrap;
    align-items: center;
  }

  ${props =>
    props.connections &&
    css`
      min-height: ${`${58 * props.connections}px`};
    `}

  ${props =>
    props.isActive &&
    props.color &&
    css`
      background-color: ${transparentize(0.8, props.color)};
    `}
`;

export const Anchors = styled.div`
  display: flex;
  flex-flow: column wrap;

  position: absolute;
  top: 0;

  &.entry-anchors {
    left: 0;
  }

  &.exit-anchors {
    right: 0;
  }
`;

export const Anchor = styled.div`
  width: 10px;
  height: 58px;
`;

export const Content = styled.div`
  margin: 0 0 10px;

  display: flex;
  flex-flow: row nowrap;

  box-sizing: border-box;

  svg {
    margin-right: 5px;
    flex-shrink: 0;
  }

  @media screen and (min-width: 768px) {
    margin: 0 20px 0 0;

    width: 155px;
  }
`;

export const ContentTitle = styled.h3`
  display: block;

  font-weight: 500;
  font-size: 10px;
  line-height: 18px;

  @media screen and (min-width: 768px) {
    padding-right: 5px;

    display: block;

    font-size: 13px;
    line-height: 20px;
  }
`;

export const FineTuneGroup = styled.div`
  border-radius: 20px;
  padding: 2px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #fff;
`;

export const FineTune = styled.a<FineTuneProps>`
  cursor: pointer;

  font-size: 14px;
  line-height: 14px;

  border-radius: 20px;
  padding: 5px;

  display: inline-block;

  text-decoration: none;
  text-transform: capitalize;
  font-size: 10px;

  & ~ a {
    margin-left: 5px;
  }

  @media screen and (min-width: 768px) {
    padding: 5px 10px;

    font-size: 14px;
  }

  ${props => css`
    color: ${props.color};
  `}

  ${props =>
    props.isActive &&
    css`
      color: #fff;
      background: ${props.color};
    `}

    ${props =>
    props.isEmpty &&
    css`
      cursor: default;
      color: #e5e5e5;
      background: #fff;
    `}
`;

export default Container;
