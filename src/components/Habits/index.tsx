import React from 'react';
import { HiQuestionMarkCircle, HiLockClosed } from 'react-icons/hi';
import { GiForkKnifeSpoon } from 'react-icons/gi';
import 'react-dropdown/style.css';
import ReactHtmlParser from 'react-html-parser';

import { useApp } from 'contexts/app';
import Loading from 'components/Loading';

import Habit from './components/Habit';

import Container, {
  StepIntro,
  StepTitle,
  StepTooltip,
  StepDescription,
  HabitsContainer,
  HabitInvalidNutraceuticals,
} from './styles';

const Habits: React.FC = () => {
  const context = useApp();
  const {
    labels,
    steps,
    nutraceuticals,
    selectedNutraceuticals,
    foods,
    error,
  } = context;
  const { step1: initialStep, step2: previousStep, step3: currentStep } = steps;

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
              nutraceutical.dietarySupplement,
            ],
            [],
          ),
        ]),
      ),
    [],
  );

  const invalidNutraceuticals = selectedNutraceuticals.filter(
    selectedNutraceutical =>
      !foodsNutraceuticals.includes(selectedNutraceutical),
  );

  const invalidNutraceuticalsTitles = invalidNutraceuticals.map(
    invalidNutraceutical =>
      nutraceuticals.find(
        nutraceutical => nutraceutical.slug === invalidNutraceutical,
      )?.title,
  );

  const invalidNutraceuticalsString = invalidNutraceuticalsTitles.join(', ');
  const invalidNutraceuticalsSeparator = ',';

  const lastComma = invalidNutraceuticalsString.lastIndexOf(
    invalidNutraceuticalsSeparator,
  );

  const invalidNutraceuticalsText =
    invalidNutraceuticalsString.slice(0, lastComma) +
    invalidNutraceuticalsString
      .slice(lastComma)
      .replace(invalidNutraceuticalsSeparator, ' and');

  return (
    <Container id="step_3" isActive={isActive}>
      <StepIntro>
        <GiForkKnifeSpoon size={52} color={isActive ? '#1bc9bd' : '#565656'} />
        <StepTitle>
          {!isActive && <HiLockClosed size={20} />}
          {labels.step_3_title}
          <HiQuestionMarkCircle
            className="tooltip-icon"
            size={20}
            color={isActive ? '#1bc9bd' : '#565656'}
            data-tip={`<strong>${labels.step_3_title}</strong><span>${labels.step_3_tooltip}</span>`}
            data-for="habits-title-tooltip"
          />
          <StepTooltip
            id="habits-title-tooltip"
            className="habits-title-tooltip"
            place="bottom"
            type="light"
            effect="solid"
            offset={{ top: 10, left: 10 }}
            html
            backgroundColor="#fff"
          />
        </StepTitle>

        {!isActive && (
          <div className="step-disabled">
            <strong>{labels.step_3_disabled.split('.')[0]}</strong>.
            {labels.step_3_disabled.substr(
              labels.step_3_disabled.indexOf('.') + 1,
            )}
          </div>
        )}
        {labels.step_3_description && (
          <StepDescription>
            <strong>{labels.step_3_description.split(' ')[0]}</strong>{' '}
            {labels.step_3_description.substr(
              labels.step_3_description.indexOf(' ') + 1,
            )}
          </StepDescription>
        )}
      </StepIntro>
      {/* <ContainerAlert severity="info">
        <ContainerAlertTitle>
          {labels.step_3_notification_title}
        </ContainerAlertTitle>
        {labels.step_3_notification_description}
      </ContainerAlert> */}

      {isActive && (
        <>
          {currentStep.isLoaded ? (
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
              {!!invalidNutraceuticals.length && (
                <HabitInvalidNutraceuticals id="invalid_habits_container">
                  {invalidNutraceuticals.length > 1
                    ? ReactHtmlParser(
                        labels.step_3_invalid_nutraceuticals_plural.replace(
                          '%s',
                          `<strong>${invalidNutraceuticalsText}</strong>`,
                        ),
                      )
                    : ReactHtmlParser(
                        labels.step_3_invalid_nutraceuticals_singular.replace(
                          '%s',
                          `<strong>${invalidNutraceuticalsText}</strong>`,
                        ),
                      )}
                </HabitInvalidNutraceuticals>
              )}
            </>
          ) : (
            <Loading color="#1bc9bd" />
          )}
        </>
      )}
    </Container>
  );
};

export default Habits;
