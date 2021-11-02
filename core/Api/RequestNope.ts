import { Request } from './Request';

type RequestConfig = {};

export class RequestNope extends Request<any, any, RequestConfig> {
  async fetch() {}
}
