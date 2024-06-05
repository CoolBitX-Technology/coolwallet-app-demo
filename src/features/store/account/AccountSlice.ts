import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AccountInfo, AccountState } from '@src/features/store/account/AccountTypes';
import { ReducerTypes } from '@src/features/store/types';

const initialState: AccountState = {
  mnemonic: '',
  accounts: {},
};

export const AcountSlice = createSlice({
  name: ReducerTypes.ACCOUNT,
  initialState,
  reducers: {
    setMnemonic: (state: AccountState, action: PayloadAction<string>) => {
      state.mnemonic = action.payload;
    },
    resetMnemonic: (state: AccountState) => {
      state.mnemonic = '';
    },
    setAppInfo: (
      state: AccountState,
      action: PayloadAction<{ cardId: string; appId: string; password: string; deviceName?: string }>,
    ) => {
      const { cardId, deviceName, appId, password } = action.payload;
      const accountInfo: AccountInfo = {
        isWalletRecovered: false,
        appId,
        deviceName: deviceName || cardId,
        password,
        addresses: {},
      };
      state.accounts[cardId] = accountInfo;
    },
    setAppPassword: (state: AccountState, action: PayloadAction<{ cardId: string; password: string }>) => {
      const { cardId, password } = action.payload;
      const account = state.accounts?.[cardId];
      if (!account) return;
      state.accounts[cardId] = { ...account, password };
    },
    clearAppInfo: (state: AccountState, action: PayloadAction<string>) => {
      const cardId = action.payload;
      state.accounts[cardId] = null;
    },
    updateAddress: (state: AccountState, action: PayloadAction<{ cardId: string; index: number; address: string }>) => {
      const { index, address, cardId } = action.payload;
      const account = state.accounts[cardId];
      if (!account) return;
      const newAddresses = {
        ...account.addresses,
        [index]: address,
      };
      state.accounts[cardId] = {
        ...account,
        currentIndex: index,
        addresses: newAddresses,
      };
    },
    setWalletRecoverStatus: (state: AccountState, action: PayloadAction<{ cardId: string; status: boolean }>) => {
      const { cardId, status } = action.payload;
      const account = state.accounts?.[cardId];
      if (!account) return;
      account.isWalletRecovered = status;
    },
  },
});

// Action creators are generated for each case reducer function
export const AccountActions = AcountSlice.actions;

export default AcountSlice.reducer;
