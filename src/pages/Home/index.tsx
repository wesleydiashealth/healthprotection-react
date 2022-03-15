import React, { useEffect } from 'react';
import TagManager from 'react-gtm-module';
import { useMediaQuery } from 'react-responsive';

import Sankey from 'components/Sankey';
import SankeyMobile from 'components/SankeyMobile';

import useQuery from 'services/useQuery';

// import Hero from 'components/Hero';
import Wizard from 'components/Wizard';
import Cart from 'components/Cart';
import Habits from 'components/Habits';

import { AppProvider } from 'contexts/app';

import Container from './styles';

const Home: React.FC = () => {
  const query = useQuery();

  const project = query.get('project')?.replace(/[^a-zA-Z-]/g, '') || 'default';

  console.log(project);

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)',
  });
  // const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' });
  // const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  // const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
  // const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' });

  useEffect(() => {
    TagManager.initialize({
      gtmId: 'GTM-PPMT6FP',
      dataLayer: { project },
    });
  }, [project]);

  return (
    <Container>
      <AppProvider>
        {/* <Hero /> */}
        <Wizard />
        {isDesktopOrLaptop ? <Sankey /> : <SankeyMobile />}
        <Habits />
        <Cart />
      </AppProvider>
    </Container>
  );
};

export default Home;
