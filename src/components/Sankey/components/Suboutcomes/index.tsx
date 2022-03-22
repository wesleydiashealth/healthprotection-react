import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { FaToggleOn } from 'react-icons/fa';

import { useApp } from 'contexts/app';

import Suboutcome from './components/Suboutcome';

import Container, { ContainerLabel } from './styles';

interface SuboutcomesData {
  selectedSuboutcomes?: string[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Suboutcomes: React.FC<SuboutcomesData> = ({ selectedSuboutcomes }) => {
  const appContext = useApp();
  const { labels, connections, outcomes, suboutcomes } = appContext;

  const subConnections = Array.from(
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
        <strong>
          {labels.step_2_suboutcomes_title ||
            'Fine-tune your chosen sub-health goals'}
        </strong>

        <span>
          <FaToggleOn />{' '}
          {labels.step_2_suboutcomes_description
            ? ReactHtmlParser(labels.step_2_suboutcomes_description)
            : 'The range on the min-med-max selector reflects the efficiency of the dietary supplement on the condition.'}
        </span>
      </ContainerLabel>
      {subConnections.map(subConnection => {
        const currentSuboutcome = suboutcomes.find(
          suboutcome => suboutcome.id === subConnection,
        );

        const outcomeColor = Object.values(outcomes).find(outcome =>
          outcome.suboutcomes.includes(subConnection),
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

Suboutcomes.defaultProps = {
  selectedSuboutcomes: [],
};

export default Suboutcomes;
