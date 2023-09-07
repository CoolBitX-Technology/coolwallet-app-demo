import { RouteName } from '@src/routes/type';
import { Button, VStack } from 'native-base';
import { ScrollView, Text, View } from 'react-native';

export interface RouteItem {
  routeName: RouteName;
  onButtonPress: () => void;
}

interface Props {
  title?: string;
  items: Array<RouteItem>;
}
export function RouteListView({ items, title = '' }: Props): JSX.Element {
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
        <Text style={{ fontSize: 24, fontWeight: '500' }}>{title}</Text>
        <View style={{ borderWidth: 0.5, borderColor: '#3b4043', width: '100%', marginTop: 8, marginBottom: 16 }} />
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            marginVertical: 8,
            width: '100%',
          }}
        >
          <VStack space={2} justifyContent="center" alignContent="flex-start" w={'100%'}>
            {items.map((item, index) => (
              <Button key={index} onPress={item.onButtonPress} size="sm" mt="4px" w={'100%'}>
                {item.routeName}
              </Button>
            ))}
          </VStack>
        </View>
      </View>
    </ScrollView>
  );
}
