import React, { useContext, useCallback } from 'react';
import ReactToolTip from 'react-tooltip';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import ScrollArea from 'react-scrollbar';
import { CarouselContext } from 'pure-react-carousel';

import { useApp } from 'contexts/app';
import { useWizard } from 'contexts/wizard';

import Button from 'components/Button';
import Input from 'components/Input';

import AnswerData from 'dtos/AnswerData';

import {
  StepContainer,
  QuestionPrefix,
  QuestionTitle,
  QuestionSuffix,
} from '../styles';

const Step3: React.FC = () => {
  const appContext = useApp();
  const { labels, answers, updateAnswers } = appContext;

  const wizardContext = useWizard();
  const { steps, questions, updateStep } = wizardContext;
  const { step3: step, step2: previousStep, step2_1: previousSubStep } = steps;
  const currentQuestion = questions.find(question => Number(question.id) === 6);

  const carouselContext = useContext(CarouselContext);
  const { setStoreState } = carouselContext;

  const wizardSteps = Object.keys(steps).filter(
    item => !item.includes('_'),
  ).length;

  const handleButtonClick = useCallback(
    answer => {
      const { api: value, label } = answer;

      const updatedAnswers: AnswerData[] = [...answers];

      const answerIndex = answers.findIndex(
        item => item.question.slug === currentQuestion?.slug,
      );

      if (answerIndex > -1) {
        const updatedValues =
          (!!updatedAnswers.length &&
            updatedAnswers[answerIndex].answer.label.split(', ')) ||
          [];

        const noneIndex = updatedValues.indexOf('None');

        if (noneIndex > -1) {
          updatedValues.splice(noneIndex, 1);
        }

        if (!updatedValues.includes(label)) {
          updatedValues.push(label);
        } else {
          updatedValues.splice(updatedValues.indexOf(label), 1);
        }

        updatedAnswers[answerIndex] = {
          question: {
            slug: currentQuestion?.slug || '',
            label: currentQuestion?.label || '',
          },
          answer: {
            slug: answer.slug,
            label: updatedValues.join(', '),
          },
        };

        updateAnswers(updatedAnswers);
      } else {
        updateAnswers([
          ...answers,
          {
            question: {
              slug: currentQuestion?.slug || '',
              label: currentQuestion?.label || '',
            },
            answer: {
              slug: answer.slug,
              label,
            },
          },
        ]);
      }

      if (value === 'none') {
        updateStep('step3', { index: 3, isCompleted: true, answers: [value] });
        updatedAnswers[answerIndex] = {
          question: {
            slug: currentQuestion?.slug || '',
            label: currentQuestion?.label || '',
          },
          answer: {
            slug: 'none',
            label: 'None',
          },
        };
        setStoreState({ currentSlide: 3 });

        return;
      }

      const updatedDiets = Array.isArray(step.answers) ? step.answers : [];

      const noneIndex = updatedDiets.indexOf('none');

      if (noneIndex > -1) {
        updatedDiets.splice(noneIndex, 1);
      }

      if (!step?.answers.includes(value)) {
        updatedDiets.push(value);
      } else {
        updatedDiets.splice(step.answers.indexOf(value), 1);
      }

      updateStep('step3', { index: 3, answers: updatedDiets });
    },
    [step, updateStep, setStoreState, answers, currentQuestion, updateAnswers],
  );

  return currentQuestion?.answers ? (
    <StepContainer
      isCompleted={step?.isCompleted}
      isDisabled={
        (!previousStep.isCompleted && !previousSubStep.isCompleted) ||
        carouselContext.getStoreState().currentSlide !== 2
      }
    >
      {step?.isCompleted && (
        <HiOutlineCheckCircle
          className="completed-icon"
          size={32}
          color="#1BC9BD"
        />
      )}
      <QuestionPrefix>{`${
        labels.step_1_question || 'Question'
      } 3/${wizardSteps}`}</QuestionPrefix>
      <QuestionTitle>{currentQuestion?.label}</QuestionTitle>
      <QuestionSuffix
        data-tip={`<span>${currentQuestion?.description}</span>`}
        data-for="step_3_tooltip"
      >
        {labels.step_1_question_tooltip}
      </QuestionSuffix>
      {/* <HiQuestionMarkCircle
        className="tooltip-icon"
        size={20}
        color="#7664C8"
        data-tip={`<strong>${currentQuestion?.label}</strong><span>${currentQuestion?.label}</span>`}
        data-for="step_3_tooltip"
      /> */}
      <ReactToolTip
        id="step_3_tooltip"
        className="step-tooltip"
        place="bottom"
        type="light"
        effect="solid"
        offset={{ top: 10, left: 100 }}
        html
        backgroundColor="#fff"
      />
      <ScrollArea className="buttons-list" smoothScrolling horizontal={false}>
        <Input
          type="hidden"
          name={currentQuestion.table}
          value={step?.answers}
        />
        {Object.values(currentQuestion.answers).map(answer => (
          <Button
            key={answer.id}
            type="submit"
            onClick={() => {
              handleButtonClick(answer);
            }}
            isActive={step?.answers.indexOf(answer.api) > -1}
            name={`${currentQuestion.table}_selector`}
            value={step?.answers}
          >
            {answer.label}
          </Button>
        ))}
      </ScrollArea>
      {step?.answers.length > 0 && step.answers.indexOf('none') === -1 && (
        <button
          type="submit"
          className="advance-button"
          onClick={() => {
            updateStep('step3', {
              index: 3,
              isCompleted: true,
              answers: step?.answers,
            });
            setStoreState({ currentSlide: 3 });
          }}
        >
          {labels.step_1_next_question || 'Next Question'}
        </button>
      )}
    </StepContainer>
  ) : (
    <></>
  );
};

export default Step3;
