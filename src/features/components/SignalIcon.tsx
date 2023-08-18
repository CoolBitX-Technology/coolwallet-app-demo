import * as React from 'react';
import {Image, ImageStyle} from 'react-native';
import styled from 'styled-components/native';

const ImageView = styled(Image)`
  width: 20px;
  height: 20px;
  margin: 4px;
`;

export interface Props {
  style?: ImageStyle;
  signalLevel: number;
  isPaired: boolean;
}
export function SignalIcon({style, isPaired, signalLevel = 0}: Props) {
  if (isPaired) return (
    <ImageView
      style={style}
      source={require('@src/assets/images/bluetooth.png')}
    />
  );
  switch (signalLevel) {
    default:
      return (
        <ImageView
          style={style}
          source={require('@src/assets/images/signal-0.png')}
        />
      );
    case 1:
      return (
        <ImageView
          style={style}
          source={require('@src/assets/images/signal-1.png')}
        />
      );
    case 2:
      return (
        <ImageView
          style={style}
          source={require('@src/assets/images/signal-2.png')}
        />
      );
    case 3:
      return (
        <ImageView
          style={style}
          source={require('@src/assets/images/signal-3.png')}
        />
      );
    case 4:
      return (
        <ImageView
          style={style}
          source={require('@src/assets/images/signal-4.png')}
        />
      );
  }
}

export function useSignalLevel(rssi: number): number {
  if (rssi > -70) return 4;
  else if (rssi <= -70 && rssi > -80) return 3;
  else if (rssi <= -80 && rssi > -90) return 2;
  else if (rssi <= -90 && rssi > -100) return 1;
  return 0;
}
