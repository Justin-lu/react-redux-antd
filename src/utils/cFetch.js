import fetch from 'isomorphic-fetch';
require('es6-promise').polyfill();

import cookie from 'js-cookie';
import { API_CONFIG } from './../config/api';

import { Modal } from 'antd';

const errorMessages = (res) => `${res.status} ${res.statusText}`;

function check401(res) {
  // 登陆界面不需要做401校验
  if (res.status === 401 && !res.url.match('auth')) {
    Modal.error({
      title: "登陆验证过期",
      content: "您的登陆验证已过期，请重新登陆",
      onOk: () => {
        cookie.remove('access_token');
        location.href = '/';
      }
    });

    return Promise.reject(errorMessages(res));

  }
  return res;
}

function check404(res) {
  if (res.status === 404) {
    return Promise.reject(errorMessages(res));
  }
  return res;
}

function jsonParse(res) {
  return res.json().then(jsonResult => ({ ...res, jsonResult }));
}

function setUriParam(keys, value, keyPostfix) {
  let keyStr = keys[0];

  keys.slice(1).forEach((key) => {
    keyStr += `[${key}]`;
  });

  if (keyPostfix) {
    keyStr += keyPostfix;
  }

  return `${encodeURIComponent(keyStr)}=${encodeURIComponent(value)}`;
}

function getUriParam(keys, object) {
  const array = [];

  if (object instanceof(Array)) {
    object.forEach((value) => {
      array.push(setUriParam(keys, value, '[]'));
    });
  } else if (object instanceof(Object)) {
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        const value = object[key];

        array.push(getUriParam(keys.concat(key), value));
      }
    }
  } else {
    if (object !== undefined) {
      array.push(setUriParam(keys, object));
    }
  }

  return array.join('&');
}

function toQueryString(object) {
  const array = [];

  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const str = getUriParam([key], object[key]);

      if (str !== '') {
        array.push(str);
      }
    }
  }

  return array.join('&');
}


// TODO: 用户登陆之后，需保存Token至cookie
function cFetch(url, options) {
  let mergeUrl = API_CONFIG.baseUri + url;
  const defaultOptions = {
    method: 'GET'
  };

  const opts = Object.assign({}, defaultOptions, {...options});

  // add query params to url when method is GET
  if (opts && opts.method == "GET" && opts['params']) {
    mergeUrl = mergeUrl + '?' + toQueryString(opts['params']);
  }

  opts.headers = {
    ...opts.headers,
    'Authorization': cookie.get('access_token') || ''
  };

  return fetch(mergeUrl, opts)
    .then(check401)
    .then(check404)
    .then(jsonParse)
    .catch( (error) => {
      console.log('request failed', error); // eslint-disable-line  no-console
      return { error };
    });
}

export default cFetch;
