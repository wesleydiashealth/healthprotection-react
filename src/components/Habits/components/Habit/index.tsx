import React, { useEffect, useCallback } from 'react';
import ReactDOMServer from 'react-dom/server';
import ReactToolTip from 'react-tooltip';
import { HiQuestionMarkCircle } from 'react-icons/hi';
import Dropdown from 'react-dropdown';
import TagManager from 'react-gtm-module';
import { hotjar } from 'react-hotjar';

import { useApp } from 'contexts/app';

import HabitData from 'dtos/HabitData';
import FoodData from 'dtos/FoodData';
import DiscountsData from 'dtos/DiscountsData';

import getProducts from 'services/getProducts';

import Tooltip from '../Tooltip';

import Container, {
  Row,
  Image,
  Column,
  Title,
  Question,
  Dosages,
  Nutraceuticals,
  NutraceuticalsLabel,
  Nutraceutical,
} from './styles';

const Habit: React.FC<FoodData> = food => {
  const {
    slug,
    title,
    unit,
    intakeFrequency,
    frequencyUnit,
    icon,
    dosages,
    interactions,
  } = food;

  const context = useApp();
  const {
    steps,
    labels,
    habits,
    nutraceuticals,
    selectedNutraceuticals,
    discounts,
    updateStep,
    updateHabits,
    updateDiscounts,
    updateProducts,
  } = context;

  const currentStep = steps.step3;

  const nutraceuticalsInteractions = interactions.filter(interaction => {
    return selectedNutraceuticals.includes(interaction.dietarySupplementSlug);
  });

  const habitQuestionLabel =
    labels.step_3_question || `How many %s do you consume per %d?`;

  useEffect(() => {
    ReactToolTip.rebuild();
  });

  const handleHabitInput = useCallback(
    async (selectedFood: FoodData, frequency) => {
      updateStep('step3', { ...currentStep, isLoading: true });

      const updatedHabits: HabitData[] = [...habits];

      const habitIndex = habits.findIndex(habit => habit.food === food.title);

      const frequencyIndex = selectedFood.intakeFrequency.findIndex(
        item => item.value === frequency.value,
      );

      const habitDiscounts = selectedFood.interactions
        .filter(interaction =>
          selectedNutraceuticals.find(
            selectedNutraceutical =>
              selectedNutraceutical === interaction.dietarySupplementSlug,
          ),
        )
        .reduce((acc: DiscountsData, interaction) => {
          const nutraceutical = nutraceuticals.find(
            item => item.slug === interaction.dietarySupplementSlug,
          );

          const selectedDosage = nutraceutical?.dosages[frequencyIndex];

          const existentValue =
            discounts[interaction.dietarySupplementSlug]?.filter(
              discount => discount.food !== selectedFood.slug,
            ) || [];

          return {
            ...acc,
            [interaction.dietarySupplementSlug]: [
              ...existentValue,
              {
                food: selectedFood.slug,
                dosage: selectedDosage || 0,
              },
            ],
          };
        }, {});

      const updatedDiscounts = { ...discounts, ...habitDiscounts };

      updateDiscounts(updatedDiscounts);

      if (habitIndex > -1) {
        updatedHabits[habitIndex] = {
          food: selectedFood.title,
          unit: selectedFood.unit,
          icon: selectedFood.icon,
          frequency,
          frequencyIndex,
        };

        updateHabits(updatedHabits);
      } else {
        updateHabits([
          ...habits,
          {
            food: selectedFood.title,
            unit: selectedFood.unit,
            icon: selectedFood.icon,
            frequency,
            frequencyIndex,
          },
        ]);
      }

      const selectedNutraceuticalsDosages = selectedNutraceuticals
        .map(selectedNutraceutical => {
          const selectedNutraceuticalObject = nutraceuticals.find(
            nutraceutical => nutraceutical.slug === selectedNutraceutical,
          );

          if (!selectedNutraceuticalObject) return '';

          const selectedNutraceuticalDiscounts = Object.entries(
            updatedDiscounts,
          )
            .filter(({ 0: key }) => key === selectedNutraceutical)
            ?.reduce(
              (acc, { 1: discount }) =>
                acc +
                discount.reduce(
                  (subAcc, interaction) => subAcc + interaction.dosage,
                  0,
                ),
              0,
            );

          const finalDosage =
            selectedNutraceuticalObject?.maxDosage -
            selectedNutraceuticalDiscounts;

          return `${selectedNutraceutical};${finalDosage}`;
        })
        .filter(selectedNutraceutical => {
          const { 1: dosage } = selectedNutraceutical.split(';');
          const dosageValue = parseInt(dosage, 10);

          return !!dosageValue && dosageValue > 0;
        });

      // Get and update products from Wordpress
      const updatedProducts = await getProducts(selectedNutraceuticalsDosages);

      updateProducts(updatedProducts);

      updateStep('step3', { ...currentStep, isLoading: false });
    },
    [
      currentStep,
      nutraceuticals,
      food,
      habits,
      selectedNutraceuticals,
      discounts,
      updateStep,
      updateHabits,
      updateDiscounts,
      updateProducts,
    ],
  );

  return (
    <Container key={slug}>
      <Row>
        <Image src={icon} alt={title} title={title} />
        <Column>
          <Title>
            {title}
            <HiQuestionMarkCircle
              className="tooltip-icon"
              size={20}
              color="#1bc9bd"
              data-tip={ReactDOMServer.renderToStaticMarkup(
                <Tooltip
                  {...{
                    title,
                    dosages,
                    interactions,
                  }}
                />,
              )}
              data-for="habit-title-tooltip"
            />
            <ReactToolTip
              id="habit-title-tooltip"
              className="habit-title-tooltip"
              place="bottom"
              type="light"
              effect="solid"
              offset={{ top: 10, left: 10 }}
              html
              backgroundColor="#fff"
            />
          </Title>

          <Question>
            {habitQuestionLabel &&
              unit.label &&
              habitQuestionLabel
                .replace('%s', unit.label)
                .replace('%d', frequencyUnit.label)}
          </Question>
          <Dosages>{dosages}</Dosages>
          <Nutraceuticals>
            <NutraceuticalsLabel>
              {labels.step_3_interactions}
            </NutraceuticalsLabel>

            {nutraceuticalsInteractions.map(nutraceuticalsInteraction => {
              const interactionNutraceutical = nutraceuticals.find(
                nutraceutical =>
                  nutraceutical.slug ===
                  nutraceuticalsInteraction.dietarySupplementSlug,
              );

              const maxDosage = interactionNutraceutical?.maxDosage || 0;

              const interactionDiscount = Object.entries(discounts)
                .filter(
                  ({ 0: nutraceutical }) =>
                    nutraceutical ===
                    nutraceuticalsInteraction.dietarySupplementSlug,
                )
                .reduce(
                  (acc, { 1: discount }) =>
                    acc +
                    discount.reduce(
                      (subAcc, interaction) => subAcc + interaction.dosage,
                      0,
                    ),
                  0,
                );

              const isReduced =
                interactionDiscount >= maxDosage * 0.49 &&
                interactionDiscount <= maxDosage * 0.74;

              const isRemoved = interactionDiscount >= maxDosage * 0.75;

              return (
                <Nutraceutical
                  isReduced={isReduced}
                  isRemoved={isRemoved}
                  key={nutraceuticalsInteraction.dietarySupplementSlug}
                >
                  {nutraceuticalsInteraction.dietarySupplementTitle}
                </Nutraceutical>
              );
            })}
          </Nutraceuticals>
        </Column>
      </Row>
      <Dropdown
        options={intakeFrequency}
        value={intakeFrequency[0]}
        placeholder={labels.step_3_answer}
        onChange={({ value: frequencyValue, label: frequencyLabel }) => {
          handleHabitInput(food, {
            value: frequencyValue,
            label: frequencyLabel,
          });

          hotjar.event('fine-tune-step-3');

          TagManager.dataLayer({
            dataLayer: {
              event: 'habitChanged',
              habitFood: food.title,
              habitFrequency: frequencyLabel,
            },
          });
        }}
      />
    </Container>
  );
};

export default Habit;
