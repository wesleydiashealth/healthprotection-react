import React from 'react';
import ReactToolTip from 'react-tooltip';
import 'reactjs-popup/dist/index.css';
import { HiQuestionMarkCircle, HiLockClosed } from 'react-icons/hi';
import { IoOptionsOutline } from 'react-icons/io5';
import TagManager from 'react-gtm-module';
import VisibilitySensor from 'react-visibility-sensor';
import { hotjar } from 'react-hotjar';

import Loading from 'components/Loading';
import Outcomes from './components/Outcomes';
import Nutraceuticals from './components/Nutraceuticals';

import Container, {
  StepIntro,
  StepTitle,
  StepDescription,
  StepContent,
} from './styles';

import { useApp } from '../../contexts/app';
import { SankeyProvider } from '../../contexts/sankey';

const Sankey: React.FC = () => {
  const context = useApp();
  const { steps, outcomes } = context;
  const { step1: previousStep, step2: currentStep } = steps;

  const isReady = currentStep.isLoaded && !previousStep.isLoading;

  return (
    <Container id="step_2" isActive={previousStep.isCompleted}>
      <VisibilitySensor
        active={!!isReady}
        onChange={isVisible => {
          if (isVisible) {
            hotjar.event('go-to-step-2');

            TagManager.dataLayer({
              dataLayer: {
                event: 'step2Viewed',
              },
            });
          }
        }}
      >
        <>
          <StepIntro>
            <IoOptionsOutline
              size={52}
              color={previousStep.isCompleted ? '#DB71AF' : '#565656'}
            />
            <StepTitle>
              {!previousStep.isCompleted && (
                <HiLockClosed size={20} className="locked-icon" />
              )}
              Step 2
              <HiQuestionMarkCircle
                className="tooltip-icon"
                size={20}
                color={previousStep.isCompleted ? '#DB71AF' : '#565656'}
                data-tip="<strong>Step 2</strong><span>We have already preselected the results that are available for you to choose from. Adjust the areas of health in which you want to improve by setting the desired intensity.</span>"
                data-for="sankey-title-tooltip"
              />
              <ReactToolTip
                id="sankey-title-tooltip"
                className="sankey-title-tooltip"
                place="bottom"
                type="light"
                effect="solid"
                offset={{ top: 10, left: 10 }}
                html
                backgroundColor="#fff"
              />
            </StepTitle>
            {!previousStep.isCompleted && (
              <div className="step-disabled">
                <strong>Step Blocked.</strong>{' '}
                <span>Finish Step 1 to proceed.</span>
              </div>
            )}
            <StepDescription>
              <strong>Fine-tune</strong> your desired outcomes
            </StepDescription>
          </StepIntro>
          {previousStep.isCompleted && (
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

export default Sankey;
