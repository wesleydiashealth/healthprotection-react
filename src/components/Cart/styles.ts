import styled, { css } from 'styled-components';
import ReactToolTip from 'react-tooltip';

interface ContainerProps {
  isActive?: boolean;
}

const Container = styled.div<ContainerProps>`
  margin: 0px auto;
  padding: 20px 0;

  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;

  position: relative;

  /* max-width: 1300px; */

  @media screen and (min-width: 768px) {
    padding: 80px 50px 40px;
  }

  ${props =>
    props.isActive &&
    css`
      h3 {
        strong {
          color: #ec903f;
        }
      }
    `}

  @media screen and (min-width: 768px) {
    .step-content {
      flex-flow: row nowrap;
    }

    .products-wrapper {
      margin-right: 40px;
    }
  }
`;

export const StepIntro = styled.div`
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

    color: #ec903f;

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

  font-weight: 500;

  font-size: 18px;
  line-height: 32px;

  strong {
    font-weight: 600;
  }

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

export const StepContent = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;

  max-width: 100%;

  @media screen and (min-width: 768px) {
    padding: 0 20px;
  }

  @media screen and (min-width: 1400px) {
    flex-flow: row nowrap;
    align-items: flex-start;
  }
`;

export const CheckoutProducts = styled.div`
  margin-bottom: 40px;
  border: 1px solid #c6c6c6;
  border-radius: 12px;
  padding: 20px;

  overflow: hidden;

  flex: 1;

  > h4 {
    margin-bottom: 20px;

    font-weight: 600;

    color: #ec903f;
  }

  @media screen and (min-width: 1400px) {
    margin-right: 40px;
  }
`;

export const AmazonPolicy = styled.span`
  margin-top: 40px;
  border-top: 1px solid #c6c6c6;
  padding-top: 10px;

  display: block;
  text-align: justify;
`;

export default Container;
