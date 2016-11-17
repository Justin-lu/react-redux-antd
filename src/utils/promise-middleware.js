/* eslint-disable no-extra-boolean-cast */
import isPromise from './isPromise';
import { message } from 'antd';


const defaultTypes = ['PENDING', 'FULFILLED', 'REJECTED'];

/**
 * @function promiseMiddleware
 * @description
 * @returns {function} thunk
 */
export default function promiseMiddleware(config = {}) {
  const promiseTypeSuffixes = config.promiseTypeSuffixes || defaultTypes;

  return ref => {
    const { dispatch } = ref;

    return next => action => {
      if (action.payload) {
        if (!isPromise(action.payload) && !isPromise(action.payload.promise)) {
          return next(action);
        }
      } else {
        return next(action);
      }

      const { type, payload, meta } = action;

      const [
        PENDING,
        FULFILLED,
        REJECTED
      ] = promiseTypeSuffixes;

      const getAction = (newPayload, isRejected) => ({
        type: `${type}_${isRejected ? REJECTED : FULFILLED}`,
        ...((newPayload === null || typeof newPayload === 'undefined') ? {} : {
          payload: newPayload
        }),
        ...(!!meta ? { meta } : {}),
        ...(isRejected ? {
          error: true
        } : {})
      });

      let promise;
      let data;

      if (!isPromise(action.payload) && typeof action.payload === 'object') {
        promise = payload.promise;
        data = payload.data;
      } else {
        promise = payload;
        data = null;
      }

      next({
        type: `${type}_${PENDING}`,
        ...(!!data ? { payload: data } : {}),
        ...(!!meta ? { meta } : {})
      });

      const handleReject = reason => {
        const rejectedAction = getAction(reason, true);
        dispatch(rejectedAction);

        // 这里允许使用者添加fallback方案
        if(action.fallback && (typeof action.fallback == "function")){
          action.fallback(reason);
        }else{
          // 这里如果没有传入 fallback 方法，则默认执行报错
          message.error(reason.toString(), 2.5);
        }

        throw reason;
      };

      const handleFulfill = (value = null) => {
        const resolvedAction = getAction(value, false);
        dispatch(resolvedAction);

        return { value, action: resolvedAction };
      };

      return promise.then(handleFulfill, handleReject);
    };
  };
}
