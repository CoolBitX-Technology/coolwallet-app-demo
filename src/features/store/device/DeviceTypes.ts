export enum TransportType {
  Bluetooth = 'bluetooth',
  Http = 'http',
}

export interface DeviceState {
  isConnected: boolean;
  transportType?: TransportType;
  deviceInfoMap: Record<string, DeviceInfo>;
}

export interface BluetoothInfo {
  /**
   * Device identifier: MAC address on Android and UUID on iOS.
   */
  deviceId: string;

  /**
   * Device name if present
   */
  name?: string;

  /**
   * Current Maximum Transmission Unit for this device. When device is not connected
   * default value of 23 is used.
   */
  mtu: number;

  /**
   * User friendly id of device.
   */
  cardId: string;
}

export type DeviceInfo = BluetoothInfo;
