import { useRouter } from 'next/router';
import * as React from 'react';
import { useAuth } from './authContext';
import { DEFAULT_REDIRECT_URL } from './constants';
import { LOGGED_OUT, REJECTED } from './state/constants';
import { PrivateRouteConfig } from './types';

export const usePrivateRoute = (config: PrivateRouteConfig) => {
  const Router = useRouter();
  const auth = useAuth();
  const redirectUrl = config.redirectUrl || DEFAULT_REDIRECT_URL;

  const redirect = () => {
    if (auth.status === REJECTED || auth.status === LOGGED_OUT) {
      Router.push(redirectUrl);
    }
  };

  React.useEffect(() => {
    redirect();
  }, [auth.status]);
};
