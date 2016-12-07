import { LOGIN } from './../constants/actionTypes';
import initialState from './initialState';
import reducersGenerate from './reducersGenerate';

export default reducersGenerate(LOGIN, initialState.auth, {
  'LOGIN_PENDING': (state) => {
    return Object.assign({}, state, {
      isFetching: true,
      isAuthenticated: false
    });
  },
  'LOGIN_FULFILLED': (state, action) => {
    return Object.assign({}, state, {
      isFetching: false,
      isAuthenticated: true,
      user: action.user
    });
  },
  'LOGIN_REJECTED': (state, action) => {
    return Object.assign({}, state, {
      isFetching: false,
      isAuthenticated: false,
      errorMessage: action.message
    });
  }
});
