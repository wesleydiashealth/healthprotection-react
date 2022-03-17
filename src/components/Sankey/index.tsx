import React from 'react';
import 'reactjs-popup/dist/index.css';
import { IoOptionsOutline } from 'react-icons/io5';
import TagManager from 'react-gtm-module';
import VisibilitySensor from 'react-visibility-sensor';

import { useApp } from 'contexts/app';
import { SankeyProvider } from 'contexts/sankey';

import ConnectionsData from 'dtos/ConnectionsData';

import Loading from 'components/Loading';

import StepIntro from 'components/StepIntro';

import Outcomes from './components/Outcomes';
import Suboutcomes from './components/Suboutcomes';
import Nutraceuticals from './components/Nutraceuticals';

import Container, { StepContent } from './styles';

interface SankeyProps {
  connections?: ConnectionsData;
  showTooltips?: boolean;
  showFineTune?: boolean;
}

const Sankey: React.FC<SankeyProps> = ({
  connections,
  showTooltips,
  showFineTune,
}) => {
  const context = useApp();
  const { labels, steps, outcomes } = context;
  const { step1: previousStep, step2: currentStep } = steps;

  const isReady = currentStep.isLoaded && !previousStep.isLoading;

  return (
    <Container id="step_2" isActive={previousStep.isCompleted}>
      <VisibilitySensor
        active={!!isReady}
        onChange={isVisible => {
          if (isVisible) {
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
            isActive={previousStep.isCompleted}
          />
          {previousStep.isCompleted && (
            <SankeyProvider>
              {isReady ? (
                <StepContent>
                  {outcomes.length ? (
                    <>
                      <Outcomes
                        {...showTooltips}
                        selectedOutcomes={Object.keys(connections || {})}
                      />
                      <Suboutcomes
                        {...{ showTooltips, showFineTune }}
                        selectedSuboutcomes={Object.values(
                          connections || {},
                        ).reduce(
                          (acc: string[], curr) => [
                            ...acc,
                            ...Object.keys(curr),
                          ],
                          [],
                        )}
                      />
                      <Nutraceuticals />
                    </>
                  ) : (
                    <Loading color="#db71af" />
                  )}
                </StepContent>
              ) : (
                <Loading color="#db71af" />
              )}
            </SankeyProvider>
          )}
        </>
      </VisibilitySensor>
    </Container>
  );
};

Sankey.defaultProps = {
  connections: {},
  showTooltips: true,
  showFineTune: true,
};

export default Sankey;
