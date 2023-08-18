import { Transport as CWTransport } from '@coolwallet/core';
import { Device as BluetoothDevice } from 'react-native-ble-plx';

export class RNBleTransport extends CWTransport {
  constructor(device: BluetoothDevice) {
    super(device);
  }

  sendCommandToCard(command: number[]): Promise<void> {
    throw new Error('Method not implemented.');
  }
  sendDataToCard(packets: number[]): Promise<void> {
    throw new Error('Method not implemented.');
  }
  checkCardStatus(): Promise<number> {
    throw new Error('Method not implemented.');
  }
  readDataFromCard(): Promise<number[]> {
    throw new Error('Method not implemented.');
  }
}
