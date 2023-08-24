import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LogState } from '@src/features/store/log/LogTypes';
import { ReducerTypes } from '@src/features/store/types';

const initialState: LogState = {
  logMessage: '',
};

const LogSlice = createSlice({
  name: ReducerTypes.LOG,
  initialState,
  reducers: {
    updateLogMessage: (state: LogState, action: PayloadAction<string>) => {
      state.logMessage = action.payload;
    },
    clearLogMessage: (state: LogState) => {
      state.logMessage = undefined;
    },
  },
});

// Action creators are generated for each case reducer function
export const LogActions = LogSlice.actions;

export default LogSlice.reducer;
