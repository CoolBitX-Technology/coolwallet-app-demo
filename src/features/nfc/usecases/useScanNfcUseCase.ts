import { useState, useEffect } from 'react';
import RNNfcTransport from '../RNNfcTransport';

const useScanNfcUseCase = () => {
  const [scannedTag, setScannedTag] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleNfcDiscovered = (data: any) => {
      setScannedTag(data);
    };

    const startScan = async () => {
      try {
        RNNfcTransport.startScan(handleNfcDiscovered);
      } catch (err: any) {
        setError(err.message);
      }
    };

    startScan();

    return () => {
      RNNfcTransport.stopScan();
    };
  }, []); 

  return { scannedTag, error };
};

export default useScanNfcUseCase;
