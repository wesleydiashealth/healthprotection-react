import styled from 'styled-components';

const Container = styled.div`
  > div {
    & ~ div {
      margin-top: 20px;
    }
  }

  .react-tabs {
    &__tab {
      padding: 6px;

      &-panel {
        padding: 0;
      }

      &-list {
        font-size: 9px;
      }
    }
  }

  @media screen and (min-width: 768px) {
    > div {
      & ~ div {
        margin-top: 80px;
      }
    }

    .react-tabs {
      &__tab {
        padding: 6px 12px;

        &-panel {
          padding: 20px 0 0 10px;
        }

        &-list {
          font-size: 16px;
        }
      }
    }
  }
`;

export const ProductContainer = styled.div`
  display: flex;
  align-items: center;

  input[type='checkbox'] {
    margin-right: 10px;
  }

  & ~ div {
    margin-top: 40px;
  }
`;

export default Container;
