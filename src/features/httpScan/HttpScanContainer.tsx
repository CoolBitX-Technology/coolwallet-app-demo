import { useNavigation } from '@react-navigation/native';
import { HttpScanView } from '@src/features/httpScan/HttpScanView';
import { useCreateHttpTransportUseCase } from '@src/features/httpScan/useCreateHttpTransportUseCase';
import { useDispatchConnectStatus } from '@src/features/store/device/DeviceActionHooks';
import React, { useState } from 'react';

const DEFAULT_HOSTNAME = '10.0.0.241';
const DEFAULT_PORT = '9090';

export function HttpScanContainer(): JSX.Element {
  const changeConnectStatus = useDispatchConnectStatus();
  const [hostname, setHostname] = useState(DEFAULT_HOSTNAME);
  const [port, setPort] = useState(DEFAULT_PORT);

  const { connect, log } = useCreateHttpTransportUseCase();

  const connectByUrl = () => {
    connect(`http://${hostname}:${port}`);
    changeConnectStatus(true);
  }
  const goBack = useNavigation().goBack;

  return (
    <HttpScanView
      hostnameState={[hostname, setHostname]}
      portState={[port, setPort]}
      log={log}
      onRequestPressed={connectByUrl}
      onGoBcakPressed={goBack}
    />
  );
}
