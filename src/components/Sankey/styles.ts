import styled, { css, keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';
import ReactToolTip from 'react-tooltip';

interface ContainerProps {
  isActive?: boolean;
}

const fadeInAnimation = keyframes`${fadeIn}`;

const Container = styled.div<ContainerProps>`
  margin: 0 auto;
  padding: 20px 50px 0;

  svg {
    animation: 0.5s ${fadeInAnimation};
  }

  @media screen and (min-width: 768px) {
    padding: 80px 50px 0;
  }

  ${props =>
    props.isActive &&
    css`
      h3 {
        strong {
          color: #db71af;
        }
      }
    `}
`;

export const StepIntro = styled.div`
  margin-bottom: 20px;

  width: 100%;
  max-width: 100%;

  color: #565656;
  text-align: center;

  svg {
    &:first-child {
      margin-right: 5px;
    }

    &:last-of-type {
      margin-left: 5px;
    }
  }

  .step-disabled {
    margin-bottom: 10px;

    color: #707070;

    font-family: 'Montserrat';
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
  }

  @media screen and (min-width: 768px) {
    margin-bottom: 40px;
    padding: 0 20px;
  }
`;

export const StepTooltip = styled(ReactToolTip)`
  width: 260px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.11);
  border-radius: 20px;

  text-align: left;

  strong {
    margin-bottom: 5px;

    display: block;

    color: #db71af;

    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
  }

  span {
    display: block;

    text-align: justify;
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
  }

  @media screen and (min-width: 768px) {
    width: 320px;
  }
`;

export const StepTitle = styled.h2`
  margin-bottom: 10px;

  display: flex;
  justify-content: center;

  font-weight: 600;

  font-size: 18px;
  line-height: 32px;

  @media screen and (min-width: 768px) {
    font-weight: 700;

    font-size: 33px;
    line-height: 40px;
  }
`;

export const StepDescription = styled.h3`
  margin-bottom: 10px;

  font-size: 14px;
  line-height: 18px;

  strong {
    font-weight: 600;
  }

  @media screen and (min-width: 768px) {
    font-size: 28px;
    line-height: 34px;
  }
`;

export const StepSubDescription = styled.span`
  font-size: 12px;
  line-height: 16px;

  @media screen and (min-width: 768px) {
    font-size: 18px;
    line-height: 24px;
  }
`;

export const StepContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  .sankey-tooltip {
    width: 640px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.11);
    border-radius: 20px;

    text-align: left;
    font-family: 'Montserrat';

    strong {
      margin-bottom: 5px;

      display: block;

      color: #7664c8;

      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
    }

    span {
      font-weight: normal;
      font-size: 14px;
      line-height: 22px;
    }
  }

  > div:before {
    margin-bottom: 10px;

    display: block;

    font-size: 16px;
    line-height: 24px;
  }
`;

export default Container;
