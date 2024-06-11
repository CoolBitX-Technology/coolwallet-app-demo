import { Transport } from '@coolwallet/core';
import { useLogUseCase } from '@src/features/home/usecases/useLogUseCase';
import { useDispatchHttpInfo, useHttpInfo } from '@src/features/store/device/DeviceActionHooks';
import { useEffect, useState } from 'react';
import { createTransport } from 'transport-jre-http';

export function useCreateHttpTransportUseCase() {
  const transport = useHttpTransport();
  const changeHttpInfo = useDispatchHttpInfo();

  const { log, addLog } = useLogUseCase();

  const connect = (hostname: string, port: string) => {
    if (!hostname || !port) {
      addLog(`Invalid host name or port.`);
      return;
    }
    const url = `http://${hostname}:${port}`;
    addLog(`Create a transport with: ${url} ...`);
    changeHttpInfo(hostname, port);
    addLog(`Successfully saved http transport, device: ${transport?.device?.name}`);
  };

  return {
    transport,
    connect,
    log,
  };
}

export function useHttpTransport() {
  const httpInfo = useHttpInfo();
  const [transport, setTransport] = useState<Transport>();
  useEffect(() => {
    if (!httpInfo) return;
    createTransport(httpInfo.url)
      .then(setTransport)
      .catch((e) => {
        console.log(`useHttpTransport >>> createTransport error=${e}`);
      });
  }, [httpInfo]);
  return transport;
}
