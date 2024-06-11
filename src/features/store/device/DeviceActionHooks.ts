import { RootState } from '@src/features/store/store';
import { useAppSelector, useAppDispatch } from '@src/features/store/hooks';
import { DeviceActions } from '@src/features/store/device/DeviceSlice';
import { Device as BluetoothDevice } from 'react-native-ble-plx';
import { BluetoothInfo, DeviceInfo, DeviceState, HttpInfo, TransportType } from '@src/features/store/device/DeviceTypes';
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

export function useDeviceInfo(type: TransportType = TransportType.Bluetooth): DeviceInfo | undefined {
  return useDeviceInfoMap()?.[type];
}

export function useBluetoothInfo(): BluetoothInfo | undefined {
  const deviceInfo = useDeviceInfo(TransportType.Bluetooth);
  if (!deviceInfo) return;
  return deviceInfo as BluetoothInfo;
}

export function useHttpInfo(): HttpInfo | undefined {
  const deviceInfo = useDeviceInfo(TransportType.Http);
  if (!deviceInfo) return;
  return deviceInfo as HttpInfo;
}

export function useCardId() {
  const transportType = useTransportType();
  const deviceInfo = useDeviceInfo(transportType);

  return deviceInfo?.cardId || '';
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

export function useDispatchHttpInfo(): (hostName: string, port: string, cardId?: string) => void {
  const dispatch = useAppDispatch();
  return (hostname, port, cardId) => {
    const type = TransportType.Http;
    const deviceInfo = DeviceInfoMapper.mapFromHttpInfo(hostname, port, cardId);
    dispatch(
      DeviceActions.updateDeviceInfo({
        type,
        deviceInfo,
      }),
    );
    dispatch(DeviceActions.updateConnectStatus(true));
  };
}

export function useClearDeviceInfo(): (type: TransportType) => void {
  const dispatch = useAppDispatch();
  return (type) => {
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
