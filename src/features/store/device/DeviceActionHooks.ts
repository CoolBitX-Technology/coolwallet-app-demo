import { RootState } from '@src/features/store/store';
import { useAppSelector, useAppDispatch } from '@src/features/store/hooks';
import { DeviceActions } from '@src/features/store/device/DeviceSlice';
import { Device as BluetoothDevice } from 'react-native-ble-plx';

function getCardInfo(state: RootState) {
  return state.device;
}

export function useCardInfo() {
  return useAppSelector((state: RootState) => getCardInfo(state));
}

export function useBluetoothInfo() {
  return useCardInfo().bleInfo;
}

export function useDispatchBluetoothInfo(): (device: BluetoothDevice) => void {
  const dispatch = useAppDispatch();
  return (device) => {
    const nameSplits = device?.name?.split(' ');
    const name = nameSplits?.[0] || '';
    const localName = nameSplits?.[1] || '';
    dispatch(
      DeviceActions.setBluetoothInfo({
        deviceId: device.id,
        name,
        localName,
        rssi: device.rssi || -100,
        mtu: device.mtu,
      }),
    );
  };
}
