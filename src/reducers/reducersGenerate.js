export default function reducersGenerate(actionType, initialState){
  return (state = initialState, action) => {
    switch (action.type) {
      case `${actionType}_PENDING`:
        return Object.assign({}, state, {
          isFetching: true
        });

      case `${actionType}_FULFILLED`:
        return {
          isFetching: false,
          isFulfilled: true,
          data: action.payload.data,
          meta: {
            total: action.payload.meta.total,
            perPage: action.payload.meta.per_page,
            page: action.payload.meta.page
          }
        };

      case `${actionType}_REJECTED`:
        return Object.assign({}, state, {
          isFetching: false,
          isRejected: true,
          error: action.payload
        });

      default: return state;
    }
  };
}
