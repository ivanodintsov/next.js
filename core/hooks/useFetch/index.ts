import { useState, useEffect } from 'react';
import * as R from 'ramda';

type FetchResponse<ResponseSuccess, ResponseError, T3> = {
  loading: boolean;
  data: ResponseSuccess | undefined;
  error: ResponseError | any;
  fetch(data?: T3 | boolean, ...args: any[]): Promise<ResponseSuccess>;
};

type FetchOptions<T1, T2, T3> = {
  onMount?: boolean | T3;
  throw?: boolean;
  defaultData?: T1;
};

export function useFetch<ResponseSuccess, ResponseError, T3>(
  fn: (
    data: T3 | boolean,
    ...args: any[]
  ) => Promise<ResponseSuccess | ResponseError>,
  options?: FetchOptions<ResponseSuccess, ResponseError, T3>
): FetchResponse<ResponseSuccess, ResponseError, T3> {
  const onMount = R.prop('onMount', options);
  const defaultData = R.prop('defaultData', options);
  const [data, setData] = useState({
    data: defaultData,
    success: undefined,
    error: undefined,
  });
  const [loading, setLoading] = useState(!!onMount);

  useEffect(() => {
    setLoading(false);
  }, [data]);

  const fetch = async (data?: T3 | boolean, ...args) => {
    setLoading(true);

    try {
      const response = await fn(data, ...args) as ResponseSuccess;
      setData({
        data: response,
        error: undefined,
        success: true,
      });

      return response;
    } catch (error) {
      const isThrow = R.prop('throw', options);

      setData({
        data: defaultData,
        success: undefined,
        error,
      });

      if (isThrow) {
        throw error;
      }

      return error;
    }
  };

  useEffect(() => {
    if (onMount) {
      fetch(onMount);
    }
  }, []);

  return {
    loading,
    data: R.path(['data'], data),
    error: R.path(['error'], data),
    fetch,
  };
}
