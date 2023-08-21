import { useNavigation } from '@react-navigation/native';
import { BluetoothScanView } from '@src/features/ble/BluetoothScanView';
import { useConnectBleUseCase, useUnsubscribeConnectionEffect } from '@src/features/ble/usecases/useConnectBleUseCase';
import { useScanBleUseCase } from '@src/features/ble/usecases/useScanBleUseCase';
import { useBluetoothInfo } from '@src/features/store/device/DeviceActionHooks';
import { useEffect, useState } from 'react';
import { BleError, BleErrorCode, Device as BluetoothDevice } from 'react-native-ble-plx';
import { SafeAreaView } from 'react-native-safe-area-context';

export function BluetoothScanContainer(): JSX.Element {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const navigation = useNavigation();
  const onCanceled = () => navigation.goBack();

  const currentBleInfo = useBluetoothInfo();
  useEffect(()=>{
    if (!!currentBleInfo?.isConnected) navigation.goBack();
  },[currentBleInfo]);
  
  const { isScaning, startScan, stopScan, scannedDevices, scanError } = useScanBleUseCase();
  const { isConnecting, connectError, connect } = useConnectBleUseCase();
  
  const onStartConnect = (item: BluetoothDevice) => {
    stopScan();
    connect(item.id);
  }
  const errorText = useErrorText(scanError || connectError);

  return (
    <SafeAreaView>
      <BluetoothScanView
        items={scannedDevices}
        connectedBlueInfo={currentBleInfo}
        selectedIndex={selectedIndex}
        isScaning={isScaning}
        isConnecting={isConnecting}
        errorText={errorText}
        onCanceled={onCanceled}
        onStartScan={startScan}
        onSelected={setSelectedIndex}
        onStartConnect={onStartConnect}
      />
    </SafeAreaView>
  );
}

function useErrorText(error?: Error) {
  if (!error) return ' ';
  if (error instanceof BleError) {
    switch (error.errorCode) {
      case BleErrorCode.BluetoothPoweredOff:
        return '藍芽未開啟';
      case BleErrorCode.BluetoothUnsupported:
        return '藍芽不支援';
      case BleErrorCode.BluetoothUnauthorized:
        return '藍芽權限未啟用'; 
      case BleErrorCode.DeviceDisconnected:
        return `裝置斷線: ${error.message}`;   
      default:
        return `發生未知錯誤 - 錯誤: ${error.message}`;
    }
  } else {
    return `發生未知錯誤 - 錯誤: ${error.message}`;
  }
}
