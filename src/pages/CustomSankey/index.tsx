import React from 'react';
import { useMediaQuery } from 'react-responsive';

import Sankey from 'components/Sankey';
import SankeyMobile from 'components/SankeyMobile';

import connections from 'connections-v2.json';
import outcomes from 'outcomes-v2.json';
import suboutcomes from 'suboutcomes-v2.json';
import nutraceuticals from 'nutraceuticals-v2.json';

import { AppProvider } from 'contexts/app';

import Container from './styles';

const CustomSankey: React.FC = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)',
  });

  return (
    <Container>
      <AppProvider>
        {isDesktopOrLaptop ? (
          <Sankey
            defaultConnections={connections}
            defaultOutcomes={outcomes}
            defaultSuboutcomes={suboutcomes}
            defaultNutraceuticals={nutraceuticals}
          />
        ) : (
          <SankeyMobile
            defaultConnections={connections}
            defaultOutcomes={outcomes}
            defaultSuboutcomes={suboutcomes}
            defaultNutraceuticals={nutraceuticals}
          />
        )}
      </AppProvider>
    </Container>
  );
};

export default CustomSankey;
