import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
// import { fadeIn } from 'react-animations';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';

interface OutcomeProps {
  connections?: number;
}

interface ContentProps {
  isActive?: boolean;
  color?: string;
}

const Container = styled(Accordion)<OutcomeProps>`
  border-radius: 20px !important;
  padding: 0 !important;

  position: relative;

  & ~ div {
    margin-top: 20px;
  }

  &:before {
    display: none;
  }

  @media screen and (min-width: 768px) {
    padding: 10px 20px;
  }
`;

export const Anchors = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;

  position: absolute;

  top: calc(50% - 14px);
  right: 0px;

  &,
  & > div {
    height: 28px;
  }
`;

export const Anchor = styled.div`
  position: absolute;
`;

export const Content = styled(AccordionSummary)<ContentProps>`
  border-top-left-radius: 20px !important;
  border-top-right-radius: 20px !important;
  padding: 10px !important;

  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  background-color: ${transparentize(0.5, '#565656')} !important;

  position: relative;
  z-index: 10;

  max-width: 320px;
  min-height: none;

  font-weight: 600;

  min-height: 0 !important;

  > div {
    margin: 0 !important;
    padding: 0 !important;
  }

  img {
    margin-right: 10px;

    width: 16px;
    height: auto;

    flex-shrink: 0;
  }

  @media screen and (min-width: 768px) {
    padding: 10px 20px;

    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;

    > img {
      width: 48px;
    }
  }

  ${props =>
    props.color &&
    css`
      background-color: ${transparentize(0.5, props.color)} !important;
    `}

  ${props =>
    !props.isActive &&
    css`
      border-bottom-left-radius: 20px !important;
      border-bottom-right-radius: 20px !important;
    `}
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
  font-size: 10px;
  line-height: 18px;

  svg {
    margin-left: 5px;

    color: #fff;
    fill: #fff;

    flex-shrink: 0;
  }

  @media screen and (min-width: 768px) {
    font-size: 16px;
    line-height: 24px;
  }
`;

export default Container;
