import {BluetoothScanView} from '@src/features/ble/BluetoothScanView';

export function BluetoothScanContainer(): JSX.Element {
  const items = ['1', '2', '3', '4', '5', '6', '7', '8'];
  return <BluetoothScanView items={items} pairedItem="2" selectedItem="2" />;
}
