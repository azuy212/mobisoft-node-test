import AuthStorage from '../../auth-storage';

const baseConfig = {
  baseURL: process.env.API_ENDPOINT || 'http://localhost:8888',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: AuthStorage.getToken(),
  },
};

export default baseConfig;
