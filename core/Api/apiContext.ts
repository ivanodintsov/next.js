import { createContext, useContext } from 'react';
import { Network } from '../Network/Network';

export type ApiContext = {
  network: Network<any, any>;
};

const ApiContext = createContext<ApiContext>({
  network: undefined,
});

export const ApiProvider = ApiContext.Provider;
export const ApiConsumer = ApiContext.Consumer;
export const useApi = () => useContext(ApiContext);
