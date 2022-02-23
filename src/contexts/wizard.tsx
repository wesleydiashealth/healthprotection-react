import React, { createContext, useContext, useState, useEffect } from 'react';
import { CarouselContext, CarouselStoreInterface } from 'pure-react-carousel';

import wordpressApi from 'services/wordpress';
import GetSubdomain from 'services/GetSubdomain';

import QuestionData from 'dtos/QuestionData';
import QuestionAnswersData from 'dtos/QuestionAnswersData';

interface StepData {
  index: number;
  isCompleted?: boolean;
  isActive?: boolean;
  isDisabled?: boolean;
  isExcluded?: boolean;
  excludeMessage?: string;
  answers: string | Array<string>;
  subAnswers?: QuestionAnswersData[];
}

interface StepsData {
  [key: string]: StepData;
}

interface WizardContextData {
  steps: StepsData;
  questions: QuestionData[];
  error: string;
  currentSlide: number;
  updateStep(step: string, attrs: StepData): Promise<void>;
  resetSteps(): Promise<void>;
}

const WizardContext = createContext<WizardContextData>({} as WizardContextData);

export const WizardProvider: React.FC = ({ children }) => {
  const carouselContext: CarouselStoreInterface = useContext(CarouselContext);

  const [steps, setSteps] = useState<StepsData>({
    step1: { index: 1, isCompleted: false, answers: [] },
    step2: { index: 2, isCompleted: false, answers: [] },
    step2_1: { index: 2, isCompleted: false, answers: [] },
    step3: { index: 3, isCompleted: false, answers: [] },
    step4: { index: 4, isCompleted: false, answers: [] },
    step5: { index: 5, isCompleted: false, answers: [] },
    step5_1: { index: 5, isCompleted: false, answers: [] },
    step5_2: { index: 5, isCompleted: false, answers: [] },
    step6: { index: 6, isCompleted: false, answers: [] },
    step6_1: { index: 6, isCompleted: false, answers: [] },
    step6_2: { index: 6, isCompleted: false, answers: [] },
    // step7: { index: 7, isCompleted: false, answers: [] },
  });

  const [questions, setQuestions] = useState<QuestionData[]>([]);

  const [error, setError] = useState<string>('');

  const [currentSlide, setCurrentSlide] = useState<number>(
    carouselContext.state.currentSlide,
  );

  useEffect(() => {
    function onChange() {
      setCurrentSlide(carouselContext.state.currentSlide);
    }
    carouselContext.subscribe(onChange);
    return () => carouselContext.unsubscribe(onChange);
  }, [carouselContext]);

  useEffect(() => {
    wordpressApi
      .get(`/wp-json/hp/v1/wizard/${GetSubdomain()}`)
      .then(response => {
        const { content, success, message } = response.data;

        if (success) {
          setQuestions(content);
          setError('');
        } else {
          setError(message);
        }
      })
      .catch(err => {
        if (err.response) {
          setError(err.response.data.message);
        } else if (err.request) {
          const errorMessage = err.request.response
            ? JSON.parse(err.request.response).message
            : 'Unknown Error';

          setError(errorMessage);
        } else {
          setError(err.message);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function updateStep(step: string, attrs: StepData) {
    steps[step] = attrs;

    setSteps({ ...steps });
  }

  async function resetSteps() {
    Object.keys(steps).forEach(step => {
      updateStep(step, {
        index: parseInt(step.replace(/^\D+/g, ''), 10),
        isCompleted: false,
        answers: [],
      });
    });
  }

  return (
    <WizardContext.Provider
      value={{
        steps,
        questions,
        error,
        currentSlide,
        updateStep,
        resetSteps,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};

export function useWizard(): WizardContextData {
  const context = useContext(WizardContext);

  return context;
}
