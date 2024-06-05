import { Input } from 'native-base';

interface Props {
  text?: string;
  isEditable?: boolean;
  placeholder?: string;
  onTextChanged?: (text: string) => void;
}
export function TextInput({ text, isEditable = false, placeholder, onTextChanged }: Props): JSX.Element {
  return (
    <Input
      style={{ backgroundColor: '#ffffff' }}
      size="sm"
      width={'100%'}
      editable={isEditable}
      placeholder={placeholder}
      defaultValue={text}
      numberOfLines={1}
      maxLength={20}
      type={'text'}
      onChangeText={onTextChanged}
      inputMode={'text'}
    />
  );
}
