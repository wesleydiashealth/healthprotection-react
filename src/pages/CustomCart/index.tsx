import React from 'react';

import Cart from 'components/Cart';

import { AppProvider } from 'contexts/app';

import Container from './styles';

const CustomCart: React.FC = () => {
  return (
    <Container>
      <AppProvider>
        <Cart />
      </AppProvider>
    </Container>
  );
};

export default CustomCart;
