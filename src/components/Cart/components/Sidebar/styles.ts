import styled from 'styled-components';

const Container = styled.div`
  color: #565656;

  > div {
    border-radius: 12px;
    padding: 20px;

    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.11);

    & ~ div {
      margin-top: 40px;
    }
  }

  @media screen and (min-width: 768px) {
    min-width: 440px;
    max-width: 25%;
  }
`;

export default Container;
