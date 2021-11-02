import { useMemo } from 'react';
import { useApi } from './apiContext';
import { RequestConstructor } from './Request';

export function useRequest<T, T1, T2>(
  RequestClass: RequestConstructor<T, T1, T2>
) {
  const api = useApi();
  const request = useMemo(
    () =>
      new RequestClass({
        network: api.network,
      }),
    [api.network]
  );

  return request;
}
