import styled from 'styled-components';

const Container = styled.div``;

export const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  margin: 20px;
  padding: 24px;

  background: #ffffff;

  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.11);
  border-radius: 20px;

  strong {
    margin-bottom: 24px;
  }

  svg {
    position: absolute;
    top: 15px;
    right: 15px !important;
  }

  .step-tooltip {
    width: 260px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.11);
    border-radius: 20px;

    font-size: 14px;
    line-height: 22px;

    strong {
      display: block;
      margin-bottom: 10px;
      font-size: 20px;
      line-height: 28px;
      font-weight: 500;
      color: #7664c8;
    }
  }

  .buttons-list {
    height: 240px;

    > div {
      display: flex;
      flex-direction: column;

      button {
        margin-right: 20px;
      }
    }
  }
`;

export default Container;
