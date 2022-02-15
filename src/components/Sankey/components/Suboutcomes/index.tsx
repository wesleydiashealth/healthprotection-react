import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { FaToggleOn } from 'react-icons/fa';

import { useApp } from 'contexts/app';

import Suboutcome from './components/Suboutcome';

import Container, { ContainerLabel } from './styles';

interface SuboutcomesData {
  selectedSuboutcomes?: string[];
}

const Suboutcomes: React.FC<SuboutcomesData> = ({ selectedSuboutcomes }) => {
  const appContext = useApp();
  const { labels, outcomes, suboutcomes, connections } = appContext;

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
      {Object.values(connections).map(subConnections =>
        Object.keys(subConnections)
          .filter(subConnection =>
            selectedSuboutcomes?.length
              ? selectedSuboutcomes.includes(subConnection)
              : true,
          )
          .map(subConnection => {
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
          }),
      )}
    </Container>
  );
};

Suboutcomes.defaultProps = {
  selectedSuboutcomes: [],
};

export default Suboutcomes;
