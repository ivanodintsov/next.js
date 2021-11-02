import { NetworkService } from '../NetworkService/NetworkService';

export type LoginServiceConfig = {
  network: NetworkService;
};

export class LoginService {
  network: NetworkService;

  constructor({ network }: LoginServiceConfig) {
    this.network = network;
  }

  async login(data) {
    const request = await this.network.request({
      url: '/auth/login',
      method: 'post',
      data,
    });

    return request.data;
  }

  async logout(data) {
    // const request = await this.network.request({
    //   url: '/auth/logout',
    //   method: 'post',
    //   data,
    // });
    // return request;
  }
}
