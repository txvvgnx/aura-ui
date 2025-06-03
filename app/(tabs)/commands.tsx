import { useRouter } from 'expo-router';
import { Camera, Flame, PlaneLanding, PlaneTakeoff, Radio } from 'lucide-react-native';
import { SafeAreaView, Text, Dimensions, ScrollView } from 'react-native';

import CommandButton from '~/components/CommandButton';

export default function Tab() {
  const { width } = Dimensions.get('window');
  const windowWidth = width * 0.9;
  const mLeft = (width - windowWidth) / 2;

  const router = useRouter();

  return (
    <SafeAreaView>
      <ScrollView
        className="mt-4 flex"
        style={{ width: windowWidth, marginLeft: mLeft }}
        contentContainerStyle={{ gap: 16, paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}>
        <Text className="font-ibm-bold text-[36px]">Send Command</Text>

        <CommandButton
          name="ARM"
          desc="Make the flight computer ready for flight."
          icon={<PlaneTakeoff size={56} stroke="#00b8db" strokeWidth={1.5} />}
          color="#00b8db"
          bgColor="#53eafd"
          commandStr="ARM"
          alertStr="This will ARM the flight computer. Continue?"
        />

        <CommandButton
          name="DISARM"
          desc="Returns the flight computer to idle mode."
          icon={<PlaneLanding size={56} stroke="#00bc7d" strokeWidth={1.5} />}
          color="#00bc7d"
          bgColor="#5ee9b5"
          commandStr="DISARM"
          alertStr="This will DISARM the flight computer. Continue?"
        />

        <CommandButton
          name="FIRE PYRO"
          desc="Briefly enable a high-current output"
          icon={<Flame size={56} stroke="#ff6900" strokeWidth={1.5} />}
          color="#ff6900"
          bgColor="#ffb86a"
          onPress={() => router.push('/pyrocommands')}
        />

        <CommandButton
          name="Change Frequency"
          desc="Use a different radio frequency"
          icon={<Radio size={56} stroke="#ad46ff" strokeWidth={1.5} />}
          color="#ad46ff"
          bgColor="#dab2ff"
          onPress={() => router.push('/frequencyset')}
        />

        <CommandButton
          name="Control Cameras"
          desc="Set the state of GPIO40"
          icon={<Camera size={56} stroke="#615fff" strokeWidth={1.5} />}
          color="#615fff"
          bgColor="#a3b3ff"
          onPress={() => router.push('/controlcameras')}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
