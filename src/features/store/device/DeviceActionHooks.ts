import { RootState } from '@src/features/store/store';
import { useAppSelector, useAppDispatch } from '@src/features/store/hooks';
import { DeviceActions } from '@src/features/store/device/DeviceSlice';

function getCardInfo(state: RootState) {
  return state.device;
}

export function useCardInfo() {
  return useAppSelector((state: RootState) => getCardInfo(state));
}

export function useDispatchDeviceNameChange(): (deviceName: string) => void {
  const dispatch = useAppDispatch();
  return (deviceName) => {
    dispatch(DeviceActions.setDeviceName(deviceName));
  };
}
