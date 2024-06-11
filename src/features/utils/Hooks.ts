import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

// Declare a state and initialize it with AsyncStorage.
export function useAsyncStorageState(storageKey: string) {
  const [value, setValue] = useState('');

  // initialize value.
  useEffect(() => {
    if (!storageKey) throw new Error(`useAsyncStorageState >>> storageKey not provided.`);
    AsyncStorage.getItem(storageKey).then((item) => setValue(item || ''));
  }, []);

  // store value into AsyncStorage.
  const store = () => {
    if (!storageKey) throw new Error(`useAsyncStorageState >>> storageKey not provided.`);
    AsyncStorage.setItem(storageKey, value);
  };

  return {
    value,
    setValue,
    store,
  };
}
