import React, { useEffect, useCallback } from 'react';
import ReactDOMServer from 'react-dom/server';
import ReactToolTip from 'react-tooltip';
import { HiQuestionMarkCircle } from 'react-icons/hi';
import Dropdown from 'react-dropdown';

import { useApp } from 'contexts/app';

import HabitData from 'dtos/HabitData';
import FoodData from 'dtos/FoodData';
import DiscountsData from 'dtos/DiscountsData';

import getProducts from 'services/getProducts';

// import getProducts from 'services/getProducts';

import Tooltip from '../Tooltip';

import Container, {
  Intro,
  Content,
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
    icon,
    dosages,
    interactions,
    dataSource,
  } = food;

  const context = useApp();
  const {
    labels,
    habits,
    nutraceuticals,
    selectedNutraceuticals,
    discounts,
    updateHabits,
    updateDiscounts,
    updateProducts,
  } = context;

  const nutraceuticalsInteractions = interactions.filter(interaction => {
    return selectedNutraceuticals.includes(interaction.dietarySupplementSlug);
  });

  const habitQuestionLabel =
    labels.step_3_question || 'How many %s do you consume per week?';

  useEffect(() => {
    ReactToolTip.rebuild();
  });

  const handleHabitInput = useCallback(
    async (selectedFood: FoodData, frequency) => {
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

          const selectedDosage =
            nutraceutical?.info.dosages[frequencyIndex].dosage;

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
                dosage: parseInt(selectedDosage || '', 10),
              },
            ],
          };
        }, {});

      updateDiscounts({ ...discounts, ...habitDiscounts });

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

      const selectedNutraceuticalsDosages = selectedNutraceuticals.map(
        selectedNutraceutical => {
          const selectedNutraceuticalObject = nutraceuticals.find(
            nutraceutical => nutraceutical.slug === selectedNutraceutical,
          );

          const selectedNutraceuticalDosages =
            selectedNutraceuticalObject?.info.dosages;
          const maxDosageAmount = selectedNutraceuticalDosages
            ? parseInt(
                selectedNutraceuticalDosages[
                  selectedNutraceuticalDosages?.length - 1
                ].dosage,
                10,
              )
            : 0;

          const selectedNutraceuticalDiscounts = Object.entries(discounts)
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

          return `${selectedNutraceutical};${
            maxDosageAmount - selectedNutraceuticalDiscounts
          }`;
        },
      );

      // Get and update products from Wordpress
      const updatedProducts = await getProducts(selectedNutraceuticalsDosages);

      updateProducts(updatedProducts);

      // console.log(discounts);
      // console.log(selectedNutraceuticals);

      // const nutraceuticalsWithDosages = selectedNutraceuticals
      //   .map(selectedNutraceutical => {
      //     const nutraceutical = nutraceuticals.find(
      //       item => item.slug === selectedNutraceutical,
      //     );
      //     const maxDosage = parseInt(
      //       nutraceutical?.info.dosages[nutraceutical?.info.dosages.length - 1]
      //         ?.dosage || '',
      //       10,
      //     );

      //     const discounted = Object.entries(discounts)
      //       .filter(({ 0: key }) => key === selectedNutraceutical)
      //       .reduce(
      //         (acc, { 1: discount }) =>
      //           acc +
      //           discount.reduce(
      //             (subAcc, interaction) => subAcc + interaction.dosage,
      //             0,
      //           ),
      //         0,
      //       );

      //     const resultDosage =
      //       maxDosage - discounted < 0 ? 0 : maxDosage - discounted;

      //     return { nutraceutical: selectedNutraceutical, dosage: resultDosage };
      //   })
      //   .filter(selectedNutraceutical => !!selectedNutraceutical.dosage);

      // const updatedProducts = await getProducts(nutraceuticalsWithDosages);
    },
    [
      nutraceuticals,
      food,
      habits,
      selectedNutraceuticals,
      discounts,
      updateHabits,
      updateDiscounts,
      updateProducts,
    ],
  );

  return (
    <Container key={slug}>
      <Intro>
        <img src={icon} alt={title} title={title} />
      </Intro>
      <Content>
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
                  dataSource,
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
            habitQuestionLabel.replace('%s', unit.label)}
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

            const maxDosage = parseInt(
              interactionNutraceutical?.info.dosages[
                interactionNutraceutical?.info.dosages.length - 1
              ].dosage || '',
              10,
            );

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
              interactionDiscount >= maxDosage * 0.25 &&
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
        <Dropdown
          options={intakeFrequency}
          value={intakeFrequency[0]}
          placeholder={labels.step_3_answer}
          onChange={({ value: frequencyValue, label: frequencyLabel }) =>
            handleHabitInput(food, {
              value: frequencyValue,
              label: frequencyLabel,
            })
          }
        />
      </Content>
    </Container>
  );
};

export default Habit;
