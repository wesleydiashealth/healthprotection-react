import styled, { css, keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

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
