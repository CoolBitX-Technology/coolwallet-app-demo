import { RootState } from '@src/features/store/store';
import { useAppSelector, useAppDispatch } from '@src/features/store/hooks';
import { DeviceActions } from '@src/features/store/device/DeviceSlice';
import { Device as BluetoothDevice } from 'react-native-ble-plx';
import { BluetoothInfo, DeviceInfo, DeviceState, TransportType } from '@src/features/store/device/DeviceTypes';
import { DeviceInfoMapper } from '@src/features/store/device/DeviceInfoMapper';

function getCardInfo(state: RootState): DeviceState {
  return state.device;
}

export function useCardInfo() {
  return useAppSelector((state: RootState) => getCardInfo(state));
}

export function useDeviceInfoMap() {
  return useCardInfo()?.deviceInfoMap;
}

export function useTransportType(): TransportType | undefined {
  return useCardInfo()?.transportType;
}

export function useDeviceInfo(type: TransportType): DeviceInfo | undefined {
  const map = useDeviceInfoMap();
  const deviceInfo = map?.[type];
  if (!deviceInfo) return;
  return deviceInfo;
}

export function useBluetoothInfo(): BluetoothInfo | undefined {
  const deviceInfo = useDeviceInfo(TransportType.Bluetooth);
  if (!deviceInfo) return;
  return deviceInfo as BluetoothInfo;
}

export function useCardId() {
  return useBluetoothInfo()?.cardId || '';
}

export function useIsConnected() {
  return useCardInfo().isConnected;
}

export function useDispatchConnectStatus(): (isConnected: boolean) => void {
  const dispatch = useAppDispatch();
  return (isConnected) => {
    dispatch(DeviceActions.updateConnectStatus(isConnected));
  };
}

export function useDispatchBluetoothInfo(): (device: BluetoothDevice) => void {
  const dispatch = useAppDispatch();
  return (device) => {
    device.isConnected().then((isConnected) => {
      const type = TransportType.Bluetooth;
      const deviceInfo = DeviceInfoMapper.mapFromBleDevice(device);
      dispatch(
        DeviceActions.updateDeviceInfo({
          type,
          deviceInfo,
        }),
      );
      dispatch(DeviceActions.updateConnectStatus(isConnected));
    });
  };
}

export function useClearBluetoothInfo(): () => void {
  const dispatch = useAppDispatch();
  return () => {
    const type = TransportType.Bluetooth;
    dispatch(DeviceActions.clearDeviceInfo(type));
    dispatch(DeviceActions.updateConnectStatus(false));
  };
}

export function useChangeTransportType(): (type: TransportType) => void {
  const dispatch = useAppDispatch();
  return (type) => {
    dispatch(DeviceActions.changeTransportType(type));
  };
}
