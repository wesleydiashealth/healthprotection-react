import React, { useContext, useState } from 'react';
import ReactToolTip from 'react-tooltip';
import { HiQuestionMarkCircle, HiOutlineCheckCircle } from 'react-icons/hi';
import ScrollArea from 'react-scrollbar';
import { CarouselContext } from 'pure-react-carousel';

import { StepContainer } from '../styles';

import Button from '../../Button';

import { useWizard } from '../../../contexts/wizard';

const Step9: React.FC = () => {
  const context = useWizard();
  const { steps, questions } = context;
  const { step9: step, step8: previousStep, step8_1: previousSubStep } = steps;
  const { 11: currentQuestion } = questions || {};

  const [stepNumber] = useState<string>('9');
  const [stepTitle] = useState<string>(currentQuestion?.label || '');

  const carouselContext = useContext(CarouselContext);

  const wizardSteps = Object.keys(steps).filter(
    item => !item.includes('_'),
  ).length;

  return (
    <StepContainer
      isCompleted={step?.isCompleted}
      isDisabled={!previousStep.isCompleted && !previousSubStep.isCompleted}
    >
      {step?.answers.length > 0 && (
        <HiOutlineCheckCircle
          className="completed-icon"
          size={32}
          color="#1BC9BD"
        />
      )}
      <span>
        Question {stepNumber}/{wizardSteps}
      </span>
      <strong>{stepTitle}</strong>
      <HiQuestionMarkCircle
        className="tooltip-icon"
        size={20}
        color="#7664C8"
        data-tip={`<strong>${currentQuestion?.label}</strong><span>${currentQuestion?.label}</span>`}
        data-for="step_9_tooltip"
      />
      <ReactToolTip
        id="step_9_tooltip"
        className="step-tooltip"
        place="bottom"
        type="light"
        effect="solid"
        offset={{ top: 10, left: 100 }}
        html
        backgroundColor="#fff"
      />
      <ScrollArea className="buttons-list" smoothScrolling horizontal={false}>
        {currentQuestion?.answers &&
          Object.values(currentQuestion.answers).map(answer => (
            <Button
              key={answer.id}
              type="submit"
              onClick={() => {
                context.updateStep('step9', {
                  isCompleted: true,
                  answers: answer.api,
                });
                carouselContext.setStoreState({ currentSlide: 9 });
              }}
              isActive={step?.answers === answer.api}
              name="category"
              value={step?.answers}
            >
              {answer.label}
            </Button>
          ))}
      </ScrollArea>
    </StepContainer>
  );
};

export default Step9;