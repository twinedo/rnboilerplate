import {BASE_URL} from '@env';
import axios, {AxiosError, AxiosResponse} from 'axios';

export type ConfigProps = {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete' | 'patch';
  params?: object;
  data?: any;
  headers?: object;
  cancelToken?: any;
};

const instance = axios.create();

export const _useAxios = async (props: ConfigProps) => {
  const {url, method, params, data, headers, cancelToken} = props;

  try {
    const response: AxiosResponse = await instance({
      baseURL: `${BASE_URL}`,
      url,
      method,
      params,
      data,
      cancelToken,
      headers,
    });

    return Promise.resolve(response);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const serverError = err as AxiosError<any>;
      if (serverError && serverError.response) {
        return Promise.reject(serverError.response);
      }
    } else {
      throw new Error('different error than axios');
    }
  }
};

export default instance;
