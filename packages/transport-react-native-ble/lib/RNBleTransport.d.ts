import type { Characteristic, Device as BluetoothDevice } from 'react-native-ble-plx';
import { Transport } from '@coolwallet/core';
declare class RNBleTransport extends Transport {
    private commandCharacteristic?;
    private dataCharacteristic?;
    private statusCharacteristic?;
    private responseCharacteristic?;
    constructor(device: BluetoothDevice, commandCharacteristic: Characteristic, dataCharacteristic: Characteristic, statusCharacteristic: Characteristic, responseCharacteristic: Characteristic);
    sendCommandToCard: (command: number[]) => Promise<void>;
    sendDataToCard: (packets: number[]) => Promise<void>;
    checkCardStatus: () => Promise<number>;
    readDataFromCard: () => Promise<number[]>;
}
export default RNBleTransport;
