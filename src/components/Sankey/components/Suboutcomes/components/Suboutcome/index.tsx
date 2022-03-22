import React, { useState, useCallback, useEffect } from 'react';
import ReactToolTip from 'react-tooltip';
import Xarrow from 'react-xarrows';
import { HiQuestionMarkCircle } from 'react-icons/hi';
import { transparentize } from 'polished';
import TagManager from 'react-gtm-module';
import { hotjar } from 'react-hotjar';

import Loading from 'components/Loading';

import { useApp } from 'contexts/app';
import { useSankey } from 'contexts/sankey';

import getFoods from 'services/getFoods';
import getProducts from 'services/getProducts';

import Container, {
  Anchors,
  Anchor,
  Content,
  ContentTitle,
  LoadingContainer,
  FineTuneGroup,
  FineTune,
} from './styles';

interface SuboutcomeProps {
  id: string;
  title: string;
  color: string;
  description: string;
  nutraceuticals: {
    min: string[];
    med: string[];
    max: string[];
  };
}

const Suboutcome: React.FC<SuboutcomeProps> = ({
  id,
  title,
  color,
  description,
  nutraceuticals: suboutcomeNutraceuticals,
}) => {
  const appContext = useApp();
  const {
    labels,
    userQuery,
    steps,
    fineTune,
    nutraceuticals,
    connections,
    updateStep,
    updateConnection,
    updateFineTune,
    updateSelectedConnections,
    updateFoods,
    updateError,
    updateSelectedNutraceuticals,
    updateHabits,
    updateProducts,
    updateDiscounts,
  } = appContext;

  const sankeyContext = useSankey();
  const { clickedSuboutcome, updateClickedSuboutcome } = sankeyContext;

  const [supConnections, setSupConnections] = useState<string[]>([]);
  const [subConnections, setSubConnections] = useState<string[]>([]);

  const { step2: currentStep, step3: nextStep } = steps;

  const { isLoading } = currentStep;

  useEffect(() => {
    const updatedSupConnections = Object.entries(connections)
      .filter(({ 1: subconnections }) =>
        Object.keys(subconnections).includes(id),
      )
      .reduce((acc: string[], { 0: outcome, 1: suboutcomes }) => {
        const subconnections = Object.entries(suboutcomes)
          .filter(({ 0: subconnection }) => subconnection.includes(id))
          .reduce(
            (acc2: string[], { 1: subconnectionNutraceuticals }) => [
              ...acc2,
              ...subconnectionNutraceuticals.map(
                subconnectionNutraceutical =>
                  `${subconnectionNutraceutical}_${id}_${outcome}`,
              ),
            ],
            [],
          );

        return subconnections.length
          ? [...acc, ...subconnections]
          : [...acc, `${id}_${outcome}`];
      }, []);

    setSupConnections(updatedSupConnections);

    const updatedSubConnections = Object.values(connections)
      .filter(subconnections => Object.keys(subconnections).includes(id))
      .reduce(
        (accumulator: string[], subconnections) => [
          ...accumulator,
          ...Object.entries(subconnections)
            .filter(({ 0: subconnection }) => subconnection === id)
            .reduce(
              (subAccumulator: string[], { 1: subconnection }) => [
                ...subAccumulator,
                ...subconnection,
              ],
              [],
            ),
        ],
        [],
      );

    setSubConnections(updatedSubConnections);
  }, [id, connections]);

  const handleFineTuneClick = useCallback(
    async (fineTuneGroup: string[], suboutcome: string) => {
      updateClickedSuboutcome(suboutcome);

      updateConnection(suboutcome, fineTuneGroup);
      updateSelectedConnections(connections);

      updateStep('step2', {
        ...currentStep,
        isCompleted: true,
        isLoading: true,
      });
      updateStep('step3', { ...nextStep, isLoaded: false });

      updateHabits([]);
      updateDiscounts({});

      const selectedNutraceuticals = Array.from(
        new Set(
          Object.values(connections).reduce((acc: string[], curr) => {
            const connection = Object.values(curr).reduce(
              (acc2, curr2) => [...acc2, ...curr2],
              [],
            );

            return [...acc, ...connection];
          }, []),
        ),
      );

      updateSelectedNutraceuticals(selectedNutraceuticals);

      // Get and update Foods from Wordpress
      const { content: foods } = await getFoods({
        uuid: userQuery,
        nutraceuticals: selectedNutraceuticals,
      });

      updateFoods(foods);

      const nutraceuticalsDosages = selectedNutraceuticals.map(item => {
        const itemNutraceutical = nutraceuticals.find(
          nutraceutical => nutraceutical.slug === item,
        );

        const dosages = itemNutraceutical?.dosages;
        const maxDosageAmount = dosages ? dosages[dosages?.length - 1] : 0;

        return `${item};${maxDosageAmount}`;
      });

      // Get and update products from Wordpress
      const updatedProducts = await getProducts(nutraceuticalsDosages);

      updateProducts(updatedProducts);

      updateStep('step2', {
        ...currentStep,
        isCompleted: true,
        isLoading: false,
      });

      updateStep('step3', { ...nextStep, isLoaded: true });

      if (!foods.length) {
        updateError(
          'With your choices there are no adjustments to be made. See below for your list of nutraceuticals.',
        );
      } else {
        updateError('');
        updateFoods(foods);
      }
    },
    [
      nextStep,
      nutraceuticals,
      userQuery,
      currentStep,
      connections,
      updateSelectedNutraceuticals,
      updateFoods,
      updateError,
      updateStep,
      updateConnection,
      updateSelectedConnections,
      updateHabits,
      updateProducts,
      updateDiscounts,
      updateClickedSuboutcome,
    ],
  );

  return (
    <Container
      id={id}
      color={color}
      isActive={fineTune[id] !== undefined && fineTune[id] !== 'off'}
      connections={supConnections.length}
    >
      <Anchors className="entry-anchors">
        {supConnections.map(supConnection => (
          <Anchor key={`${supConnection}`} id={`${supConnection}`} />
        ))}
      </Anchors>
      <Anchors className="exit-anchors">
        {subConnections &&
          subConnections.map(subConnection => (
            <React.Fragment key={`${id}-${subConnection}`}>
              <Anchor id={`${id}-${subConnection}`} />
              <Xarrow
                start={`${id}-${subConnection}`}
                end={`${subConnection}-${id}`}
                showHead={false}
                strokeWidth={58}
                curveness={0.6}
                startAnchor="right"
                endAnchor="left"
                color={
                  subConnections.length
                    ? transparentize(0.8, color)
                    : 'rgba(0,0,0,0.05)'
                }
              />
            </React.Fragment>
          ))}
      </Anchors>
      <Content>
        <HiQuestionMarkCircle
          size={20}
          color="rgba(0,0,0,0.7)"
          data-tip={`<strong>${title}</strong><span>${description}</span>`}
          data-for={`${id}-tooltip`}
          className="tooltip-icon"
        />
        <ReactToolTip
          id={`${id}-tooltip`}
          className="sankey-title-tooltip"
          place="bottom"
          type="light"
          effect="solid"
          html
          backgroundColor="#fff"
        />
        <ContentTitle>{title}</ContentTitle>
      </Content>
      {isLoading && clickedSuboutcome === id && (
        <LoadingContainer>
          <Loading color={color} />
        </LoadingContainer>
      )}
      <FineTuneGroup>
        <FineTune
          isActive={fineTune[id] === 'off' || !fineTune[id]}
          isDisabled={isLoading}
          color={color}
          className="step-2-completed"
          onClick={() => {
            handleFineTuneClick([], id);
            updateFineTune({ ...fineTune, [id]: 'off' });

            hotjar.event('sankey-fine-tune');

            TagManager.dataLayer({
              dataLayer: {
                event: 'fineTuneClick',
                fineTuneSuboutcome: id,
                fineTuneOption: 'off',
              },
            });
          }}
        >
          {labels.step_2_off || 'off'}
        </FineTune>
        {Object.entries(suboutcomeNutraceuticals).map(
          ({ 0: key, 1: value }) => {
            return (
              !!value.length && (
                <FineTune
                  key={key}
                  isActive={fineTune[id] === key}
                  isDisabled={isLoading}
                  isEmpty={!value.length}
                  color={color}
                  className="step-2-completed"
                  onClick={() => {
                    if (value.length) {
                      handleFineTuneClick(value, id);
                      updateFineTune({ ...fineTune, [id]: key });

                      hotjar.event('sankey-fine-tune');

                      TagManager.dataLayer({
                        dataLayer: {
                          event: 'fineTuneClick',
                          fineTuneSuboutcome: id,
                          fineTuneOption: key,
                        },
                      });
                    }
                  }}
                >
                  {labels[`step_2_${key}`] || key}
                </FineTune>
              )
            );
          },
        )}
      </FineTuneGroup>
    </Container>
  );
};

export default Suboutcome;
