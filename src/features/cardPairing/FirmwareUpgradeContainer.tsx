import { RNApduError } from '@src/features/ble/RNApduError';
import { FirmwareInfo } from '@src/features/ble/data/FirmwareInfo';
import { useConnectBleUseCase } from '@src/features/ble/usecases/useConnectBleUseCase';
import { useFirmwareUpgradeUseCase } from '@src/features/cardPairing/usecases/useFirmwareUpgradeUseCase';
import { BlueButton } from '@src/features/components/BlueButton';
import { LogBox } from '@src/features/components/LogBox';
import { TextView } from '@src/features/components/TextView';
import { useLogUseCase } from '@src/features/home/usecases/useLogUseCase';
import { useAppId } from '@src/features/store/account/AccountActionHooks';
import { useCardId, useIsConnected } from '@src/features/store/device/DeviceActionHooks';
import { Progress, VStack } from 'native-base';
import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

const Layout = styled(View)`
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-top: 24px;
  padding-horizontal: 20px;
  padding-bottom: 100px;
`;

const ButtonLayout = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;

const Button = styled(BlueButton)`
  margin-top: 8px;
`;

function getPrgressTips(progress: number, isUpgrading: boolean) {
  if (!progress && !isUpgrading) return `Click to update firmware`;
  return progress === 100 ? `Update Completed.` : `Updating to ${progress}% ...`;
}

export function FirmwareUpgradeContainer(): JSX.Element {
  const cardId = useCardId();
  const appId = useAppId(cardId);
  const isConnected = useIsConnected();
  const firmwareInfoRef = useRef<FirmwareInfo>();
  const [isChecking, setChecking] = useState(false);
  const [isUpgrading, setUpgrading] = useState(false);
  const { checkFirmware, updateFirmware, progress } = useFirmwareUpgradeUseCase();
  const { log, addLog, resetLog } = useLogUseCase();
  const firmwareInfo = firmwareInfoRef?.current;
  const isCheckBtnDisable = !isConnected || isChecking || isUpgrading;
  const isUpgradeBtnDisable = isCheckBtnDisable || !firmwareInfo;
  const isNeedUpdate = firmwareInfo?.isNeedMcuUpdate || firmwareInfo?.isNeedSEUpdate;

  const onCheck = () => {
    resetLog();
    setChecking(true);
    addLog('CHECKING....');
    checkFirmware()
      .then((info) => {
        firmwareInfoRef.current = info;
        addLog('CHECKED SUCCESS');
        addLog(`seVersion: ${info.curSEVersion}`);
        if (info.isNeedSEUpdate) addLog(`newSEVersion: ${info.newSEVersion}`);
        addLog(`mcuVersion: ${info.curMcuVersion}`);
        if (info.isNeedMcuUpdate) addLog(`newMcuVersion: ${info.newMcuVersion}`);
      })
      .catch((e) => {
        const error = e as RNApduError;
        addLog('CHECKED FAILED >>> ERROR=' + error);
      })
      .finally(() => setChecking(false));
  };

  const onUpdate = () => {
    resetLog();
    if (!firmwareInfo || !cardId) return;
    setUpgrading(true);
    addLog('UPDATING....');
    if (appId) addLog('CARD WILL BE BACKED UP');
    else  addLog('CARD WILL NOT BE BACKED UP');
    updateFirmware(firmwareInfo, cardId, appId)
      .then((info) => {
        addLog('UPDATED SUCCESS');
        addLog(`seVersion: ${info.curSEVersion}`);
        addLog(`mcuVersion: ${info.curMcuVersion}`);
      })
      .catch((e) => {
        const error = e as RNApduError;
        addLog('UPDATED FAILED >>> ERROR=' + error);
      })
      .finally(() => setUpgrading(false));
  };

  const progressTips = getPrgressTips(progress, isUpgrading);

  return (
    <Layout>
      <VStack space={3} justifyContent="center" alignContent="flex-start" w={'100%'}>
        <LogBox log={log} />
        <TextView text={cardId} placeholder="Card Id" />
        {appId && <TextView text={appId} placeholder="App Id" />}
        <Button isLoading={isChecking} disabled={isCheckBtnDisable} onClicked={onCheck} text={'Check Firmware'} />
          {isNeedUpdate && (
            <>
              <Progress value={progress} _filledTrack={{ bg: "lime.500" }}/>
               <TextView text={progressTips} />
              <Button isLoading={isUpgrading} disabled={isUpgradeBtnDisable} onClicked={onUpdate} text={'Upgrade Firmware'} />
            </>
          )}
      </VStack>
    </Layout>
  );
}
