import { AuthService } from '~/services/AuthService/AuthService';
import { network } from '~/services/network';
import { loginService } from '~/services/login';
import { TokenLocalStorage } from '~/core/Auth/Token/LocalStorage';
import { TokenMemoryStorage } from '~/core/Auth/Token/MemoryStorage';

export const authService = new AuthService({
  network,
  loginService,
  tokenStorage: process.browser
    ? new TokenLocalStorage()
    : new TokenMemoryStorage(),
});
