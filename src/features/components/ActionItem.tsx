import { Text, View } from 'react-native';
import { Button, Input, VStack, useToast } from 'native-base';
import Clipboard from '@react-native-clipboard/clipboard';

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
  shouldShowCopyButton?: boolean;
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
    shouldShowCopyButton = false,
  } = props;

  const toastId = 'copy-succes-toast';
  const toast = useToast();
  const copyToClipboard = (input?: string) => {
    Clipboard.setString(input as string);
    if (!toast.isActive(toastId))
      toast.show({
        description: 'COPY SUCCESS',
      });
  };

  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginVertical: 8,
        width: '100%',
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: '400' }}>{title}</Text>
      <VStack space={2} justifyContent="center" alignContent="flex-start" w={'100%'}>
        {shouldDisplayInput && (
          <Input
            onChangeText={onInputChanged}
            value={input}
            editable={isEditable && !isLoading}
            w={'100%'}
            size="sm"
            mt="4px"
            isDisabled={!isEditable}
            style={{ backgroundColor: isEditable ? '#ffffff' : '#474545', color: isEditable ? '#000000' : '#ffffff' }}
          />
        )}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button
            isLoading={isLoading}
            bgColor={disableButton ? 'grey' : undefined}
            disabled={disableButton}
            onPress={onPressButton}
            size="sm"
            mt="4px"
            w={shouldShowCopyButton ? '48%' : '100%'}
          >
            {buttonText}
          </Button>
          {shouldShowCopyButton && (
            <Button
              onPress={() => copyToClipboard(input)}
              size="sm"
              mt="4px"
              w={'48%'}
              bgColor={disableButton ? 'grey' : undefined}
              disabled={disableButton}
            >
              Copy
            </Button>
          )}
        </View>
      </VStack>
    </View>
  );
}
