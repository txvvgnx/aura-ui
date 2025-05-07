import { SafeAreaView, Pressable, Text, Dimensions, ScrollView } from 'react-native';

export default function Tab() {
  const { width } = Dimensions.get('window');
  const windowWidth = width * 0.9;
  const mLeft = (width - windowWidth) / 2;

  return (
    <SafeAreaView>
      <ScrollView
        className="mt-4 flex"
        style={{ width: windowWidth, marginLeft: mLeft }}
        contentContainerStyle={{ gap: 16, paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}>
        <Text className="font-ibm-bold text-[36px]">Send Command</Text>

        <Pressable className="flex w-full flex-row items-center justify-center gap-[9px] rounded-lg border-[1px] border-red-300 bg-red-300/10 px-4 py-3">
          <Text className="font-ibm-medium text-lg text-red-500">Refresh device list</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
