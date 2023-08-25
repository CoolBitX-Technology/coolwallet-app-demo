import React, { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
interface Props {
  children: ReactNode;
}
export function KeyboardAwareView(props: Props): JSX.Element {
  const { children } = props;
  return (
    <KeyboardAvoidingView
      style={{ flexDirection: 'column', justifyContent: 'center', height: '100%', width: '100%' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
      keyboardVerticalOffset={150}
    >
      {children}
    </KeyboardAvoidingView>
  );
}
