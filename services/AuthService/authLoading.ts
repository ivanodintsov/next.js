import { network } from '~/services/network';
import { loginService } from '~/services/login';
import { TokenMemoryStorage } from '~/core/Auth/Token/MemoryStorage';
import { AuthLoadingService } from '~/core/Auth/AuthLoadingService';

export const authLoadingService = new AuthLoadingService({
  network,
  loginService: loginService,
  tokenStorage: new TokenMemoryStorage(),
});
