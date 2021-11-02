import { authService } from '~/services/auth';
import { userService } from '~/services/user';

export const authConfig = {
  userService,
  authService,
  permissions: {},
};
