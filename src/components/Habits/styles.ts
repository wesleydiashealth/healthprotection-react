import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { Alert, AlertTitle } from '@material-ui/lab';

interface ContainerProps {
  isActive?: boolean;
}

const Container = styled.div<ContainerProps>`
  margin: 80px auto 0;
  padding: 0 10px;

  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;

  position: relative;

  max-width: 1300px;

  @media screen and (min-width: 768px) {
    padding: 80px 50px 0;
  }

  ${props =>
    props.isActive &&
    css`
      h3 {
        strong {
          color: #1bc9bd;
        }
      }
    `}
`;

export const ContainerAlert = styled(Alert)`
  margin: 0 0 40px 0;
  position: relative;

  background-color: ${transparentize(0.8, '#1bc9bd')} !important;

  svg {
    color: #1bc9bd;
  }

  @media screen and (min-width: 768px) {
    position: absolute;

    top: 50px;
    right: 0;

    max-width: 320px;
  }
`;

export const ContainerAlertTitle = styled(AlertTitle)`
  color: #1bc9bd;

  font-family: 'Montserrat', sans-serif !important;
  font-weight: 600 !important;
`;

export const HabitsContainer = styled.div`
  max-width: 100vw;
  width: 100%;

  @media screen and (min-width: 768px) {
    display: flex;
    flex-flow: row wrap;
  }
`;

export const HabitContainer = styled.div`
  margin-bottom: 40px;

  display: flex;
  flex-flow: column;
  justify-content: center;

  @media screen and (min-width: 768px) {
    width: calc(50% - 20px);

    flex-flow: row nowrap;

    &:nth-child(odd) {
      margin-right: 40px;
    }
  }
`;

export const HabitContainerIntro = styled.div`
  text-align: center;

  img {
    max-width: 60px;
    height: auto;
  }

  @media screen and (min-width: 768px) {
    margin-right: 20px;

    img {
      max-width: 100px;
    }
  }
`;

export const HabitContainerContent = styled.div`
  text-align: center;

  flex: 1;

  .Dropdown-root {
    width: 360px;
    max-width: 100%;

    text-align: left;
    font-size: 12px;
    line-height: 18px;

    .Dropdown-control {
      border-radius: 12px;
      padding: 8px 52px 8px 20px;

      min-height: 44px;

      display: flex;
      align-items: center;
    }

    .Dropdown-menu {
      border-radius: 12px;
    }

    .Dropdown-arrow {
      top: 19px;
    }
  }

  @media screen and (min-width: 768px) {
    text-align: left;

    .Dropdown-root {
      font-size: 12px;
      line-height: 20px;
    }
  }
`;

export const HabitTitle = styled.h4`
  margin-bottom: 10px;

  font-size: 16px;
  line-height: 24px;

  svg {
    margin-left: 5px;
  }
`;

export const HabitQuestion = styled.span`
  display: block;

  font-size: 14px;
  line-height: 22px;
`;

export const HabitDosages = styled.span`
  margin-bottom: 5px;

  display: block;

  font-size: 12px;
  line-height: 18px;

  @media screen and (min-width: 768px) {
    font-size: 14px;
    line-height: 20px;
  }
`;

export const HabitNutraceuticals = styled.div`
  margin: 10px 0;

  display: flex;
  flex-flow: row wrap;
  align-items: center;
`;

export const HabitNutraceuticalsLabel = styled.span`
  margin-right: 10px;

  font-size: 12px;
  line-height: 18px;

  @media screen and (min-width: 768px) {
    font-size: 14px;
    line-height: 20px;
  }
`;

export const HabitNutraceuticalsItem = styled.div`
  margin: 5px 0;
  border-radius: 10px;
  padding: 5px 10px;

  background-color: #e5e5e5;

  display: inline-block;

  font-size: 11px;
  line-height: 18px;

  & ~ div {
    margin-left: 10px;
  }

  strong {
    font-weight: 600;
  }

  @media screen and (min-width: 768px) {
    font-size: 14px;
    line-height: 20px;
  }
`;

export const ReducedHabits = styled.div`
  margin: 0 auto 20px;
  border: 3px solid orange;
  border-radius: 20px;
  padding: 5px 20px;

  font-size: 14px;
  line-height: 20px;

  strong {
    font-weight: 600;
  }
`;

export const RemovedHabits = styled.div`
  margin: 0 auto 20px;
  border: 3px solid red;
  border-radius: 20px;
  padding: 5px 20px;

  font-size: 14px;
  line-height: 22px;

  strong {
    font-weight: 600;
  }
`;

export const InvalidNutraceuticals = styled.div`
  margin: 0 auto;
  border: 3px solid #1bc9bd;
  border-radius: 20px;
  padding: 5px 20px;

  font-size: 14px;
  line-height: 20px;

  strong {
    font-weight: 600;
  }
`;

export default Container;
