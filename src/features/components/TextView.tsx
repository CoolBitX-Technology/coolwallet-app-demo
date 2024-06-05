import { Input } from "native-base";

interface Props {
  text?: string;
  placeholder?: string;
}
export function TextView({ text, placeholder }: Props): JSX.Element {
  return (
    <Input
      value={text}
      editable={false}
      placeholderTextColor={'#000000'}
      placeholder={placeholder}
      color={'#000000'}
      backgroundColor={'#aeaeae'}
      w={'100%'}
      size="sm"
      mt="4px"
      isDisabled={true}
    />
  );
}
