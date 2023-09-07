import { useBleTransport } from '@src/features/ble/usecases/useConnectBleUseCase';
import { DemoView } from '@src/features/components/DemoView';
import { useLogUseCase } from '@src/features/home/usecases/useLogUseCase';
import { EthereumSdkAdapter } from '@src/features/sdk/evm/EthereumSdkAdapter';
import { EvmChainId } from '@src/features/sdk/evm/EvmChain';
import { EthDataType, EthRawData } from '@src/features/sdk/evm/data/EthRawData';
import { useAddress, useAddressIndex, useAppId } from '@src/features/store/account/AccountActionHooks';
import { useIsConnected } from '@src/features/store/device/DeviceActionHooks';
import { useEffect, useState } from 'react';

export function PersonalSignContainer(): JSX.Element {
  const transport = useBleTransport();
  const appId = useAppId();
  const isConnected = useIsConnected();
  const fromAddress = useAddress();
  const index = useAddressIndex();

  const [message, setMessage] = useState('');
  const [signedHex, setSignedHex] = useState('');

  const [isSigning, setIsSigning] = useState(false);
  const { log, addLog } = useLogUseCase();

  const isBtnDisable = !appId || !transport || !index || !fromAddress;

  useEffect(()=>{
    addLog(`SIGN ADDRESS: ${fromAddress}`);
  }, []);

  const confirmed = () => {
    addLog(`SIGN CONFIRMED`);
  };

  const authorized = () => {
    addLog(`SIGN AUTHORIZED`);
  };

  const signMessage = async () => {
    try {
      if (isBtnDisable) return;
      setIsSigning(true);
      const sdkAdapter = new EthereumSdkAdapter(EvmChainId.POLYGON_MAINNET);
      sdkAdapter.setAppId(appId);
      sdkAdapter.setTransport(transport);
      const rawData: EthRawData = {
        amount: '0',
        index,
        fromAddress,
        toAddress: '',
        dataType: EthDataType.Message,
      };
      const hex = await sdkAdapter.signData(rawData, confirmed, authorized);
      setSignedHex(hex);
      addLog(`SIGN SUCCESS`);
    } catch (e) {
      addLog(`SIGN FAILED >>> ${e}`);
    } finally {
      setIsSigning(false);
    }
  };

  return (
    <DemoView
      log={log}
      isBtnLoading={isSigning}
      textBoxBody={signedHex}
      onPressBtn={signMessage}
      isBtnDisable={!isConnected}
      inputPlaceHolder="Message"
      btnText="Sign"
      input={message}
      onInputChanged={setMessage}
    />
  );
}
