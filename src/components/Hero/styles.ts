import styled from 'styled-components';

const Container = styled.section`
  margin: 0 auto;
  padding: 20px;

  display: flex;
  flex-flow: column wrap;
  align-items: center;

  box-sizing: border-box;

  max-width: 1300px;

  color: #565656;

  @media screen and (min-width: 768px) {
    padding: 20px 50px;

    flex-flow: row nowrap;
  }
`;

export const HeroIntro = styled.div`
  margin: 0 0 20px 0;

  @media screen and (min-width: 768px) {
    margin: 0 40px 0 0;
  }
`;

export const HeroButton = styled.a``;

export const HeroList = styled.ul`
  display: flex;
  flex-flow: column wrap;

  @media screen and (min-width: 768px) {
    flex-flow: row nowrap;

    grid-column: 1;
  }
`;

export const HeroListItem = styled.li`
  display: flex;
  align-items: center;

  & ~ li {
    margin: 5px 0 0;
    border-top: 1px solid #e0e0e0;
    padding: 5px 0 0;
  }

  svg {
    margin-right: 10px;
    fill: #db71af;
  }

  @media screen and (min-width: 768px) {
    & ~ li {
      margin: 0 0 0 20px;
      border-top: none;
      border-left: 1px solid #e0e0e0;
      padding: 0 0 0 20px;
    }
  }
`;

export const HeroListItemLink = styled.a`
  color: #db71af;

  text-decoration: none;
  font-weight: 700;
  font-size: 10px;
  line-height: 12px;

  @media screen and (min-width: 768px) {
    font-size: 16px;
    line-height: 22px;
  }

  @media screen and (min-width: 992px) {
    font-size: 18px;
    line-height: 24px;
  }
`;

export const HeroListItemText = styled.span`
  color: #db71af;

  cursor: pointer;

  text-decoration: none;
  font-weight: 700;
  font-size: 10px;
  line-height: 12px;

  @media screen and (min-width: 768px) {
    font-size: 16px;
    line-height: 22px;
  }

  @media screen and (min-width: 992px) {
    font-size: 18px;
    line-height: 24px;
  }
`;

export const HeroListItemPopupContent = styled.div`
  padding: 20px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Container;
