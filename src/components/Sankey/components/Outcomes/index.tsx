import React from 'react';

import { useApp } from 'contexts/app';

import connections from 'connections-v2.json';
import outcomesV2 from 'outcomes-v2.json';

import Outcome from './components/Outcome';

import Container, { ContainerLabel } from './styles';

interface OutcomesData {
  selectedOutcomes?: string[];
}

const Outcomes: React.FC<OutcomesData> = ({ selectedOutcomes }) => {
  const appContext = useApp();
  const { labels } = appContext;

  return (
    <Container>
      <ContainerLabel>
        {labels.step_2_outcomes || 'Filtered Health Goals'}
      </ContainerLabel>
      {Object.entries(connections)
        .filter(({ 0: connection }) =>
          selectedOutcomes?.length
            ? selectedOutcomes.includes(connection)
            : true,
        )
        .map(({ 0: connection }) => {
          const currentOutcome = outcomesV2.find(
            outcome => outcome.id === connection,
          );

          return (
            currentOutcome && (
              <Outcome key={currentOutcome.id} {...currentOutcome} />
            )
          );
        })}
    </Container>
  );
};

Outcomes.defaultProps = {
  selectedOutcomes: [],
};

export default Outcomes;
