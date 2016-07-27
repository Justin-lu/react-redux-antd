import { expect } from 'chai';
import users from './users';
import initialState from './initialState';
import { USERS_SUCCESS } from './../constants/actionTypes';

const db = require('./../data/db.json');

describe('Users reducer',() => {
  it('should return the initialState', () => {
    expect(users(undefined, {})).to.deep.equal(initialState.users);
  });

  it('should handle USERS_SUCCESS', () => {
    expect(
      users([], {
        type: USERS_SUCCESS,
        users: db.users
      })
    ).to.deep.equal({
      isFetching: false,
      errorMessage: '',
      meta: {
        total: db.users.meta.total,
        perPage: db.users.meta.per_page,
        page: db.users.meta.page
      },
      data: db.users.data
    });
  });
});
