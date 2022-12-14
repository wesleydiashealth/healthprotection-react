import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

interface OutcomeProps {
  color?: string;
  connections?: number;
}

const Container = styled.div<OutcomeProps>`
  margin-top: 10px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  padding: 5px 10px;

  position: relative;

  display: flex;
  align-items: center;

  background-color: ${transparentize(0.5, '#565656')};

  max-width: 320px;
  min-height: 58px;

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
    padding: 10px 20px;
  }

  ${props =>
    props.color &&
    css`
      background-color: ${transparentize(0.5, props.color)};
    `}

  ${props =>
    props.connections &&
    css`
      min-height: ${`${58 * props.connections}px`};
    `}
`;

export const Anchors = styled.div`
  display: flex;
  flex-flow: column wrap;

  position: absolute;
  top: 0;
  right: 0;
`;

export const Anchor = styled.div`
  width: 10px;
  height: 58px;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;

  flex: 1;

  svg {
    margin-left: 5px;

    justify-self: flex-end;
    flex-shrink: 0;
  }
`;

export const ContentIcon = styled.img`
  margin-right: 10px;

  flex-shrink: 0;
`;

export const ContentTitle = styled.h3`
  display: flex;
  align-items: center;
  justify-content: space-between;

  flex: 1;

  color: #000;
  font-size: 12px;
  line-height: 20px;
`;

export default Container;
