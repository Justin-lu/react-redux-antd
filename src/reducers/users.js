import {
  USERS_QERUEST, USERS_SUCCESS, USERS_FAILURE
} from './../constants/actionTypes';
import initialState from './initialState';

export default function users(state = initialState.users, action) {
  switch (action.type) {
    case USERS_QERUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case USERS_SUCCESS:
      return Object.assign({}, {
        isFetching: false,
        errorMessage: '',
        meta: {
          total: action.users.meta.total,
          perPage: action.users.meta.per_page,
          page: action.users.meta.page
        },
        data: action.users.data
      });
    case USERS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message
      });
    default:
      return state;
  }
}
