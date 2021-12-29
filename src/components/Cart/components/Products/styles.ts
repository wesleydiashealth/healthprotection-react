import styled from 'styled-components';

const Container = styled.div`
  > div {
    & ~ div {
      margin-top: 40px;
    }
  }
`;

export default Container;
