import { ScrollView, Text, View } from 'react-native';

export function TxSimulationView() {
  return (
    <ScrollView>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          marginTop: 40,
          paddingHorizontal: 20,
          paddingBottom: 100,
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: '500' }}>Tx Method Implement Here</Text>
      </View>
    </ScrollView>
  );
}
