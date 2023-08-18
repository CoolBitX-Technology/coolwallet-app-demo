import { Transport, BleManager as CWBleManager, device as CWDevice } from '@coolwallet/core';
import { RNBleTransport } from '@src/features/ble/RNBleTransport';
import { BleError, BleManager, Device as BluetoothDevice, State, Subscription } from 'react-native-ble-plx';

export class RNBleManager implements CWBleManager {
  private static instance: RNBleManager;
  private bleManager: BleManager;
  private uuids: Array<string>;
  private stateSubscription: Subscription | undefined;
  private scannedDevices: Array<BluetoothDevice>;

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

  getScannedDevice() {
    return this.scannedDevices;
  }

  listenOnDisconnected(device: BluetoothDevice, onDisconnect: (device: BluetoothDevice, error?: BleError) => void): void {
    device.onDisconnected((error: BleError | null, device: BluetoothDevice) => {
      console.debug(`Device ${device.id} is disconnected. error is ${error}.`);
    });
  }

  addListener(callback: (newState: State) => void, emitCurrentState = true) {
    this.stateSubscription = this.bleManager.onStateChange(callback, emitCurrentState);
  }

  listen(
    callback?: ((error?: BleError, device?: BluetoothDevice | undefined) => void) | undefined,
  ): void | Promise<BluetoothDevice> {
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
    if (!this.stateSubscription) return;
    this.stateSubscription.remove();
    this.stateSubscription = undefined;
  }

  async connectById(deviceId: string): Promise<Transport> {
    let device = await this.bleManager.connectToDevice(deviceId);
    device = await device.discoverAllServicesAndCharacteristics();
    return new RNBleTransport(device);
  }

  async connect(device: BluetoothDevice): Promise<Transport> {
    device = await device.connect({ autoConnect: true });
    console.log('RNBleManager.connect finish');
    device = await device.discoverAllServicesAndCharacteristics();
    console.log('RNBleManager.discoverAllServicesAndCharacteristics finish');
    // if (!this.scannedDevices.includes(device)) this.scannedDevices.push(device);
    this.listenOnDisconnected(device, (device, error) => {
      // if (this.scannedDevices.includes(device)) this.scannedDevices.pop();
    });
    return new RNBleTransport(device);
  }

  async disconnectedById(id: string): Promise<void> {
    if (!id) return;
    await this.bleManager.cancelDeviceConnection(id);
  }

  async disconnect(): Promise<void> {
    const connectedDevices = await this.bleManager.connectedDevices(this.uuids);
    await Promise.all(connectedDevices.map(({ id }) => this.disconnectedById(id)));
  }
}
