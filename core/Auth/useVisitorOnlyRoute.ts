import * as React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './authContext';
import { DEFAULT_REDIRECT_URL } from './constants';
import { VisitorOnlyRouteConfig } from './types';
import { AUTHENTICATED } from './state/constants';

export const useVisitorOnlyRoute = (config: VisitorOnlyRouteConfig) => {
  const Router = useRouter();
  const auth = useAuth();
  const redirectUrl = config.redirectUrl || DEFAULT_REDIRECT_URL;

  const redirect = () => {
    if (auth.status === AUTHENTICATED) {
      Router.push(redirectUrl);
    }
  };

  React.useEffect(() => {
    redirect();
  }, [auth.status]);
};
