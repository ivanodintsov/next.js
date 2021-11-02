import { Auth } from '~/core/Auth/Auth';
import { AuthLoadingServiceError } from './errors/AuthLoadingServiceError';

export class AuthLoadingService extends Auth {
  createEventsSubscriptions() {}

  async authorize() {
    throw new AuthLoadingServiceError();
  }

  async logout() {
    throw new AuthLoadingServiceError();
  }
}
