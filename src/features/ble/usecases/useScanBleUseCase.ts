import { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { requestMultiple, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { RNBleManager } from '@src/features/ble/RNBleManager';
import { BleError, BleErrorCode, Device as BluetoothDevice, State } from 'react-native-ble-plx';

export function useScanBleUseCase() {
  const [isScaning, setIsScaning] = useState(false);
  const [scannedDevices, setScannedDevices] = useState<Array<BluetoothDevice>>([]);
  const [error, setError] = useState<BleError | undefined>();

  const listener = (bleError?: BleError, device?: BluetoothDevice) => {
    if (device) {
      console.log('scannedDevice  >>> ' + JSON.stringify(RNBleManager.getInstance().getScannedDevice()));
      console.log('device >>> ' + JSON.stringify(device));
      setScannedDevices(RNBleManager.getInstance().getScannedDevice());
    } else if (bleError) {
      if (bleError !== error) setError(bleError);
      setIsScaning(false);
      if (bleError.errorCode === BleErrorCode.BluetoothUnauthorized) {
        const permissions = getBlePermissions();
        requestMultiple(permissions).then((results) => {
          if (isAllPermissionGranted(results)) startScan();
        });
      }
    }
  };

  const startScan = () => {
    setIsScaning(true);
    setError(undefined);
    RNBleManager.getInstance().listen(listener);
  };

  useEffect(() => {
    RNBleManager.getInstance().addListener((state) => {
      console.log('useScanBleUseCase.addListener >>> state = ', state);
      if (isBleNotReady(state)) return;
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

function getBlePermissions() {
  if (Platform.OS === 'ios') return [PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL, PERMISSIONS.IOS.LOCATION_WHEN_IN_USE];
  return [
    PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
    PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
  ];
}

function isAllPermissionGranted(permissionResults: Record<string, string>): boolean {
  const permissions = getBlePermissions();
  return Object.values(permissionResults).filter((result) => result === RESULTS.GRANTED).length !== permissions.length;
}

function isBleNotReady(state: State): boolean {
  return state !== State.PoweredOn && state !== State.PoweredOff;
}
