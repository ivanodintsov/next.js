import * as R from 'ramda';
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';
import { ConcurrencyManager } from 'axios-concurrency';
import { Network } from '~/core/Network/Network';
import { TokenStorage } from '~/core/Auth/Token/Storage';

export type RequestConfigBase = {
  notification?: {
    success?: boolean;
    failure?: boolean;
  };
};

type RequestConfig = AxiosRequestConfig & RequestConfigBase;

type NetworkConfig = AxiosRequestConfig & {
  tokenStorage: TokenStorage;
};

export class NetworkService extends Network<AxiosInstance, AxiosRequestConfig> {
  public tokenStorage: TokenStorage;

  private MAX_CONCURRENT_REQUESTS: number = 3;
  private defaultAxiosConfig: AxiosRequestConfig = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  constructor({ tokenStorage, ...config }) {
    super(config);

    this.tokenStorage = tokenStorage;
  }

  protected createHttp({ tokenStorage, ...config }: NetworkConfig) {
    const axiosRequestConfig = R.mergeDeepRight(
      this.defaultAxiosConfig,
      config
    );
    this.http = axios.create(axiosRequestConfig as AxiosRequestConfig);
    ConcurrencyManager(this.http, this.MAX_CONCURRENT_REQUESTS);
    this.createInterceptors();
  }

  private createInterceptors() {
    this.onRequestFulfilled = this.onRequestFulfilled.bind(this);
    this.onResponseFulfilled = this.onResponseFulfilled.bind(this);
    this.onResponseRejected = this.onResponseRejected.bind(this);
    this.onRequestRejected = this.onRequestRejected.bind(this);

    this.http.interceptors.request.use(
      this.onRequestFulfilled,
      this.onRequestRejected
    );

    this.http.interceptors.response.use(
      this.onResponseFulfilled,
      this.onResponseRejected
    );
  }

  private onRequestFulfilled(config: AxiosRequestConfig) {
    if (this.tokenStorage.token) {
      return R.assocPath(
        ['headers', 'common', 'Authorization'],
        `Bearer ${this.tokenStorage.token}`,
        config
      );
    }

    return config;
  }

  private onRequestRejected(error: AxiosError<RequestConfig>) {
    return Promise.reject(error);
  }

  private onResponseFulfilled(response: AxiosResponse) {
    this.events.emit('success', response);
    return response;
  }

  private onResponseRejected(error: AxiosError<RequestConfig>) {
    this.events.emit('error', error);
    return Promise.reject(error);
  }

  public async request<Response>(config: RequestConfig) {
    const request = await this.http(config);

    return request as AxiosResponse<Response>;
  }
}
