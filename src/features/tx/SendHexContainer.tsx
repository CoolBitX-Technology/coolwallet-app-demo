import { useBleTransport } from '@src/features/ble/usecases/useConnectBleUseCase';
import { DemoView } from '@src/features/components/DemoView';
import { useLogUseCase } from '@src/features/home/usecases/useLogUseCase';
import { EthereumApiAdapter } from '@src/features/sdk/evm/EthereumApiAdater';
import { EVM_CHAIN_MAP, EvmChainId } from '@src/features/sdk/evm/EvmChain';
import { EthDataType } from '@src/features/sdk/evm/data/EthRawData';
import { useAppId } from '@src/features/store/account/AccountActionHooks';
import { useCardId, useIsConnected } from '@src/features/store/device/DeviceActionHooks';
import { isEmpty } from 'lodash';
import { useState } from 'react';
import { Button, CheckIcon, Select, View } from 'native-base';
import { Linking } from 'react-native';

export function SendHexContainer() {
  const transport = useBleTransport();
  const cardId = useCardId();
  const appId = useAppId(cardId);
  const isConnected = useIsConnected();
  const [hex, setHex] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [txId, setTxId] = useState('');
  const [dataType, setDataType] = useState<EthDataType>();
  const { log, addLog } = useLogUseCase();
  const isBtnDisable = !appId || !transport || !isConnected || isSending || isEmpty(hex);

  const sendTrasaction = async () => {
    try {
      if (isBtnDisable) return;
      setIsSending(true);
      const apiAdapter = new EthereumApiAdapter(EvmChainId.POLYGON_MAINNET);
      const txHash = await apiAdapter.sendTransaction(dataType as EthDataType, hex);
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
    <>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          marginTop: 24,
          paddingHorizontal: 20,
        }}
      >
        <Select
          selectedValue={dataType}
          width={'100%'}
          placeholder="Choose EthDataType"
          _selectedItem={{
            bg: '#B6F4FA',
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={(itemValue) => setDataType(itemValue as EthDataType)}
        >
          <Select.Item label="Transfer" value={EthDataType.Transfer} />
          <Select.Item label="Smart Contract" value={EthDataType.SmartContract} />
          <Select.Item label="Message" value={EthDataType.Message} />
          <Select.Item label="Typed Data" value={EthDataType.TypedData} />
        </Select>
      </View>
      <DemoView
        style={{ marginTop: 12, paddingBottom: 12 }}
        log={log}
        isBtnLoading={isSending}
        textBoxBody={txId}
        onPressBtn={sendTrasaction}
        isBtnDisable={isBtnDisable}
        inputPlaceHolder="Hex"
        btnText="Send"
        input={hex}
        onInputChanged={setHex}
        showCopy={false}
      />
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingHorizontal: 20,
        }}
      >
        <Button
          onPress={() => Linking.openURL(`${EVM_CHAIN_MAP[EvmChainId.POLYGON_MAINNET].explorer_url}${txId}`)}
          size="sm"
          mt="4px"
          w={'100%'}
          bgColor={!txId ? 'grey' : undefined}
          disabled={!txId}
        >
          Check On Explorer
        </Button>
      </View>
    </>
  );
}
