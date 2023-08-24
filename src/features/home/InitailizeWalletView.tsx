import { ActionItem, ActionItemProps } from '@src/features/components/ActionItem';
import { ScrollView, View, Text } from 'react-native';
import { KeyboardAwareView } from '@src/features/components/KeyboardAwareView';
import React from 'react';

interface InitializeWalletInput {
  actionItemData: Array<ActionItemProps>;
}
export function InitializeWalletView(props: InitializeWalletInput) {
  const { actionItemData } = props;
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          alignItems: 'flex-start',
          marginTop: 16,
          paddingHorizontal: 16,
          paddingBottom: 32,
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: '500' }}>Initailize your CoolWallet Pro</Text>
        <View style={{ borderWidth: 0.5, borderColor: '#3b4043', width: '100%', marginTop: 8, marginBottom: 16 }} />
        {actionItemData.map((item, index) => (
          <ActionItem
            input={item.input}
            onInputChanged={item.onInputChanged}
            key={index}
            title={item.title}
            buttonText={item.buttonText}
            isEditable={item.isEditable}
            onPressButton={item.onPressButton}
            shouldDisplayInput={item.shouldDisplayInput}
          />
        ))}
      </View>
    </ScrollView>
  );
}
