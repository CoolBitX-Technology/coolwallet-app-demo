export interface DeviceState {
  isConnected: boolean;
  isPaired: boolean;
  bleInfo: BluetoothInfo;
}

export interface BluetoothInfo {
  /**
   * Device identifier: MAC address on Android and UUID on iOS.
   */
  deviceId: string;

  /**
   * Device name if present
   */
  name: string | null;

  /**
   * Current Received Signal Strength Indication of device
   */
  rssi: number | null;

  /**
   * Current Maximum Transmission Unit for this device. When device is not connected
   * default value of 23 is used.
   */
  mtu: number;

  /**
   * User friendly name of device.
   */
  localName: string | null;

  /**
   * Transmission power level of device.
   */
  txPowerLevel: number | null;
}
