import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LogBox } from '@src/features/components/LogBox';
import { ButtonLayout, StyledButton } from '@src/features/httpScan/HttpScanView';

interface Props {
  log?: string;
  loading: boolean;
  onRequestPressed: () => void;
  onGoBcakPressed: () => void;
}
export function NFCScanView({ log, loading, onRequestPressed, onGoBcakPressed }: Props): JSX.Element {
  return (
    <View style={styles.container}>
      <View style={{ height: '60%' }}>
        <LogBox style={{ margin: 24 }} log={log} />
      </View>
      <ButtonLayout style={styles.buttonLayout}>
        <StyledButton onPress={onGoBcakPressed}>Back</StyledButton>
        <StyledButton onPress={onRequestPressed} isLoading={loading}>
          Request
        </StyledButton>
      </ButtonLayout>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonLayout: {
    marginTop: 32,
  },
});
