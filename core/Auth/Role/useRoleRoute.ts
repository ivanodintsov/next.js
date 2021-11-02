import { useRouter } from 'next/router';
import * as React from 'react';
import { AuthContext, useAuth } from '../authContext';
import { IDLE, LOADING } from '../state/constants';

export type RoleRouteConfig = {
  redirect?: string;
  rules: object;
  getKey?: (user: any) => string;
};

const getKeyDefault = (item) => item?.role;

const checkRules = (auth: AuthContext<any>, config: RoleRouteConfig) => {
  if (auth.status === LOADING || auth.status === IDLE) {
    return;
  }

  const key: string = config.getKey
    ? config.getKey(auth.user)
    : getKeyDefault(auth.user);

  return !!config.rules[key];
};

export const useRoleRoute = (config: RoleRouteConfig) => {
  const Router = useRouter();
  const auth = useAuth();
  const redirectUrl = config.redirect || '/';
  const isAllowed = checkRules(auth, config);

  React.useEffect(() => {
    if (isAllowed === false) {
      Router.push(redirectUrl);
    }
  }, [auth.status]);

  return isAllowed;
};
