import useSWR, { SWRResponse, SWRConfiguration } from 'swr';
import { RequestConstructor } from '~/core/Api/Request';
import { useRequest } from '~/core/Api/useRequest';

export function useSWRRequest<T, T1, T2>(
  RequestClass: RequestConstructor<T, T1, T2>,
  config?: T2,
  options?: SWRConfiguration
) {
  const request = useRequest(RequestClass);
  const fetcher = () => request.request(config);
  const swr = useSWR(request.getKey(config), fetcher, options);

  return swr as SWRResponse<T, T1>;
}
