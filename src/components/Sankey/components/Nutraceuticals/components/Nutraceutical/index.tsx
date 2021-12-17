import React from 'react';

import { useApp } from 'contexts/app';
import { useSankey } from 'contexts/sankey';

import NutraceuticalData from 'dtos/NutraceuticalData';

import { ReactComponent as NutritionInfoIcon } from 'assets/nutrition_info.svg';

import Tooltip from './components/Tooltip';

import Container, {
  Anchors,
  Anchor,
  ContentContainer,
  Content,
  ContentTitle,
  ContentDescription,
} from './styles';

const Nutraceutical: React.FC<NutraceuticalData> = ({
  slug,
  title,
  dosage,
  info,
}) => {
  const appContext = useApp();
  const { connections } = appContext;

  const sankeyContext = useSankey();
  const { activeNutraceutical, updateActiveNutraceutical } = sankeyContext;

  const isActive = activeNutraceutical === slug;

  const { description } = info;

  const supConnections = Object.values(connections)
    .filter(
      subconnections =>
        !!Object.values(subconnections).reduce(
          (accumulator, subconnection) => accumulator + subconnection.length,
          0,
        ),
    )
    .reduce(
      (accumulator: string[], subconnections) => [
        ...accumulator,
        ...Object.entries(subconnections)
          .filter(({ 1: subconnection }) => subconnection.includes(slug))
          .reduce((acc: string[], curr) => [...acc, curr[0]], []),
      ],
      [],
    );

  return (
    <Container connections={supConnections.length}>
      <Anchors>
        {supConnections.map(supConnection => (
          <Anchor
            key={`${slug}-${supConnection}`}
            id={`${slug}-${supConnection}`}
          />
        ))}
      </Anchors>
      <ContentContainer>
        <Content
          onClick={() => {
            updateActiveNutraceutical(!isActive ? slug : '');
          }}
        >
          <NutritionInfoIcon />
          <ContentTitle>{title}</ContentTitle>
          <ContentDescription>{`${dosage}`}</ContentDescription>
        </Content>
        {isActive && (
          <Tooltip
            {...{
              ...{ slug, title, description, supConnections },
            }}
          />
        )}
        {/* <ContainerPopup
          open={open}
          closeOnDocumentClick
          onClose={closeModal}
          trigger={
            <Content
              onClick={() => {
                setOpen(o => !o);
              }}
            >
              <NutritionInfoIcon />
              <ContentTitle>{title}</ContentTitle>
              <ContentDescription>{`${dosage}`}</ContentDescription>
            </Content>
          }
          modal
          nested
        >
          <Scrollbar style={{ height: '600px' }}>
            <ContainerCloseButton size={24} onClick={() => setOpen(o => !o)} />
            <Tooltip
              {...{
                ...{ slug, title, description, supConnections },
              }}
            />
          </Scrollbar>
        </ContainerPopup> */}
      </ContentContainer>
    </Container>
  );
};

export default Nutraceutical;
