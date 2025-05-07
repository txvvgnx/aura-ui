import { View, SafeAreaView, Text, Dimensions } from 'react-native';
import DeviceListItem from '~/components/DeviceListItem';

export default function Tab() {
  const { width } = Dimensions.get('window');
  const windowWidth = width * 0.9;
  const mLeft = (width - windowWidth) / 2;

  return (
    <SafeAreaView className="flex" style={{ width: windowWidth, marginLeft: mLeft }}>
      <Text className="my-4 font-ibm-bold text-[36px]">Device List</Text>
      <DeviceListItem name="AURA_G_01" isGroundStation connected={false} />
    </SafeAreaView>
  );
}
