import React from 'react';
import { Scrollbar } from 'react-scrollbars-custom';
import Popup from 'reactjs-popup';
import { FaInfoCircle } from 'react-icons/fa';

import { useApp } from 'contexts/app';
import { useSankey } from 'contexts/sankey';

import Tooltip from './components/Tooltip';

import Container, {
  Anchors,
  Anchor,
  ContentContainer,
  Content,
  ContentTitle,
  ContentDescription,
} from './styles';

interface NutraceuticalProps {
  id: string;
  title: string;
  dosage: number;
  unit: string;
  description: string;
}

const Nutraceutical: React.FC<NutraceuticalProps> = ({
  id,
  title,
  dosage,
  unit,
  description,
}) => {
  const appContext = useApp();
  const { connections } = appContext;

  const context = useSankey();
  const { activeAccordions } = context;

  const supConnections = Object.entries(connections)
    .filter(
      ({ 1: subconnections }) =>
        !!Object.values(subconnections).reduce(
          (accumulator, subconnection) => accumulator + subconnection.length,
          0,
        ),
    )
    .reduce((accumulator: string[], { 0: connection, 1: subconnections }) => {
      return !activeAccordions.includes(connection)
        ? [...accumulator, connection]
        : [
            ...accumulator,
            ...Object.entries(subconnections)
              .filter(({ 1: subconnection }) => subconnection.includes(id))
              .reduce((acc: string[], curr) => [...acc, curr[0]], []),
          ];
    }, []);

  return (
    <Container connections={supConnections.length}>
      <Anchors>
        {supConnections.map(supConnection => (
          <Anchor
            key={`${id}-${supConnection}`}
            id={`${id}-${supConnection}`}
          />
        ))}
      </Anchors>
      <ContentContainer>
        <Popup
          trigger={
            <Content>
              <FaInfoCircle color="rgba(0,0,0,0.7)" />
              <ContentTitle>{title}</ContentTitle>
              <ContentDescription>{`${dosage} ${unit}`}</ContentDescription>
            </Content>
          }
          modal
          nested
        >
          <Scrollbar style={{ height: 'calc(100vh - 80px)' }}>
            <Tooltip
              {...{
                ...{ id, title, description, supConnections },
              }}
            />
          </Scrollbar>
        </Popup>
      </ContentContainer>
    </Container>
  );
};

export default Nutraceutical;
