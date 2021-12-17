import styled from 'styled-components';

const Container = styled.div`
  min-width: 320px;
`;

export const ContainerTitle = styled.h4`
  font-size: 14px;
  line-height: 22px;
`;

export const ContainerDosage = styled.div`
  margin-bottom: 10px;

  display: block;

  font-size: 12px;
  line-height: 22px;
`;

export const ContainerInteractions = styled.div`
  border-radius: 10px;

  overflow: hidden;
`;

export const ContainerInteractionsLabel = styled.span`
  margin-bottom: 5px;

  font-weight: 500;
  font-size: 12px;
  line-height: 22px;
`;

export const ContainerInteractionsItem = styled.p`
  margin-bottom: 0 !important;
  padding: 5px 10px;

  display: flex;
  justify-content: space-between;

  background-color: #f5f5f5;

  font-size: 12px;
  line-height: 22px;

  &:nth-child(odd) {
    background-color: #e5e5e5;
  }
`;

export const ContainerInteractionsItemName = styled.span`
  margin-right: 10px;
`;

export const ContainerInteractionsItemDosage = styled.span``;

export const ContainerSources = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
`;

export const ContainerSourcesItem = styled.img`
  max-width: 60px;

  & ~ img {
    margin-left: 10px;
  }
`;

export default Container;
