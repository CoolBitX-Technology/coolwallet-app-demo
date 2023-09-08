import Clipboard from '@react-native-clipboard/clipboard';
import { LogBox } from '@src/features/components/LogBox';
import { Button, VStack, useToast, Input } from 'native-base';
import { View, ViewStyle } from 'react-native';

interface Props {
  title?: string;
  log?: string;
  showCopy?: boolean;
  btnText?: string;
  isBtnLoading?: boolean;
  isBtnDisable?: boolean;
  onPressBtn?: () => void;
  textBoxBody?: string;
  inputPlaceHolder?: string;
  textBoxPlaceHolder?: string;
  showTextBox?: boolean;
  onTextChanged?: (text: string) => void;
  input?: string;
  showInput?: boolean;
  inputMode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
  onInputChanged?: (text: string) => void;
  style?: ViewStyle;
}
export function DemoView({
  log = 'LogBox',
  showCopy = true,
  btnText = 'Button',
  isBtnLoading = false,
  isBtnDisable = false,
  textBoxBody = '',
  textBoxPlaceHolder,
  onPressBtn,
  showTextBox = true,
  onTextChanged,
  input = '',
  showInput = true,
  inputPlaceHolder,
  inputMode = 'text',
  onInputChanged,
  style,
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
    <View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          marginTop: 24,
          paddingHorizontal: 20,
          paddingBottom: 100,
          ...style,
        }}
      >
        <VStack space={2} justifyContent="center" alignContent="flex-start" w={'100%'}>
          <LogBox log={log} />
          {showInput && (
            <Input
              size="sm"
              width={'100%'}
              editable={!isBtnLoading}
              placeholder={inputPlaceHolder}
              defaultValue={input}
              onChangeText={onInputChanged}
              inputMode={inputMode}
              style={{ backgroundColor: '#ffffff' }}
            />
          )}
          {showTextBox && (
            <Input
              onChangeText={onTextChanged}
              placeholder={textBoxPlaceHolder}
              value={textBoxBody}
              editable={false}
              w={'100%'}
              size="sm"
              mt="4px"
              isDisabled={true}
              style={{ backgroundColor: '#8d8c8c', color: '#ffffff' }}
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
                onPress={() => copyToClipboard(textBoxBody)}
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
      </View>
    </View>
  );
}
