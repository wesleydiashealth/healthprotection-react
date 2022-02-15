import React, { useCallback, useContext, useEffect, useState } from 'react';
import ReactToolTip from 'react-tooltip';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { FaUndoAlt } from 'react-icons/fa';
import { CarouselContext } from 'pure-react-carousel';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import CircularProgress from '@material-ui/core/CircularProgress';

import getMedications from 'services/getMedications';

import { useApp } from 'contexts/app';
import { useWizard } from 'contexts/wizard';
// import medications from 'medications.json';

import AnswerData from 'dtos/AnswerData';

import Button from 'components/Button';
import Input from 'components/Input';
import {
  StepContainer,
  QuestionPrefix,
  QuestionTitle,
  QuestionSuffix,
} from '../styles';

interface MedicationData {
  slug: string;
  title: string;
}

const Step5: React.FC = () => {
  const appContext = useApp();
  const { labels, answers, updateAnswers } = appContext;

  const wizardContext = useWizard();
  const { steps, questions, updateStep } = wizardContext;
  const { step5: step, step4: previousStep } = steps;
  const currentQuestion = questions.find(question => Number(question.id) === 8);

  const subSteps = [steps.step5_1, steps.step5_2];

  const subStepsCompleted = !!subSteps.filter(subStep => !!subStep.isCompleted)
    .length;

  const [stepNumber, setStepNumber] = useState<string>('5');
  const [stepTitle, setStepTitle] = useState<string>(
    currentQuestion?.label || '',
  );

  const carouselContext = useContext(CarouselContext);

  const wizardSteps = Object.keys(steps).filter(
    item => !item.includes('_'),
  ).length;

  const [meds, setMeds] = useState<string[]>([]);

  const [medDaily, setMedDaily] = useState<MedicationData[]>([]);
  const [medDailyOpen, setMedDailyOpen] = useState(false);
  const medDailyLoading = medDailyOpen && medDaily.length === 0;

  const [medOcca, setMedOcca] = useState<MedicationData[]>([]);
  const [medOccaOpen, setMedOccaOpen] = useState(false);
  const medOccaLoading = medOccaOpen && medOcca.length === 0;

  useEffect(() => {
    let mergedMeds: string[] = [];

    mergedMeds = mergedMeds.concat(steps.step5_1.answers);
    mergedMeds = mergedMeds.concat(steps.step5_2.answers);

    const updatedMeds = Array.from(new Set(mergedMeds));

    setMeds(updatedMeds);
  }, [steps.step5_1.answers, steps.step5_2.answers]);

  useEffect(() => {
    if (!medDailyOpen) {
      setMedDaily([]);
    }
  }, [medDailyOpen]);

  useEffect(() => {
    if (!medOccaOpen) {
      setMedOcca([]);
    }
  }, [medOccaOpen]);

  const handleQuestionInput = useCallback(
    async answer => {
      const updatedAnswers: AnswerData[] = [...answers];

      const answerIndex = answers.findIndex(
        item => item.question.slug === currentQuestion?.slug,
      );

      updateStep('step5', {
        index: 5,
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
        carouselContext.setStoreState({ currentSlide: 5 });
      } else {
        setStepNumber('5.1');
        setStepTitle('Select below which medications you use:');
      }
    },
    [answers, currentQuestion, carouselContext, updateStep, updateAnswers],
  );

  const handleMedDailyInput = useCallback(async (medication: string) => {
    const response = await getMedications(medication);

    if (!response.length) setMedDailyOpen(false);
    setMedDaily(response);
  }, []);

  const handleMedOccaInput = useCallback(async (medication: string) => {
    const response = await getMedications(medication);

    if (!response.length) setMedOccaOpen(false);
    setMedOcca(response);
  }, []);

  const handleMedChange = useCallback(
    (
      medicationObject: MedicationData[],
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
          index: 5,
          isCompleted: true,
          answers: medicationsList,
        });
      } else {
        updateStep(updatedStep, {
          index: 5,
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
      isCompleted={step?.isCompleted}
      isDisabled={
        !previousStep?.isCompleted ||
        carouselContext.getStoreState().currentSlide !== 4
      }
    >
      {((step?.answers.length > 0 && step?.isCompleted) ||
        step?.answers === 'no') && (
        <HiOutlineCheckCircle
          className="completed-icon"
          size={32}
          color="#1BC9BD"
        />
      )}
      <QuestionPrefix>
        {`${labels.step_1_question || 'Question'} ${stepNumber}/${wizardSteps}`}
        {(step.isCompleted || !!step.answers.length) && (
          <FaUndoAlt
            size={16}
            color="#7664c8"
            onClick={() => {
              carouselContext.setStoreState({ currentSlide: 4 });
              setStepNumber('5');
              setStepTitle(currentQuestion?.label);
              updateStep('step5', {
                index: 5,
                isCompleted: false,
                answers: [],
              });
              updateStep('step5_1', {
                index: 5,
                isCompleted: false,
                answers: [],
              });
              updateStep('step5_2', {
                index: 5,
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
        data-for="step_5_tooltip"
      >
        {labels.step_1_question_tooltip}
      </QuestionSuffix>
      {/* <HiQuestionMarkCircle
        className="tooltip-icon"
        size={20}
        color="#7664C8"
        data-tip={`<strong>${stepTitle}</strong><span>${stepTitle}</span>`}
        data-for="step_5_medications_tooltip"
      /> */}
      <ReactToolTip
        id="step_5_tooltip"
        className="step-tooltip"
        place="bottom"
        type="light"
        effect="solid"
        offset={{ top: 10, left: 100 }}
        html
        backgroundColor="#fff"
      />
      {step?.answers !== 'yes' ? (
        Object.values(currentQuestion.answers).map(option => (
          <Button
            key={option.api}
            type="submit"
            onClick={() => {
              handleQuestionInput(option);
            }}
            isActive={step?.answers === option.api}
            name={currentQuestion.table}
            value={step?.answers}
          >
            {option.label}
          </Button>
        ))
      ) : (
        <>
          <Input type="hidden" name="med" value={meds} />
          <Input type="hidden" name="medDaily" value={steps?.step5_1.answers} />
          <Autocomplete
            multiple
            id="medications_daily"
            className="autocomplete-input"
            open={medDailyOpen}
            onClose={() => {
              setMedDailyOpen(false);
            }}
            onInputChange={(event, value) => {
              if (value.length >= 3) {
                setMedDailyOpen(true);
                handleMedDailyInput(value);
              } else {
                setMedDailyOpen(false);
              }
            }}
            onChange={(event, newValue) => {
              handleMedChange(newValue, 'step5_1', 'Daily Use');
            }}
            getOptionSelected={(option, value) => option.slug === value.slug}
            getOptionLabel={option => option.title}
            options={medDaily}
            loading={medDailyLoading}
            renderInput={params => (
              <TextField
                {...params}
                label={labels.step_1_daily_use}
                variant="standard"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {medDailyLoading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
          <Input
            type="hidden"
            name="medOccasionally"
            value={steps?.step5_2.answers}
          />

          <Autocomplete
            multiple
            id="medications_occasionally"
            className="autocomplete-input"
            open={medOccaOpen}
            onClose={() => {
              setMedOccaOpen(false);
            }}
            onInputChange={(event, value) => {
              if (value.length >= 3) {
                setMedOccaOpen(true);
                handleMedOccaInput(value);
              } else {
                setMedOccaOpen(false);
              }
            }}
            onChange={(event, newValue) => {
              handleMedChange(newValue, 'step5_2', 'Occasionally Use');
            }}
            getOptionSelected={(option, value) => option.slug === value.slug}
            getOptionLabel={option => option.title}
            options={medOcca}
            loading={medOccaLoading}
            renderInput={params => (
              <TextField
                {...params}
                label={labels.step_1_occasionally_use}
                variant="standard"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {medOccaLoading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
          {subStepsCompleted && (
            <button
              type="submit"
              className="advance-button"
              onClick={() => {
                updateStep('step5', {
                  index: 5,
                  isCompleted: true,
                  answers: step?.answers,
                });
                carouselContext.setStoreState({ currentSlide: 5 });
              }}
            >
              {labels.step_1_next_question || 'Next Question'}
            </button>
          )}
        </>
      )}
    </StepContainer>
  ) : (
    <></>
  );
};

export default Step5;
