import axios from 'axios';
import * as baseInterceptor from './base.interceptor';
import baseConfig from './base.config';

const API = axios.create(baseConfig);

API.interceptors.request.use(baseInterceptor.interceptRequest);
API.interceptors.response.use(baseInterceptor.interceptResponse);

export default API;
