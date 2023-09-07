import { useBleTransport } from '@src/features/ble/usecases/useConnectBleUseCase';
import { DemoView } from '@src/features/components/DemoView';
import { EthereumSdkAdapter } from '@src/features/sdk/evm/EthereumSdkAdapter';
import { EvmChainId } from '@src/features/sdk/evm/EvmChain';
import { useAppId, useDispatchMnemonicChange, useDispatchWalletRecoverStatus, useMnemonic } from '@src/features/store/account/AccountActionHooks';
import { useBluetoothInfo } from '@src/features/store/device/DeviceActionHooks';
import { useState } from 'react';

export function RecoverWalletContainer() {
  const [log, setLog] = useState('');
  const defaultMnemonic = useMnemonic();
  const appId = useAppId();
  const transport = useBleTransport();
  const bleInfo = useBluetoothInfo();
  const [isRecovering, setIsRecovering] = useState(false);
  const [mnemonic, setMnemonic] = useState(defaultMnemonic);
  const isBtnDisable = !bleInfo || !appId || !transport;
  const updateMnemonic = useDispatchMnemonicChange();
  const updateRecoverdStatus = useDispatchWalletRecoverStatus();

  const recoverWallet = async () => {
    if (isBtnDisable) return;
    const sdkAdapter = new EthereumSdkAdapter(EvmChainId.POLYGON_MAINNET);
    setIsRecovering(true);
    try {
      sdkAdapter.setAppId(appId);
      sdkAdapter.setTransport(transport);
      setLog(`WALLET RECOVERING.....`);
      await sdkAdapter.recoverWallet(mnemonic);
      updateMnemonic(mnemonic);
      updateRecoverdStatus(bleInfo?.cardId, true);
      setLog(`RECOVER SUCCESS`);
    } catch (e) {
      updateRecoverdStatus(bleInfo?.cardId, false);
      setLog(`RECOVER FAILED >>> ${e}`);
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
