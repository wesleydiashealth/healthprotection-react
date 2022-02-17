import React, { useState, useCallback } from 'react';
import Xarrow from 'react-xarrows';
import { transparentize } from 'polished';
import TagManager from 'react-gtm-module';

import { useApp } from 'contexts/app';
import { useSankey } from 'contexts/sankey';

import getFoods from 'services/getFoods';

import Container, {
  Anchors,
  Anchor,
  Content,
  ContentTitle,
  FineTuneGroup,
  FineTune,
} from './styles';

interface SuboutcomeProps {
  id: string;
  title: string;
  color: string;
  nutraceuticals: {
    min: string[];
    med: string[];
    max: string[];
  };
  outcome: string;
}

interface FineTuneProps {
  [key: string]: string;
}

const Suboutcome: React.FC<SuboutcomeProps> = ({
  id,
  title,
  color = '#000',
  nutraceuticals,
  outcome,
}) => {
  const appContext = useApp();
  const {
    userQuery,
    labels,
    steps,
    connections,
    updateConnection,
    updateFoods,
    updateError,
    updateSelectedNutraceuticals,
    updateStep,
  } = appContext;

  const { step2: currentStep, step3: nextStep } = steps;

  const sankeyContext = useSankey();
  const { activeAccordions } = sankeyContext;

  const [fineTune, setFineTune] = useState<FineTuneProps>({});

  const subConnections = Object.values(connections)
    .filter(connection => Object.keys(connection).includes(id))
    .reduce((acc: string[], connection) => {
      const subconnections = Object.entries(connection).find(
        ({ 0: subconnection }) => subconnection === id,
      );

      return subconnections ? [...acc, ...subconnections[1]] : acc;
    }, []);

  const handleFineTuneClick = useCallback(
    async (fineTuneGroup, suboutcome) => {
      updateConnection(suboutcome, fineTuneGroup);

      updateStep('step2', { ...currentStep, isCompleted: true });
      updateStep('step3', { ...nextStep, isLoaded: false });

      const selectedNutraceuticals = Array.from(
        new Set(
          Object.values(connections).reduce((acc: string[], curr) => {
            const xpto = Object.values(curr).reduce(
              (acc2, curr2) => [...acc2, ...curr2],
              [],
            );

            return [...acc, ...xpto];
          }, []),
        ),
      );

      updateSelectedNutraceuticals(selectedNutraceuticals);

      // const selectedProducts = appNutraceuticals
      //   .filter(appNutraceutical =>
      //     selectedNutraceuticals.includes(appNutraceutical.slug),
      //   )
      //   .reduce(
      //     (acc: string[], nutraceutical) => [...acc, ...nutraceutical.products],
      //     [],
      //   );

      // updateProducts([...products, ...selectedProducts]);

      const response = await getFoods({
        uuid: userQuery,
        nutraceuticals: selectedNutraceuticals,
      });

      updateFoods(response.content);

      updateStep('step3', { ...nextStep, isLoaded: true });

      if (!response.content.length) {
        updateError(
          'With your choices there are no adjustments to be made. See below for your list of nutraceuticals.',
        );
      } else {
        updateError('');
        updateFoods(response.content);
      }
    },
    [
      updateConnection,
      connections,
      userQuery,
      currentStep,
      nextStep,
      updateFoods,
      updateError,
      updateSelectedNutraceuticals,
      updateStep,
    ],
  );

  return (
    <Container
      id={id}
      color={color}
      isActive={fineTune[id] !== undefined && fineTune[id] !== 'off'}
    >
      <Content>
        {/* <HiQuestionMarkCircle
          size={20}
          color="rgba(0,0,0,0.7)"
          data-tip={`<strong>${title}</strong><span>${description}</span>`}
          data-for="sankey-tooltip"
          className="tooltip-icon"
        /> */}
        <ContentTitle>{title}</ContentTitle>
      </Content>
      <FineTuneGroup>
        <FineTune
          isActive={fineTune[id] === 'off' || !fineTune[id]}
          color={color}
          className="step-2-completed"
          onClick={() => {
            handleFineTuneClick([], id);
            setFineTune({ ...fineTune, [id]: 'off' });

            TagManager.dataLayer({
              dataLayer: {
                event: 'fineTuneClick',
                fineTuneSuboutcome: id,
                fineTuneOption: 'off',
              },
            });
          }}
        >
          {labels.step_2_off}
        </FineTune>
        {Object.entries(nutraceuticals).map(({ 0: key, 1: value }) => (
          <FineTune
            key={key}
            isActive={fineTune[id] === key}
            isEmpty={!value.length}
            color={color}
            className="step-2-completed"
            onClick={() => {
              if (value.length) {
                handleFineTuneClick(value, id);
                setFineTune({ ...fineTune, [id]: key });

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
            {labels[`step_2_${key}`]}
          </FineTune>
        ))}
        <Anchors className="exit-anchors">
          {activeAccordions.includes(outcome) &&
            subConnections.map(subConnection => (
              <React.Fragment key={`${id}-${subConnection}`}>
                <Anchor id={`${id}-${subConnection}`} />
                <Xarrow
                  start={`${id}-${subConnection}`}
                  end={`${subConnection}-${id}`}
                  showHead={false}
                  strokeWidth={14}
                  curveness={0.8}
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
      </FineTuneGroup>
    </Container>
  );
};

export default Suboutcome;
