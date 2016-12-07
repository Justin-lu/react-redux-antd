import _ from 'lodash';

export default function reducersGenerate(actionType, initialState, optionsHandler){
  if(!_.isArray(actionType)){
    actionType = [actionType];
  }

  const defaultHandler = {};

  _.each(actionType, (item) => {
    // PENDING action
    defaultHandler[`${item}_PENDING`] = (state) => {
      return Object.assign({}, state, {
        isFetching: true
      });
    };

    // FULFILLED action
    defaultHandler[`${item}_FULFILLED`] = (state, action) => {
      return {
        isFetching: false,
        isFulfilled: true,
        data: action.payload.data,
        meta:   {
          total: action.payload.meta.total,
          perPage: action.payload.meta.per_page,
          page: action.payload.meta.page
        }
      };
    };

    // REJECTED action
    defaultHandler[`${item}_REJECTED`] = (state, action) => {
      return Object.assign({}, state, {
        isFetching: false,
        isRejected: true,
        error: action.payload
      });
    };
  });

  const actionHanlder = Object.assign({}, defaultHandler, optionsHandler);

  return (state = initialState, action) => {
    return actionHanlder[action.type] && actionHanlder[action.type](state, action) || state;
  };
}
