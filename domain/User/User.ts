import { UserEntity } from '~/core/Api/User';
import { Role } from './Role';

export type IUser = UserEntity & {
  id?: number;
  name: string;
  phone: string;
  email: string;
  birth_date?: string;
  city?: string;
  company?: string;
  photo?: string;
  position?: string;
  sex?: string;
  role: Role;
};

export abstract class User implements IUser {
  id?: number;
  name: string;
  phone: string;
  email: string;
  birth_date?: string;
  city?: string;
  company?: string;
  photo?: string;
  position?: string;
  sex: string;
  role: Role;
}
