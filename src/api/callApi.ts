import axios, {
  AxiosRequestConfig,
  AxiosBasicCredentials,
  Method,
} from 'axios';
import qs from 'qs';
import {
  getUserAuthToken,
  getUserRole,
  getUserOpaId,
} from 'src/utils/user';

export interface IAPIConfig {
  method: Method;
  url: string;
  contentType?: string;
  params?: { [key: string]: unknown };
  data?: { [key: string]: unknown };
  headers?: object;
  sendToken?: boolean;
  successMessage?: string;
  auth?: AxiosBasicCredentials;
}

const HTTP = axios.create({
  withCredentials: false,
  baseURL: '/',
});

function callApi({
  method,
  url,
  contentType = 'application/json',
  params,
  data,
  sendToken = true,
  headers,
  auth,
}: IAPIConfig): any {
  const {
    token,
  } = axios.CancelToken.source();
  const config: AxiosRequestConfig = {
    data,
    method,
    params,
    url,
    cancelToken: token,
    paramsSerializer: (prm: unknown) => qs.stringify(prm, { arrayFormat: 'repeat' }),
    headers: headers || {},
  };

  if (auth) {
    config.auth = auth;
  }

  if (!headers) {
    const role = getUserRole();
    const opaId = getUserOpaId();

    if (sendToken) {
      config.headers.Authorization = `Bearer ${getUserAuthToken()}`;
    }

    if (role) {
      config.headers.ROLE = role;
    }

    if (opaId) {
      config.headers.opaid = opaId;
    }

    if (contentType !== 'multipart/form-data') {
      config.headers['Content-Type'] = contentType;
    }
  }
  return HTTP.request(config);
}

export default callApi;
