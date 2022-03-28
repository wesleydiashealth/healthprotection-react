import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { IoMdCloseCircle } from 'react-icons/io';
import Popup from 'reactjs-popup';

interface ContainerProps {
  connections?: number;
}

interface ContainerPopupProps {
  offsetTop?: number;
}

export const ContainerPopup = styled(Popup)<ContainerPopupProps>`
  &-content {
    margin: auto !important;
  }

  ${props =>
    props.offsetTop &&
    css`
      &-content {
        margin-top: ${`${props.offsetTop}px`};
      }
    `}
`;

const Container = styled.div<ContainerProps>`
  border-radius: 20px;

  position: relative;

  cursor: pointer;

  display: flex;
  flex-flow: column wrap;
  align-items: inherit;
  justify-content: space-between;

  box-sizing: border-box;

  max-width: 300px;

  background-color: ${transparentize(0.95, '#000')};

  :hover {
    background-color: ${transparentize(0.8, '#000')};
  }

  & ~ div {
    margin-top: 20px;
  }

  @media screen and (min-width: 768px) {
    flex-flow: row nowrap;
  }

  ${props =>
    props.connections &&
    css`
      min-height: ${`${58 * props.connections}px`};
    `}
`;

export const ContainerCloseButton = styled(IoMdCloseCircle)`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 9999;

  color: #62a8ea;

  cursor: pointer;
`;

export const Anchors = styled.div`
  display: flex;
  flex-flow: column wrap;

  position: absolute;
  top: 0;
  left: 0;
`;

export const Anchor = styled.div`
  width: 10px;
  height: 58px;
`;

export const ContentContainer = styled.div`
  display: flex;
  align-items: inherit;

  flex: 1;

  svg {
    margin-right: 5px;
  }
`;

export const Content = styled.div`
  padding: 10px;

  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  position: relative;

  svg {
    margin-right: 10px;

    width: 24px;
    height: auto;
  }
`;

export const ContentGroup = styled.div``;

export const ContentTitle = styled.h4`
  padding-right: 20px;
  position: relative;

  display: flex;
  align-items: center;

  flex: 1;

  font-weight: 600;
  font-size: 10px;
  line-height: 18px;

  @media screen and (min-width: 768px) {
    font-size: 13px;
    line-height: 20px;
  }
`;

export const ContentDescription = styled.span`
  color: #62a8ea;
  text-align: right;
  font-size: 10px;
  line-height: 18px;
`;

export default Container;
