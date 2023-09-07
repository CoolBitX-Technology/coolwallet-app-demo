import { useBleTransport } from '@src/features/ble/usecases/useConnectBleUseCase';
import { DemoView } from '@src/features/components/DemoView';
import { useLogUseCase } from '@src/features/home/usecases/useLogUseCase';
import { EthereumSdkAdapter } from '@src/features/sdk/evm/EthereumSdkAdapter';
import { EvmChainId } from '@src/features/sdk/evm/EvmChain';
import {
  useAccount,
  useAddressIndex,
  useAppId,
  useDispatchUpdateAddress,
  usePairedPassword,
  useWalletRecoverStatus,
} from '@src/features/store/account/AccountActionHooks';
import { useIsConnected } from '@src/features/store/device/DeviceActionHooks';
import { useEffect, useState } from 'react';

export function RecoverAddressContainer() {
  const appId = useAppId();
  const transport = useBleTransport();
  const pairPassword = usePairedPassword();
  const isConnected = useIsConnected();
  const isWalletRecovered = useWalletRecoverStatus();
  const updateAddress = useDispatchUpdateAddress();
  const { log, addLog } = useLogUseCase();
  const addressIndex = useAddressIndex();
  const account = useAccount();
  const isBtnDisable = !isConnected || !pairPassword || !isWalletRecovered;
  const [recoverAddressIndex, setRecoverAddressIndex] = useState('0');
  const [isRecoveringAddress, setIsRecoveringAddress] = useState(false);
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (!account) return;
    if (account.currentIndex === undefined) return;
    setAddress(account.addresses[account.currentIndex]);
  }, [account?.addresses]);

  const recoverAddress = async (index: number) => {
    if (!appId || !transport) return;
    setIsRecoveringAddress(true);
    try {
      const sdkAdapter = new EthereumSdkAdapter(EvmChainId.POLYGON_MAINNET);
      sdkAdapter.setAppId(appId);
      sdkAdapter.setTransport(transport);
      addLog(`ADDRESS RECOVERING.....`);
      sdkAdapter.setAppId(appId);
      const address = await sdkAdapter.getAddress(index);
      updateAddress(index, address);
      addLog(`RECOVER SUCCESS`);
    } catch (e) {
      addLog(`RECOVER FAILED >>> ${e}`);
    } finally {
      setIsRecoveringAddress(false);
    }
  };

  return (
    <DemoView
      log={log}
      isBtnDisable={isBtnDisable}
      isBtnLoading={isRecoveringAddress}
      input={`${recoverAddressIndex}`}
      textBoxBody={address}
      onInputChanged={(newIndex: string) => setRecoverAddressIndex(`${newIndex}`)}
      inputPlaceHolder="Address Index"
      btnText="Recover"
      onPressBtn={() => recoverAddress(Number.parseInt(recoverAddressIndex))}
    />
  );
}
