import React, { useContext, useRef } from 'react';
import { AiOutlineStop } from 'react-icons/ai';
import { HiLockClosed } from 'react-icons/hi';
import { BiErrorCircle } from 'react-icons/bi';
import { CarouselContext } from 'pure-react-carousel';
import { FormHandles } from '@unform/core';
import ReactHtmlParser from 'react-html-parser';
import TagManager from 'react-gtm-module';

import Loading from 'components/Loading';

import { useApp } from 'contexts/app';
import { useWizard } from 'contexts/wizard';
import Container, {
  ChecklistIcon,
  OutcomesIcon,
  NutraceuticalsIcon,
  Title,
  Description,
  Infos,
  Info,
  InfoTitle,
  InfoDescription,
  Instruction,
  Buttons,
  Button,
} from './styles';

const Step10: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const appContext = useApp();
  const { labels, steps: appSteps, count, error, updateStep } = appContext;

  const { step1: currentStep, step2: nextStep } = appSteps;

  const isReady = nextStep.isLoaded && !currentStep.isLoading;

  const wizardContext = useWizard();
  const { steps, resetSteps } = wizardContext;

  const carouselContext = useContext(CarouselContext);
  const { setStoreState } = carouselContext;

  const parentSteps = Object.entries(steps)
    .filter(({ 0: key }) => !key.includes('_'))
    .reverse();

  const excludeStep = parentSteps.find(
    ({ 1: parentStep }) => parentStep.isExcluded,
  );

  const excludeStepData = excludeStep && excludeStep[1];

  return (
    <Container>
      {excludeStep?.length ? (
        <>
          <AiOutlineStop size={52} color="#DB71AF" />
          <Title>Sorry, we can´t proceed</Title>
          <Description>{excludeStepData?.excludeMessage}</Description>
        </>
      ) : (
        <>
          {isReady ? (
            <>
              <ChecklistIcon />
              <Title>
                {labels.step_1_complete_title ||
                  'Well done, now it´s time to fine-tune your health goals'}
              </Title>
              <Description>
                {labels.step_1_complete_text
                  ? ReactHtmlParser(labels.step_1_complete_text)
                  : 'Based on your answers we’ve filtered'}
              </Description>
              <Infos>
                {count?.outcomes?.total && count?.outcomes?.filtered && (
                  <Info>
                    <OutcomesIcon color="#565656" />
                    <InfoTitle>Health Goals</InfoTitle>
                    <InfoDescription>
                      {labels.step_1_info_text &&
                        labels.step_1_info_text
                          .replace(
                            '%1',
                            count?.outcomes?.total.toString() || '',
                          )
                          .replace(
                            '%2',
                            count?.outcomes?.filtered.toString() || '',
                          )}
                    </InfoDescription>
                  </Info>
                )}
                {count?.nutraceuticals?.total &&
                  count?.nutraceuticals?.filtered && (
                    <Info>
                      <NutraceuticalsIcon />
                      <InfoTitle>Dietary Supplements</InfoTitle>
                      <InfoDescription>
                        {labels.step_1_info_text &&
                          labels.step_1_info_text
                            .replace(
                              '%1',
                              count.nutraceuticals.total.toString() || '',
                            )
                            .replace(
                              '%2',
                              count.nutraceuticals.filtered.toString() || '',
                            )}
                      </InfoDescription>
                    </Info>
                  )}
              </Infos>
              <Instruction>
                {labels.step_1_advance_text
                  ? ReactHtmlParser(labels.step_1_advance_text)
                  : 'Go safety to the Step 2 100% risk free'}
              </Instruction>
              {/* <Instruction>
            Go safely to the Step 2 100% risks free based on your answers.
          </Instruction> */}
            </>
          ) : (
            <>
              {currentStep.isCompleted && !error ? (
                <Loading color="#db71af" />
              ) : (
                <>
                  {error ? (
                    <>
                      <BiErrorCircle size={52} color="#db71af" />
                      <Title>{error}</Title>
                    </>
                  ) : (
                    <>
                      <HiLockClosed size={52} color="#db71af" />
                      <Title>Answer all questions to proceed</Title>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
      {isReady && (
        <Buttons>
          <Button
            background="#707070"
            onClick={() => {
              resetSteps();
              updateStep('step1', { ...currentStep, isCompleted: false });
              setStoreState({ currentSlide: 0 });
            }}
          >
            {labels.step_1_reset || 'Reset'}
          </Button>
          <Button
            href="#step_2"
            className="step-1-completed"
            onClick={() => {
              formRef.current?.submitForm();

              TagManager.dataLayer({
                dataLayer: {
                  event: 'goToStep2',
                },
              });
            }}
            isDisabled={!!excludeStep?.length}
          >
            {labels.step_1_advance || 'Go to Step 2'}
          </Button>
        </Buttons>
      )}
    </Container>
  );
};

export default Step10;
