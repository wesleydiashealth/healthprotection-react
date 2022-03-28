import React, { useState, useEffect } from 'react';
import ReactToolTip from 'react-tooltip';
import Xarrow from 'react-xarrows';
import { HiQuestionMarkCircle } from 'react-icons/hi';
import { transparentize } from 'polished';

import { useApp } from 'contexts/app';

import OutcomeData from 'dtos/OutcomeData';

import Container, {
  Anchors,
  Anchor,
  Content,
  ContentIcon,
  ContentTitle,
} from './styles';

const Outcome: React.FC<OutcomeData> = ({
  id,
  title,
  color,
  description,
  icon,
}) => {
  const context = useApp();
  const { connections } = context;

  const [subConnections, setSubConnections] = useState<string[]>([]);

  useEffect(() => {
    const updatedSubConnections = Object.entries(connections)
      .filter(({ 0: connection }) => connection.includes(id))
      .reduce((accumulator: string[], { 1: suboutcomes }) => {
        const subconnections = Object.entries(suboutcomes).reduce(
          (subAccumulator: string[], { 0: suboutcome, 1: nutraceuticals }) =>
            nutraceuticals.length
              ? [
                  ...subAccumulator,
                  ...nutraceuticals.map(
                    nutraceutical => `${suboutcome}_${nutraceutical}`,
                  ),
                ]
              : [...subAccumulator, suboutcome],
          [],
        );

        return subconnections.length
          ? [...accumulator, ...subconnections]
          : [...accumulator, ...Object.keys(suboutcomes)];
      }, []);

    setSubConnections(updatedSubConnections);
  }, [id, connections]);

  const subConnectionsActive = Object.entries(connections)
    .filter(({ 0: connection }) => connection === id)
    .reduce((accumulator: string[], { 1: subconnections }) => {
      const suboutcomeConnections = Object.entries(subconnections).reduce(
        (
          subAccumulator: string[],
          { 0: suboutcome, 1: suboutcomeNutraceuticals },
        ) =>
          (suboutcomeNutraceuticals.length && [
            ...subAccumulator,
            suboutcome,
          ]) || [...subAccumulator],
        [],
      );

      return [...accumulator, ...suboutcomeConnections];
    }, []);

  return (
    <Container id={id} color={color} connections={subConnections.length}>
      <Anchors>
        {subConnections.map(subConnection => (
          <React.Fragment key={`${id}_${subConnection}`}>
            <Anchor id={`${id}_${subConnection}`} />
            <Xarrow
              start={`${id}_${subConnection}`}
              end={`${subConnection.split('_').reverse().join('_')}_${id}`}
              showHead={false}
              strokeWidth={58}
              curveness={0.6}
              startAnchor="right"
              endAnchor="left"
              color={
                subConnectionsActive.includes(subConnection.split('_')[0])
                  ? transparentize(0.8, color || '#565656')
                  : 'rgba(0,0,0,0.05)'
              }
            />
          </React.Fragment>
        ))}
      </Anchors>
      <Content>
        <ContentIcon src={icon} alt={title} width={36} />
        <ContentTitle>{title}</ContentTitle>
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
      </Content>
    </Container>
  );
};

export default Outcome;
