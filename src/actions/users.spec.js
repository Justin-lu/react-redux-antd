import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import promiseMiddleware from './../utils/promise-middleware';
import nock from 'nock';
import { expect } from 'chai';
import {
  USER
} from './../constants/actionTypes';
import { fetchUsers } from './users';
import { API_CONFIG } from './../config/api';

const middlewares = [ thunk, promiseMiddleware() ];
const mockStore = configureMockStore(middlewares);
const db = require('./../data/db.json');

describe('Users actions', function() {
  afterEach(() => {
    nock.cleanAll();
  });
  it('should create USERS_SUCCESS when fetching users has been done', () => {
    nock(API_CONFIG.host)
      .get((uri) => {
        return uri.indexOf(API_CONFIG.users) >= 0;
      })
      .reply(200, db.users);
    const expectedActions = [
      { type: `${USER}_PENDING`},
      { type: `${USER}_FULFILLED`, payload: {data: db.users.data, meta: db.users.meta } }
    ];
    const store = mockStore();

    return store.dispatch(fetchUsers()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });

  });
});
