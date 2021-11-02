import * as React from 'react';
import { getDisplayName } from '../helpers/getDisplayName';
import { VisitorOnlyRouteConfig } from './types';
import { useVisitorOnlyRoute } from './useVisitorOnlyRoute';

export const withVisitorOnlyRoute = (config: VisitorOnlyRouteConfig) => (
  WrappedComponent
) => {
  const WithVisitorOnlyRoute = (props) => {
    useVisitorOnlyRoute(config);

    return <WrappedComponent {...props} />;
  };

  WithVisitorOnlyRoute.displayName = `WithSubscription(${getDisplayName(
    WrappedComponent
  )})`;

  return WithVisitorOnlyRoute;
};
