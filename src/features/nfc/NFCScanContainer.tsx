import React, { useEffect, useState } from 'react';
import RNNfcTransport from './RNNfcTransport';
import { TagEvent } from 'react-native-nfc-manager';
import { useLogUseCase } from '@src/features/home/usecases/useLogUseCase';
import { useNavigation } from '@react-navigation/native';
import { NFCScanView } from '@src/features/nfc/NFCScanView';

const NFCScanContainer = () => {
  const [nfcData, setNfcData] = useState<string | null>(null);
  //GetCardInfo 80660000
  //SelectApplet
  const [inputData, setInputData] = useState('00a404000d436f6f6c57616c6c657450524f');
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const { log, addLog } = useLogUseCase();

  const handleTagDiscovered = async (tag: TagEvent) => {
    console.log('onTagDiscovered', tag);
    try {
      const data = await RNNfcTransport.readData(tag, handleTagDiscovered);
      if (data) {
        setNfcData(data);
        addLog(`>> read: ${data}`);
      }
    } catch (err) {
      setError(`Failed to read NFC data: ${err}`);
    }
  };

  useEffect(() => {
    const checkNfc = async () => {
      const enabled = await RNNfcTransport.startNfc();
      if (!enabled) {
        console.error('NFC is not enabled on this device');
      }
    };

    checkNfc();

    const connectNfc = async () => {
      try {
        await RNNfcTransport.connect(handleTagDiscovered);
        setIsConnected(true);
      } catch (err) {
        setError(`Failed to connect to NFC tag: ${err}`);
      }
    };

    connectNfc();

    return () => {
      const disconnectNfc = async () => {
        try {
          await RNNfcTransport.disconnect(true);
        } catch (err) {
          console.warn('Failed to disconnect NFC:', err);
        } finally {
          setIsConnected(false);
        }
      };

      disconnectNfc();
    };
  }, []);

  const handleWriteData = async () => {
    if (!isConnected) return;

    try {
      const response = await RNNfcTransport.writeData(inputData, handleTagDiscovered);
      setNfcData(`Wrote: ${inputData}`);
      addLog(`>> write: ${inputData}`);
      addLog(`>> return: ${response}`);
    } catch (e: any) {
      console.error('Failed to write NFC data:', e);
      addLog(`>> write error: ${e.message}`);
    }
  };

  const goBack = useNavigation().goBack;

  return (
    <NFCScanView
      command={inputData}
      setCommand={setInputData}
      log={log}
      onWritePressed={handleWriteData}
      onGoBcakPressed={goBack}
    />
  );
};

export default NFCScanContainer;
