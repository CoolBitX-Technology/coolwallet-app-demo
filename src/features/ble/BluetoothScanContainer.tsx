import { useNavigation } from '@react-navigation/native';
import { BluetoothScanView } from '@src/features/ble/BluetoothScanView';
import { useDispatchDeviceNameChange } from '@src/features/store/device/DeviceActionHooks';
import { useState } from 'react';

export function BluetoothScanContainer(): JSX.Element {
  const items = ['0', '1', '2', '3', '4', '5', '6', '7'];
  const [isScaning, setIsScaning] = useState(false);
  const [pairedItem, setPairedItem] = useState<string>();
  const [selectedItem, setSelectedItem] = useState<string>('');
  const dispatchDeviceName = useDispatchDeviceNameChange();
  const navigation = useNavigation();
  const onCanceled = () => navigation.goBack();
  const onConnected = (item: string) => {
    // TODO implement
    setPairedItem(selectedItem);
    dispatchDeviceName(item);
  };
  const onStartScan = () => {
    // TODO implement
    setIsScaning(true);
  };
  return (
    <BluetoothScanView
      items={items}
      pairedItem={pairedItem}
      selectedItem={selectedItem}
      isScaning={isScaning}
      onCanceled={onCanceled}
      onConnected={onConnected}
      onStartScan={onStartScan}
      onSelected={setSelectedItem}
    />
  );
}
