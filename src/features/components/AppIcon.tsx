import { ViewStyle } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

interface Props {
  style?: ViewStyle;
  size?: number;
  fillColor?: string;
}
export function AppIcon({ size = 26, style, fillColor = 'none' }: Props) {
  return (
    <Svg style={style} width={size} height={size} viewBox="0 0 28 26" fill={fillColor}>
      <Rect x="4" y="4" width="20" height="20" rx="3" stroke="black" strokeOpacity="0.78" strokeWidth="2" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 6.88196L8 9.88195V10.5C8 14.1919 9.04693 18.6415 13.5528 20.8944L14 21.118L14 18.8648C11.0675 17.1675 10.1184 14.1586 10.0107 11.1127L14 9.11803V6.88196Z"
        fill="black"
        fillOpacity="0.78"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 19.42C18.1704 17.2979 19 13.7293 19 10.5L15 8.5V19.42Z"
        fill="black"
        fillOpacity="0.78"
      />
    </Svg>
  );
}
