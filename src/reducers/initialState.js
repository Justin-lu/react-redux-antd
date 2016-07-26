// 统一声明默认State
import cookie from 'js-cookie';

export default {
  auth: {
    isFetching: false,
    isAuthenticated: cookie.get('access_token') ? true : false
  },
  users: {
    isFetching: false,
    meta: {
      total: 0,
      perPage: 10,
      page: 1
    },
    data: []
  }
};
