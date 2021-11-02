import { Network } from '../Network/Network';

export type RequestConstructorConfig = {
  network: Network<any, any>;
};

type Config = {
  url?: string;
  method?: string;
};

export interface RequestConstructor<T, T1, T2> {
  new (config: RequestConstructorConfig): Request<T, T1, T2>;
}

export abstract class Request<ResponseSuccess, ResponseError, RequestConfig> {
  protected network: Network<any, any>;
  protected config?: Config;

  constructor({ network }: RequestConstructorConfig) {
    this.network = network;
    this.request = this.request.bind(this);
  }

  public getKey(data?: RequestConfig): any {
    return `${this.config.method}:${this.config.url}`;
  }

  public request(
    config?: RequestConfig,
    ...args: any[]
  ): Promise<ResponseSuccess | ResponseError> {
    return this.fetch(config, ...args);
  }

  protected abstract fetch(
    config?: RequestConfig,
    ...args: any[]
  ): Promise<ResponseSuccess | ResponseError>;
}
