import { USER } from './../constants/actionTypes';
import cFetch from './../utils/cFetch';

import { API_CONFIG } from './../config/api';

export const fetchUsers = (params = { page: 1, per_page: 10 }) => {
  return {
    type: USER,
    payload: cFetch(API_CONFIG.users, { method: "GET", params: params })
  };
};

