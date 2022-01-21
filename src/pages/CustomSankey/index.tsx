import React from 'react';
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import Wizard from 'components/Wizard';
import Sankey from 'components/Sankey';
import SankeyMobile from 'components/SankeyMobile';
import Habits from 'components/Habits';
import Cart from 'components/Cart';

import { AppProvider } from 'contexts/app';

import Container from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const CustomSankey: React.FC = () => {
  const query = useQuery();

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)',
  });

  return (
    <Container>
      <AppProvider>
        {query.get('outcome') && <Wizard />}
        {isDesktopOrLaptop ? <Sankey /> : <SankeyMobile />}
        {query.get('outcome') && (
          <>
            <Habits />
            <Cart />
          </>
        )}
      </AppProvider>
    </Container>
  );
};

export default CustomSankey;
