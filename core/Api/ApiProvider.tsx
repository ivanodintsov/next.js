import * as React from 'react';
import { ApiProvider as ApiProviderBase } from './apiContext';
import { Network } from '../Network/Network';

export type ApiProviderProps = {
  network: Network<any, any>;
};

export const ApiProvider: React.FC<ApiProviderProps> = ({
  network,
  children,
}) => {
  const apiProviderValue = React.useMemo(
    () => ({
      network,
    }),
    [network]
  );

  return <ApiProviderBase value={apiProviderValue}>{children}</ApiProviderBase>;
};

export default ApiProvider;
