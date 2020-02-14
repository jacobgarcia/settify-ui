import axios from 'axios';
import store from 'store';
import queryString from 'query-string';

import { arrayBufferToString } from 'utils';

const PRICY_TOKEN_NAME = 'pricyToken';

const baseURL = process.env.REACT_APP_API_URL;

const handleUnauthorized = ({ status, message }) => {
  if (status === 401) {
    store.remove(PRICY_TOKEN_NAME);
    window.location.reload();
  }

  if (message) {
    if (message instanceof ArrayBuffer) {
      const abMessage = arrayBufferToString(message);
      throw abMessage;
    } else {
      throw new Error(message);
    }
  }

  if (status === 403) {
    throw new Error('Forbidden');
  }

  throw new Error('Unexpected server error');
};

const request = async ({
  url,
  data,
  method,
  skipAuth = false,
  isFormPost = false,
  isFile = false,
}) => {
  const contentType = isFormPost
    ? 'application/x-www-form-urlencoded'
    : 'application/json';

  const headers = { 'Content-Type': contentType };

  if (!skipAuth) {
    headers.Authorization = `Token ${store.get(PRICY_TOKEN_NAME)}`;
  }

  try {
    let responseType = 'json';
    if (isFormPost) {
      responseType = 'arraybuffer';
    } else if (isFile) {
      responseType = 'blob';
    }

    const response = await axios({
      baseURL,
      url,
      headers,
      data: isFormPost ? queryString.stringify(data) : data,
      method: method || (data ? 'post' : 'get'),
      responseType,
    });

    if (isFormPost) return response;

    return response.data;
  } catch (error) {
    const { status, data: message } = error.response;

    return handleUnauthorized({ status, message, reload: !skipAuth });
  }
};

const Login = {
  authenticate: (data) =>
    request({ url: '/authenticate/', data, skipAuth: true }),
};

const Aurum = {
  GetOpportunity: (id) => request({ url: `/aurum/opportunity/?id=${id}` }),
  UpdateOpportunity: (id, data) =>
    request({ url: `/aurum/opportunity/?id=${id}`, data, method: 'patch' }),
  GetCustomer: (id) => request({ url: `/aurum/customer/?id=${id}` }),
};

export default {
  Login,
  Aurum,
};
