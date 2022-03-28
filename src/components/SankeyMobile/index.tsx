import React, { useEffect } from 'react';
import 'reactjs-popup/dist/index.css';
import { IoOptionsOutline } from 'react-icons/io5';
import TagManager from 'react-gtm-module';
import VisibilitySensor from 'react-visibility-sensor';
import { hotjar } from 'react-hotjar';

import Loading from 'components/Loading';

import StepIntro from 'components/StepIntro';

import ConnectionsData from 'dtos/ConnectionsData';
import OutcomeData from 'dtos/OutcomeData';
import SuboutcomeData from 'dtos/SuboutcomeData';
import NutraceuticalData from 'dtos/NutraceuticalData';

import { useApp } from 'contexts/app';
import { SankeyProvider } from 'contexts/sankey';

import Outcomes from './components/Outcomes';
import Nutraceuticals from './components/Nutraceuticals';

import Container, { StepContent } from './styles';

interface SankeyProps {
  defaultConnections?: ConnectionsData;
  defaultOutcomes?: OutcomeData[];
  defaultSuboutcomes?: SuboutcomeData[];
  defaultNutraceuticals?: NutraceuticalData[];
}

const Sankey: React.FC<SankeyProps> = ({
  defaultConnections,
  defaultOutcomes,
  defaultSuboutcomes,
  defaultNutraceuticals,
}) => {
  const context = useApp();
  const {
    labels,
    steps,
    connections,
    outcomes,
    updateAllConnections,
    updateOutcomes,
    updateSuboutcomes,
    updateNutraceuticals,
  } = context;
  const { step1: previousStep, step2: currentStep } = steps;

  const isActive = previousStep.isCompleted || !!defaultConnections;

  const isReady =
    (currentStep.isLoaded && !previousStep.isLoading) || !!defaultConnections;

  useEffect(() => {
    if (defaultConnections) {
      updateAllConnections(defaultConnections);
    }

    if (defaultOutcomes?.length) {
      updateOutcomes(defaultOutcomes);
    }

    if (defaultSuboutcomes?.length) {
      updateSuboutcomes(defaultSuboutcomes);
    }

    if (defaultNutraceuticals?.length) {
      updateNutraceuticals(defaultNutraceuticals);
    }
  }, [
    defaultConnections,
    defaultOutcomes,
    defaultSuboutcomes,
    defaultNutraceuticals,
    updateAllConnections,
    updateOutcomes,
    updateSuboutcomes,
    updateNutraceuticals,
  ]);

  return (
    <Container id="step_2" isActive={isActive}>
      <VisibilitySensor
        active={!!isReady}
        onChange={isVisible => {
          if (isVisible) {
            if (!connections) {
              hotjar.event('go-to-step-2');
            }

            TagManager.dataLayer({
              dataLayer: {
                event: 'step2Viewed',
              },
            });
          }
        }}
      >
        <>
          <StepIntro
            id="step_2"
            title={labels?.step_2_title}
            subtitle={labels?.step_2_description}
            description={labels?.step_2_tooltip}
            icon={IoOptionsOutline}
            color="#DB71AF"
            isActive={isActive}
          />

          {isActive && (
            <SankeyProvider>
              <StepContent>
                {isReady && outcomes.length ? (
                  <>
                    <Outcomes />
                    <Nutraceuticals />
                  </>
                ) : (
                  <Loading color="#db71af" />
                )}
              </StepContent>
            </SankeyProvider>
          )}
        </>
      </VisibilitySensor>
    </Container>
  );
};

Sankey.defaultProps = {
  defaultConnections: undefined,
  defaultOutcomes: [],
  defaultSuboutcomes: [],
  defaultNutraceuticals: [],
};

export default Sankey;
