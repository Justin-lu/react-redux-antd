import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';
import {
  USERS_QERUEST, USERS_SUCCESS
} from './../constants/actionTypes';
import { fetchUsers } from './users';
import { API_CONFIG } from './../config/api';

const middlewares = [ thunk ];
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
      { type: USERS_QERUEST, isFetching: true },
      { type: USERS_SUCCESS, isFetching: false, users: db.users }
    ];
    const store = mockStore();

    return store.dispatch(fetchUsers())
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
  });
});
