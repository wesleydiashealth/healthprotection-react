import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

interface ContainerProps {
  isActive?: boolean;
}

interface StepContainerProps {
  isCompleted?: boolean;
  isDisabled?: boolean;
}

const Container = styled.div<ContainerProps>`
  margin: 0 auto;
  padding: 80px 50px 0;

  max-width: 1300px;

  /* max-width constrains the width of our carousel to 550, but shrinks on small devices */
  .carousel__container {
    max-width: 360px;
    margin: auto;
  }

  /* gives us the illusion of a "centered" slide */
  .carousel__slider {
    padding-left: calc((100% - 400px) / 2);
    padding-right: calc((100% - 400px) / 2);
  }

  /* gives us the illusion of spaces between the slides */
  .carousel__inner-slide {
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  ${props =>
    props.isActive &&
    css`
      h3 {
        strong {
          color: #7664c8;
        }
      }
    `}
`;

export const StepIntro = styled.div`
  margin-bottom: 40px;
  padding: 0 20px;

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

  .__react_component_tooltip {
    width: 320px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.11);
    border-radius: 20px;

    text-align: left;

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

  .step-disabled {
    margin-bottom: 10px;

    color: #707070;

    font-family: 'Montserrat';
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
  }
`;

export const StepTitle = styled.h2`
  margin-bottom: 10px;

  display: flex;
  justify-content: center;

  font-weight: 700;

  font-size: 33px;
  line-height: 40px;
`;

export const StepDescription = styled.h3`
  margin-bottom: 10px;

  font-size: 28px;
  line-height: 34px;

  strong {
    font-weight: 600;
  }
`;

export const StepSubDescription = styled.span`
  font-size: 18px;
  line-height: 24px;
`;

export const SliderNavigation = styled.div`
  padding: 10px 0;

  display: flex;
  align-items: center;
  justify-content: center;

  > button {
    border: none;
    background: transparent;

    display: flex;
    align-items: center;

    color: #565656;

    font-size: 14px;
    line-height: 14px;

    &:disabled {
      color: ${transparentize(0.5, '#565656')};
    }
  }

  .carousel__back-button {
    svg {
      margin-right: 10px;
    }
  }

  .carousel__next-button {
    svg {
      margin-left: 10px;
    }
  }

  .carousel__dot-group {
    margin: 0 20px;

    display: flex;

    button {
      margin: 0 5px;
      border: none;

      width: 20px;
      height: 20px;
      border-radius: 50%;

      background: #c6c6c6;
    }

    .carousel__dot--selected {
      background: ${transparentize(0.5, '#7664c8')};
    }
  }
`;

export const StepContainer = styled.div<StepContainerProps>`
  margin: 20px;
  padding: 24px;

  display: flex;
  flex-direction: column;
  position: relative;

  width: 360px;

  background: #ffffff;

  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.11);
  border-radius: 20px;

  ${props =>
    (props.isCompleted || props.isDisabled) &&
    css`
      opacity: 0.3;

      button {
        pointer-events: none;
      }
    `}

  > span {
    margin-bottom: 5px;

    font-weight: 600;
    font-size: 12px;
    line-height: 20px;
  }

  > strong {
    margin-bottom: 24px;

    font-weight: 500;
    font-size: 14px;
    line-height: 22px;

    &:first-of-type {
      min-height: 44px;
    }
  }

  .secondary-question {
    margin-top: 40px;
    display: flex;
    flex-flow: column wrap;
    align-items: flex-end;
  }

  .completed-icon {
    position: absolute;
    top: -16px;
    left: calc(50% - 16px);
    background: #fff;
    border-radius: 100%;
  }

  .tooltip-icon {
    position: absolute;
    top: 15px;
    right: 15px !important;
  }

  .step-tooltip {
    width: 260px;
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

  .buttons-list {
    /* height: 240px; */

    > div {
      display: flex;
      flex-direction: column;

      /* button {
        margin-right: 20px;
      } */
    }
  }

  .advance-button {
    margin-top: 20px;
    border: none;
    border-radius: 12px;
    border: 1px solid #7664c8;
    padding: 8px 32px;

    background: #7664c8;
    color: white;

    font-size: 14px;
    line-height: 18px;
    font-weight: 500;

    &:hover {
      background: ${transparentize(0.2, '#7664c8')};
    }
  }
`;

export default Container;
