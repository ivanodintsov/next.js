import { LoginService } from '~/services/api/LoginService';
import { network } from '~/services/network';

export const loginService = new LoginService({
  network,
});
