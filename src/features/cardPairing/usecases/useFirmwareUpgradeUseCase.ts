import { RNApduManager } from '@src/features/ble/RNApduManager';
import { FirmwareInfo, VersionInfo } from '@src/features/ble/data/FirmwareInfo';
import { useInitApduEffect } from '@src/features/home/usecases/useCardPairingUseCase';
import { useState } from 'react';

interface FirmwareUpgradeOutput {
  progress: number;
  checkFirmware: () => Promise<FirmwareInfo>;
  updateFirmware: (firmwareInfo: FirmwareInfo, cardId: string, appId?: string) => Promise<VersionInfo>;
}
export function useFirmwareUpgradeUseCase(): FirmwareUpgradeOutput {
  const [progress, setProgress] = useState(0);
  const apduManager = RNApduManager.getInstance();

  useInitApduEffect();

  const checkFirmware = async () => {
    const {
      isNeedUpdate: isNeedSEUpdate,
      newVersion: newSEVersion,
      curVersion: curSEVersion,
    } = await apduManager.checkSEUpdate();
    const {
      isNeedUpdate: isNeedMcuUpdate,
      newVersion: newMcuVersion,
      curVersion: curMcuVersion,
    } = await apduManager.checkMCUUpdate();
    return {
      isNeedMcuUpdate,
      isNeedSEUpdate,
      newSEVersion: newSEVersion.toString(),
      curSEVersion: curSEVersion.toString(),
      newMcuVersion,
      curMcuVersion,
    };
  };

  const updateFirmware = async ({ isNeedMcuUpdate, isNeedSEUpdate }: FirmwareInfo, cardId: string, appId = '') => {
    setProgress(0);
    const isContinueUpdating = isNeedMcuUpdate && isNeedSEUpdate;
    const curSEVersion = await apduManager.updateSE(cardId, appId, setProgress, isContinueUpdating);
    const curMcuVersion = await apduManager.updateMCU(setProgress, isContinueUpdating);
    return {
      curSEVersion: curSEVersion.toString(),
      curMcuVersion,
    };
  };

  return {
    progress,
    checkFirmware,
    updateFirmware,
  };
}
