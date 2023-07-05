import {Id} from '../types';
import {useToast} from '@chakra-ui/react';
import {useReducer, useCallback, Reducer} from 'react';

type Action<T> =
  | {type: 'getDataStart'}
  | {type: 'getDataSuccess'; payload: T}
  | {type: 'getDataError'; payload: Error};

interface State<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

function reducer<T>(state: State<T>, action: Action<T>): State<T> {
  switch (action.type) {
    case 'getDataStart':
      return {...state, isLoading: true, error: null};
    case 'getDataSuccess':
      return {...state, isLoading: false, data: action.payload, error: null};
    case 'getDataError':
      return {...state, isLoading: false, error: action.payload};
    default:
      return state;
  }
}

export function useFetchData<T>(
  fetcher: (param?: string | number) => Promise<T>
): [State<T>, (param?: string | number) => Promise<void>] {
  const toast = useToast();
  const [state, dispatch] = useReducer<Reducer<State<T>, Action<T>>>(reducer, {
    data: null,
    isLoading: false,
    error: null,
  });

  const fetchData = useCallback(async () => {
    dispatch({type: 'getDataStart'});
    try {
      const data = await fetcher(param);
      dispatch({type: 'getDataSuccess', payload: data});
    } catch (error) {
      if (error instanceof Error) {
        dispatch({type: 'getDataError', payload: error});
        toast({
          title: `Failed to fetch data. ${error.message}!`,
          position: 'bottom-left',
          status: 'error',
        });
      }
    }
  }, [fetcher, toast, param]);

  return [state, fetchData];
}
