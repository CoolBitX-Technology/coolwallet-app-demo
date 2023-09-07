import { DemoView } from '@src/features/components/DemoView';
import { EthereumSdkAdapter } from '@src/features/sdk/evm/EthereumSdkAdapter';
import { EvmChainId } from '@src/features/sdk/evm/EvmChain';
import { useDispatchMnemonicChange, useMnemonic } from '@src/features/store/account/AccountActionHooks';
import { useState } from 'react';

export function GenerateMnemonicContainer() {
  const [log, setLog] = useState('');
  const mnemonic = useMnemonic();
  const updateMnemonic = useDispatchMnemonicChange();

  const generateMnemonic = async () => {
    const sdkAdapter = new EthereumSdkAdapter(EvmChainId.POLYGON_MAINNET);
    const newMnemonic = await sdkAdapter.createMnemonic();
    updateMnemonic(newMnemonic);
    setLog(`CREATE SUCCESS`);
  };

  return (
    <DemoView
      btnText="Generate"
      showCopy={true}
      onPressBtn={generateMnemonic}
      showInput={false}
      textBoxBody={mnemonic}
      log={log}
    />
  );
}
