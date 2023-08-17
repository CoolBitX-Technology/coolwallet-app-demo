import { RootState } from '@src/features/store/store';
import { useAppSelector, useAppDispatch } from '@src/features/store/hooks';

function getCardInfo(state: RootState) {
  return state.device;
}

export function useCardInfo() {
  return useAppSelector((state: RootState) => getCardInfo(state));
}
