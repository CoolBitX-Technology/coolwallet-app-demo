import { LogActions } from '@src/features/store/log/LogSlice';
import { RootState } from '@src/features/store/store';
import { useAppSelector, useAppDispatch } from '@src/features/store/hooks';

function getLog(state: RootState) {
  return state.log.logMessage;
}

export function useLog() {
  return useAppSelector((state: RootState) => getLog(state));
}

export function useDispatchLogChange(): (log: string) => void {
  const dispatch = useAppDispatch();
  return (log) => {
    dispatch(LogActions.updateLogMessage(log));
  };
}

export function useDispatchResetLog(): () => void {
  const dispatch = useAppDispatch();
  return () => {
    dispatch(LogActions.clearLogMessage);
  };
}
