// usePagination.ts
import {AxiosError} from 'axios';
import {useEffect, useState} from 'react';

const useFetching = <TData>(func: () => Promise<TData>) => {
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
      console.log('dat cuk', response);

      setData(response);
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
