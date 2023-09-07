import { ScrollView, Text, View } from 'react-native';

export function TokenApporve() {
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
        <Text style={{ fontSize: 24, fontWeight: '500' }}>Implement Token Apporve Here</Text>
      </View>
    </ScrollView>
  );
}
