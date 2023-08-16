import SignalLevel4 from '@src/assets/images/signal_0.svg';
import SignalLevel3 from '@src/assets/images/signal_1.svg';
import SignalLevel2 from '@src/assets/images/signal_2.svg';
import SignalLevel1 from '@src/assets/images/signal_3.svg';
import SignalLevel0 from '@src/assets/images/signal_4.svg';

export interface Props {
  signalLevel?: number;
}
export function SignalIcon({signalLevel = 0}: Props): JSX.Element {
  switch (signalLevel) {
    default:
      return <SignalLevel0/>;
    case 1:
      return <SignalLevel1/>;
    case 2:
      return <SignalLevel2/>;
    case 3:
      return <SignalLevel3/>;
    case 4:
      return <SignalLevel4/>;
  }
}

export function useSignalLevel(rssi: number): number {
  if (rssi > -50) return 5;
  else if (rssi <= -50 && rssi > -70) return 4;
  else if (rssi <= -70 && rssi > -80) return 3;
  else if (rssi <= -80 && rssi > -90) return 2;
  else if (rssi <= -90 && rssi > -100) return 1;
  else return 0;
}
