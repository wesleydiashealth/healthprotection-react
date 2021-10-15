import React, { useContext, useState, useEffect, useCallback } from 'react';
import ReactToolTip from 'react-tooltip';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { CarouselContext } from 'pure-react-carousel';
import Select from 'react-select';

import { useApp } from 'contexts/app';
import { useWizard } from 'contexts/wizard';

// import Button from 'components/Button';
import Input from 'components/Input';

import AnswerData from 'dtos/AnswerData';

import months from 'months.json';

import {
  StepContainer,
  QuestionPrefix,
  QuestionTitle,
  QuestionSuffix,
} from '../styles';

function getYears(startYear = 1901) {
  const currentYear = new Date().getFullYear();
  const years = [];

  let updatedYear = currentYear;

  while (startYear <= updatedYear) {
    updatedYear -= 1;

    years.push({
      value: updatedYear,
      label: updatedYear,
    });
  }

  return years;
}

const Step1: React.FC = () => {
  const appContext = useApp();
  const { answers, updateAnswers } = appContext;

  const wizardContext = useWizard();
  const { steps, questions, updateStep } = wizardContext;
  const { step1: step } = steps;
  const currentQuestion = questions.find(question => Number(question.id) === 1);

  const carouselContext = useContext(CarouselContext);
  const { setStoreState } = carouselContext;

  const [birthMonth, setBirthMonth] = useState<number>(0);
  const [birthYear, setBirthYear] = useState<number>(0);
  const [birthGroup, setBirthGroup] = useState<string>('');

  const wizardSteps = Object.keys(steps).filter(
    item => !item.includes('_'),
  ).length;

  useEffect(() => {
    setBirthGroup(`${birthMonth}/${birthYear}`);
  }, [birthMonth, birthYear]);

  const handleMonthInput = useCallback((month = '') => {
    setBirthMonth(month);
  }, []);

  const handleYearInput = useCallback(
    (year = '') => {
      const updatedAnswers: AnswerData[] = [...answers];

      const answerIndex = answers.findIndex(
        answer => answer.question.label === 'age',
      );

      setBirthYear(year);

      const today = new Date();
      const entryDate = new Date(birthYear, birthMonth);
      const yearsDiff = entryDate.getFullYear() - today.getFullYear();
      const monthsDiff =
        yearsDiff * 12 + (entryDate.getMonth() - today.getMonth());

      // 216 months = 18 years
      const isChild = monthsDiff >= -216;

      updateStep('step1', {
        index: 1,
        isCompleted: true,
        isExcluded: !isChild,
        excludeMessage: currentQuestion?.exclude,
        answers: `${birthMonth}/${year}`,
      });

      if (answerIndex > -1) {
        updatedAnswers[answerIndex] = {
          question: {
            slug: currentQuestion?.slug || '',
            label: currentQuestion?.label || '',
          },
          answer: {
            slug: `${birthMonth}/${year}`,
            label: `${birthMonth}/${year}`,
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
              slug: `${birthMonth}/${year}`,
              label: `${birthMonth}/${year}`,
            },
          },
        ]);
      }

      setStoreState({ currentSlide: 1 });
    },
    [
      answers,
      updateAnswers,
      birthMonth,
      birthYear,
      currentQuestion,
      setStoreState,
      updateStep,
    ],
  );

  const years = getYears();

  return (
    <StepContainer
      isDisabled={carouselContext.getStoreState().currentSlide !== 0}
    >
      {step.isCompleted && (
        <HiOutlineCheckCircle
          className="completed-icon"
          size={32}
          color="#1BC9BD"
        />
      )}
      <QuestionPrefix>Question 1/{wizardSteps}</QuestionPrefix>
      <QuestionTitle>{currentQuestion?.label}</QuestionTitle>
      <QuestionSuffix
        data-tip={`<strong>${currentQuestion?.label}</strong><span>${currentQuestion?.description}</span>`}
        data-for="step_1_tooltip"
      >
        Why are we asking?
      </QuestionSuffix>
      {/* <HiQuestionMarkCircle
        className="tooltip-icon"
        size={20}
        color="#7664C8"
        data-tip={`<strong>${currentQuestion?.label}</strong><span>${currentQuestion?.label}</span>`}
        data-for="step_1_tooltip"
      /> */}
      <ReactToolTip
        id="step_1_tooltip"
        className="step-tooltip"
        place="bottom"
        type="light"
        effect="solid"
        offset={{ top: 10, left: 100 }}
        html
        backgroundColor="#fff"
      />
      <Input type="hidden" name="age" value={birthGroup} />
      <Select
        name="birth_month"
        id="birth_month"
        className="select-input"
        options={months}
        placeholder="Select your birth month"
        onChange={event => {
          handleMonthInput(event?.value);
        }}
      />
      <Select
        name="birth_year"
        id="birth_year"
        className="select-input"
        options={years}
        placeholder="Select your birth year"
        isDisabled={!birthMonth}
        onChange={event => {
          handleYearInput(event?.value);
        }}
      />
    </StepContainer>
  );
};

export default Step1;
