import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { FaToggleOn } from 'react-icons/fa';

import { useApp } from 'contexts/app';

import Suboutcome from './components/Suboutcome';

import Container, { ContainerLabel } from './styles';

interface SuboutcomesData {
  selectedSuboutcomes?: string[];
}

const Suboutcomes: React.FC<SuboutcomesData> = () => {
  const appContext = useApp();
  const { labels, connections, outcomes, suboutcomes } = appContext;

  const filteredSuboutcomes = Array.from(
    new Set(
      Object.values(connections).reduce(
        (acc: string[], curr) => [...acc, ...Object.keys(curr)],
        [],
      ),
    ),
  );

  return (
    <Container>
      <ContainerLabel>
        <strong>{labels.step_2_suboutcomes_title}</strong>

        <span>
          <FaToggleOn />{' '}
          {labels.step_2_suboutcomes_description &&
            ReactHtmlParser(labels.step_2_suboutcomes_description)}
        </span>
      </ContainerLabel>
      {filteredSuboutcomes.map(filteredSuboutcome => {
        const currentSuboutcome = suboutcomes.find(
          suboutcome => suboutcome.id === filteredSuboutcome,
        );

        const outcomeColor = Object.values(outcomes).find(outcome =>
          outcome.suboutcomes.includes(filteredSuboutcome),
        )?.color;

        return (
          currentSuboutcome && (
            <Suboutcome
              key={currentSuboutcome.id}
              {...currentSuboutcome}
              color={outcomeColor || '#565656'}
            />
          )
        );
      })}
    </Container>
  );
};

export default Suboutcomes;
