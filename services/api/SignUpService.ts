import { plainToClass } from 'class-transformer';
import { Request } from '~/core/Api/Request';
import { RequestConfigBase } from '../NetworkService/NetworkService';
import { SignUpRequestDTO } from './request/SignUp';
import { SignUpResponseDTO } from './response/SignUp';

type RequestConfig = RequestConfigBase & {};

export class SignUpService extends Request<
  SignUpResponseDTO,
  SignUpResponseDTO,
  RequestConfig
> {
  protected config = {
    method: 'post',
    url: '/auth/register',
  };

  async fetch(data: RequestConfig) {
    try {
      const request = await this.network.request({
        ...this.config,
        data: plainToClass(SignUpRequestDTO, data),
      });

      const response = plainToClass(SignUpResponseDTO, request.data);

      return response;
    } catch (error) {
      if (error?.response?.data) {
        error.response.data = plainToClass(
          SignUpResponseDTO,
          error?.response?.data
        );
      }

      throw error;
    }
  }
}
