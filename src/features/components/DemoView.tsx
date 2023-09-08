import Clipboard from '@react-native-clipboard/clipboard';
import { LogBox } from '@src/features/components/LogBox';
import { Button, VStack, useToast, Input } from 'native-base';
import { View, ViewStyle } from 'react-native';

type InputMode = 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
type InputType = "password" | "text";

interface Props {
  title?: string;
  log?: string;
  showCopy?: boolean;
  btnText?: string;
  isBtnLoading?: boolean;
  isBtnDisable?: boolean;
  onPressBtn?: () => void;
  textBoxBody?: string;
  textBoxPlaceHolder?: string;
  showTextBox?: boolean;
  onTextChanged?: (text: string) => void;
  input?: string;
  inputType?: InputType;
  showInput?: boolean;
  inputPlaceHolder?: string;
  inputMode?: InputMode;
  onInputChanged?: (text: string) => void;
  input2?: string;
  input2Type?: InputType;
  input2PlaceHolder?: string;
  showInput2?: boolean;
  input2Mode?: InputMode;
  onInput2Changed?: (text: string) => void;
  input3?: string;
  input3Type?: InputType;
  input3PlaceHolder?: string;
  showInput3?: boolean;
  input3Mode?: InputMode;
  onInput3Changed?: (text: string) => void;
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
  inputType = 'text',
  onInputChanged,
  input2 = '',
  showInput2 = false,
  input2PlaceHolder,
  input2Mode = 'text',
  input2Type = 'text',
  onInput2Changed,
  input3 = '',
  showInput3 = false,
  input3PlaceHolder,
  input3Mode = 'text',
  input3Type = 'text',
  onInput3Changed,
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
              type={inputType}
              onChangeText={onInputChanged}
              inputMode={inputMode}
              style={{ backgroundColor: '#ffffff' }}
            />
          )}
          {showInput2 && (
            <Input
              size="sm"
              width={'100%'}
              editable={!isBtnLoading}
              placeholder={input2PlaceHolder}
              defaultValue={input2}
              type={input2Type}
              onChangeText={onInput2Changed}
              inputMode={input2Mode}
              style={{ backgroundColor: '#ffffff' }}
            />
          )}
           {showInput3 && (
            <Input
              size="sm"
              width={'100%'}
              editable={!isBtnLoading}
              placeholder={input3PlaceHolder}
              defaultValue={input3}
              type={input3Type}
              onChangeText={onInput3Changed}
              inputMode={input3Mode}
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
