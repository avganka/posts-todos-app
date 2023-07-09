import {api} from '../api/apiConfig';
import {useToast} from '@chakra-ui/react';
import {Dispatch, SetStateAction, useCallback, useState} from 'react';

interface ReturnDate<T> {
  data: T | null;
  loading: boolean;
  length: number;
}

export function useFetchData<T>(
  url: string
): [ReturnDate<T>, () => Promise<void>, Dispatch<SetStateAction<T | null>>] {
  const toast = useToast();

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [length, setLength] = useState<number>(0);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get<T>(url);
      setData(res.data);
      setLength(Number(res.headers['x-total-count']));
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: `Failed to fetch data. ${error.message}!`,
          position: 'bottom-left',
          status: 'error',
        });
      }
    }
    setLoading(false);
  }, [toast, url]);

  return [{data, loading, length}, fetchData, setData];
}
