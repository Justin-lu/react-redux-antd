import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

import promiseMiddleware from './../utils/promise-middleware';


const router = routerMiddleware(browserHistory);

export default function configureStore(initialState) {
  return createStore(rootReducer,
    initialState,
    applyMiddleware(
      thunk,
      promiseMiddleware(),
      router
    )
  );
}
