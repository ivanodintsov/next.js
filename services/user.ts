import { UserService } from '~/services/api/UserService';
import { network } from '~/services/network';

export const userService = new UserService({
  network,
});
