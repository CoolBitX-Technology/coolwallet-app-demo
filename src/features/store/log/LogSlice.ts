import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LogState } from '@src/features/store/log/LogTypes';
import { ReducerTypes } from '@src/features/store/types';

const initialState: LogState = {
  logMessage: undefined,
};

const LogSlice = createSlice({
  name: ReducerTypes.LOG,
  initialState,
  reducers: {
    addLogMessage: (state: LogState, action: PayloadAction<string>) => {
      if (!state.logMessage) state.logMessage = action.payload;
      else state.logMessage += `\r\n${action.payload}`;
    },
    clearLogMessage: (state: LogState) => {
      state.logMessage = undefined;
    },
  },
});

// Action creators are generated for each case reducer function
export const LogActions = LogSlice.actions;

export default LogSlice.reducer;
