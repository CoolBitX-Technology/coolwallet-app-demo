import { Button } from 'native-base';

interface Props {
  text?: string;
  isLoading?: boolean;
  disabled?: boolean;
  onClicked?: () => void;
}
export function BlueButton({ text, isLoading = false, disabled = false, onClicked }: Props): JSX.Element {
  return (
    <Button
      isLoading={isLoading}
      bgColor={disabled ? 'grey' : undefined}
      disabled={disabled}
      onPress={onClicked}
      size="sm"
      mt="4px"
      w={'100%'}
    >
      {text}
    </Button>
  );
}
