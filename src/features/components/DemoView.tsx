import Clipboard from '@react-native-clipboard/clipboard';
import { LogBox, getDefaultLog } from '@src/features/components/LogBox';
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
  input?: string;
  inputType?: InputType;
  showInput?: boolean;
  inputPlaceHolder?: string;
  inputMode?: InputMode;
  onInputChanged?: (text: string) => void;
  style?: ViewStyle;
}
export function DemoView({
  log = getDefaultLog(),
  showCopy = true,
  btnText = 'Button',
  isBtnLoading = false,
  isBtnDisable = false,
  textBoxBody = '',
  textBoxPlaceHolder,
  onPressBtn,
  showTextBox = true,
  input = '',
  showInput = true,
  inputPlaceHolder,
  inputMode = 'text',
  inputType = 'text',
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
              type={inputType}
              onChangeText={onInputChanged}
              inputMode={inputMode}
              style={{ backgroundColor: '#ffffff' }}
            />
          )}
          {showTextBox && (
            <Input
              placeholder={textBoxPlaceHolder}
              value={textBoxBody}
              editable={false}
              placeholderTextColor={'#000000'}
              color={'#000000'}
              backgroundColor={'#aeaeae'}
              w={'100%'}
              size="sm"
              mt="4px"
              isDisabled={true}
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
