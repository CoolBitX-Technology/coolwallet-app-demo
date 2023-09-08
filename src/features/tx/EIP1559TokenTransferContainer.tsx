import { useBleTransport } from '@src/features/ble/usecases/useConnectBleUseCase';
import { DemoSignView } from '@src/features/components/DemoSignView';
import { DemoView } from '@src/features/components/DemoView';
import { useLogUseCase } from '@src/features/home/usecases/useLogUseCase';
import { EthereumApiAdapter } from '@src/features/sdk/evm/EthereumApiAdater';
import { EthereumSdkAdapter } from '@src/features/sdk/evm/EthereumSdkAdapter';
import { EVM_CHAIN_MAP, EvmChainId } from '@src/features/sdk/evm/EvmChain';
import { EthDataType, EthRawData } from '@src/features/sdk/evm/data/EthRawData';
import { useAddress, useAddressIndex, useAppId } from '@src/features/store/account/AccountActionHooks';
import { useCardId } from '@src/features/store/device/DeviceActionHooks';
import ObjectUtils from '@src/features/utils/ObjectUtils';
import { useEffect, useState } from 'react';
import { Linking } from 'react-native';

export function EIP1559TokenTransferContainer() {
  const transport = useBleTransport();
  const cardId = useCardId();
  const appId = useAppId(cardId);
  const index = useAddressIndex(cardId);

  const fromAddress = useAddress(cardId, index);
  const [toAddress, setToAddress] = useState(fromAddress);
  const [amount, setAmount] = useState('0');
  const [symbol, setSymbol] = useState('USDT');
  const [signedHex, setSignedHex] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [txId, setTxId] = useState('');

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

  const sendTrasaction = async () => {
    try {
      if (isBtnDisable) return;
      setIsSending(true);
      const apiAdapter = new EthereumApiAdapter(EvmChainId.POLYGON_MAINNET);
      const txHash = await apiAdapter.sendTransaction(signedHex);
      setTxId(txHash);
      addLog(`SEND SUCCESS`);
      addLog(`TXID: ${txHash}`);
    } catch (e) {
      addLog(`SEND FAILED >>> ${e}`);
    } finally {
      setIsSending(false);
    }
  };
  return (
    <DemoSignView
      log={log}
      isBtnLoading={isSigning}
      isBtn2Loading={isSending}
      textBoxBody={signedHex}
      onPressBtn={signTokenTransfer}
      isBtnDisable={isBtnDisable}
      inputPlaceHolder="To Address"
      input2PlaceHolder="Amount"
      input2Mode="numeric"
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
      showBtn2={true}
      showBtn3={true}
      btn2Text="Send"
      onPressBtn2={sendTrasaction}
      btn3Text="Check On Explorer"
      onPressBtn3={() => Linking.openURL(`${EVM_CHAIN_MAP[EvmChainId.POLYGON_MAINNET].explorer_url}${txId}`)}
    />
  );
}
