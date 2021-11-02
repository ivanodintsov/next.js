import * as React from 'react';
import BaseModalProviderComponent from './baseModalProvider';
import { useModalProvider } from './useModalProvider';

export const SingleModalProvider = () => {
  const { state, ...providerProps } = useModalProvider();

  React.useEffect(() => {
    const stackSize = state.stack.length;

    if (stackSize > 1) {
      providerProps.hideModal(state.stack[stackSize - 2].id);
    }
  }, [state.stack.length]);

  return <BaseModalProviderComponent state={state} {...providerProps} />;
};

export default SingleModalProvider;
