import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {AccountState} from '@src/features/store/account/AccountTypes';
import {ReducerTypes} from '@src/features/store/types';

const initialState: AccountState = {
  mnemonic: '',
};

export const AcountSlice = createSlice({
  name: ReducerTypes.ACCOUNT,
  initialState,
  reducers: {
    setMnemonic: (state: AccountState, action: PayloadAction<string>) => {
      const {payload} = action;
      state.mnemonic = payload;
    },
    resetMnemonic: (state: AccountState) => {
      state.mnemonic = '';
    },
  },
});

// Action creators are generated for each case reducer function
export const {setMnemonic, resetMnemonic} = AcountSlice.actions;

export default AcountSlice.reducer;
