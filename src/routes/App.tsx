import React, { FC, memo } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import {PATH_BASE} from 'src/constants/routes';
import Home from 'src/components/Home';

const App: FC = () => (
  <Switch key='app-route-switch'>
    <Route path={PATH_BASE} component={Home} />
    <Redirect from='*' to={PATH_BASE} />
  </Switch>
);

export default memo(App);
