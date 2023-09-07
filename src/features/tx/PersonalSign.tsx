import { ScrollView, Text, View } from 'react-native';

export function PersonalSign() {
  return (
    <ScrollView>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          marginTop: 24,
          paddingHorizontal: 20,
          paddingBottom: 100,
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: '500' }}>Implement Personal Sign Here</Text>
      </View>
    </ScrollView>
  );
}
