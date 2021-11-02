import { plainToClass } from 'class-transformer';
import { User } from '~/core/Api/User';
import { RequestConfigBase } from '../NetworkService/NetworkService';
import { UserResponseDTO } from './response/User';

type RequestConfig = RequestConfigBase & {};

export class UserService extends User<
  UserResponseDTO,
  UserResponseDTO,
  RequestConfig
> {
  requestInstance: Promise<any>;

  async fetch(data) {
    try {
      // let request;

      // if (this.requestInstance) {
      //   request = await this.requestInstance;
      // } else {
      //   this.requestInstance = this.network.request({
      //     url: '/user',
      //     method: 'get',
      //     ...data,
      //   });

      //   request = await this.requestInstance;
      // }

      return plainToClass(UserResponseDTO, {});
    } finally {
      this.requestInstance = undefined;
    }
  }
}
