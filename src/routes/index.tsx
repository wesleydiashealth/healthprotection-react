import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from 'pages/Home';
import CustomSankey from 'pages/CustomSankey';
import CustomCart from 'pages/CustomCart';
import Report from 'pages/Report';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/sankey" exact component={CustomSankey} />
    <Route path="/cart" exact component={CustomCart} />
    <Route path="/report" exact component={Report} />
  </Switch>
);

export default Routes;
