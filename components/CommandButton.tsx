import { FC, ReactNode } from 'react';
import { Pressable, PressableProps, Text, View } from 'react-native';

type Props = {
  name: string;
  icon: ReactNode;
  desc: string;
  color: string;
  bgColor: string;
} & PressableProps;

const CommandButton: FC<Props> = ({ name, icon, desc, color, bgColor, ...pressableProps }) => {
  const shadowStyle = {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  };

  return (
    <Pressable
      {...pressableProps}
      className="flex w-full flex-row items-center gap-4 rounded-lg border-[1px] px-4 py-3"
      style={{
        ...shadowStyle,
        borderColor: bgColor,
        backgroundColor: `${bgColor}1a`,
      }}>
      {icon}
      <View className="flex flex-1 justify-center">
        <Text className="font-ibm-medium text-2xl" style={{ color }}>
          {name}
        </Text>
        <Text className="font-ibm" style={{ color }}>
          {desc}
        </Text>
      </View>
    </Pressable>
  );
};

export default CommandButton;
