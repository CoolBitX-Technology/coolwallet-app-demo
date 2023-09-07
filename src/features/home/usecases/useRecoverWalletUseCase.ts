import { useBleTransport } from '@src/features/ble/usecases/useConnectBleUseCase';
import { EthereumSdkAdapter } from '@src/features/sdk/evm/EthereumSdkAdapter';
import { EvmChainId } from '@src/features/sdk/evm/EvmChain';
import {
  useAccount,
  useAddress,
  useAddressIndex,
  useAppId,
  useDispatchMnemonicChange,
  useDispatchUpdateAddress,
  useMnemonic,
} from '@src/features/store/account/AccountActionHooks';
import { useDispatchLogChange } from '@src/features/store/log/LogActionHooks';
import { useEffect, useState } from 'react';

interface RecoverWalletOutput {
  address: string;
  addressIndex?: number;
  mnemonic: string;
  isRecovering: boolean;
  createWallet: () => Promise<void>;
  recoverWallet: (mnemonic: string) => Promise<void>;
  recoverAddress: (index: number) => Promise<void>;
}
export function useRecoverWalletUseCase(): RecoverWalletOutput {
  const appId = useAppId();
  const transport = useBleTransport();
  const account = useAccount();
  const addressIndex = useAddressIndex();
  const updateLog = useDispatchLogChange();
  const updateMnemonic = useDispatchMnemonicChange();
  const updateAddress = useDispatchUpdateAddress();
  const mnemonic = useMnemonic();
  const [isRecovering, setIsRecovering] = useState(false);
  const [address, setAddress] = useState('');
  const sdkAdapter = new EthereumSdkAdapter(EvmChainId.POLYGON_MAINNET);

  useEffect(() => {
    if (!account) return;
    if (account.currentIndex === undefined) return;
    setAddress(account.addresses[account.currentIndex]);
  }, [account?.addresses]);

  const createWallet = async () => {
    const newMnemonic = await sdkAdapter.createMnemonic();
    updateMnemonic(newMnemonic);
    updateLog(`CREATE SUCCESS`);
  };

  const recoverWallet = async (mnemonic: string) => {
    if (!appId || !transport) return;
    setIsRecovering(true);
    try {
      sdkAdapter.setAppId(appId);
      sdkAdapter.setTransport(transport);
      updateLog(`WALLET RECOVERING.....`);
      await sdkAdapter.recoverWallet(mnemonic);
      updateMnemonic(mnemonic);
      updateLog(`RECOVER SUCCESS`);
    } catch (e) {
      updateLog(`RECOVER FAILED >>> ${e}`);
    } finally {
      setIsRecovering(false);
    }
  };

  const recoverAddress = async (index: number) => {
    if (!appId || !transport) return;
    setIsRecovering(true);
    try {
      sdkAdapter.setAppId(appId);
      sdkAdapter.setTransport(transport);
      updateLog(`ADDRESS RECOVERING.....`);
      sdkAdapter.setAppId(appId);
      const address = await sdkAdapter.getAddress(index);
      updateAddress(index, address);
      updateLog(`RECOVER SUCCESS`);
    } catch (e) {
      updateLog(`RECOVER FAILED >>> ${e}`);
    } finally {
      setIsRecovering(false);
    }
  };

  return {
    address,
    addressIndex,
    mnemonic,
    isRecovering,
    createWallet,
    recoverWallet,
    recoverAddress,
  };
}
