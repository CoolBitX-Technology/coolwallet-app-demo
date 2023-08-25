import { RNApduManager } from '@src/features/ble/RNApduManager';
import { useAppId, useDispatchMnemonicChange, useMnemonic } from '@src/features/store/account/AccountActionHooks';
import { useDispatchLogChange } from '@src/features/store/log/LogActionHooks';
import { useState } from 'react';

interface RecoverWalletOutput {
  mnemonic: string;
  isRecovering: boolean;
  createWallet: () => Promise<void>;
  recoverWallet: (mnemonic: string) => Promise<void>;
}
export function useRecoverWalletUseCase(): RecoverWalletOutput {
  const appId = useAppId();
  const updateLog = useDispatchLogChange();
  const updateMnemonic = useDispatchMnemonicChange();
  const mnemonic = useMnemonic();
  const [isRecovering, setIsRecovering] = useState(false);

  const createWallet = async () => {
    const newMnemonic = await RNApduManager.getInstance().createMnemonic();
    updateMnemonic(newMnemonic);
    updateLog(`CREATE SUCCESS`);
  };

  const recoverWallet = async (mnemonic: string) => {
    if (!appId) return;
    setIsRecovering(true);
    try {
      updateLog(`WALLET RECOVERING.....`);
      await RNApduManager.getInstance().recoverWallet(appId, mnemonic);
      updateMnemonic(mnemonic);
      updateLog(`RECOVER SUCCESS`);
    } catch (e) {
      updateLog(`RECOVER FAILED >>> ${e}`);
    } finally {
      setIsRecovering(false);
    }
  };

  return {
    mnemonic,
    isRecovering,
    createWallet,
    recoverWallet,
  };
}
