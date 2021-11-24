import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import TagManager from 'react-gtm-module';
import { hotjar } from 'react-hotjar';

import GlobalStyle from './styles/global';

import Routes from './routes';

const App: React.FC = () => {
  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-PPMT6FP' });
    hotjar.initialize(2555854, 6);
  }, []);

  return (
    <Router>
      <Routes />
      <GlobalStyle />
    </Router>
  );
};

export default App;
