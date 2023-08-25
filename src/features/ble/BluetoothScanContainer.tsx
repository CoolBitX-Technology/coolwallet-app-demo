import { useNavigation } from '@react-navigation/native';
import { BluetoothScanView } from '@src/features/ble/BluetoothScanView';
import { useConnectBleUseCase } from '@src/features/ble/usecases/useConnectBleUseCase';
import { useScanBleUseCase } from '@src/features/ble/usecases/useScanBleUseCase';
import { useBluetoothInfo, useIsConnected } from '@src/features/store/device/DeviceActionHooks';
import { useEffect, useState } from 'react';
import { BleError, BleErrorCode, Device as BluetoothDevice } from 'react-native-ble-plx';

function useCheckConnectionEffect() {
  const isConnected = useIsConnected();
  const navigation = useNavigation();
  useEffect(() => {
    if (!isConnected) return;
    navigation.goBack();
  }, [isConnected]);
}

export function BluetoothScanContainer(): JSX.Element {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const navigation = useNavigation();
  const onCanceled = () => navigation.goBack();

  const bleInfo = useBluetoothInfo();
  const isConnected = useIsConnected();
  useCheckConnectionEffect();

  const { isScaning, startScan, stopScan, scannedDevices, scanError } = useScanBleUseCase();
  const { isConnecting, connectError, connect } = useConnectBleUseCase();

  const onStartConnect = (item: BluetoothDevice) => {
    stopScan();
    connect(item.id);
  };
  const errorText = useErrorText(scanError || connectError);

  return (
    <BluetoothScanView
      style={{ height: '100%' }}
      items={scannedDevices}
      connectedId={bleInfo?.deviceId}
      selectedIndex={selectedIndex}
      isScaning={isScaning}
      isConnecting={isConnecting}
      isConnected={isConnected}
      errorText={errorText}
      onCanceled={onCanceled}
      onStartScan={startScan}
      onSelected={setSelectedIndex}
      onStartConnect={onStartConnect}
    />
  );
}

function useErrorText(error?: Error) {
  if (!error) return ' ';
  if (error instanceof BleError) {
    switch (error.errorCode) {
      case BleErrorCode.BluetoothPoweredOff:
        return 'Please turn on your Bluetooth';
      case BleErrorCode.BluetoothUnsupported:
        return 'Bluetooth not supported';
      case BleErrorCode.BluetoothUnauthorized:
        return 'Bluetooth permission denied';
      case BleErrorCode.DeviceDisconnected:
        return `Device disconnected: ${error.message}`;
      default:
        return `Unknown error - Error: ${error.message}`;
    }
  } else {
    return `Unknown error - Error: ${error.message}`;
  }
}
