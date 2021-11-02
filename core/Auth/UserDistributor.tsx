import * as React from 'react';
import * as R from 'ramda';
import { UserDistributorProps } from './types';
import { useAuth } from '../Auth/authContext';

const UserDistributor = <T extends {}>({
  components,
  getComponent,
  ...props
}: UserDistributorProps<T>) => {
  const { user } = useAuth();
  const Component: React.ElementType = getComponent(user, components);

  if (!Component) {
    return null;
  }

  return <Component key={user.role} {...props} />;
};

UserDistributor.defaultProps = {
  getComponent: (user, components) => {
    const role = user?.role;
    return components?.[role];
  },
};

export default UserDistributor;
