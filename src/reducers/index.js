import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from './auth';
import users from './users';

const rootReducer = combineReducers({
  routing: routerReducer,
  auth,
  users
});

export default rootReducer;
