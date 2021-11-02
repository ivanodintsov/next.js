import * as React from 'react';

export type ComponentsDict = {
  [key: string]: React.ElementType;
};

export type UserDistributorProps<T> = {
  components: ComponentsDict;
  getComponent?: (user: any, components: ComponentsDict) => React.ElementType;
} & T;

export type PrivateRouteConfig = {
  redirectUrl?: string;
};

export type VisitorOnlyRouteConfig = {
  redirectUrl?: string;
};
