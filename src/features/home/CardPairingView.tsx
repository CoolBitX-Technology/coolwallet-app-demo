import { ActionItem, ActionItemProps } from '@src/features/components/ActionItem';
import { ScrollView, Text, View } from 'react-native';
import { KeyboardAwareView } from '@src/features/components/KeyboardAwareView';

interface Props {
  actionItems: Array<ActionItemProps>;
}
export function CardPairingView({ actionItems }: Props): JSX.Element {
  return (
    <KeyboardAwareView>
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
          {actionItems.map((item, index) => (
            <ActionItem
              key={index}
              title={item.title}
              buttonText={item.buttonText}
              isEditable={item.isEditable}
              shouldDisplayInput={item.shouldDisplayInput}
              input={item.input}
              isLoading={item.isLoading}
              disableButton={item.disableButton}
              onInputChanged={item.onInputChanged}
              onPressButton={() => item?.onPressButton?.()}
              shouldShowCopyButton={item.shouldShowCopyButton}
              input2={item.input2}
              onInput2Changed={item.onInput2Changed}
              shouldDisplayInput2={item.shouldDisplayInput2}
            />
          ))}
        </View>
      </ScrollView>
    </KeyboardAwareView>
  );
}
