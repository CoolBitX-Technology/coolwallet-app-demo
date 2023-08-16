import { BleManager, Device as BluetoothDevice } from 'react-native-ble-plx';
import { Transport, BleManager as CoreBleManager } from '@coolwallet/core';
import type { BleError, Subscription } from 'react-native-ble-plx';
declare class RNBleManager implements CoreBleManager {
    transport?: Transport;
    bleManager: BleManager;
    uuids: string[];
    stateSubscription?: Subscription;
    constructor();
    /**
     * Check whether platforms support bluetooth.
     *
     * @returns {Promise<boolean>}
     */
    isSupported(): Promise<boolean>;
    listen(callback?: (error?: BleError, device?: BluetoothDevice) => void): void;
    scanAndConnect: (callback?: ((error?: BleError, device?: BluetoothDevice) => void) | undefined) => Promise<void>;
    stopListen?(): void;
    connect: (device: BluetoothDevice) => Promise<Transport>;
    /**
     * Disconnect the specific device by id.
     *
     * @param id device id.
     * @returns {Promise<void>}
     */
    disconnectedById: (id: string) => Promise<void>;
    /**
     * Disconnect all devices that bleManager connected.
     */
    disconnect: () => Promise<void>;
}
export default RNBleManager;
