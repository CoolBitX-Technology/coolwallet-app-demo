import { useBleTransport } from '@src/features/ble/usecases/useConnectBleUseCase';
import { DemoView } from '@src/features/components/DemoView';
import { useLogUseCase } from '@src/features/home/usecases/useLogUseCase';
import { EthereumSdkAdapter } from '@src/features/sdk/evm/EthereumSdkAdapter';
import { EvmChainId } from '@src/features/sdk/evm/EvmChain';
import { useAppId, useDispatchMnemonicChange, useDispatchWalletRecoverStatus, useMnemonic } from '@src/features/store/account/AccountActionHooks';
import { useCardId } from '@src/features/store/device/DeviceActionHooks';
import { useState } from 'react';

export function RecoverWalletContainer() {
  const { log, addLog } = useLogUseCase();
  const defaultMnemonic = useMnemonic();
  const cardId = useCardId();
  const appId = useAppId(cardId);
  const transport = useBleTransport();
  const [isRecovering, setIsRecovering] = useState(false);
  const [mnemonic, setMnemonic] = useState(defaultMnemonic);
  const isBtnDisable = !cardId || !appId || !transport || !mnemonic || isRecovering;
  const updateMnemonic = useDispatchMnemonicChange();
  const updateRecoverdStatus = useDispatchWalletRecoverStatus();

  const recoverWallet = async () => {
    if (isBtnDisable) return;
    try {
      setIsRecovering(true);
      const sdkAdapter = new EthereumSdkAdapter(EvmChainId.POLYGON_MAINNET);
      sdkAdapter.setAppId(appId);
      sdkAdapter.setTransport(transport);
      addLog(`WALLET RECOVERING.....`);
      await sdkAdapter.recoverWallet(mnemonic);
      updateMnemonic(mnemonic);
      updateRecoverdStatus(cardId, true);
      addLog(`RECOVER SUCCESS`);
    } catch (e) {
      updateRecoverdStatus(cardId, false);
      addLog(`RECOVER FAILED >>> ${e}`);
    } finally {
      setIsRecovering(false);
    }
  };

  return (
    <DemoView
      btnText="Recover"
      onPressBtn={recoverWallet}
      showTextBox={false}
      showCopy={false}
      textBoxBody={defaultMnemonic}
      input={mnemonic}
      onInputChanged={setMnemonic}
      isBtnDisable={isBtnDisable}
      isBtnLoading={isRecovering}
      log={log}
    />
  );
}
