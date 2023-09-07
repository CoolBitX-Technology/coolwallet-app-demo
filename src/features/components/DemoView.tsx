import Clipboard from '@react-native-clipboard/clipboard';
import { LogBox } from '@src/features/components/LogBox';
import { Button, Input, VStack, useToast } from 'native-base';
import { ScrollView, Text, View } from 'react-native';

interface Props {
  title?: string;
  log?: string;
  showCopy?: boolean;
  btnText?: string;
  isBtnLoading?: boolean;
  isBtnDisable?: boolean;
  onPressBtn?: () => void;
  input?: string;
  inputPlaceHolder?: string;
  showInput?: boolean;
  isInputEditable?: boolean;
  onInputChanged?: (text: string) => void;
  input2?: string;
  input2PlaceHolder?: string;
  showInput2?: boolean;
  onInput2Changed?: (text: string) => void;
}
export function DemoView({
  title = 'Title',
  log = '',
  showCopy = false,
  btnText = 'Button',
  isBtnLoading = false,
  isBtnDisable = false,
  input = '',
  inputPlaceHolder = 'inputPlaceHolder',
  onPressBtn,
  showInput = true,
  isInputEditable = true,
  onInputChanged,
  input2 = '',
  showInput2 = true,
  input2PlaceHolder = 'input2PlaceHolder',
  onInput2Changed,
}: Props): JSX.Element {
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
    <ScrollView>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, fontWeight: '400', width: '50%', flexGrow: 1 }}>{title}</Text>
        {showInput2 && (
        <Input
          size="sm"
          width={'50%'}
          placeholder={input2PlaceHolder}
          value={input2}
          onChangeText={onInput2Changed}
          style={{ backgroundColor: '#ffffff' }}
        />
        )}
      </View>
      <VStack space={2} justifyContent="center" alignContent="flex-start" w={'100%'}>
        {showInput && (
          <Input
            onChangeText={onInputChanged}
            placeholder={inputPlaceHolder}
            value={input}
            editable={isInputEditable && !isBtnLoading}
            w={'100%'}
            size="sm"
            mt="4px"
            isDisabled={!isInputEditable}
            style={{ backgroundColor: isInputEditable ? '#ffffff' : '#474545', color: isInputEditable ? '#000000' : '#ffffff' }}
          />
        )}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button
            isLoading={isBtnLoading}
            bgColor={isBtnDisable ? 'grey' : undefined}
            disabled={isBtnDisable}
            onPress={onPressBtn}
            size="sm"
            mt="4px"
            w={showCopy ? '48%' : '100%'}
          >
            {btnText}
          </Button>
          {showCopy && (
            <Button
              onPress={() => copyToClipboard(input)}
              size="sm"
              mt="4px"
              w={'48%'}
              bgColor={isBtnDisable ? 'grey' : undefined}
              disabled={isBtnDisable}
            >
              Copy
            </Button>
          )}
        </View>
      </VStack>
      <LogBox log={log} />
    </ScrollView>
  );
}
