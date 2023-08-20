import { Transport, BleManager as CWBleManager, device as CWDevice } from '@coolwallet/core';
import { RNBleTransport } from '@src/features/ble/RNBleTransport';
import {
  BleError,
  BleErrorCode,
  BleManager,
  Device as BluetoothDevice,
  Characteristic,
  State,
  Subscription,
} from 'react-native-ble-plx';

export class RNBleError extends Error {
  errorCode: BleErrorCode;
  constructor(errorCode: BleErrorCode, message: string) {
    super(message);
    this.errorCode = errorCode;
  }
}

interface CWServiceCharacteristics {
  command?: Characteristic;
  data?: Characteristic;
  status?: Characteristic;
  response?: Characteristic;
}

export class RNBleManager implements CWBleManager {
  private static instance: RNBleManager;
  private bleManager: BleManager;
  private uuids: Array<string>;
  private stateSubscription: Subscription | undefined;
  private scannedDevices: Array<BluetoothDevice>;
  private connectionSubscription: Subscription | undefined;

  constructor() {
    this.bleManager = new BleManager();
    this.uuids = CWDevice.getBluetoothServiceUuids();
    this.scannedDevices = [];
  }

  static getInstance() {
    if (!this.instance) this.instance = new RNBleManager();
    return this.instance;
  }

  async isSupported(): Promise<boolean> {
    const state = await this.bleManager.state();
    return state === State.PoweredOn;
  }

  async getBondDevices(): Promise<Array<BluetoothDevice>> {
    const devices = await this.bleManager.connectedDevices(this.uuids);
    return devices;
  }

  getScannedDevice() {
    return this.scannedDevices;
  }

  addListener(callback: (newState: State) => void, emitCurrentState = true) {
    this.stateSubscription = this.bleManager.onStateChange(callback, emitCurrentState);
  }

  listen(callback?: (error?: BleError, device?: BluetoothDevice) => void): void {
    this.disconnect().then(() => {
      this.bleManager.startDeviceScan(this.uuids, null, (nullableBleError, nullableDevice) => {
        const bleError = nullableBleError === null ? undefined : nullableBleError;
        const device = nullableDevice === null ? undefined : nullableDevice;
        if (
          device &&
          !this.scannedDevices.some((scannedDevice) => {
            return scannedDevice.id === device.id;
          })
        )
          this.scannedDevices.push(device);
        callback?.(bleError, device);
      });
    });
  }

  stopListen(): void {
    this.bleManager.stopDeviceScan();
  }

  unsubscriptionAll(): void {
    this.stateSubscription?.remove();
    this.stateSubscription = undefined;
    this.connectionSubscription?.remove();
    this.connectionSubscription = undefined;
  }

  private checkDeviceConnection(deviceId: string, connectedDevice?: BluetoothDevice) {
    if (!connectedDevice)
      throw new RNBleError(BleErrorCode.DeviceConnectionFailed, `checkDeviceConnection >>> connect device ${deviceId} failed.`);
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

  async connectById(deviceId: string, disconnected?: (device: BluetoothDevice, error?: BleError) => void): Promise<Transport> {
    let connectedDevice: BluetoothDevice;
    // 藍芽配對連線
    try {
      connectedDevice = await this.bleManager.connectToDevice(deviceId);
      if (disconnected) {
        this.connectionSubscription = connectedDevice.onDisconnected((nullableBleError, device) => {
          const bleError = nullableBleError === null ? undefined : nullableBleError;
          this.connectionSubscription?.remove();
          this.connectionSubscription = undefined;
          disconnected?.(device, bleError);
        });
      }
    } catch (e) {
      const bleError = e as BleError;
      if (bleError.errorCode !== BleErrorCode.DeviceMTUChangeFailed) throw bleError;
      connectedDevice = await this.bleManager.connectToDevice(deviceId);
    }
    this.checkDeviceConnection(deviceId, connectedDevice);
    const isConnected = await connectedDevice.isConnected();
    if (!isConnected) {
      connectedDevice = await connectedDevice.connect();
    }
    this.checkDeviceConnection(deviceId, connectedDevice);
    // 藍芽尋找特徵
    connectedDevice = await connectedDevice.discoverAllServicesAndCharacteristics();
    console.log('RNBleManager.discoverAllServicesAndCharacteristics finish');
    const serviceCharacteristic = await this.getCWServiceCharacteristics(connectedDevice);
    this.checkServiceCharacteristic(serviceCharacteristic);
    return new RNBleTransport(connectedDevice);
  }

  async connect(device: BluetoothDevice, disconnected?: (device: BluetoothDevice, error?: BleError) => void): Promise<Transport> {
    return this.connectById(device.id, disconnected);
  }

  async disconnectedById(id: string): Promise<void> {
    if (!id) return;
    await this.bleManager.cancelDeviceConnection(id);
  }

  async disconnect(): Promise<void> {
    const connectedDevices = await this.getBondDevices();
    await Promise.all(connectedDevices.map(({ id }) => this.disconnectedById(id)));
  }
}
