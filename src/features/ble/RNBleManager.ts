import { Transport, BleManager as CWBleManager, device as CWDevice } from '@coolwallet/core';
import { delay } from '@coolwallet/core/lib/utils';
import { RNBleError } from '@src/features/ble/RNBleError';
import { RNBleTransport } from '@src/features/ble/RNBleTransport';
import { BleError, BleErrorCode, BleManager, Device as BluetoothDevice, State, Subscription } from 'react-native-ble-plx';

export class RNBleManager implements CWBleManager {
  private static instance: RNBleManager;
  private bleManager: BleManager;
  private uuids: Array<string>;
  private stateSubscription?: Subscription;
  private scannedDevices: Array<BluetoothDevice>;
  private connectionSubscriptions: Record<string, Subscription | null>;

  constructor() {
    this.bleManager = new BleManager();
    this.uuids = CWDevice.getBluetoothServiceUuids();
    this.scannedDevices = [];
    this.connectionSubscriptions = {};
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

  async findRNBleTransport(deviceId: string): Promise<RNBleTransport | undefined> {
    const devices = await this.getBondDevices();
    const device = devices.find((device) => device.id === deviceId);
    if (!device) return undefined;
    const transport = new RNBleTransport(device);
    await transport.initServiceCharacteristics();
    return transport;
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

  unsubscriptionState(): void {
    this.stateSubscription?.remove();
    this.stateSubscription = undefined;
  }

  unsubscriptionConnections(): void {
    Object.values(this.connectionSubscriptions)
      .filter((sub) => sub !== null)
      .forEach((sub) => sub?.remove());
    this.connectionSubscriptions = {};
  }

  unsubscriptionConnection(deviceId: string): void {
    const subscription = this.connectionSubscriptions?.[deviceId];
    if (!subscription) return;
    subscription.remove();
    this.connectionSubscriptions[deviceId] = null;
  }

  private checkDeviceConnection(deviceId: string, connectedDevice?: BluetoothDevice) {
    if (!connectedDevice)
      throw new RNBleError(BleErrorCode.DeviceConnectionFailed, `checkDeviceConnection >>> connect device ${deviceId} failed.`);
  }

  async connectById(deviceId: string, callback?: (device: BluetoothDevice, error?: BleError) => void): Promise<Transport> {
    let connectedDevice: BluetoothDevice;
    // 藍芽配對連線
    try {
      connectedDevice = await this.bleManager.connectToDevice(deviceId);
      if (callback) {
        const subscription = connectedDevice.onDisconnected((nullableBleError, device) => {
          const bleError = nullableBleError === null ? undefined : nullableBleError;
          this.unsubscriptionConnection(deviceId);
          callback?.(device, bleError);
        });
        this.connectionSubscriptions[deviceId] = subscription;
      }
    } catch (e) {
      const bleError = e as BleError;
      if (bleError.errorCode !== BleErrorCode.DeviceMTUChangeFailed) throw bleError;
      connectedDevice = await this.bleManager.connectToDevice(deviceId);
    }
    this.checkDeviceConnection(deviceId, connectedDevice);
    // 初始化 Transport 物件
    const transport = new RNBleTransport(connectedDevice);
    await transport.initServiceCharacteristics();
    callback?.(connectedDevice);
    return transport;
  }

  async connect(device: BluetoothDevice, disconnected?: (device: BluetoothDevice, error?: BleError) => void): Promise<Transport> {
    return this.connectById(device.id, disconnected);
  }

  async disconnectedById(id: string): Promise<void> {
    if (!id) return;
    await this.bleManager.cancelDeviceConnection(id);
    await delay(1000);
  }

  async listenConnectedDevice(deviceId: string, callback: (device: BluetoothDevice, error?: BleError) => void) {
    const connectedDevices = await this.getBondDevices();
    const device = connectedDevices.find((device) => device.id === deviceId);
    if (!device) return;
    const subscription = device.onDisconnected((nullableBleError, device) => {
      const bleError = nullableBleError === null ? undefined : nullableBleError;
      this.unsubscriptionConnection(deviceId);
      callback(device, bleError);
    });
    this.connectionSubscriptions[deviceId] = subscription;
  }

  async disconnect(): Promise<void> {
    const connectedDevices = await this.getBondDevices();
    await Promise.all(
      connectedDevices.map(({ id }) => {
        this.disconnectedById(id);
        this.unsubscriptionConnection(id);
      }),
    );
  }
}
