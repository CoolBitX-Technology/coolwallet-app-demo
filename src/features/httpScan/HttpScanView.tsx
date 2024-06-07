import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import styled from 'styled-components/native';
import { Button, Input, Text, VStack } from 'native-base';
import { LogBox } from '@src/features/components/LogBox';

const TextInputLayout = styled(VStack)`
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 8px;
`;

const StyledButton = styled(Button)`
  width: 90px;
  height: 40px;
`;

const ButtonLayout = styled(View)`
  width: 100%;
  height: 40px;
  margin-top: 24px;
  align-items: space-around;
  justify-content: space-around;
  flex-direction: row;
`;

interface Props {
  hostnameState: [string, (arg: string) => void];
  portState: [string, (arg: string) => void];
  log?: string;
  onRequestPressed: () => void;
  onGoBcakPressed: () => void;
}

export function HttpScanView({ hostnameState, portState, log, onRequestPressed, onGoBcakPressed }: Props): JSX.Element {
  const [hostname, setHostname] = hostnameState;
  const [port, setPort] = portState;

  const hasInputValue = hostname && port;

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.select({ android: undefined, ios: 'padding' })}>
      <View style={{ height: '50%' }}>
        <LogBox style={{ margin: 24 }} log={log} />
      </View>
      <TextInputLayout space={4}>
        <Text marginX={8} marginBottom={2} fontSize={14}>
          Please run @coolwallet/jcvm first and enter its Host and Port :
        </Text>
        <TextInput title="Host" content={hostname} onInput={setHostname} placaholder="10.0.0.2" />
        <TextInput title="Port" content={port} onInput={setPort} placaholder="9090" />
      </TextInputLayout>
      <ButtonLayout>
        <StyledButton onPress={onGoBcakPressed}>Back</StyledButton>
        <StyledButton opacity={hasInputValue ? 1 : 0.5} disabled={!hasInputValue} onPress={onRequestPressed}>
          Request
        </StyledButton>
      </ButtonLayout>
    </KeyboardAvoidingView>
  );
}

interface TextInputProps {
  title: string;
  content: string;
  placaholder: string;
  onInput: (text: string) => void;
}
function TextInput({ title, content, placaholder, onInput }: TextInputProps) {
  return (
    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
      <Text w="15%" fontSize={14}>
        {title}
      </Text>
      <Input w="60%" size="xl" mr="4" placeholder={placaholder} editable={true} onChangeText={onInput}>
        {content}
      </Input>
    </View>
  );
}
