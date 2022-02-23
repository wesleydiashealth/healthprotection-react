import React from 'react';
import { useMediaQuery } from 'react-responsive';

import Sankey from 'components/Sankey';
import SankeyMobile from 'components/SankeyMobile';

// import Hero from 'components/Hero';
import Wizard from 'components/Wizard';
import Cart from 'components/Cart';
import Habits from 'components/Habits';

import { AppProvider } from 'contexts/app';

import GetSubdomain from 'services/GetSubdomain';

import Container from './styles';

const Home: React.FC = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)',
  });
  // const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' });
  // const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  // const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
  // const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' });

  const { hostname } = window.location;

  const parts = hostname.split('.');

  let lastIndex = -2;
  const last = parts[parts.length - 1];
  const isLocalhost = last === 'localhost';
  if (isLocalhost) {
    lastIndex = -1;
  }

  const subdomain = parts.slice(0, lastIndex).join('.').replace('.react', '');

  return (
    <Container>
      <p>Hostname: {hostname}</p>
      <p>Last: {last}</p>
      <p>LastIndex: {lastIndex}</p>
      <p>Subdomain 1: {parts.slice(0, lastIndex).join('.')}</p>
      <p>Subdomain 2: {subdomain}</p>
      <p>Subdomain 3: {GetSubdomain()}</p>
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
