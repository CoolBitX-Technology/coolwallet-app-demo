import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DeviceState } from '@src/features/store/device/DeviceTypes';
import { RootState } from '@src/features/store/store';
import { ReducerTypes } from '@src/features/store/types';

const initialState: DeviceState = {
  isConnected: false,
  isPaired: false,
  bleInfo: {
    deviceId: '',
    name: '',
    rssi: null,
    mtu: 23, // default value according to RNBleManager
    localName: '',
  },
};

const DeviceSlice = createSlice({
  name: ReducerTypes.DEVICE,
  initialState,
  reducers: {
    setDeviceName: (state: DeviceState, action: PayloadAction<string>) => {
      const { payload } = action;
      state.bleInfo.localName = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const DeviceActions = DeviceSlice.actions;

export default DeviceSlice.reducer;
