import { Text, View } from 'react-native';
import { Button, Input, VStack } from 'native-base';

interface ActionItemProps {
  title: string;
  isEditable?: boolean;
  buttonText: string;
  onPressButton: () => void;
  shouldDisplayInput?: boolean;
}
export function ActionItem(props: ActionItemProps) {
  const { title, isEditable = false, onPressButton, buttonText, shouldDisplayInput = false } = props;
  return (
    <View
      style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', marginVertical: 8, width: '100%' }}
    >
      <Text style={{ fontSize: 20, fontWeight: '400' }}>{title}</Text>
      <VStack space={2} justifyContent="center" alignContent="flex-start" w={'100%'}>
        {shouldDisplayInput && (
          <Input
            editable={isEditable}
            w={'100%'}
            size="sm"
            mt="4px"
            isDisabled={!isEditable}
            style={{ backgroundColor: isEditable ? '#ffffff' : '#474545' }}
          />
        )}
        <Button onPress={onPressButton} size="sm" mt="4px" w={'100%'}>
          {buttonText}
        </Button>
      </VStack>
    </View>
  );
}
