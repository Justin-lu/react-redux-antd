import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import rootReducer from '../reducers';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

const router = routerMiddleware(browserHistory);

export default function configureStore(initialState) {
  return createStore(rootReducer,
    initialState,
    applyMiddleware(thunk, promise, router)
  );
}
