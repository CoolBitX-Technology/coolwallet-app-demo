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
  useDispatchWalletRecoverStatus,
  useMnemonic,
} from '@src/features/store/account/AccountActionHooks';
import { useBluetoothInfo } from '@src/features/store/device/DeviceActionHooks';
import { useDispatchLogChange } from '@src/features/store/log/LogActionHooks';
import { useEffect, useState } from 'react';

interface RecoverWalletOutput {
  address: string;
  addressIndex?: number;
  mnemonic: string;
  isRecoveringWallet: boolean;
  isRecoveringAddress: boolean;
  createWallet: () => Promise<void>;
  recoverWallet: (mnemonic: string) => Promise<void>;
  recoverAddress: (index: number) => Promise<void>;
}
export function useRecoverWalletUseCase(): RecoverWalletOutput {
  const appId = useAppId();
  const transport = useBleTransport();
  const account = useAccount();
  const bleInfo = useBluetoothInfo();
  const addressIndex = useAddressIndex();
  const updateLog = useDispatchLogChange();
  const updateMnemonic = useDispatchMnemonicChange();
  const updateAddress = useDispatchUpdateAddress();
  const updateWalletRecoverdStatus = useDispatchWalletRecoverStatus();
  const mnemonic = useMnemonic();
  const [isRecoveringWallet, setIsRecoveringWallet] = useState(false);
  const [isRecoveringAddress, setIsRecoveringAddress] = useState(false);
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
    if (!bleInfo) return;
    if (!appId || !transport) return;
    setIsRecoveringWallet(true);
    try {
      sdkAdapter.setAppId(appId);
      sdkAdapter.setTransport(transport);
      updateLog(`WALLET RECOVERING.....`);
      await sdkAdapter.recoverWallet(mnemonic);
      updateMnemonic(mnemonic);
      updateWalletRecoverdStatus(bleInfo?.cardId, true);
      updateLog(`RECOVER SUCCESS`);
    } catch (e) {
      updateWalletRecoverdStatus(bleInfo?.cardId, false);
      updateLog(`RECOVER FAILED >>> ${e}`);
    } finally {
      setIsRecoveringWallet(false);
    }
  };

  const recoverAddress = async (index: number) => {
    if (!appId || !transport) return;
    setIsRecoveringAddress(true);
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
      setIsRecoveringAddress(false);
    }
  };

  return {
    address,
    addressIndex,
    mnemonic,
    isRecoveringWallet,
    isRecoveringAddress,
    createWallet,
    recoverWallet,
    recoverAddress,
  };
}
