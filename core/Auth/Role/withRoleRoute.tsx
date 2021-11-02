import * as React from 'react';
import { getDisplayName } from '../../helpers/getDisplayName';
import { useRoleRoute, RoleRouteConfig } from './useRoleRoute';

type WithRoleRouteConfig = RoleRouteConfig & {
  loader?: React.ElementType;
};

const defaultConfig = {
  loader: () => <>Загрузка</>,
};

export const withRoleRoute = (config: WithRoleRouteConfig) => (
  WrappedComponent
) => {
  const WithRoleRoute = (props) => {
    const isAllowed = useRoleRoute(config);
    const Loader = config.loader || defaultConfig.loader;

    const children = <WrappedComponent {...props} />;

    if (Loader && !isAllowed) {
      return children;
    }

    return children;
  };

  WithRoleRoute.displayName = `WithSubscription(${getDisplayName(
    WrappedComponent
  )})`;

  return WithRoleRoute;
};
