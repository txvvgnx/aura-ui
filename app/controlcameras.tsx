import { Stack } from 'expo-router';
import { Power, PowerOff } from 'lucide-react-native';
import { SafeAreaView, Dimensions, ScrollView } from 'react-native';

import CommandButton from '~/components/CommandButton';

export default function ControlCameras() {
  const { width } = Dimensions.get('window');
  const windowWidth = width * 0.9;
  const mLeft = (width - windowWidth) / 2;

  return (
    <SafeAreaView>
      <Stack.Screen options={{ headerTitle: 'Control Cameras', headerBackTitle: 'Back' }} />

      <ScrollView
        className="mt-4 flex"
        style={{ width: windowWidth, marginLeft: mLeft }}
        contentContainerStyle={{ gap: 16, paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}>
        <CommandButton
          name="Turn ON cameras"
          desc="Enables PI BMS"
          icon={<Power size={56} stroke="#615fff" strokeWidth={1.5} />}
          color="#615fff"
          bgColor="#a3b3ff"
          commandStr="CAMCTL,1"
          alertStr="This will turn ON cameras. Continue?"
        />

        <CommandButton
          name="Turn OFF cameras"
          desc="Disables PI BMS"
          icon={<PowerOff size={56} stroke="#615fff" strokeWidth={1.5} />}
          color="#615fff"
          bgColor="#a3b3ff"
          commandStr="CAMCTL,0"
          alertStr="This will turn OFF cameras. Continue?"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
