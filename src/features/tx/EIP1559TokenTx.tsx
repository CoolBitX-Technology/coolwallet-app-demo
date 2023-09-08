import { useBleTransport } from '@src/features/ble/usecases/useConnectBleUseCase';
import { DemoView } from '@src/features/components/DemoView';
import { useLogUseCase } from '@src/features/home/usecases/useLogUseCase';
import { EthereumApiAdapter } from '@src/features/sdk/evm/EthereumApiAdater';
import { EthereumSdkAdapter } from '@src/features/sdk/evm/EthereumSdkAdapter';
import { EvmChainId } from '@src/features/sdk/evm/EvmChain';
import { EthDataType, EthRawData } from '@src/features/sdk/evm/data/EthRawData';
import { useAddress, useAddressIndex, useAppId } from '@src/features/store/account/AccountActionHooks';
import { useCardId } from '@src/features/store/device/DeviceActionHooks';
import ObjectUtils from '@src/features/utils/ObjectUtils';
import { useEffect, useState } from 'react';

export function EIP1559TokenTx() {
  const transport = useBleTransport();
  const cardId = useCardId();
  const appId = useAppId(cardId);
  const index = useAddressIndex(cardId);

  const fromAddress = useAddress(cardId, index);
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('0');
  const [symbol, setSymbol] = useState('USDT');
  const [signedHex, setSignedHex] = useState('');

  const [isSigning, setIsSigning] = useState(false);
  const { log, addLog } = useLogUseCase();

  const isBtnDisable = !appId || !transport || !ObjectUtils.isNumeric(index) || !fromAddress || !toAddress || isSigning;

  useEffect(() => {
    addLog(`SIGN ADDRESS: ${fromAddress}`);
  }, [fromAddress]);

  const confirmed = () => {
    addLog(`SIGN CONFIRMED`);
  };

  const authorized = () => {
    addLog(`SIGN AUTHORIZED`);
  };

  const signTokenTransfer = async () => {
    try {
      if (isBtnDisable) return;
      const apiAdapter = new EthereumApiAdapter(EvmChainId.POLYGON_MAINNET);
      const sdkAdapter = new EthereumSdkAdapter(EvmChainId.POLYGON_MAINNET);

      sdkAdapter.setAppId(appId);
      sdkAdapter.setTransport(transport);
      const tokenInfo = await sdkAdapter.findContractAddress(symbol);
      const data = await apiAdapter.getTokenTransferData(toAddress, amount, tokenInfo);
      const rawDataForFee: EthRawData = {
        dataType: EthDataType.SmartContract,
        fromAddress,
        amount: '0',
        toAddress: tokenInfo.contractAddress,
        data,
        index: index as number,
        decimals: tokenInfo.unit,
        symbol: tokenInfo.symbol,
      };
      setIsSigning(true);
      addLog('CALCULATING FEE......');
      const fee = await apiAdapter.estimateTxFee(rawDataForFee);
      addLog(`FEE INFO >>>> ${JSON.stringify(fee)}`);
      const rawDataForSign: EthRawData = {
        ...rawDataForFee,
        fee,
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
      onPressBtn={signTokenTransfer}
      isBtnDisable={isBtnDisable}
      inputPlaceHolder="To Address"
      input2PlaceHolder="Amount"
      input3PlaceHolder="Symbol"
      btnText="Sign"
      input={toAddress}
      input2={amount}
      input3={symbol}
      onInputChanged={setToAddress}
      onInput2Changed={setAmount}
      onInput3Changed={setSymbol}
      showInput2={true}
      showInput3={true}
    />
  );
}
