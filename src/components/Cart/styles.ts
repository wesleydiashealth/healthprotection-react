import styled, { css } from 'styled-components';

interface ContainerProps {
  isActive?: boolean;
}

const Container = styled.div<ContainerProps>`
  margin: 0px auto;
  padding: 20px;

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
  max-width: 100%;

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
