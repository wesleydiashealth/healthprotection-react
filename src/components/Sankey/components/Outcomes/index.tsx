import React from 'react';

import { useApp } from 'contexts/app';

import Outcome from './components/Outcome';

import Container, { ContainerLabel } from './styles';

interface OutcomesData {
  selectedOutcomes?: string[];
}

const Outcomes: React.FC<OutcomesData> = () => {
  const appContext = useApp();
  const { labels, connections, outcomes } = appContext;

  return (
    <Container>
      <ContainerLabel>{labels.step_2_outcomes}</ContainerLabel>
      {Object.entries(connections).map(({ 0: connection }) => {
        const currentOutcome = outcomes.find(
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

export default Outcomes;
