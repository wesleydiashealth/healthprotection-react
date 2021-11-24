import React, { useCallback, useRef } from 'react';
import { HiQuestionMarkCircle, HiLockClosed } from 'react-icons/hi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import * as Yup from 'yup';
import { IoChatbubblesOutline } from 'react-icons/io5';

import { useApp } from 'contexts/app';

import createUserQuery from 'services/createUserQuery';

import getValidationErrors from 'utils/getValidationErrors';

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
import Step9 from './Step9';
import Step10 from './Step10';

interface RequestData {
  question: string;
  answer: string;
}

const Wizard: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const context = useApp();
  const {
    labels,
    steps,
    updateExcludes,
    updateUserQuery,
    updateOutcomes,
    updateSuboutcomes,
    updateConnections,
    updateStep,
    updateCount,
  } = context;

  const previousStep = { isCompleted: true };
  const { step1: currentStep, step2: nextStep } = steps;

  const handleSubmit = useCallback(
    async (data: HTMLFormElement) => {
      const { age, gender, diet, allergies, med, decease } = data;

      updateStep('step2', { ...nextStep, isLoaded: false });

      const requestData: RequestData[] = [
        { question: 'age', answer: age },
        { question: 'gender', answer: gender },
        { question: 'diet', answer: diet },
        { question: 'allergies', answer: allergies },
        { question: 'med', answer: med },
        { question: 'decease', answer: decease },
      ];

      const isCompleted = requestData.reduce(
        (acc, { answer }) => !!answer,
        false,
      );

      if (!isCompleted) return;

      updateStep('step1', { ...currentStep, isCompleted: true });

      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          age: Yup.string().required('Idade obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const response = await createUserQuery(requestData);
        const { uuid, outcomes, suboutcomes, excludes, count } =
          response.content;

        updateStep('step2', { ...nextStep, isLoaded: true });

        updateUserQuery(uuid);
        updateExcludes(excludes);
        updateOutcomes(outcomes);
        updateSuboutcomes(suboutcomes);
        updateCount(count);
        updateConnections(outcomes, suboutcomes);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [
      currentStep,
      nextStep,
      updateUserQuery,
      updateStep,
      updateExcludes,
      updateOutcomes,
      updateSuboutcomes,
      updateConnections,
      updateCount,
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
          {labels?.step_1_title || 'Step 1'}
          <HiQuestionMarkCircle
            size={20}
            color={previousStep.isCompleted ? '#7664C8' : '#565656'}
            data-tip={`<strong>${
              labels?.step_1_title || 'Step 1'
            }</strong><span>${
              labels?.step_1_tooltip ||
              'We have made a pre-selection of questions that will help filter the nutraceuticals that your body needs. Answer truthfully for a safe indication.'
            }</span>`}
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
            naturalSlideHeight={460}
            totalSlides={8}
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
                  <Slide index={7}>
                    <Step9 />
                  </Slide>
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
