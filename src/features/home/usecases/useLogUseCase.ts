import { useDispatchLogAdd, useDispatchResetLog, useLog } from '@src/features/store/log/LogActionHooks';
import { useEffect } from 'react';

interface LogOutput {
  log?: string;
  addLog: (newLog: string) => void;
}
export function useLogUseCase(): LogOutput {
  const log = useLog();
  const addLog = useDispatchLogAdd();
  const resetLog = useDispatchResetLog();

  useEffect(() => {
    resetLog();
  }, []);

  return {
    log,
    addLog,
  };
}
