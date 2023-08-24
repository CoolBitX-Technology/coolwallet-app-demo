import { Text, View } from 'react-native';
import { Button, Input, VStack } from 'native-base';

export interface ActionItemProps {
  title: string;
  isEditable?: boolean;
  isLoading?: boolean;
  buttonText: string;
  disableButton?: boolean;
  shouldDisplayInput?: boolean;
  input?: string;
  onInputChanged?: (text: string) => void;
  onPressButton: () => void;
}
export function ActionItem(props: ActionItemProps) {
  const {
    title,
    isEditable = false,
    onPressButton,
    buttonText,
    disableButton = false,
    shouldDisplayInput = false,
    isLoading = false,
    input,
    onInputChanged,
  } = props;
  return (
    <View
      style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', marginVertical: 8, width: '100%' }}
    >
      <Text style={{ fontSize: 20, fontWeight: '400' }}>{title}</Text>
      <VStack space={2} justifyContent="center" alignContent="flex-start" w={'100%'}>
        {shouldDisplayInput && (
          <Input
            onChangeText={onInputChanged}
            value={input}
            editable={isEditable}
            w={'100%'}
            size="sm"
            mt="4px"
            isDisabled={!isEditable}
            style={{ backgroundColor: isEditable ? '#ffffff' : '#474545' }}
          />
        )}
        <Button
          isLoading={isLoading}
          bgColor={disableButton ? 'grey' : undefined}
          disabled={disableButton}
          onPress={onPressButton}
          size="sm"
          mt="4px"
          w={'100%'}
        >
          {buttonText}
        </Button>
      </VStack>
    </View>
  );
}
