import {
  AUTHENTICATED,
  IDLE,
  LOADING,
  LOGGED_OUT,
  REJECTED,
} from './constants';

export type User = {
  role: string | number;
};

export type AuthStatuses =
  | typeof IDLE
  | typeof LOADING
  | typeof AUTHENTICATED
  | typeof REJECTED
  | typeof LOGGED_OUT;

export type State = {
  status: AuthStatuses;
  user: User;
  error?: any;
};

export type DefaultStatePayload = {
  defaultRole?: User['role'];
};
