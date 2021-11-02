import { RequestNope } from '~/core/Api/RequestNope';
import { authLoadingService } from '~/services/AuthService/authLoading';
import { network } from '../network';

export const authLoadingConfig = {
  userService: new RequestNope({ network }),
  authService: authLoadingService,
  permissions: {},
};
