import { Transport as CWTransport, device as CWDevice } from '@coolwallet/core';
import { RNBleError } from '@src/features/ble/RNBleError';
import { BleErrorCode, Device as BluetoothDevice, Characteristic } from 'react-native-ble-plx';

export interface CWServiceCharacteristics {
  command?: Characteristic;
  data?: Characteristic;
  status?: Characteristic;
  response?: Characteristic;
}

export class RNBleTransport extends CWTransport {
  private characteristics?: CWServiceCharacteristics | null;

  constructor(device: BluetoothDevice) {
    super(device);
    this.characteristics = undefined;
  }

  getDevice() {
    return this.device as BluetoothDevice;
  }

  async initServiceCharacteristics() {
    let connectedDevice;
    // Confirm connection status
    const isConnected = await this.getDevice().isConnected();
    if (!isConnected) {
      connectedDevice = await this.getDevice().connect();
      if (!connectedDevice)
        throw new RNBleError(BleErrorCode.DeviceConnectionFailed, `initialize >>> connect device ${this.getDevice().id} failed.`);
    }

    // Find Bluetooth characteristic
    connectedDevice = await this.getDevice().discoverAllServicesAndCharacteristics();
    console.log('discoverAllServicesAndCharacteristics finish');
    const serviceCharacteristics = await this.getCWServiceCharacteristics(connectedDevice);
    this.checkServiceCharacteristic(serviceCharacteristics);
    this.characteristics = serviceCharacteristics;
    console.log('convertToRNBleTransport finish');
  }

  getCharacteristics() {
    return this.characteristics;
  }

  private async getCWServiceCharacteristics(connectedDevice: BluetoothDevice): Promise<CWServiceCharacteristics | null> {
    const services = await connectedDevice.services();
    const characteristics: Array<CWServiceCharacteristics | null> = await Promise.all(
      services.map(async (service) => {
        const { uuid } = service;
        const serviceUuid = CWDevice.getInfosForServiceUuid(uuid);
        if (!serviceUuid) return null;
        const servicesCharacteristics = await connectedDevice?.characteristicsForService(uuid);
        if (!servicesCharacteristics)
          throw new RNBleError(
            BleErrorCode.ServiceNotFound,
            `getCWServiceCharacteristics >>> ${connectedDevice.name} service's characteristics are not found.`,
          );
        const command = servicesCharacteristics.find((ch) => ch.uuid === serviceUuid.writeUuid);
        const data = servicesCharacteristics.find((ch) => ch.uuid === serviceUuid.dataUuid);
        const status = servicesCharacteristics.find((ch) => ch.uuid === serviceUuid.checkUuid);
        const response = servicesCharacteristics.find((ch) => ch.uuid === serviceUuid.readUuid);
        const characteristics: CWServiceCharacteristics = {
          command,
          data,
          status,
          response,
        };
        // Check whether any characteristic is null
        if (Object.values(characteristics).some((ch) => !ch)) return null;
        return characteristics;
      }),
    ).then((chs) => chs.filter((ch) => ch));
    return characteristics?.[characteristics.length - 1];
  }

  private checkServiceCharacteristic(serviceCharacteristic?: CWServiceCharacteristics | null) {
    if (!serviceCharacteristic)
      throw new RNBleError(BleErrorCode.CharacteristicNotFound, 'checkServiceCharacteristic >>> Characteristic is not found.');
    if (!serviceCharacteristic?.command) {
      throw new RNBleError(
        BleErrorCode.CharacteristicNotFound,
        'checkServiceCharacteristic >>> Command characteristic is not found.',
      );
    }
    if (!serviceCharacteristic?.data) {
      throw new RNBleError(
        BleErrorCode.CharacteristicNotFound,
        'checkServiceCharacteristic >>> Data characteristic is not found.',
      );
    }
    if (!serviceCharacteristic?.status) {
      throw new RNBleError(
        BleErrorCode.CharacteristicNotFound,
        'checkServiceCharacteristic >>> Status characteristic is not found.',
      );
    }
    if (!serviceCharacteristic?.response) {
      throw new RNBleError(
        BleErrorCode.CharacteristicNotFound,
        'checkServiceCharacteristic >>> Response characteristic is not found.',
      );
    }
  }

  async sendCommandToCard(command: number[]): Promise<void> {
    this.checkServiceCharacteristic(this.characteristics);
    const commandCharacteristic = this.characteristics?.command as Characteristic;
    try {
      const base64Command = Buffer.from(command).toString('base64');
      console.log('BASE64Command >>> ' + base64Command);

      await commandCharacteristic.writeWithResponse(base64Command);
    } catch (e) {
      throw new RNBleError(BleErrorCode.CharacteristicWriteFailed, `sendCommandToCard >>> write failed error: ${e}`);
    }
  }

  async sendDataToCard(packets: number[]): Promise<void> {
    this.checkServiceCharacteristic(this.characteristics);
    const dataCharacteristic = this.characteristics?.data as Characteristic;
    try {
      const base64Packets = Buffer.from(packets).toString('base64');
      console.log('SendData to Card base64Packets >>> ' + base64Packets);

      await dataCharacteristic.writeWithResponse(base64Packets);
    } catch (e) {
      throw new RNBleError(BleErrorCode.CharacteristicWriteFailed, `sendDataToCard >>> send failed error: ${e}`);
    }
  }

  async checkCardStatus(): Promise<number> {
    this.checkServiceCharacteristic(this.characteristics);
    const statusCharacteristic = this.characteristics?.status as Characteristic;
    try {
      const status = await statusCharacteristic.read();
      console.log('Card Status.value >>> ' + status.value);
      if (!status.value) return 0;
      const statusHex = Buffer.from(status.value, 'base64').toString('hex');
      return convertHexToNumberArray(statusHex)?.[0];
    } catch (e) {
      throw new RNBleError(BleErrorCode.CharacteristicWriteFailed, `checkCardStatus >>> get status failed error: ${e}`);
    }
  }

  async readDataFromCard(): Promise<number[]> {
    this.checkServiceCharacteristic(this.characteristics);
    const responseCharacteristic = this.characteristics?.response as Characteristic;
    try {
      const result = await responseCharacteristic.read();
      console.log('Read Result,value >>> ' + result.value);
      if (!result.value) return [];
      const resultHex = Buffer.from(result.value, 'base64').toString('hex');
      return convertHexToNumberArray(resultHex);
    } catch (e) {
      throw new RNBleError(BleErrorCode.CharacteristicWriteFailed, `checkCardStatus >>> get status failed error: ${e}`);
    }
  }
}

function convertHexToNumberArray(hex?: string): Array<number> {
  const byteArray: Array<number> = [];
  if (!hex) return byteArray;
  const length = hex.length;
  for (let i = 0; i < length; i += 2) {
    byteArray.push(parseInt(hex.slice(i, i + 2), 16));
  }
  return byteArray;
}
