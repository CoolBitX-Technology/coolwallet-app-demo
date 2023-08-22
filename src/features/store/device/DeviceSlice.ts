import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { BluetoothInfo, DeviceState } from '@src/features/store/device/DeviceTypes';
import { ReducerTypes } from '@src/features/store/types';

const initialState: DeviceState = {};

const DeviceSlice = createSlice({
  name: ReducerTypes.DEVICE,
  initialState,
  reducers: {
    updateBluetoothInfo: (state: DeviceState, action: PayloadAction<BluetoothInfo>) => {
      state.bleInfo = action.payload;
    },
    clearBluetoothInfo: (state: DeviceState) => {
      state.bleInfo = undefined;
    },
  },
});

// Action creators are generated for each case reducer function
export const DeviceActions = DeviceSlice.actions;

export default DeviceSlice.reducer;
