import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import HomePage from './containers/HomePage';
import UsersPage from './containers/UsersPage';
import NotFoundPage from './components/NotFoundPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="users" component={UsersPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
