import { useChangeTransportType } from '@src/features/store/device/DeviceActionHooks';
import { TransportType } from '@src/features/store/device/DeviceTypes';
import { Actionsheet, Box, Text } from 'native-base';
import React, { MutableRefObject, useState } from 'react';

interface Props {
  showRef: MutableRefObject<() => void>;
  onSelected: (type: TransportType) => void;
}
export function TransportSelectorContainer({ showRef, onSelected }: Props): JSX.Element {
  const [visible, setVisible] = useState(false);
  const changeTransportType = useChangeTransportType();

  showRef.current = () => setVisible(true);

  const onSelectedInternal = (transportType: TransportType) => {
    onSelected(transportType);
    setVisible(false);
    changeTransportType(transportType);
  };

  return (
    <Actionsheet isOpen={visible} onClose={() => setVisible((prev) => !prev)}>
      <Actionsheet.Content>
        <ActionSheetHeader />
        <Actionsheet.Item onPress={() => onSelectedInternal(TransportType.Bluetooth)}>Bluetooth</Actionsheet.Item>
        <Actionsheet.Item onPress={() => onSelectedInternal(TransportType.Http)}>HTTP</Actionsheet.Item>
      </Actionsheet.Content>
    </Actionsheet>
  );
}

function ActionSheetHeader() {
  return (
    <Box w="100%" h={60} px={4} justifyContent="center">
      <Text fontSize="16" color="gray.500" _dark={{ color: 'gray.300' }}>
        Please Select a transport.
      </Text>
    </Box>
  );
}
