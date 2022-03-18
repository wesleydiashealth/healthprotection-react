import React from 'react';
import { GiForkKnifeSpoon } from 'react-icons/gi';
import 'react-dropdown/style.css';
import ReactHtmlParser from 'react-html-parser';
import TagManager from 'react-gtm-module';
import VisibilitySensor from 'react-visibility-sensor';
import { hotjar } from 'react-hotjar';

import { useApp } from 'contexts/app';

import Loading from 'components/Loading';
import StepIntro from 'components/StepIntro';

import BuildNutraceuticalsString from 'services/BuildNutraceuticalsString';

import Habit from './components/Habit';

import Container, {
  HabitsContainer,
  ReducedHabits,
  RemovedHabits,
  InvalidNutraceuticals,
} from './styles';

const Habits: React.FC = () => {
  const context = useApp();
  const {
    labels,
    steps,
    nutraceuticals,
    selectedNutraceuticals,
    foods,
    discounts,
    error,
  } = context;
  const { step1: initialStep, step2: previousStep, step3: currentStep } = steps;

  const isReady = !initialStep.isLoading && !previousStep.isLoading;

  const isActive =
    previousStep.isCompleted &&
    initialStep.isCompleted &&
    !!selectedNutraceuticals.length;

  const foodsNutraceuticals = foods.reduce(
    (acc: string[], { interactions }) =>
      Array.from(
        new Set([
          ...acc,
          ...interactions.reduce(
            (interaction: string[], nutraceutical) => [
              ...interaction,
              nutraceutical.dietarySupplementSlug,
            ],
            [],
          ),
        ]),
      ),
    [],
  );

  const reducedNutraceuticals = selectedNutraceuticals.filter(
    selectedNutraceutical => {
      const hasDiscount = !!discounts[selectedNutraceutical];

      if (!hasDiscount) return false;

      const nutraceutical = nutraceuticals.find(
        item => item.slug === selectedNutraceutical,
      );

      if (!nutraceutical) return false;

      const { maxDosage } = nutraceutical;

      const discount = discounts[selectedNutraceutical].reduce(
        (acc, curr) => acc + curr.dosage,
        0,
      );

      return (
        !!discount &&
        discount >= maxDosage * 0.49 &&
        discount <= maxDosage * 0.74
      );
    },
  );

  const removedNutraceuticals = selectedNutraceuticals.filter(
    selectedNutraceutical => {
      const hasDiscount = !!discounts[selectedNutraceutical];

      if (!hasDiscount) return false;

      const nutraceutical = nutraceuticals.find(
        item => item.slug === selectedNutraceutical,
      );

      if (!nutraceutical) return false;

      const { maxDosage } = nutraceutical;

      const discount = discounts[selectedNutraceutical].reduce(
        (acc, curr) => acc + curr.dosage,
        0,
      );

      return !!discount && discount >= maxDosage * 0.75;
    },
  );

  const invalidNutraceuticals = selectedNutraceuticals.filter(
    selectedNutraceutical =>
      !foodsNutraceuticals.includes(selectedNutraceutical),
  );

  const InvalidSingularLabel =
    labels.step_3_invalid_nutraceuticals_singular ||
    'For %s there is no adjustments to be made. See below for your list of dietary supplements.';

  const InvalidPluralLabel =
    labels.step_3_invalid_nutraceuticals_plural ||
    'For %s there are no adjustments to be made. See below for your list of dietary supplements.';

  return (
    <Container id="step_3" isActive={isActive}>
      <VisibilitySensor
        active={!!isReady && !!isActive}
        onChange={isVisible => {
          if (isVisible) {
            hotjar.event('scroll-step-3');

            TagManager.dataLayer({
              dataLayer: {
                event: 'step3Viewed',
              },
            });
          }
        }}
      >
        <>
          <StepIntro
            id="step_3"
            title={labels?.step_3_title}
            subtitle={labels?.step_3_description}
            description={labels?.step_3_tooltip}
            icon={GiForkKnifeSpoon}
            color="#1bc9bd"
            isActive={isActive}
          />

          {/* <ContainerAlert severity="info">
        <ContainerAlertTitle>
          {labels.step_3_notification_title}
        </ContainerAlertTitle>
        {labels.step_3_notification_description}
      </ContainerAlert> */}

          {isActive && (
            <>
              {currentStep.isLoaded && isReady ? (
                <>
                  <HabitsContainer id="habits_container">
                    {!error && (
                      <>
                        {foods.map(food => (
                          <Habit key={food.slug} {...food} />
                        ))}
                      </>
                    )}
                  </HabitsContainer>
                  {!!reducedNutraceuticals.length && (
                    <ReducedHabits>
                      Based on your current food intake, the dosage of{' '}
                      <strong>
                        {BuildNutraceuticalsString(reducedNutraceuticals)}
                      </strong>{' '}
                      {reducedNutraceuticals.length > 1 ? 'were' : 'was'}{' '}
                      adjusted.
                    </ReducedHabits>
                  )}
                  {!!removedNutraceuticals.length && (
                    <RemovedHabits>
                      Based on your current food intake,{' '}
                      <strong>
                        {BuildNutraceuticalsString(removedNutraceuticals)}
                      </strong>{' '}
                      {removedNutraceuticals.length > 1 ? 'were' : 'was'}{' '}
                      removed.
                    </RemovedHabits>
                  )}
                  {!!invalidNutraceuticals.length && (
                    <InvalidNutraceuticals id="invalid_habits_container">
                      {invalidNutraceuticals.length > 1
                        ? ReactHtmlParser(
                            InvalidPluralLabel &&
                              InvalidPluralLabel.replace(
                                '%s',
                                `<strong>${BuildNutraceuticalsString(
                                  invalidNutraceuticals,
                                )}</strong>`,
                              ),
                          )
                        : ReactHtmlParser(
                            InvalidSingularLabel &&
                              InvalidSingularLabel.replace(
                                '%s',
                                `<strong>${BuildNutraceuticalsString(
                                  invalidNutraceuticals,
                                )}</strong>`,
                              ),
                          )}
                    </InvalidNutraceuticals>
                  )}
                </>
              ) : (
                <Loading color="#1bc9bd" />
              )}
            </>
          )}
        </>
      </VisibilitySensor>
    </Container>
  );
};

export default Habits;
