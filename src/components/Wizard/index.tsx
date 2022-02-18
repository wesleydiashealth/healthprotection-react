import React, { useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { HiQuestionMarkCircle, HiLockClosed } from 'react-icons/hi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import * as Yup from 'yup';
import { IoChatbubblesOutline } from 'react-icons/io5';

import { useApp } from 'contexts/app';

import createUserQuery from 'services/createUserQuery';

import getValidationErrors from 'utils/getValidationErrors';
import getFoods from 'services/getFoods';

import { WizardProvider } from 'contexts/wizard';
import Container, {
  StepIntro,
  StepTooltip,
  StepTitle,
  StepDescription,
} from './styles';
import 'react-multi-carousel/lib/styles.css';
import 'pure-react-carousel/dist/react-carousel.es.css';

import Carousel from './Carousel';

import Navigation from './Navigation';

import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
// import Step6 from './Step6';
import Step7 from './Step7';
// import Step8 from './Step8';
// import Step9 from './Step9';
import Step10 from './Step10';

interface RequestData {
  question: string;
  answer: string;
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Wizard: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const query = useQuery();

  const context = useApp();
  const {
    userQuery,
    labels,
    steps,
    selectedNutraceuticals,
    updateExcludes,
    updateUserQuery,
    updateOutcomes,
    updateSuboutcomes,
    updateConnections,
    updateSelectedNutraceuticals,
    updateStep,
    updateCount,
    updateError,
    updateFoods,
  } = context;

  const previousStep = { isCompleted: true };
  const { step1: currentStep, step2: nextStep } = steps;

  const handleSubmit = useCallback(
    async (data: HTMLFormElement) => {
      const { age, gender, femaleCondition, diet, allergies, med, nutra } =
        data;

      updateStep('step2', { ...nextStep, isLoaded: false });

      const requestData: RequestData[] = [
        { question: 'age', answer: age },
        { question: 'gender', answer: femaleCondition || gender },
        { question: 'diet', answer: diet },
        { question: 'allergies', answer: allergies },
        { question: 'med', answer: med },
        { question: 'nutra', answer: nutra },
      ];

      const isCompleted = requestData.reduce(
        (acc, { answer }) => !!answer,
        false,
      );

      if (!isCompleted) return;

      updateStep('step1', {
        ...currentStep,
        isCompleted: true,
        isLoading: true,
      });

      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          age: Yup.string().required('Idade obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const response = await createUserQuery(
          requestData,
          query.get('lang') || '',
        );

        const { uuid, outcomes, suboutcomes, excludes, count } =
          response.content;

        const queryOutcome = query.get('outcome');

        const filteredOutcomes = queryOutcome
          ? outcomes
              .filter(
                outcome =>
                  outcome.id === queryOutcome ||
                  outcome.suboutcomes.includes(queryOutcome),
              )
              .map(outcome => {
                return {
                  ...outcome,
                  suboutcomes: outcome.suboutcomes.filter(
                    suboutcome => suboutcome === queryOutcome,
                  ),
                };
              })
          : outcomes;

        const filteredSuboutcomes = queryOutcome
          ? suboutcomes.filter(suboutcome => suboutcome.id === queryOutcome)
          : suboutcomes;

        updateStep('step2', { ...nextStep, isLoaded: true });

        const newNutraceuticals = filteredSuboutcomes.reduce(
          (acc: string[], suboutcome) => {
            const abcd = Object.values(suboutcome.nutraceuticals).reduce(
              (subAcc, nutraceuticals) =>
                Array.from(new Set([...subAcc, ...nutraceuticals])),
            );

            return Array.from(new Set([...acc, ...abcd]));
          },
          [],
        );

        const updatedNutraceuticals = selectedNutraceuticals.filter(
          selectedNutraceutical =>
            newNutraceuticals.includes(selectedNutraceutical),
        );

        updateUserQuery(uuid);
        updateExcludes(excludes);
        updateOutcomes(filteredOutcomes);
        updateSuboutcomes(filteredSuboutcomes);
        updateCount(count);
        updateConnections(filteredOutcomes, filteredSuboutcomes);

        updateSelectedNutraceuticals(updatedNutraceuticals);

        const { content: foods } = await getFoods({
          uuid: userQuery,
          nutraceuticals: updatedNutraceuticals,
        });

        updateFoods(foods);

        updateStep('step1', { ...currentStep, isLoading: false });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }

        if (err instanceof Error) {
          updateError(err.message);
        }
      }
    },
    [
      currentStep,
      nextStep,
      selectedNutraceuticals,
      updateUserQuery,
      updateStep,
      updateExcludes,
      updateOutcomes,
      updateSuboutcomes,
      updateConnections,
      updateCount,
      updateError,
      updateFoods,
      updateSelectedNutraceuticals,
      userQuery,
      query,
    ],
  );

  return (
    <Container id="step_1" isActive={!!previousStep.isCompleted}>
      <StepIntro>
        <IoChatbubblesOutline
          size={52}
          color={previousStep.isCompleted ? '#7664C8' : '#565656'}
        />
        <StepTitle>
          {!previousStep.isCompleted && <HiLockClosed size={20} />}
          {labels?.step_1_title}
          <HiQuestionMarkCircle
            size={20}
            color={previousStep.isCompleted ? '#7664C8' : '#565656'}
            data-tip={`<strong>${labels?.step_1_title}</strong><span>${labels?.step_1_tooltip}</span>`}
            data-for="wizard-title-tooltip"
          />
          <StepTooltip
            id="wizard-title-tooltip"
            place="bottom"
            type="light"
            effect="solid"
            offset={{ top: 10, left: 10 }}
            html
            backgroundColor="#fff"
          />
        </StepTitle>
        <StepDescription>
          <strong>{labels?.step_1_description.split(' ')[0]}</strong>{' '}
          {labels.step_1_description.substr(
            labels.step_1_description.indexOf(' ') + 1,
          )}
        </StepDescription>
      </StepIntro>
      {previousStep.isCompleted && (
        <Form ref={formRef} onSubmit={handleSubmit}>
          <CarouselProvider
            naturalSlideWidth={400}
            naturalSlideHeight={480}
            totalSlides={7}
            visibleSlides={1}
            step={1}
            dragEnabled={false}
          >
            <WizardProvider>
              <Carousel>
                <Navigation />
                <Slider>
                  <Slide index={1}>
                    <Step1 />
                  </Slide>
                  <Slide index={2}>
                    <Step2 />
                  </Slide>
                  <Slide index={3}>
                    <Step3 />
                  </Slide>
                  <Slide index={4}>
                    <Step4 />
                  </Slide>
                  <Slide index={5}>
                    <Step5 />
                  </Slide>
                  {/* <Slide index={6}>
                    <Step6 />
                  </Slide> */}
                  <Slide index={6}>
                    <Step7 />
                  </Slide>
                  {/* <Slide index={8}>
                    <Step8 />
                  </Slide> */}
                  {/* <Slide index={7}>
                    <Step9 />
                  </Slide> */}
                  <Slide index={8}>
                    <Step10 />
                  </Slide>
                </Slider>
              </Carousel>
            </WizardProvider>
          </CarouselProvider>
        </Form>
      )}
    </Container>
  );
};

export default Wizard;
