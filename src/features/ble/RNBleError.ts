import { BleErrorCode } from 'react-native-ble-plx';

export class RNBleError extends Error {
  errorCode: BleErrorCode;
  constructor(errorCode: BleErrorCode, message: string) {
    super(message);
    this.errorCode = errorCode;
  }
}
