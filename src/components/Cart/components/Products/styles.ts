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

export default Container;
