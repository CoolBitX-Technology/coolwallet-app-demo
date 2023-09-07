import { ScrollView, Text } from 'native-base';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, ViewStyle, Dimensions } from 'react-native';

interface Props {
  style?: ViewStyle;
  log?: string;
}
export function LogBox({ style, log = 'LogBox' }: Props) {
  const scrollViewRef = useRef();

  useEffect(()=>{
    if (!scrollViewRef.current) return;
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [log, scrollViewRef]);

  return (
    <ScrollView ref={scrollViewRef} style={[styles.log, style]} showsHorizontalScrollIndicator alwaysBounceHorizontal>
      <Text style={{ margin: 8 }} >{log}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  log: {
    backgroundColor: '#ffffff',
    height: Dimensions.get('screen').height/4,
    color: '#403E3E',
    borderRadius: 8,
    borderColor: '#807a7a',
    borderWidth: 0.4,
  },
});
