import { RNBleManager } from '@src/features/ble/RNBleManager';
import { useEffect, useState } from 'react';
import { BleError, BleErrorCode, Device as BluetoothDevice, State } from 'react-native-ble-plx';

export function useConnectBleUseCase() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectError, setConnectError] = useState<Error>();

  const disconnected = (device: BluetoothDevice, bleError?: BleError) => {
    setIsConnecting(false);
    if (bleError) setConnectError(bleError);
  };

  const connect = (deviceId: string) => {
    setIsConnecting(true);
    setConnectError(undefined);
    RNBleManager.getInstance()
      .connectById(deviceId, disconnected)
      .catch((e) => {
        setConnectError(e);
        setIsConnecting(false);
      });
  };

  useEffect(() => {
    return () => {
      RNBleManager.getInstance().disconnect();
    };
  }, []);

  return {
    isConnecting,
    connectError,
    connect,
  };
}
