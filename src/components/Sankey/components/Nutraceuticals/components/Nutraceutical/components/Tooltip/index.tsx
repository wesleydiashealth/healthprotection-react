import React from 'react';
import ReactHtmlParser from 'react-html-parser';

import { useApp } from 'contexts/app';
import { useSankey } from 'contexts/sankey';

import Container, {
  ContainerCloseButton,
  ContainerTitle,
  ContainerDescription,
  ContainerLink,
  ContainerList,
  ContainerListItem,
  ContainerListItemTitle,
  ContainerListItemDetails,
  ContainerListItemDescription,
  ContainerListItemLink,
  ContainerListIcons,
  ContainerListIcon,
  ContainerListIconTitle,
  ContainerListIconContent,
  EffectsMeter,
  NeutralIcon,
  HappyIcon,
  HappierIcon,
} from './styles';

interface TooltipProps {
  slug: string;
  supConnections: string[];
}

const Tooltip: React.FC<TooltipProps> = ({ slug, supConnections }) => {
  const context = useApp();
  const { nutraceuticals } = context;

  const sankeyContext = useSankey();
  const { updateActiveNutraceutical } = sankeyContext;

  const nutraceutical = nutraceuticals.find(item => item.slug === slug);

  return (
    <Container>
      <ContainerCloseButton
        size={24}
        onClick={() => {
          updateActiveNutraceutical('');
        }}
      />
      <ContainerTitle>
        Scientific summary for{' '}
        <a href={nutraceutical?.info.link}>{nutraceutical?.info.title}</a>
      </ContainerTitle>
      <ContainerDescription>
        {nutraceutical?.info.description &&
          ReactHtmlParser(nutraceutical?.info.description)}
      </ContainerDescription>
      <ContainerLink
        href={nutraceutical?.info.link}
        target="_blank"
        rel="noreferrer"
      >
        {`Access ${nutraceutical?.info.studies} scientific studies`}
      </ContainerLink>
      <ContainerList style={{ height: '400px' }}>
        {nutraceutical?.info.relations
          .filter(relation => supConnections.includes(relation.suboutcome.slug))
          .map(relation => (
            <ContainerListItem key={relation.slug}>
              <ContainerListItemTitle>
                <a
                  href={nutraceutical.info.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {nutraceutical.title}
                </a>{' '}
                for{' '}
                <a
                  href={relation.suboutcome.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {relation.suboutcome.title}
                </a>
              </ContainerListItemTitle>
              <ContainerListItemDetails>
                {`These data summarize ${relation.studies} scientific studies`}
              </ContainerListItemDetails>
              <ContainerListIcons>
                <ContainerListIcon>
                  <ContainerListIconTitle>
                    Consistent Effects
                  </ContainerListIconTitle>
                  <ContainerListIconContent>
                    <EffectsMeter width={relation.levelOfEvidence}>
                      <div />
                    </EffectsMeter>
                  </ContainerListIconContent>
                </ContainerListIcon>
                <ContainerListIcon>
                  <ContainerListIconTitle>
                    Strength of Effects
                  </ContainerListIconTitle>
                  <ContainerListIconContent>
                    <NeutralIcon
                      isActive={Math.abs(relation.magnitudeOfEffect) === 1}
                    />
                    <HappyIcon
                      isActive={Math.abs(relation.magnitudeOfEffect) === 2}
                    />
                    <HappierIcon
                      isActive={Math.abs(relation.magnitudeOfEffect) === 3}
                    />
                  </ContainerListIconContent>
                </ContainerListIcon>
              </ContainerListIcons>
              <ContainerListItemDescription>
                {relation?.description}
              </ContainerListItemDescription>
              <ContainerListItemLink href={relation.link} target="_blank">
                Read each of the scientific studies
              </ContainerListItemLink>
            </ContainerListItem>
          ))}
      </ContainerList>
    </Container>
  );
};

export default Tooltip;
