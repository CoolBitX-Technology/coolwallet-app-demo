import { RNApduManager } from '@src/features/ble/RNApduManager';
import { CardInfo } from '@src/features/ble/data/CardInfo';
import { useInitApduEffect } from '@src/features/home/usecases/useCardPairingUseCase';
import { useState } from 'react';

interface GetCardInfoOutput {
  isQuerying: boolean;
  cardInfo?: CardInfo;
  getCardInfo: () => Promise<CardInfo>;
}
export function useGetCardInfoUseCase(): GetCardInfoOutput {
  const [isQuerying, setIsQuerying] = useState(false);
  const [cardInfo, setCardInfo] = useState<CardInfo>();
  useInitApduEffect();

  const getCardInfo = async () => {
    setIsQuerying(true);
    const result = await RNApduManager.getInstance().getCardInfo();
    setCardInfo(result);
    setIsQuerying(false);
    return result;
  };

  return {
    cardInfo,
    isQuerying,
    getCardInfo,
  };
}
