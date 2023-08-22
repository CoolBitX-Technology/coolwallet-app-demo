import { ActionItem } from '@src/features/components/ActionItem';
import { ScrollView, Text, TextStyle, View } from 'react-native';
import { Container } from 'native-base';
import { KeyboardAwareView } from '@src/features/components/KeyboardAwareView';

const actionItemData = [
  {
    title: 'Reset Card',
    buttonText: 'Reset',
    onPressButton: () => {},
  },
  {
    title: 'Register Card',
    buttonText: 'Register',
    onPressButton: () => {},
  },
  {
    title: 'Create Mnemonic',
    buttonText: 'Create',
    onPressButton: () => {},
  },
  {
    title: 'Recover Mnemonic',
    buttonText: 'Recover',
    onPressButton: () => {},
    isEditable: true,
  },
  {
    title: 'Get Pairing Password',
    buttonText: 'Get',
    onPressButton: () => {},
  },
];
export function InitializeWalletView() {
  return (
    <ScrollView nestedScrollEnabled={true}>
      <KeyboardAwareView>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            marginTop: 24,
            paddingHorizontal: 4,
            width: '90%',
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: '500' }}>Initailize your CoolWallet Pro</Text>
          <View style={{ borderWidth: 0.5, borderColor: '#3b4043', width: '100%', marginTop: 4 }} />
          {actionItemData.map((item, index) => (
            <ActionItem
              key={index}
              title={item.title}
              buttonText={item.buttonText}
              isEditable={item.isEditable}
              onPressButton={item.onPressButton}
            />
          ))}
        </View>
      </KeyboardAwareView>
    </ScrollView>
  );
}
