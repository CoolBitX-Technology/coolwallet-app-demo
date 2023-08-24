import { AccountActions } from '@src/features/store/account/AccountSlice';
import { RootState } from '@src/features/store/store';
import { useAppSelector, useAppDispatch } from '@src/features/store/hooks';
import { useCardId } from '@src/features/store/device/DeviceActionHooks';

function getAccountState(state: RootState) {
  return state.account;
}

export function useMnemonic() {
  return useAppSelector((state: RootState) => getAccountState(state).mnemonic);
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

export function useAccount() {
  const cardId = useCardId();
  return useAppSelector((state: RootState) => getAccountState(state).accounts?.[cardId]);
}

export function useAppId() {
  return useAccount()?.appId || '';
}

export function usePairedPassword() {
  return useAccount()?.password || '';
}

export function useDispatchChangeAppInfo(): (cardId: string, appId: string, password: string) => void {
  const dispatch = useAppDispatch();
  return (cardId, appId, password) => {
    dispatch(AccountActions.setAppInfo({ cardId, appId, password }));
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
