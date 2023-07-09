import {useState} from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void, Error | null] {
  const [error, setError] = useState<Error | null>(null);

  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
    }
  };

  return [storedValue, setValue, error];
}
