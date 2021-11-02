import { createContext, useContext } from 'react';
import { Role } from '~/domain/User/Role';
import { Auth } from './Auth';
import { IDLE } from './state/constants';
import { AuthStatuses } from './state/types';

type IUser = {
  role?: string;
};

export type AuthContext<User extends IUser> = {
  isAuthenticated: boolean;
  status: AuthStatuses;
  user: User;
  initiateLogin: (data) => void;
  handleAuthentication: () => void;
  logout: () => void;
  setSession: (data: object) => void;
  authService: Auth;
};

const authContext = createContext<AuthContext<{}>>({
  isAuthenticated: false,
  status: IDLE,
  user: {
    role: Role.TYPE.guest,
  },
  initiateLogin: (data) => {},
  handleAuthentication: () => {},
  logout: () => {},
  setSession: () => {},
  authService: undefined,
});

export const AuthProvider = authContext.Provider;
export const AuthConsumer = authContext.Consumer;

export const useAuth = (): AuthContext<any> => useContext(authContext);
