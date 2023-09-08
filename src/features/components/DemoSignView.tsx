import { LogBox } from '@src/features/components/LogBox';
import { Button, VStack, Input } from 'native-base';
import { View, ViewStyle } from 'react-native';

type InputMode = 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
type InputType = 'password' | 'text';

interface Props {
  title?: string;
  log?: string;
  showBtn2?: boolean;
  showBtn3?: boolean;
  btnText: string;
  btn2Text?: string;
  btn3Text?: string;
  isBtnLoading?: boolean;
  isBtnDisable?: boolean;
  onPressBtn?: () => void;
  onPressBtn2?: () => void;
  onPressBtn3?: () => void;
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
export function DemoSignView({
  log = 'LogBox',
  showBtn2 = false,
  showBtn3 = false,
  btnText = 'Button',
  btn2Text = 'Button',
  btn3Text = 'Button',
  isBtnLoading = false,
  isBtnDisable = false,
  textBoxBody = '',
  textBoxPlaceHolder,
  onPressBtn,
  onPressBtn2,
  onPressBtn3,
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
          <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
            <Button
              isLoading={isBtnLoading}
              bgColor={isBtnDisable ? 'grey' : undefined}
              disabled={isBtnDisable}
              onPress={onPressBtn}
              size="sm"
              mt="4px"
              w={'100%'}
            >
              {btnText}
            </Button>
            {showBtn2 && (
              <Button
                onPress={onPressBtn2}
                size="sm"
                mt="4px"
                w={'100%'}
                bgColor={isBtnDisable ? 'grey' : undefined}
                disabled={isBtnDisable}
                style={{ marginTop: 12 }}
              >
                {btn2Text}
              </Button>
            )}
            {showBtn3 && (
              <Button
                onPress={onPressBtn3}
                size="sm"
                mt="4px"
                w={'100%'}
                bgColor={isBtnDisable ? 'grey' : undefined}
                disabled={isBtnDisable}
                style={{ marginTop: 12 }}
              >
                {btn3Text}
              </Button>
            )}
          </View>
        </VStack>
      </View>
    </View>
  );
}
