import { plainToClass } from 'class-transformer';
import { SignInRequestDTO } from '~/services/api/request/SignIn';
import { Auth } from '~/core/Auth/Auth';

export class AuthService extends Auth {
  UNAUTHORIZED_STATUS = 401;

  createEventsSubscriptions() {
    this.network.events.on('error', this.networkErrorHandler.bind(this));
  }

  private networkErrorHandler(error) {
    const status = error?.response?.status;

    if (status === this.UNAUTHORIZED_STATUS) {
      this.tokenStorage.removeToken();
      this.events.emit(`${this.UNAUTHORIZED_STATUS}`, error);
    }
  }

  async authorize(data) {
    try {
      const requestData = plainToClass(SignInRequestDTO, data);
      const request = await this.loginService.login(requestData);

      this.tokenStorage.token = request?.data?.token;

      this.events.emit('login', {
        request,
        success: true,
      });

      return request;
    } catch (error) {
      this.events.emit('login', {
        error,
        success: false,
      });

      throw error;
    }
  }

  async logout(data) {
    const token = this.tokenStorage.token;

    if (!token) {
      return;
    }

    this.tokenStorage.removeToken();

    try {
      const request = await this.loginService.logout({ data });

      this.events.emit('logout', {
        request,
        success: true,
      });

      return request;
    } catch (error) {
      this.events.emit('logout', {
        error,
        success: false,
      });

      throw error;
    }
  }
}
