// usePagination.ts
import {AxiosError, AxiosResponse} from 'axios';
import {useEffect, useState} from 'react';
import {ConfigProps} from 'services/useAxios';

export type TParams<TData> = {
  func: () => Promise<AxiosResponse<TData>>;
} & ConfigProps;

const useFetching = <TData>(props: TParams<TData>) => {
  const {func} = props;
  const [data, setData] = useState<TData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await func();

      setData(response?.data);
    } catch (err: any) {
      console.error('Error fetching data:', err);
      // setError(JSON.stringify(err));
      setError(
        JSON.stringify((err as AxiosError)?.response?.data || err.message),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = () => {
    fetchData();
  };

  return {
    data,
    refetch,
    isFetching: isLoading,
    error,
  };
};

export default useFetching;
