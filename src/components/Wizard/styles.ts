import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

interface StepContainerProps {
  isCompleted?: boolean;
  isDisabled?: boolean;
}

const Container = styled.div`
  margin: 0 auto;
  padding: 20px;

  max-width: 1300px;

  // Disable focused step outline
  .focusRing___1airF.carousel__slide-focus-ring {
    outline: none !important;
  }

  /* gives us the illusion of a "centered" slide */
  .carousel__slider {
    padding-left: 0;
    padding-right: 0;
  }

  /* max-width constrains the width of our carousel, but shrinks on small devices */
  .carousel__container {
    max-width: 360px;
    margin: auto;
  }

  /* gives us the illusion of spaces between the slides */
  .carousel__inner-slide {
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  @media screen and (min-width: 768px) {
    padding: 80px 50px 0;

    /* gives us the illusion of a "centered" slide */
    .carousel__slider {
      padding-left: calc((100% - 400px) / 2);
      padding-right: calc((100% - 400px) / 2);
    }
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

export const StepContainer = styled.div<StepContainerProps>`
  margin: 20px;
  padding: 24px 16px;

  display: flex;
  flex-direction: column;
  position: relative;

  background: #f5f5f5;

  width: 100%;

  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3);
  border-radius: 20px;

  label {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .input-text {
    margin: 5px 0 0 20px;
    border: 1px solid #565656;
    border-radius: 12px;
    padding: 8px;

    flex: 1;

    max-width: 60px;
    width: 100%;
  }

  .birth-month,
  .birth-year {
    &__menu-list {
      max-height: 160px;
    }
  }

  .select-input {
    font-size: 12px;
    line-height: 12px;

    > div {
      border-radius: 12px;
    }

    & ~ .select-input {
      margin-top: 15px;
    }
  }

  .autocomplete-input {
    label,
    input {
      font-size: 12px;
      line-height: 12px;
    }
  }

  input[type='file'] {
    margin-bottom: 40px;
  }

  .MuiAutocomplete-root {
    & ~ .MuiAutocomplete-root {
      margin-top: 20px;
    }
  }

  .step-8-logos-title {
    margin-top: 40px;
  }

  .step-8-logos {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;

    img {
      margin-bottom: 10px;
    }
  }

  .scrollbar-container {
    border-radius: 10px;
    overflow: hidden;
    opacity: 1 !important;
    background: #ccc;

    .scrollbar {
      border-radius: 10px;
      background: #7664c8 !important;
    }
  }

  > span {
    margin-bottom: 10px;

    display: flex;
    align-items: center;

    font-weight: 600;
    font-size: 12px;
    line-height: 20px;

    svg {
      margin-left: 10px;

      box-sizing: border-box;
    }
  }

  > strong {
    margin-bottom: 24px;

    font-weight: 500;
    font-size: 12px;
    line-height: 20px;
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

    font-family: 'Montserrat';

    strong {
      margin-bottom: 10px;

      display: block;

      color: #7664c8;

      font-weight: 600;
      font-size: 14px;
      line-height: 22px;
    }

    span {
      display: block;

      text-align: justify;
      font-weight: normal;
      font-size: 12px;
      line-height: 20px;
    }
  }

  .inputs-list {
    height: 545px;

    > div {
      display: flex;
      flex-direction: column;

      input {
        margin-right: 20px;
      }
    }
  }

  .buttons-list {
    height: 240px;

    background: transparent;

    > div {
      display: flex;
      flex-direction: column;

      button {
        margin-right: 20px;
      }
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

    font-size: 11px;
    line-height: 11px;
    font-weight: 500;

    &:hover {
      background: ${transparentize(0.2, '#7664c8')};
    }
  }

  @media screen and (min-width: 768px) {
    padding: 24px;

    width: 360px;

    > strong {
      font-size: 14px;
      line-height: 22px;

      &:first-of-type {
        min-height: 44px;
      }
    }

    .select-input {
      font-size: 14px;
      line-height: 14px;
    }

    .autocomplete-input {
      label,
      input {
        font-size: 14px;
        line-height: 14px;
      }
    }

    .advance-button {
      font-size: 14px;
      line-height: 18px;
    }
  }

  ${props =>
    props.isDisabled &&
    css`
      opacity: 0.3;

      button {
        pointer-events: none;
      }
    `}
`;

export const QuestionPrefix = styled.span`
  margin-bottom: 10px;

  display: flex;
  align-items: center;

  font-weight: 600;
  font-size: 12px;
  line-height: 20px;

  svg {
    margin-left: 10px;

    box-sizing: border-box;
  }
`;

export const QuestionTitle = styled.strong`
  margin-bottom: 24px;

  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
`;

export const QuestionSuffix = styled.span`
  position: absolute;
  top: 15px;
  right: 15px !important;

  color: #7664c8;

  cursor: pointer;
`;

export default Container;
