import { Role } from '~/domain/User/Role';
import { Request } from './Request';

export type UserEntity = {
  role: Role;
};

export abstract class User<
  User extends UserEntity,
  UserFail,
  RequestConfig
> extends Request<User, UserFail, RequestConfig> {}
