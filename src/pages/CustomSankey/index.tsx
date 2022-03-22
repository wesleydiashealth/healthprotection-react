import React from 'react';
import { useMediaQuery } from 'react-responsive';

import Sankey from 'components/Sankey';
import SankeyMobile from 'components/SankeyMobile';

import { AppProvider, useApp } from 'contexts/app';

import Container from './styles';

const CustomSankey: React.FC = () => {
  const appContext = useApp();
  const { connections } = appContext;

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)',
  });

  return (
    <Container>
      <AppProvider>
        {isDesktopOrLaptop ? (
          <Sankey connections={connections} />
        ) : (
          <SankeyMobile />
        )}
      </AppProvider>
    </Container>
  );
};

export default CustomSankey;
