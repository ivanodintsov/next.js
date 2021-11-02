import * as React from 'react';
import BaseModalProviderComponent from './baseModalProvider';
import { useModalProvider } from './useModalProvider';

export const StackableModalProvider = () => {
  const { state, ...providerProps } = useModalProvider();

  return <BaseModalProviderComponent state={state} {...providerProps} />;
};

export default StackableModalProvider;
