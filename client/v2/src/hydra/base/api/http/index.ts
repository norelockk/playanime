// @important_note
// For backend we are using Payload CMS with our custom stuff.

import Axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

import Environment from '../../../../env';

import { LogLevel } from '../../../../typings/enums';
import { RequestOptions } from '../../../../typings/interfaces';
import { logger } from '../..';

const axios: AxiosInstance = Axios.create({ baseURL: Environment.API_URL, withCredentials: true });

async function request<T>(options: RequestOptions): Promise<T> {
  logger.log(LogLevel.Info, 'requesting', options);

  try {
    const response = await axios.request<T>({ method: options.method, url: options.url, params: options.params, data: options.data, headers: options.headers });
    logger.log(LogLevel.Debug, 'got response', response.data);

    return response.data;
  } catch (error) {
    logger.log(LogLevel.Error, 'got error response', error);

    throw error;
  }
}

function requestInterceptor(options: InternalAxiosRequestConfig<any>): InternalAxiosRequestConfig {
  /// since using Payload CMS, there's no need to have a additional token, because
  /// everything that we need is already bulit in cookies etc.

  // const token = storage.getStorageData('clientAccessToken');
  // if (typeof token === 'string' && !isEmpty(token))
  //   options.headers['Authorization'] = `Bearer ${token}`;

  return options;
};

axios.interceptors.request.use(requestInterceptor.bind(axios));

export default abstract class HttpApi {
  public async send<T>(url: string, data: Record<string, any>, headers?: Record<string, string>): Promise<T> {
    return await request<T>({ method: 'POST', url, data, headers });
  }

  public async fetch<T>(url: string, params?: Record<string, any>, headers?: Record<string, string>): Promise<T> {
    return await request<T>({ method: 'GET', url, params, headers });
  }
}