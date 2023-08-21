import { RNBleManager } from '@src/features/ble/RNBleManager';
import { RNBleTransport } from '@src/features/ble/RNBleTransport';
import { useClearBluetoothInfo, useDispatchBluetoothInfo } from '@src/features/store/device/DeviceActionHooks';
import { useEffect, useState } from 'react';
import { BleError, Device as BluetoothDevice } from 'react-native-ble-plx';

export function useConnectBleUseCase() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectError, setConnectError] = useState<Error>();
  const [bleTransport, setBleTransport] = useState<RNBleTransport>();
  const updateBleInfo = useDispatchBluetoothInfo();
  const clearBleInfo = useClearBluetoothInfo();

  const listener = (device: BluetoothDevice, bleError?: BleError) => {
    setIsConnecting(false);
    if (bleError) setConnectError(bleError);
    updateBleInfo(device);
  };

  const connect = (deviceId: string) => {
    setIsConnecting(true);
    setConnectError(undefined);
    RNBleManager.getInstance()
      .connectById(deviceId, listener)
      .then(setBleTransport)
      .catch((e) => {
        setConnectError(e);
        setIsConnecting(false);
      });
  };

  const disconnect = () => {
    setIsConnecting(false);
    setConnectError(undefined);
    RNBleManager.getInstance().disconnect();
    clearBleInfo();
  };

  return {
    bleTransport,
    isConnecting,
    connectError,
    connect,
    disconnect,
  };
}

export function useUnsubscribeConnectionEffect() {
  useEffect(() => {
    return () => {
      RNBleManager.getInstance().unsubscriptionConnection();
    };
  }, []);
}
