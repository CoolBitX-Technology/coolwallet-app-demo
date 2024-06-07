import { useState, useEffect } from 'react';
import RNNfcManager from '../NFCManager';
import RNNfcTransport from '@src/features/nfc/RNNfcTransport';

const useConnectNfcUseCase = () => {
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const connect = async () => {
      try {
        await RNNfcTransport.connect();
        setConnected(true);
      } catch (err:any) {
        setError(err);
        setConnected(false);
      }
    };

    connect();

    return () => {
      RNNfcTransport.disconnect().then(() => setConnected(false));
    };
  },[]);

  console.log(`connected`,connected)

  const disconnect = async () => {
    try {
      await RNNfcTransport.disconnect();
      setConnected(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return { connected, error, disconnect};
};

export default useConnectNfcUseCase;
