import React from 'react';
import { useMediaQuery } from 'react-responsive';

import Sankey from 'components/Sankey';
import SankeyMobile from 'components/SankeyMobile';

import Hero from 'components/Hero';
import Wizard from 'components/Wizard';
import Cart from 'components/Cart';
import Habits from 'components/Habits';

import { AppProvider } from 'contexts/app';

import Container from './styles';

const Home: React.FC = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)',
  });
  // const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' });
  // const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  // const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
  // const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' });

  return (
    <Container>
      <AppProvider>
        <Hero />
        <Wizard />
        {isDesktopOrLaptop ? <Sankey /> : <SankeyMobile />}
        <Habits />
        <Cart />
      </AppProvider>
    </Container>
  );
};

export default Home;
