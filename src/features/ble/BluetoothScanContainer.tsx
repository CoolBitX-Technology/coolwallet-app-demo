import { useNavigation } from '@react-navigation/native';
import { BluetoothScanView } from '@src/features/ble/BluetoothScanView';
import { useScanBleUseCase } from '@src/features/ble/usecases/useScanBleUseCase';
import { useBluetoothInfo } from '@src/features/store/device/DeviceActionHooks';
import { useState } from 'react';
import { BleError, BleErrorCode, Device as BluetoothDevice } from 'react-native-ble-plx';
import { SafeAreaView } from 'react-native-safe-area-context';

export function BluetoothScanContainer(): JSX.Element {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const navigation = useNavigation();
  const onCanceled = () => navigation.goBack();

  const pairedItem = useBluetoothInfo();
  const { isScaning, startScan, scannedDevices, error } = useScanBleUseCase();
  const errorText = useErrorText(error);

  return (
    <SafeAreaView>
      <BluetoothScanView
        items={scannedDevices}
        pairedDeviceId={pairedItem?.deviceId}
        selectedIndex={selectedIndex}
        isScaning={isScaning}
        errorText={errorText}
        onCanceled={onCanceled}
        onStartScan={startScan}
        onSelected={setSelectedIndex}
      />
    </SafeAreaView>
  );
}

function useErrorText(error?: BleError) {
  if (!error) return ' ';
  switch (error.errorCode) {
    case BleErrorCode.BluetoothPoweredOff:
      return '藍芽未開啟';
    case BleErrorCode.BluetoothUnsupported:
      return '藍芽不支援';
    case BleErrorCode.BluetoothUnauthorized:
      return '藍芽權限未啟用';
    default:
      return `發生未知錯誤 - 錯誤代碼: ${error.errorCode}`;
  }
}
