import { DemoView } from '@src/features/components/DemoView';
import { useTransport } from '@src/features/home/usecases/useCardPairingUseCase';
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
  const transport = useTransport();
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
      const spilts = mnemonic.split(' ');
      addLog(`RECOVERING FROM [ ${spilts[spilts.length-1]} .... ${spilts[0]} ]`);
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
      inputPlaceHolder={'Your Mnemonic'}
      inputType='password'
      onInputChanged={setMnemonic}
      isBtnDisable={isBtnDisable}
      isBtnLoading={isRecovering}
      log={log}
    />
  );
}
