import { useBleTransport } from '@src/features/ble/usecases/useConnectBleUseCase';
import { DemoView } from '@src/features/components/DemoView';
import { useLogUseCase } from '@src/features/home/usecases/useLogUseCase';
import { EthereumSdkAdapter } from '@src/features/sdk/evm/EthereumSdkAdapter';
import { EvmChainId } from '@src/features/sdk/evm/EvmChain';
import { EthDataType, EthRawData } from '@src/features/sdk/evm/data/EthRawData';
import { useAddress, useAddressIndex, useAppId } from '@src/features/store/account/AccountActionHooks';
import { useCardId, useIsConnected } from '@src/features/store/device/DeviceActionHooks';
import { useEffect, useState } from 'react';

export function PersonalSignContainer(): JSX.Element {
  const transport = useBleTransport();
  const cardId = useCardId();
  const appId = useAppId(cardId);
  const isConnected = useIsConnected();
  const index = useAddressIndex(cardId);
  const fromAddress = useAddress(cardId, index);

  // 用 0xBDCc4DBd6BBcCc5b0d1c83C62d6CEEeF1746a48A 簽應得到 0x0162a2609c67c2759303c2cc12aa124ce9c1491fb40c6c380a20466ec88f32e415d0f1eef0e846738882be0cf4dc648aa590b42df309efd12defebbc338cef921b
  const [message, setMessage] = useState('0x492077616e7420746f206c6f67696e206f6e2052617269626c6520617420323032322d31302d32315430383a34313a30362e3739355a2e204920616363657074207468652052617269626c65205465726d73206f6620536572766963652068747470733a2f2f7374617469632e72617269626c652e636f6d2f7465726d732e70646620616e64204920616d206174206c65617374203133207965617273206f6c642e');
  const [signedHex, setSignedHex] = useState('');

  const [isSigning, setIsSigning] = useState(false);
  const { log, addLog } = useLogUseCase();

  const isBtnDisable = !appId || !transport || !index || !fromAddress || isSigning;

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
        fromAddress: '',
        toAddress: '',
        dataType: EthDataType.Message,
        data: message,
      };
      const hex = await sdkAdapter.signData(rawData, confirmed, authorized);
      setSignedHex(hex);
      addLog(`SIGN SUCCESS`);
      addLog(`HEX: ${hex}`);
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
