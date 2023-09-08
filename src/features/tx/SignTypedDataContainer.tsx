import { useBleTransport } from '@src/features/ble/usecases/useConnectBleUseCase';
import { DemoView } from '@src/features/components/DemoView';
import { useLogUseCase } from '@src/features/home/usecases/useLogUseCase';
import { EthereumSdkAdapter } from '@src/features/sdk/evm/EthereumSdkAdapter';
import { EvmChainId } from '@src/features/sdk/evm/EvmChain';
import { EthDataType, EthRawData } from '@src/features/sdk/evm/data/EthRawData';
import { useAddress, useAddressIndex, useAppId } from '@src/features/store/account/AccountActionHooks';
import { useCardId, useIsConnected } from '@src/features/store/device/DeviceActionHooks';
import ObjectUtils from '@src/features/utils/ObjectUtils';
import { useEffect, useState } from 'react';

export function SignTypedDataContainer(): JSX.Element {
  const transport = useBleTransport();
  const cardId = useCardId();
  const appId = useAppId(cardId);
  const isConnected = useIsConnected();
  const index = useAddressIndex(cardId);
  const fromAddress = useAddress(cardId, index);

  const [typeData, setTypeData] = useState(
    '{"types":{"EIP712Domain":[{"name":"name","type":"string"},{"name":"version","type":"string"},{"name":"chainId","type":"uint256"},{"name":"verifyingContract","type":"address"}],"OrderComponents":[{"name":"offerer","type":"address"},{"name":"zone","type":"address"},{"name":"offer","type":"OfferItem[]"},{"name":"consideration","type":"ConsiderationItem[]"},{"name":"orderType","type":"uint8"},{"name":"startTime","type":"uint256"},{"name":"endTime","type":"uint256"},{"name":"zoneHash","type":"bytes32"},{"name":"salt","type":"uint256"},{"name":"conduitKey","type":"bytes32"},{"name":"counter","type":"uint256"}],"OfferItem":[{"name":"itemType","type":"uint8"},{"name":"token","type":"address"},{"name":"identifierOrCriteria","type":"uint256"},{"name":"startAmount","type":"uint256"},{"name":"endAmount","type":"uint256"}],"ConsiderationItem":[{"name":"itemType","type":"uint8"},{"name":"token","type":"address"},{"name":"identifierOrCriteria","type":"uint256"},{"name":"startAmount","type":"uint256"},{"name":"endAmount","type":"uint256"},{"name":"recipient","type":"address"}]},"primaryType":"OrderComponents","domain":{"name":"Seaport","version":"1.1","chainId":"1","verifyingContract":"0x00000000006c3852cbEf3e08E8dF289169EdE581"},"message":{"offerer":"0xBDCc4DBd6BBcCc5b0d1c83C62d6CEEeF1746a48A","offer":[{"itemType":"3","token":"0xA604060890923Ff400e8c6f5290461A83AEDACec","identifierOrCriteria":"13625963080829953686754828469518727052119425589040220410129065366895030435841","startAmount":"1","endAmount":"1"}],"consideration":[{"itemType":"0","token":"0x0000000000000000000000000000000000000000","identifierOrCriteria":"0","startAmount":"97500000000000","endAmount":"97500000000000","recipient":"0xBDCc4DBd6BBcCc5b0d1c83C62d6CEEeF1746a48A"},{"itemType":"0","token":"0x0000000000000000000000000000000000000000","identifierOrCriteria":"0","startAmount":"2500000000000","endAmount":"2500000000000","recipient":"0x0000a26b00c1F0DF003000390027140000fAa719"}],"startTime":"1666345836","endTime":"1669024236","orderType":"3","zone":"0x004C00500000aD104D7DBd00e3ae0A5C00560C00","zoneHash":"0x0000000000000000000000000000000000000000000000000000000000000000","salt":"24446860302761739304752683030156737591518664810215442929817853007225460656315","conduitKey":"0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000","totalOriginalConsiderationItems":"2","counter":"0"}}',
  );
  const [signedHex, setSignedHex] = useState('');

  const [isSigning, setIsSigning] = useState(false);
  const { log, addLog } = useLogUseCase();

  const isBtnDisable = !appId || !transport || !ObjectUtils.isNumeric(index) || !fromAddress || isSigning;

  useEffect(() => {
    addLog(`SIGN ADDRESS: ${fromAddress}`);
  }, [fromAddress]);

  const confirmed = () => {
    addLog(`SIGN CONFIRMED`);
  };

  const authorized = () => {
    addLog(`SIGN AUTHORIZED`);
  };

  const signTypedData = async () => {
    try {
      if (isBtnDisable) return;
      setIsSigning(true);
      const sdkAdapter = new EthereumSdkAdapter(EvmChainId.POLYGON_MAINNET);
      sdkAdapter.setAppId(appId);
      sdkAdapter.setTransport(transport);

      const rawDataForSign: EthRawData = {
        data: typeData,
        amount: '0',
        dataType: EthDataType.TypedData,
        fromAddress,
        toAddress: '',
        index: index as number,
      };
      addLog(`RAW DATA INFO >>>> ${JSON.stringify(rawDataForSign)}`);
      const hex = await sdkAdapter.signData(rawDataForSign, confirmed, authorized);
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
      onPressBtn={signTypedData}
      isBtnDisable={!isConnected}
      inputPlaceHolder="Typed Data"
      btnText="Sign"
      input={typeData}
      onInputChanged={setTypeData}
    />
  );
}
