import { AccountActions } from '@src/features/store/account/AccountSlice';
import { RootState } from '@src/features/store/store';
import { useAppSelector, useAppDispatch } from '@src/features/store/hooks';

function getMnemonic(state: RootState) {
  return state.account.mnemonic;
}

export function useMnemonic() {
  return useAppSelector((state: RootState) => getMnemonic(state));
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
