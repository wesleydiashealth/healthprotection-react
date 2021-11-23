import React, { useContext, useRef } from 'react';
import { AiOutlineStop } from 'react-icons/ai';
import { HiLockClosed } from 'react-icons/hi';
import { CarouselContext } from 'pure-react-carousel';
import { FormHandles } from '@unform/core';
import ReactHtmlParser from 'react-html-parser';

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
  const { labels, steps: appSteps, count, updateStep } = appContext;

  const { step1: currentStep, step2: nextStep } = appSteps;

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
          {nextStep.isLoaded ? (
            <>
              <ChecklistIcon />
              <Title>{labels.step_1_complete_title}</Title>
              <Description>
                {labels.step_1_complete_text &&
                  ReactHtmlParser(labels.step_1_complete_text)}
              </Description>
              <Infos>
                {count?.outcomes?.total && count?.outcomes?.filtered && (
                  <Info>
                    <OutcomesIcon />
                    <InfoTitle>Outcomes</InfoTitle>
                    <InfoDescription>
                      {labels.step_1_info_text
                        .replace('%1', count.outcomes.total.toString())
                        .replace('%2', count.outcomes.filtered.toString())}
                    </InfoDescription>
                  </Info>
                )}
                {count?.nutraceuticals?.total &&
                  count?.nutraceuticals?.filtered && (
                    <Info>
                      <NutraceuticalsIcon />
                      <InfoTitle>Nutraceuticals</InfoTitle>
                      <InfoDescription>
                        {labels.step_1_info_text
                          .replace('%1', count.nutraceuticals.total.toString())
                          .replace(
                            '%2',
                            count.nutraceuticals.filtered.toString(),
                          )}
                      </InfoDescription>
                    </Info>
                  )}
              </Infos>
              <Instruction>
                {labels.step_1_advance_text &&
                  ReactHtmlParser(labels.step_1_advance_text)}
              </Instruction>
              {/* <Instruction>
            Go safely to the Step 2 100% risks free based on your answers.
          </Instruction> */}
            </>
          ) : (
            <>
              {currentStep.isCompleted ? (
                <Loading color="#db71af" />
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
      {nextStep.isLoaded && (
        <Buttons>
          <Button
            background="#707070"
            onClick={() => {
              resetSteps();
              updateStep('step1', { ...currentStep, isCompleted: false });
              setStoreState({ currentSlide: 0 });
            }}
          >
            {labels.step_1_reset}
          </Button>
          <Button
            href="#step_2"
            className="step-1-completed"
            onClick={() => {
              formRef.current?.submitForm();
            }}
            isDisabled={!!excludeStep?.length}
          >
            {labels.step_1_advance}
          </Button>
        </Buttons>
      )}
    </Container>
  );
};

export default Step10;
