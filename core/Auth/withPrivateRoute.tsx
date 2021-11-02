import * as React from 'react';
import { getDisplayName } from '../helpers/getDisplayName';
import { PrivateRouteConfig } from './types';
import { usePrivateRoute } from './usePrivateRoute';

export const withPrivateRoute = (config: PrivateRouteConfig) => (
  WrappedComponent
) => {
  const WithPrivateRoute = (props) => {
    usePrivateRoute(config);

    return <WrappedComponent {...props} />;
  };

  WithPrivateRoute.displayName = `WithSubscription(${getDisplayName(
    WrappedComponent
  )})`;

  return WithPrivateRoute;
};
