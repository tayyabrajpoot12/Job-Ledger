import axios from 'axios';

import {store} from '../store';
import {endPoints} from './ENV';
import {setAccountModal} from '../store/reducer/AuthConfig';

const baseURL = endPoints.BASE_URL;

const createApi = () => {
  const instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  instance.interceptors.request.use(async config => {
    return config;
  });
  instance.interceptors.response.use(
    response => {
      store.dispatch(setAccountModal(false));
      return response;
    },
    error => {
      if (error?.response?.status === 440) {
        store.dispatch(setAccountModal(true));
      } else {
        return Promise.reject(error);
      }
    },
  );
  const get = url => {
    return instance.get(url);
  };
  const post = (url, data) => {
    return instance.post(url, data);
  };
  const put = (url, data) => {
    return instance.put(url, data);
  };
  const del = url => {
    return instance.delete(url);
  };
  return {get, post, put, del};
};
export const {get, post, put, del} = createApi();
