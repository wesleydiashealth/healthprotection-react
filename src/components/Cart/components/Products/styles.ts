import styled from 'styled-components';

const Container = styled.div`
  > div {
    & ~ div {
      margin-top: 80px;
    }
  }

  .react-tabs {
    &__tab {
      &-panel {
        padding: 20px 0 0 10px;
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
