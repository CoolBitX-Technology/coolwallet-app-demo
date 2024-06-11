import { useNavigation } from '@react-navigation/native';
import { HttpScanView } from '@src/features/httpScan/HttpScanView';
import { useCreateHttpTransportUseCase } from '@src/features/httpScan/useCreateHttpTransportUseCase';
import { useAsyncStorageState } from '@src/features/utils/Hooks';
import React from 'react';

const HOSTNAME_STORAGE_KEY = 'HttpScanContainer:userInput:hostname';
const PORT_STORAGE_KEY = 'HttpScanContainer:userInput:port';

export function HttpScanContainer(): JSX.Element {
  const { value: hostname, setValue: setHostname, store: storeHostname } = useAsyncStorageState(HOSTNAME_STORAGE_KEY);
  const { value: port, setValue: setPort, store: storePort } = useAsyncStorageState(PORT_STORAGE_KEY);

  const { connect, log } = useCreateHttpTransportUseCase();

  const connectByUrl = () => {
    connect(hostname, port);
    storeHostname();
    storePort();
  };
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
