import clsx from 'clsx';
import { ReactNode, FC } from 'react';
import { View, Text } from 'react-native';

type Props = {
  header: string;
  icon: ReactNode;
  value: number;
  unit: string;
  bigUnit?: boolean;
};

const TelemetryBox: FC<Props> = ({ header, icon, value, unit, bigUnit = true }) => {
  const shadowStyle = {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  };

  return (
    <View
      className="flex flex-1 gap-1 rounded-lg border-[1px] border-gray-300 bg-white px-2 py-3"
      style={{ ...shadowStyle }}>
      <View className="ml-1 flex flex-row items-center gap-2">
        {icon}
        <Text className="font-ibm-medium text-[16px] text-gray-500">{header}</Text>
      </View>
      <View className="flex flex-row items-baseline">
        <Text className="ml-1 font-ibm-semibold text-3xl">{value}</Text>
        <Text
          className={clsx(
            'ml-[2px] font-ibm-semibold text-gray-500',
            bigUnit ? 'text-2xl' : 'text-lg'
          )}>
          {unit}
        </Text>
      </View>
    </View>
  );
};

export default TelemetryBox;
