import React from 'react';

import Report from './components/Report';
import Summary from './components/Summary';

import Container from './styles';

interface SidebarProps {
  isCustom?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isCustom }) => {
  return (
    <Container>
      <Summary isCustom={isCustom} />
      {!isCustom && <Report />}
    </Container>
  );
};

Sidebar.defaultProps = {
  isCustom: false,
};

export default Sidebar;
