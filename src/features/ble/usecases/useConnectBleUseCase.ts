import { Transport } from '@coolwallet/core';
import { RNBleManager } from '@src/features/ble/RNBleManager';
import { useBluetoothInfo, useDispatchBluetoothInfo } from '@src/features/store/device/DeviceActionHooks';
import { useEffect, useState } from 'react';
import { BleError, Device as BluetoothDevice } from 'react-native-ble-plx';

export function useConnectBleUseCase() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectError, setConnectError] = useState<Error>();
  const updateBleInfo = useDispatchBluetoothInfo();

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
      .catch((e) => {
        setConnectError(e);
        setIsConnecting(false);
      });
  };

  const disconnect = (deviceId: string) => {
    setIsConnecting(false);
    setConnectError(undefined);
    RNBleManager.getInstance().disconnectedById(deviceId);
  };

  const transport = useBleTransport();

  return {
    isConnecting,
    connectError,
    transport,
    connect,
    disconnect,
  };
}

export function useSubscribeConnectionEffect() {
  const bleInfo = useBluetoothInfo();
  const updateBleInfo = useDispatchBluetoothInfo();
  const listener = (device: BluetoothDevice) => {
    updateBleInfo(device);
  };
  useEffect(() => {
    if (!bleInfo) return;
    RNBleManager.getInstance().listenConnectedDevice(bleInfo.deviceId, listener);
  }, [bleInfo]);
}

export function useDisconnectAllEffect() {
  useEffect(() => {
    return () => {
      RNBleManager.getInstance().disconnect();
    };
  }, []);
}

export function useBleTransport() {
  const bleInfo = useBluetoothInfo();
  const [transport, setTransport] = useState<Transport>();
  useEffect(() => {
    if (!bleInfo) return;
    RNBleManager.getInstance().findRNBleTransport(bleInfo.deviceId).then(setTransport);
  }, [bleInfo]);
  return transport;
}
