import React, { useState, useContext, useCallback } from 'react';
import ReactToolTip from 'react-tooltip';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { FaUndoAlt } from 'react-icons/fa';
import { CarouselContext } from 'pure-react-carousel';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

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

interface NutraceuticalData {
  slug: string;
  title: string;
}

const Step7: React.FC = () => {
  const appContext = useApp();
  const { labels, answers, nutraceuticals, updateAnswers } = appContext;

  const context = useWizard();
  const { steps, questions, updateStep } = context;
  const { step6: step, step5: previousStep } = steps;
  const currentQuestion = questions.find(
    question => Number(question.id) === 17,
  );

  const subSteps = [steps.step6_1, steps.step6_2];

  const subStepsCompleted = !!subSteps.filter(subStep => !!subStep.isCompleted)
    .length;

  const [stepNumber, setStepNumber] = useState<string>('6');
  const [stepTitle, setStepTitle] = useState<string>(
    currentQuestion?.label || '',
  );

  const carouselContext = useContext(CarouselContext);
  const { setStoreState } = carouselContext;

  const wizardSteps = Object.keys(steps).filter(
    item => !item.includes('_'),
  ).length;

  const handleQuestionInput = useCallback(
    async answer => {
      const updatedAnswers: AnswerData[] = [...answers];

      const answerIndex = answers.findIndex(
        item => item.question.slug === currentQuestion?.slug,
      );

      updateStep('step6', {
        index: 6,
        isCompleted: answer.api !== 'yes',
        answers: answer.api,
      });

      if (answerIndex > -1) {
        updatedAnswers[answerIndex] = {
          question: {
            slug: currentQuestion?.slug || '',
            label: currentQuestion?.label || '',
          },
          answer: {
            slug: answer.slug,
            label: answer.label,
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
              label: answer.label,
            },
          },
        ]);
      }

      if (answer.api !== 'yes') {
        setStoreState({ currentSlide: 6 });
      } else {
        setStepNumber('6.1');
        setStepTitle('Select below which one you use:');
      }
    },
    [answers, currentQuestion, updateStep, updateAnswers, setStoreState],
  );

  const handleButtonClick = useCallback(
    (
      medicationObject: NutraceuticalData[],
      updatedStep: string,
      subQuestion: string,
    ) => {
      const medicationsList: string[] = [];
      const medicationsLabels: string[] = [];

      if (medicationObject.length) {
        medicationObject.forEach(medication => {
          medicationsList.push(medication.slug);
          medicationsLabels.push(medication.title);
        });

        updateStep(updatedStep, {
          index: 6,
          isCompleted: true,
          answers: medicationsList,
        });
      } else {
        updateStep(updatedStep, {
          index: 6,
          isCompleted: false,
          answers: [],
        });
      }

      const updatedAnswers: AnswerData[] = [...answers];

      const answerIndex = answers.findIndex(
        answer => answer.question.slug === currentQuestion?.slug || '',
      );

      if (answerIndex > -1) {
        const updatedAnswer = updatedAnswers[answerIndex];
        const updatedSubAnswers = updatedAnswer.subAnswer || [];

        const subAnswerIndex = updatedSubAnswers.findIndex(
          currentSubAnswer => currentSubAnswer.question.label === subQuestion,
        );

        if (subAnswerIndex > -1) {
          updatedSubAnswers[subAnswerIndex] = {
            question: {
              slug: subQuestion,
              label: subQuestion,
            },
            answer: {
              slug: medicationsList.join(', '),
              label: medicationsLabels.join(', '),
            },
          };
        } else {
          updatedAnswers[answerIndex].subAnswer = [
            ...(updatedAnswer.subAnswer || []),
            {
              question: {
                slug: subQuestion,
                label: subQuestion,
              },
              answer: {
                slug: medicationsList.join(', '),
                label: medicationsLabels.join(', '),
              },
            },
          ];
        }

        updateAnswers(updatedAnswers);
      }
    },
    [answers, currentQuestion, updateAnswers, updateStep],
  );

  return currentQuestion?.answers ? (
    <StepContainer
      isCompleted={step?.isCompleted || subStepsCompleted}
      isDisabled={
        !previousStep?.isCompleted ||
        carouselContext.getStoreState().currentSlide !== 5
      }
    >
      {(step?.isCompleted || subStepsCompleted) && (
        <HiOutlineCheckCircle
          className="completed-icon"
          size={32}
          color="#1BC9BD"
        />
      )}
      <QuestionPrefix>
        Question {stepNumber}/{wizardSteps}
        {(step.isCompleted || !!step.answers.length) && (
          <FaUndoAlt
            size={16}
            color="#7664c8"
            onClick={() => {
              setStoreState({ currentSlide: 6 });
              setStepNumber('6');
              setStepTitle(currentQuestion?.label);
              updateStep('step6', {
                index: 6,
                isCompleted: false,
                answers: [],
              });
              updateStep('step6_1', {
                index: 6,
                isCompleted: false,
                answers: [],
              });
              updateStep('step6_2', {
                index: 6,
                isCompleted: false,
                answers: [],
              });
            }}
          />
        )}
      </QuestionPrefix>
      <QuestionTitle>{stepTitle}</QuestionTitle>
      <QuestionSuffix
        data-tip={`<span>${currentQuestion?.description}</span>`}
        data-for="step_6_tooltip"
      >
        Why are we asking?
      </QuestionSuffix>
      {/* <HiQuestionMarkCircle
        className="tooltip-icon"
        size={20}
        color="#7664C8"
        data-tip={`<strong>${
          step?.answers !== 'yes' ? currentQuestion?.label : stepTitle
        }</strong><span>${currentQuestion?.label}</span>`}
        data-for="step_6_tooltip"
      /> */}
      <ReactToolTip
        id="step_6_tooltip"
        className="step-tooltip"
        place="bottom"
        type="light"
        effect="solid"
        offset={{ top: 10, left: 100 }}
        html
        backgroundColor="#fff"
      />
      {step?.answers !== 'yes' ? (
        Object.values(currentQuestion?.answers).map(answer => (
          <Button
            key={answer.id}
            type="submit"
            onClick={() => {
              handleQuestionInput(answer);
            }}
            isActive={step?.answers === answer.api}
            name={currentQuestion.table}
            value={step?.answers}
          >
            {answer.label}
          </Button>
        ))
      ) : (
        <>
          <Input
            type="hidden"
            name="nutraceuticalsDaily"
            value={steps?.step6_1.answers}
          />
          <Autocomplete
            multiple
            id="nutraceuticals_daily"
            className="autocomplete-input"
            options={nutraceuticals}
            getOptionLabel={option => option.title}
            disabled={step?.isCompleted}
            onChange={(event, newValue) => {
              handleButtonClick(newValue, 'step6_1', 'Daily Use');
            }}
            ListboxProps={{
              style: {
                maxHeight: '300px',
              },
            }}
            renderInput={params => (
              <TextField
                {...params}
                variant="standard"
                label={labels.step_1_daily_use}
                placeholder="Type your medications"
              />
            )}
          />
          <Input
            type="hidden"
            name="nutraceuticalsOccasionally"
            value={steps?.step6_2.answers}
          />
          <Autocomplete
            multiple
            id="nutraceuticals_occasionally"
            className="autocomplete-input"
            options={nutraceuticals}
            getOptionLabel={option => option.title}
            disabled={step?.isCompleted}
            onChange={(event, newValue) => {
              handleButtonClick(newValue, 'step6_2', 'Occasionally Use');
            }}
            ListboxProps={{
              style: {
                maxHeight: '300px',
              },
            }}
            renderInput={params => (
              <TextField
                {...params}
                variant="standard"
                label={labels.step_1_occasionally_use}
                placeholder="Type your medications"
              />
            )}
          />
          {subStepsCompleted && (
            <button
              type="submit"
              className="advance-button"
              onClick={() => {
                updateStep('step6', {
                  index: 6,
                  isCompleted: true,
                  answers: step?.answers,
                });
                setStoreState({ currentSlide: 6 });
              }}
            >
              {labels.step_1_next_question}
            </button>
          )}
        </>
      )}
    </StepContainer>
  ) : (
    <></>
  );
};

export default Step7;
