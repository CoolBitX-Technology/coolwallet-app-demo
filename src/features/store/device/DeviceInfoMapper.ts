import { DeviceInfo } from '@src/features/store/device/DeviceTypes';
import { Device as BluetoothDevice } from 'react-native-ble-plx';

export class DeviceInfoMapper {
  static mapFromBleDevice(device: BluetoothDevice): DeviceInfo {
    const name = device?.name || '';
    const nameSplits = name?.split(' ');
    const cardId = nameSplits?.[1] || '';
    return {
      deviceId: device.id,
      name,
      cardId,
      mtu: device.mtu,
    } as DeviceInfo;
  }
}
