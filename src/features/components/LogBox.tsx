import { ScrollView, Text } from 'native-base';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, ViewStyle, Dimensions } from 'react-native';

interface Props {
  style?: ViewStyle;
  log?: string;
  size?: 0.4 | 0.5 | 0.6;
}
export function LogBox({ style, log = getDefaultLog(), size = 0.4  }: Props) {
  const scrollViewRef = useRef();
  useEffect(() => {
    if (!scrollViewRef.current) return;
    const scrollView = scrollViewRef.current as any;
    scrollView?.scrollToEnd({ animated: true });
  }, [log, scrollViewRef]);

  return (
    <ScrollView
      height={Dimensions.get('screen').height*size}
      style={[styles.log, style]}
      ref={scrollViewRef} showsHorizontalScrollIndicator alwaysBounceHorizontal>
      <Text style={{ margin: 8, color: '#FFFFFF' }}>{log}</Text>
    </ScrollView>
  );
}

export function getDefaultLog(): string {
  const date = new Date();
  const dateString = date.toDateString();
  const timeString = date.toLocaleTimeString();
  return `Last log: ${dateString} ${timeString}`;
}

const styles = StyleSheet.create({
  log: {
    backgroundColor: '#000000',
    borderRadius: 8,
  },
});
