import { useAtom } from 'jotai';
import { FC, ReactNode, useState } from 'react';
import { Alert, Pressable, PressableProps, Text, View } from 'react-native';

import CircleLoader from './CircleLoader';

import { connectedDeviceInstanceAtom } from '~/atoms/bleAtom';
import useBLE from '~/helpers/useBLE';

type Props = {
  name: string;
  icon: ReactNode;
  desc: string;
  color: string;
  bgColor: string;
  commandStr?: string;
  alertStr?: string;
} & PressableProps;

const CommandButton: FC<Props> = ({
  name,
  icon,
  desc,
  color,
  bgColor,
  commandStr = '',
  alertStr = '',
  ...pressableProps
}) => {
  const [connectedDevice] = useAtom(connectedDeviceInstanceAtom);
  const { sendCommand } = useBLE();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const shadowStyle = {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  };

  const handleSendCommand = async (msg: string) => {
    setIsLoading(true);
    await sendCommand(connectedDevice, msg);
    setIsLoading(false);
  };

  const handleCommandPressed = (msg: string, alertMsg: string) => {
    if (commandStr === '' || alertStr === '') return;

    Alert.alert('Confirm ' + msg, alertMsg, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'OK', onPress: () => handleSendCommand(msg) },
    ]);
  };

  return (
    <Pressable
      onPress={() => handleCommandPressed(commandStr, alertStr)}
      {...pressableProps}
      disabled={isLoading}
      className="flex h-28 w-full flex-row items-center gap-4 rounded-lg border-[1px] px-4 py-3"
      style={{
        ...shadowStyle,
        borderColor: bgColor,
        backgroundColor: `${bgColor}1a`,
      }}>
      {isLoading ? (
        <>
          <CircleLoader color={color} />
          <Text className="font-ibm-medium text-2xl" style={{ color }}>
            Sending command...
          </Text>
        </>
      ) : (
        <>
          {icon}
          <View className="flex flex-1 justify-center">
            <Text className="font-ibm-medium text-2xl" style={{ color }}>
              {name}
            </Text>
            <Text className="font-ibm" style={{ color }}>
              {desc}
            </Text>
          </View>
        </>
      )}
    </Pressable>
  );
};

export default CommandButton;
