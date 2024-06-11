import { Transport, apdu } from '@coolwallet/core';
import { useLogUseCase } from '@src/features/home/usecases/useLogUseCase';
import { useDispatchHttpInfo, useHttpInfo } from '@src/features/store/device/DeviceActionHooks';
import { useEffect, useState } from 'react';
import { HttpTransport } from 'transport-jre-http';

export function useCreateHttpTransportUseCase() {
  const changeHttpInfo = useDispatchHttpInfo();

  const { log, addLog } = useLogUseCase();

  const connect = async (hostname: string, port: string) => {
    if (!hostname || !port) {
      addLog(`Invalid host name or port.`);
      return;
    }
    const url = `http://${hostname}:${port}`;
    const transport = new HttpTransport(url);
    addLog(`Successfully created a transport with: ${url} ...`);

    const cardIdHex = await apdu.general.getCardId(transport);
    const cardId = Buffer.from(cardIdHex, 'hex').toString();
    addLog(`Successfully got card id: ${cardId}`);

    changeHttpInfo(hostname, port, cardId);
    addLog(`Successfully saved http info.`);
  };

  return {
    connect,
    log,
  };
}

export function useHttpTransport() {
  const httpInfo = useHttpInfo();
  const [transport, setTransport] = useState<Transport>();
  useEffect(() => {
    if (!httpInfo) return;
    setTransport(new HttpTransport(httpInfo.url));
  }, [httpInfo]);
  return transport;
}
