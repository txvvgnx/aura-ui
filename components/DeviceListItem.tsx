import clsx from 'clsx';
import { Check, CircleAlert, Rocket, SatelliteDish, Unplug } from 'lucide-react-native';
import { FC } from 'react';
import { View, Text, Pressable } from 'react-native';

type Props = {
  name: string;
  isGroundStation: boolean;
  connected: boolean;
};

const DeviceListItem: FC<Props> = ({ name, isGroundStation, connected }) => {
  return (
    <View
      className="flex h-[72px] w-full flex-row items-center rounded-lg bg-white"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      }}>
      <View
        className={clsx(
          'flex h-full w-[72px] items-center justify-center rounded-bl-lg rounded-tl-lg px-3',
          isGroundStation ? 'bg-green-500/20' : 'bg-red-500/20'
        )}>
        {isGroundStation ? (
          <SatelliteDish size={28} strokeWidth={1.5} color="#00c951" />
        ) : (
          <Rocket size={28} strokeWidth={1.5} color="#fb2c36" />
        )}

        <Text
          className={clsx('mt-1 font-ibm', isGroundStation ? 'text-green-700' : 'text-red-700')}>
          {isGroundStation ? 'Ground' : 'AURA'}
        </Text>
      </View>

      <View className="mx-4">
        <Text className="font-ibm-medium text-xl">{name}</Text>
        <View className="flex flex-row items-center gap-1">
          {connected ? (
            <Check size={18} strokeWidth={2} color="#00c951" />
          ) : (
            <CircleAlert size={18} strokeWidth={2} color="#fb2c36" />
          )}
          <Text className={clsx('font-ibm', connected ? 'text-green-700' : 'text-red-700')}>
            {connected ? 'BLE Connected' : 'Not connected'}
          </Text>
        </View>
      </View>

      {!connected && (
        <Pressable
          onPress={() => console.log('Connect pressed')}
          android_ripple={{ color: 'rgba(0,0,0,0.2)', borderless: false }}
          className="ml-auto flex h-full items-center justify-center rounded-br-lg rounded-tr-lg bg-gray-500/10 px-3">
          <Unplug size={28} strokeWidth={1.5} />
          <Text className="mt-1 font-ibm">Connect</Text>
        </Pressable>
      )}
    </View>
  );
};

export default DeviceListItem;
