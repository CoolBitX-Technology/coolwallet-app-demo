import { Transport } from '@coolwallet/core';
import { useLogUseCase } from '@src/features/home/usecases/useLogUseCase';
import { useState } from 'react';
import { createTransport } from 'transport-jre-http';

export function useCreateHttpTransportUseCase() {
  const [transport, setTransport] = useState<Transport>();

  const { log, addLog } = useLogUseCase();

  const connect = (url: string) => {
    addLog(`Create a transport with: ${url} ...`);

    createTransport(url)
      .then((transport) => {
        setTransport(transport);
        addLog(`Successfully saved http transport, device: ${transport?.device?.name}`);
      })
      .catch(addLog);
  };

  return {
    transport,
    connect,
    log,
  };
}
