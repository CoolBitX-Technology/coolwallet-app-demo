import { RNApduManager } from '@src/features/ble/RNApduManager';
import { useConnectCardUseCase } from '@src/features/cardPairing/hooks/useConnectCardUseCase';
import { DemoView } from '@src/features/components/DemoView';
import { useLogUseCase } from '@src/features/home/usecases/useLogUseCase';
import { useAppId } from '@src/features/store/account/AccountActionHooks';
import { useCardId } from '@src/features/store/device/DeviceActionHooks';

const STRENGTH = 12;
export function GenerateMasterKeyContainer() {
  const cardId = useCardId();
  const appId = useAppId(cardId);
  const { log, addLog } = useLogUseCase();
  const { connect, disconnect } = useConnectCardUseCase();

  const generateMasterKey = async () => {
    await connect();

    addLog(`createSeedByCard start...`);
    const result = await RNApduManager.getInstance().createSeedByCard(appId, STRENGTH);
    addLog(`createSeedByCard is successful. result=${result}`);

    disconnect();
  };

  return (
    <DemoView
      btnText="Generate"
      onPressBtn={generateMasterKey}
      log={log}
      showCopy={false}
      showTextBox={false}
      showInput={false}
    />
  );
}
