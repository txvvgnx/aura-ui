import { Stack } from 'expo-router';
import { Antenna } from 'lucide-react-native';
import { useState } from 'react';
import { SafeAreaView, Text, Dimensions, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import CommandButton from '~/components/CommandButton';

export default function FrequencySet() {
  const { width } = Dimensions.get('window');
  const windowWidth = width * 0.9;
  const mLeft = (width - windowWidth) / 2;

  const [open, setOpen] = useState(false);
  const [freq, setFreq] = useState('9020');
  const [items, setItems] = useState(
    Array.from({ length: 261 }, (_, i) => {
      const freq = (9020 + i).toString();
      return { label: freq, value: freq };
    })
  );

  return (
    <SafeAreaView>
      <Stack.Screen options={{ headerTitle: 'Set Radio Frequency', headerBackTitle: 'Back' }} />

      <View className="mt-4 flex gap-3" style={{ width: windowWidth, marginLeft: mLeft }}>
        <Text className="font-ibm-bold text-2xl">Select a frequency in MHz * 10</Text>

        <DropDownPicker
          open={open}
          value={freq}
          items={items}
          setOpen={setOpen}
          setValue={setFreq}
          setItems={setItems}
          placeholder="Select frequency"
          style={{ borderColor: '#ccc' }}
          textStyle={{ color: '#000' }}
          dropDownContainerStyle={{ borderColor: '#ccc' }}
        />

        <CommandButton
          name="Set frequency"
          desc="Changes frequency to the specified value"
          icon={<Antenna size={56} stroke="#ad46ff" strokeWidth={1.5} />}
          color="#ad46ff"
          bgColor="#dab2ff"
          commandStr={`FREQ,${freq}`}
          alertStr={`This will change the radio frequency to ${Number(freq) / 10} MHz. Continue?`}
        />
      </View>
    </SafeAreaView>
  );
}
