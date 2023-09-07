import { DemoView } from '@src/features/components/DemoView';
import { useLogUseCase } from '@src/features/home/usecases/useLogUseCase';
import { EthereumSdkAdapter } from '@src/features/sdk/evm/EthereumSdkAdapter';
import { EvmChainId } from '@src/features/sdk/evm/EvmChain';
import { useDispatchMnemonicChange, useMnemonic } from '@src/features/store/account/AccountActionHooks';

export function GenerateMnemonicContainer() {
  const { log, addLog } = useLogUseCase();
  const mnemonic = useMnemonic();
  const updateMnemonic = useDispatchMnemonicChange();

  const generateMnemonic = async () => {
    const sdkAdapter = new EthereumSdkAdapter(EvmChainId.POLYGON_MAINNET);
    const newMnemonic = await sdkAdapter.createMnemonic();
    updateMnemonic(newMnemonic);
    addLog(`CREATE SUCCESS\r\nMnemonic: ${newMnemonic}`);
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
