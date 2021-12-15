import React from 'react';

import Report from './components/Report';
import Summary from './components/Summary';

import Container from './styles';

const Sidebar: React.FC = () => {
  return (
    <Container>
      <Summary />
      <Report />
    </Container>
  );
};

export default Sidebar;
