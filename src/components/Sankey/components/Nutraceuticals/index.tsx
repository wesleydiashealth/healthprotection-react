import React from 'react';
import regexifyString from 'regexify-string';

import { useApp } from 'contexts/app';

import { ReactComponent as NutritionInfoIcon } from 'assets/nutrition_info.svg';
import Nutraceutical from './components/Nutraceutical';

import Container, { ContainerLabel } from './styles';

const Nutraceuticals: React.FC = () => {
  const appContext = useApp();
  const { labels, nutraceuticals, selectedNutraceuticals } = appContext;

  const nutraceuticalsLabel = regexifyString({
    pattern: /%s/,
    decorator: () => <NutritionInfoIcon />,
    input: labels.step_2_nutraceuticals,
  });

  return (
    <Container isActive={!!selectedNutraceuticals.length}>
      {!!selectedNutraceuticals.length && (
        <ContainerLabel>{nutraceuticalsLabel}</ContainerLabel>
      )}

      {selectedNutraceuticals.map(connection => {
        const nutraceutical = nutraceuticals.find(
          item => item.slug === connection,
        );

        return (
          nutraceutical && (
            <Nutraceutical key={nutraceutical.slug} {...nutraceutical}>
              {nutraceutical.title}
            </Nutraceutical>
          )
        );
      })}
    </Container>
  );
};

export default Nutraceuticals;
