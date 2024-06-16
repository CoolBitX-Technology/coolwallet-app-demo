import { useConnectCardUseCase } from '@src/features/cardPairing/hooks/useConnectCardUseCase';
import { useRegisterDeviceUseCase } from '@src/features/cardPairing/usecases/useRegisterDeviceUseCase';
import { BlueButton } from '@src/features/components/BlueButton';
import { LogBox } from '@src/features/components/LogBox';
import { TextInput } from '@src/features/components/TextInput';
import { TextView } from '@src/features/components/TextView';
import { NFCManager } from '@src/features/nfcScan/utils/NfcManager';
import {
  useDeviceName,
  useDispatchChangeAppInfo,
  useDispatchChangePairedPassword,
  usePairedPassword,
} from '@src/features/store/account/AccountActionHooks';
import { useCardId, useIsConnected } from '@src/features/store/device/DeviceActionHooks';
import { VStack } from 'native-base';
import React, { useState } from 'react';
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

export function RegisterCardContainer(): JSX.Element {
  const cardId = useCardId();
  const isConnected = useIsConnected();
  const defaultPairedPassword = usePairedPassword(cardId);
  const [pairingPassword, setPairingPassword] = useState(defaultPairedPassword);
  const defaultDeviceName = useDeviceName(cardId);
  const [deviceName, setDeviceName] = useState(defaultDeviceName);

  const { appId, log, isRegistering, registerDevice } = useRegisterDeviceUseCase();
  const changeAppInfo = useDispatchChangeAppInfo();
  const changePairedPassword = useDispatchChangePairedPassword();

  const { connect, disconnect } = useConnectCardUseCase();

  const isBtnDisable = !isConnected;

  const registerCard = async () => {
    await connect();

    registerDevice(deviceName, pairingPassword)
      .then((info) => {
        if (info) {
          const { appId, deviceName, password } = info;
          changeAppInfo(cardId, appId, password, deviceName);
          changePairedPassword(cardId, password);
          setDeviceName(deviceName);
          setPairingPassword(password);
        }
      })
      .finally(() => {
        disconnect();
      });
  };

  return (
    <Layout>
      <VStack space={2} justifyContent="center" alignContent="flex-start" w={'100%'}>
        <LogBox log={log} />
        <TextInput text={deviceName} isEditable={!isRegistering} placeholder="Device Name" onTextChanged={setDeviceName} />
        <TextInput
          text={pairingPassword}
          isEditable={!isRegistering}
          placeholder="Pairing Password"
          onTextChanged={setPairingPassword}
        />
        <TextView text={appId} placeholder="App Id" />
        <ButtonLayout>
          <Button isLoading={isRegistering} disabled={isBtnDisable} onClicked={registerCard} text={'Register'} />
        </ButtonLayout>
      </VStack>
    </Layout>
  );
}
