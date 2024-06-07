import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DeviceInfo, DeviceState, TransportType } from '@src/features/store/device/DeviceTypes';
import { ReducerTypes } from '@src/features/store/types';

const initialState: DeviceState = {
  isConnected: false,
  deviceInfoMap: {},
};

const DeviceSlice = createSlice({
  name: ReducerTypes.DEVICE,
  initialState,
  reducers: {
    changeTransportType: (state: DeviceState, action: PayloadAction<TransportType>) => {
      state.transportType = action.payload;
    },
    updateConnectStatus: (state: DeviceState, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    updateDeviceInfo: (state: DeviceState, action: PayloadAction<{ type: TransportType; deviceInfo: DeviceInfo }>) => {
      const { type, deviceInfo } = action.payload;
      state.deviceInfoMap[type] = deviceInfo;
    },
    clearDeviceInfo: (state: DeviceState, action: PayloadAction<TransportType>) => {
      const type = action.payload;
      delete state.deviceInfoMap?.[type];
    },
  },
});

// Action creators are generated for each case reducer function
export const DeviceActions = DeviceSlice.actions;

export default DeviceSlice.reducer;
