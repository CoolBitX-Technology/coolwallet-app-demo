import { AccountActions } from '@src/features/store/account/AccountSlice';
import { RootState } from '@src/features/store/store';
import { useAppSelector, useAppDispatch } from '@src/features/store/hooks';
import ObjectUtils from '@src/features/utils/ObjectUtils';

function getAccountState(state: RootState) {
  return state?.account;
}

export function useAccountState() {
  return useAppSelector((state: RootState) => getAccountState(state));
}

export function useMasterKey() {
  return useAccountState()?.masterKey;
}

export function useDispatchMasterKeyChange(): (masterKey: string) => void {
  const dispatch = useAppDispatch();
  return (masterKey) => {
    dispatch(AccountActions.setMasterKey(masterKey));
  };
}

export function useDispatchResetMasterKey(): () => void {
  const dispatch = useAppDispatch();
  return () => {
    dispatch(AccountActions.resetMasterKey);
  };
}

export function useMnemonic() {
  return useAccountState()?.mnemonic;
}

export function useDispatchMnemonicChange(): (mnemonic: string) => void {
  const dispatch = useAppDispatch();
  return (mnemonic) => {
    dispatch(AccountActions.setMnemonic(mnemonic));
  };
}

export function useDispatchResetMnemonic(): () => void {
  const dispatch = useAppDispatch();
  return () => {
    dispatch(AccountActions.resetMnemonic);
  };
}

export function useDispatchUpdateAddress(): (cardId: string, index: number, address: string) => void {
  const dispatch = useAppDispatch();
  return (cardId: string, index: number, address: string) => {
    dispatch(AccountActions.updateAddress({ cardId, index, address }));
  };
}

export function useAccount(cardId?: string) {
  const accountState = useAccountState();
  if (!cardId) return null;
  return accountState?.accounts?.[cardId];
}

export function useAppId(cardId?: string) {
  const account = useAccount(cardId);
  if (!account) return '';
  return account.appId;
}

export function usePairedPassword(cardId?: string) {
  const account = useAccount(cardId);
  if (!account) return '';
  return account.password;
}

export function useDeviceName(cardId?: string) {
  const account = useAccount(cardId);
  if (!account) return '';
  return account.deviceName;
}

export function useAddressIndex(cardId?: string) {
  const account = useAccount(cardId);
  if (!account) return undefined;
  return account.currentIndex;
}

export function useWalletRecoverStatus(cardId?: string) {
  const account = useAccount(cardId);
  if (!account) return undefined;
  return account.isWalletRecovered;
}

export function useAddress(cardId?: string, index?: number) {
  const account = useAccount(cardId);
  if (!cardId || !ObjectUtils.isNumeric(index)) return '';
  if (!account) return '';
  return account.addresses?.[index as number] || '';
}

export function useDispatchChangeAppInfo(): (cardId: string, appId: string, password: string, deviceName: string) => void {
  const dispatch = useAppDispatch();
  return (cardId, appId, password, deviceName) => {
    dispatch(AccountActions.setAppInfo({ cardId, deviceName, appId, password }));
  };
}

export function useDispatchClearAppInfo(): (cardId: string) => void {
  const dispatch = useAppDispatch();
  return (cardId) => {
    dispatch(AccountActions.clearAppInfo(cardId));
  };
}

export function useDispatchChangePairedPassword(): (cardId: string, password: string) => void {
  const dispatch = useAppDispatch();
  return (cardId, password) => {
    dispatch(AccountActions.setAppPassword({ cardId, password }));
  };
}

export function useDispatchClearAppId(): (cardId: string) => void {
  const dispatch = useAppDispatch();
  return (cardId) => {
    dispatch(AccountActions.clearAppInfo(cardId));
  };
}

export function useDispatchWalletRecoverStatus(): (cardId: string, status: boolean) => void {
  const dispatch = useAppDispatch();
  return (cardId, status) => {
    dispatch(AccountActions.setWalletRecoverStatus({ cardId, status }));
  };
}
