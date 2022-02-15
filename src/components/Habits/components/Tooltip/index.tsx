import React from 'react';

import InteractionData from 'dtos/InteractionData';

import { useApp } from 'contexts/app';

import Container, {
  ContainerTitle,
  ContainerDosage,
  ContainerInteractions,
  ContainerInteractionsLabel,
  ContainerInteractionsItem,
  ContainerInteractionsItemName,
  ContainerInteractionsItemDosage,
  ContainerSources,
  ContainerSourcesItem,
} from './styles';

interface TooltipProps {
  title: string;
  dosages: string;
  interactions: InteractionData[];
  dataSource: string[];
}

const Tooltip: React.FC<TooltipProps> = ({
  title,
  dosages,
  interactions,
  dataSource,
}) => {
  const context = useApp();
  const { labels } = context;

  return (
    <Container>
      <ContainerTitle>{title}</ContainerTitle>
      <ContainerDosage>{dosages}</ContainerDosage>
      <ContainerInteractions>
        <ContainerInteractionsLabel>
          {labels?.step_3_food_table
            ? labels.step_3_food_table
                .replace('%i', '100')
                .replace('%s', title.toLowerCase())
            : `The follow table considers 100 grams of ${title.toLowerCase()}:`}
        </ContainerInteractionsLabel>
        {interactions?.map(interaction => (
          <ContainerInteractionsItem key={interaction.dietarySupplementSlug}>
            <ContainerInteractionsItemName>
              {interaction.dietarySupplementTitle}
            </ContainerInteractionsItemName>
            <ContainerInteractionsItemDosage>
              {interaction.dosage}
              {interaction.capsuleDosage}
            </ContainerInteractionsItemDosage>
          </ContainerInteractionsItem>
        ))}
      </ContainerInteractions>
      <ContainerSources>
        {dataSource?.map(dataSourceItem => (
          <ContainerSourcesItem
            key={dataSourceItem}
            src={`https://www.healthprotection.com/wp-content/themes/dt-the7-child/images/${dataSourceItem}.png`}
            alt={dataSourceItem}
            title={dataSourceItem}
          />
        ))}
      </ContainerSources>
    </Container>
  );
};

export default Tooltip;
