import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App/App';
import HomePage from './containers/HomePage/HomePage';
import ConnectedUsersPage from './containers/UsersPage/UsersPage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="users" component={ConnectedUsersPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
