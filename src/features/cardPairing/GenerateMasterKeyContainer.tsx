import { DemoView } from '@src/features/components/DemoView';
import { useLogUseCase } from '@src/features/home/usecases/useLogUseCase';
import { useDispatchMasterKeyChange, useMasterKey } from '@src/features/store/account/AccountActionHooks';

export function GenerateMasterKeyContainer() {
  const { log, addLog } = useLogUseCase();
  const masterKey = useMasterKey();
  const changeMasterKey = useDispatchMasterKeyChange();

  const generateMasterKey = async () => {
    // TODO implement
    addLog(`TODO implement`);
    if (masterKey) changeMasterKey(masterKey);
  };

  return (
    <DemoView
      btnText="Generate"
      showCopy={!!masterKey}
      onPressBtn={generateMasterKey}
      showInput={false}
      textBoxPlaceHolder='MasterKey'
      textBoxBody={masterKey}
      log={log}
    />
  );
}
