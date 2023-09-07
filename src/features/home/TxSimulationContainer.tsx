import { Text, View } from 'react-native';
import { Button, Input, ScrollView, VStack, useToast } from 'native-base';
import Clipboard from '@react-native-clipboard/clipboard';
import { useMemo, useState } from 'react';
import { RouteName } from '@src/routes/type';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { DemoAppParamList } from '@src/DemoAppNavigator';

export function TxSimulationContainer() {
  const navigation = useNavigation<NavigationProp<DemoAppParamList>>();

  interface TxMethodProps {
    txType: RouteName;
    onButtonPress: () => void;
  }
  const txMethods: Array<TxMethodProps> = [
    {
      txType: RouteName.EIP1559_COIN,
      onButtonPress: () => navigation.navigate(RouteName.EIP1559_COIN),
    },
    {
      txType: RouteName.EIP1559_TOKEN,
      onButtonPress: () => navigation.navigate(RouteName.EIP1559_TOKEN),
    },
    {
      txType: RouteName.TOKEN_APPROVE,
      onButtonPress: () => navigation.navigate(RouteName.TOKEN_APPROVE),
    },
    {
      txType: RouteName.PERSONAL_SIGN,
      onButtonPress: () => navigation.navigate(RouteName.PERSONAL_SIGN),
    },
    {
      txType: RouteName.SIGN_TYPED_DATA,
      onButtonPress: () => navigation.navigate(RouteName.SIGN_TYPED_DATA),
    },
  ];

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
        <Text style={{ fontSize: 24, fontWeight: '500' }}>Choose your trasaction type</Text>
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
            {txMethods.map((method: TxMethodProps, index) => (
              <Button key={index} onPress={method.onButtonPress} size="sm" mt="4px" w={'100%'}>
                {method.txType}
              </Button>
            ))}
          </VStack>
        </View>
      </View>
    </ScrollView>
  );
}
