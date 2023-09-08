import { useBleTransport } from '@src/features/ble/usecases/useConnectBleUseCase';
import { DemoView } from '@src/features/components/DemoView';
import { useLogUseCase } from '@src/features/home/usecases/useLogUseCase';
import { EthereumSdkAdapter } from '@src/features/sdk/evm/EthereumSdkAdapter';
import { EvmChainId } from '@src/features/sdk/evm/EvmChain';
import { useAddress, useAddressIndex, useAppId, useDispatchUpdateAddress } from '@src/features/store/account/AccountActionHooks';
import { useCardId } from '@src/features/store/device/DeviceActionHooks';
import ObjectUtils from '@src/features/utils/ObjectUtils';
import { useState } from 'react';

export function RecoverAddressContainer() {
  const { log, addLog } = useLogUseCase();
  const cardId = useCardId();
  const appId = useAppId(cardId);
  const transport = useBleTransport();
  const defaultAddressIndex = useAddressIndex(cardId);
  const defaultAddress = useAddress(cardId, defaultAddressIndex);
  const updateAddress = useDispatchUpdateAddress();
  const [isRecovering, setIsRecovering] = useState(false);
  const [addressIndex, setAddressIndex] = useState(defaultAddressIndex);
  const isBtnDisable = !cardId || !appId || addressIndex === undefined || !transport || isRecovering;

  const recoverAddress = async () => {
    if (isBtnDisable) return;
    try {
      setIsRecovering(true);
      const sdkAdapter = new EthereumSdkAdapter(EvmChainId.POLYGON_MAINNET);
      sdkAdapter.setAppId(appId);
      sdkAdapter.setTransport(transport);
      addLog(`ADDRESS ${addressIndex} RECOVERING.....`);
      sdkAdapter.setAppId(appId);
      const address = await sdkAdapter.getAddress(addressIndex);
      updateAddress(cardId, addressIndex, address);
      addLog(`RECOVER SUCCESS`);
      addLog(`[${addressIndex}]：${address}`);
    } catch (e) {
      addLog(`RECOVER FAILED >>> ${e}`);
    } finally {
      setIsRecovering(false);
    }
  };

  return (
    <DemoView
      btnText="Recover"
      onPressBtn={recoverAddress}
      textBoxBody={defaultAddress}
      input={addressIndex ? `${addressIndex}` : ''}
      inputMode="numeric"
      onInputChanged={(num: string) => {
        if (!ObjectUtils.isNumeric(num) || addressIndex === Number.parseInt(num)) return;
        setAddressIndex(Number.parseInt(num));
      }}
      isBtnDisable={isBtnDisable}
      isBtnLoading={isRecovering}
      log={log}
    />
  );
}
