import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { requestMultiple, PERMISSIONS } from 'react-native-permissions';
import { RNBleManager } from '@src/features/ble/RNBleManager';
import { BleError, BleErrorCode, Device as BluetoothDevice, State } from 'react-native-ble-plx';

export function useScanBleUseCase() {
  const [isScaning, setIsScaning] = useState(false);
  const [scannedDevices, setScannedDevices] = useState<Array<BluetoothDevice>>([]);
  const [error, setError] = useState<BleError | undefined>();
  const Permissions = useBlePermissions();

  const listener = async (bleError?: BleError, device?: BluetoothDevice) => {
    if (!bleError) {
      if (error) setError(undefined);
      if (!device) return;
      if (scannedDevices.some((savedDevice) => savedDevice.id === device.id)) return;
      setScannedDevices(scannedDevices.concat(device));
      return;
    }
    setIsScaning(false);
    setError(bleError);
    switch (bleError?.errorCode) {
      case BleErrorCode.BluetoothUnauthorized:
        const results = await requestMultiple(Permissions);
        if (Object.values(results).filter((result) => result === 'granted').length !== Permissions.length) return;
        // startScan();
        break;
    }
  };

  const startScan = () => {
    setIsScaning(true);
    RNBleManager.getInstance().listen(listener);
  };

  useEffect(() => {
    RNBleManager.getInstance().addListener((state) => {
      console.log('useScanBleUseCase.addListener >>> state = ', state);
      if (state !== State.PoweredOn && state !== State.PoweredOff) return;
      startScan();
    }, true);
    return () => RNBleManager.getInstance().stopListen();
  }, []);

  return {
    error,
    isScaning,
    scannedDevices,
    startScan,
  };
}

function useBlePermissions() {
  if (Platform.OS === 'ios') return [PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL, PERMISSIONS.IOS.LOCATION_WHEN_IN_USE];
  return [
    PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
    PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
  ];
}
