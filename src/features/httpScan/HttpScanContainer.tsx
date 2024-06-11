import { useNavigation } from '@react-navigation/native';
import { HttpScanView } from '@src/features/httpScan/HttpScanView';
import { useCreateHttpTransportUseCase } from '@src/features/httpScan/useCreateHttpTransportUseCase';
import { useHttpInfo } from '@src/features/store/device/DeviceActionHooks';
import React, { useState } from 'react';

const DEFAULT_HOSTNAME = '10.0.0.241';
const DEFAULT_PORT = '9090';

export function HttpScanContainer(): JSX.Element {
  const httpInfo = useHttpInfo();
  const [hostname, setHostname] = useState(httpInfo?.hostname || DEFAULT_HOSTNAME);
  const [port, setPort] = useState(httpInfo?.port || DEFAULT_PORT);

  const { connect, log } = useCreateHttpTransportUseCase();

  const goBack = useNavigation().goBack;

  const connectByUrl = () => {
    connect(hostname, port);
    goBack();
  };

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
