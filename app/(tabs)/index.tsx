import { StatusBar } from 'expo-status-bar';
import { useAtom } from 'jotai';
import { AlertTriangleIcon } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import { SafeAreaView, Pressable, Text, Dimensions, ScrollView, View } from 'react-native';

import { allDevicesAtom, connectedDeviceAtom } from '~/atoms/bleAtoms';
import CircleLoader from '~/components/CircleLoader';
import DeviceListItem from '~/components/DeviceListItem';
import useBLE, { FlightComputer } from '~/helpers/useBLE';

export default function Tab() {
  const { width } = Dimensions.get('window');
  const windowWidth = width * 0.9;
  const mLeft = (width - windowWidth) / 2;

  const { requestPermissions, scanForPeripherals } = useBLE();

  const [allDevices] = useAtom<FlightComputer[]>(allDevicesAtom);
  const [connectedDevice] = useAtom<FlightComputer | null>(connectedDeviceAtom);

  const [loadingDeviceList, setLoadingDeviceList] = useState<boolean>(false);

  const scanForDevices = async () => {
    const isPermissionsEnabled = await requestPermissions();
    if (isPermissionsEnabled) {
      scanForPeripherals();
    }
  };

  const refreshDevices = async () => {
    setLoadingDeviceList(true);
    scanForDevices();
    setLoadingDeviceList(false);
  };

  useEffect(() => {
    setLoadingDeviceList(true);
    scanForDevices();
    setLoadingDeviceList(false);
  }, []);

  return (
    <SafeAreaView>
      <StatusBar style="dark" />
      <ScrollView
        className="mt-4 flex"
        style={{ width: windowWidth, marginLeft: mLeft }}
        contentContainerStyle={{ gap: 16, paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}>
        <Text className="font-ibm-bold text-[36px]">Device List</Text>
        {loadingDeviceList ? (
          <CircleLoader size={72} />
        ) : (
          <>
            {allDevices.length === 0 ? (
              <View className="flex w-full flex-row items-center justify-center gap-2 rounded-lg border-[1px] border-red-300 bg-red-300/50 px-4 py-3">
                <AlertTriangleIcon size={22} stroke="#b91c1c" strokeWidth={1.5} />
                <Text className="font-ibm-medium text-lg text-red-700">No devices detected</Text>
              </View>
            ) : (
              allDevices.map((device, idx) => {
                return (
                  <DeviceListItem
                    connected={device.id === connectedDevice?.id}
                    device={device}
                    key={idx}
                  />
                );
              })
            )}

            <Pressable
              onPress={refreshDevices}
              className="flex w-full flex-row items-center justify-center gap-[9px] rounded-lg border-[1px] border-gray-300 bg-gray-300/50 px-4 py-3">
              <Text className="font-ibm-medium text-lg text-gray-700">Refresh device list</Text>
            </Pressable>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
