import AuthStorage from '../../auth-storage';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export const interceptRequest = (requestConfig: AxiosRequestConfig) => {
  const token = AuthStorage.getToken();
  if (token) {
    requestConfig.headers.Authorization = `Bearer ${token}`;
  }

  return requestConfig;
};

export const interceptResponse = (response: AxiosResponse) => {
  return response;
};
