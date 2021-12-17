import styled, { css } from 'styled-components';
import { Scrollbar } from 'react-scrollbars-custom';
import { IoMdCloseCircle } from 'react-icons/io';

import { ReactComponent as Strength1Icon } from 'assets/strength_1.svg';
import { ReactComponent as Strength2Icon } from 'assets/strength_2.svg';
import { ReactComponent as Strength3Icon } from 'assets/strength_3.svg';

interface EffectsMeterProps {
  width: number;
}

interface StrengthIconProps {
  isActive: boolean;
}

const Container = styled.div`
  border-radius: 10px;
  padding: 20px;

  position: absolute;
  top: 0;
  right: 240px;
  z-index: 9999;

  background: #fff;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3);

  width: 1000px;
  max-width: calc(100vw - 320px);
`;

export const ContainerCloseButton = styled(IoMdCloseCircle)`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 9999;

  color: #62a8ea;

  cursor: pointer;
`;

export const ContainerTitle = styled.h3`
  margin-bottom: 20px;

  a {
    color: #62a8ea;
    font-weight: 600;

    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ContainerDescription = styled.div`
  margin-bottom: 10px;

  text-align: justify;
  font-size: 14px;
  line-height: 22px;
`;

export const ContainerLink = styled.a`
  display: block;

  color: #62a8ea;
  text-align: right;
  text-decoration: none;
  font-size: 14px;
  line-height: 22px;

  &:not(:last-child) {
    margin-bottom: 20px;
  }

  &:hover {
    text-decoration: underline;
  }
`;

export const ContainerList = styled(Scrollbar)``;

export const ContainerListItem = styled.div`
  padding-right: 20px;

  & ~ div {
    margin-top: 40px;
  }
`;

export const ContainerListItemTitle = styled.h4`
  font-size: 18px;
  line-height: 22px;

  a {
    color: #62a8ea;
    font-weight: 600;

    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ContainerListItemDetails = styled.h5`
  margin: 10px 0 30px;
  border-radius: 10px;
  padding: 6px 18px;

  color: #62a8ea;
  font-weight: 600;

  background: #f3f3f3;
`;

export const ContainerListItemDescription = styled.p`
  margin-bottom: 20px;

  text-align: justify;
  font-size: 14px;
  line-height: 22px;
`;

export const ContainerListItemLink = styled.a`
  display: block;
  text-align: right;

  color: #62a8ea;
  text-decoration: none;
  font-size: 14px;
  line-height: 22px;

  &:hover {
    text-decoration: underline;
  }
`;

export const ContainerListIcons = styled.div`
  margin-bottom: 20px;

  display: flex;
`;

export const ContainerListIcon = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;

  & ~ div {
    margin-left: 20px;
  }
`;

export const ContainerListIconTitle = styled.strong`
  margin-bottom: 10px;

  display: block;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 14px;
  line-height: 14px;
`;

export const ContainerListIconContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  flex: 1;
`;

export const EffectsMeter = styled.div<EffectsMeterProps>`
  border-radius: 16px;

  max-width: 140px;
  width: 100%;
  height: 8px;

  background: #c4c4c4;

  overflow: hidden;

  div {
    background: #f89c1c;
    height: 8px;

    ${props =>
      props.width &&
      css`
        width: ${`${100 - 100 / props.width}%`};
      `}
  }
`;

export const NeutralIcon = styled(Strength1Icon)<StrengthIconProps>`
  width: 24px;

  fill: #c4c4c4;

  & ~ svg {
    margin-left: 5px;
  }

  ${props =>
    props.isActive &&
    css`
      fill: #1bc9bd;
    `}
`;

export const HappyIcon = styled(Strength2Icon)<StrengthIconProps>`
  width: 24px;

  fill: #c4c4c4;

  & ~ svg {
    margin-left: 5px;
  }

  ${props =>
    props.isActive &&
    css`
      fill: #1bc9bd;
    `}
`;

export const HappierIcon = styled(Strength3Icon)<StrengthIconProps>`
  width: 24px;

  fill: #c4c4c4;

  & ~ svg {
    margin-left: 5px;
  }

  ${props =>
    props.isActive &&
    css`
      fill: #1bc9bd;
    `}
`;

export default Container;
