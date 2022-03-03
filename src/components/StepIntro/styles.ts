import styled, { css } from 'styled-components';
import ReactToolTip from 'react-tooltip';
import { HiQuestionMarkCircle, HiLockClosed } from 'react-icons/hi';

interface ContainerProps {
  isActive?: boolean;
}

interface SubtitleProps {
  color?: string;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-flow: column wrap;
  align-items: center;

  color: #565656;

  ${props =>
    !props.isActive &&
    css`
      color: '#565656';
    `}
`;

export const LockedIcon = styled(HiLockClosed)`
  margin-right: 5px;

  color: #565656;
`;

export const Title = styled.h2`
  margin: 10px 0;

  display: flex;

  font-weight: 600;
  font-size: 24px;
  line-height: 32px;

  @media screen and (min-width: 768px) {
    font-weight: 700;
    font-size: 32px;
    line-height: 40px;
  }
`;

export const TooltipIcon = styled(HiQuestionMarkCircle)`
  margin-left: 5px;
`;

export const Tooltip = styled(ReactToolTip)`
  width: 300px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.11);
  border-radius: 20px;

  text-align: justify;

  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
`;

export const BlockedMessage = styled.span`
  margin-bottom: 10px;
  border-radius: 20px;
  padding: 6px 18px;

  background: #565656;
  color: #fff;

  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
`;

export const Subtitle = styled.h3<SubtitleProps>`
  margin-bottom: 20px;

  font-size: 16px;
  line-height: 24px;

  span {
    font-weight: 600;
  }

  @media screen and (min-width: 768px) {
    margin-bottom: 40px;

    font-size: 28px;
    line-height: 36px;
  }

  ${props =>
    props.color &&
    css`
      span {
        color: ${props.color};
      }
    `}
`;

export default Container;
