import * as React from 'react';
import { ComponentsDict } from './types';
import UserDistributor from './UserDistributor';

type Config = {
  getComponent?: (
    user: any,
    components: ComponentsDict
  ) => React.ElementType | undefined;
};

export const withRoleComponent = (
  components: ComponentsDict,
  config?: Config
) => () => {
  const WithRoleComponent = (props) => {
    return <UserDistributor components={components} {...config} {...props} />;
  };

  WithRoleComponent.displayName = `WithRoleComponent`;

  return WithRoleComponent;
};
