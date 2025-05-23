import { Stack } from 'expo-router';
import { Tally1, Tally2, Tally3, Tally4 } from 'lucide-react-native';
import { SafeAreaView, Text, Dimensions, ScrollView } from 'react-native';

import CommandButton from '~/components/CommandButton';

const PYRO_WARN = 'MAKE SURE THE AREA IS CLEAR!\nYou cannot undo this! Continue?';

export default function PyroCommands() {
  const { width } = Dimensions.get('window');
  const windowWidth = width * 0.9;
  const mLeft = (width - windowWidth) / 2;

  return (
    <SafeAreaView>
      <Stack.Screen options={{ headerTitle: 'Pyro Commands', headerBackTitle: 'Back' }} />

      <ScrollView
        className="mt-4 flex"
        style={{ width: windowWidth, marginLeft: mLeft }}
        contentContainerStyle={{ gap: 16, paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}>
        <Text className="font-ibm-bold text-3xl">Choose output to fire</Text>
        <Text className="-mt-3 font-ibm text-lg">
          Pyro will fire 1 second after command is received
        </Text>

        <CommandButton
          name="PYRO OUTPUT A"
          desc="Fires pyro channel A"
          icon={<Tally1 size={56} stroke="#fb2c36" strokeWidth={1.5} />}
          color="#fb2c36"
          bgColor="#ffa2a2"
          commandStr="PYRO,1"
          alertStr={`This will fire Output A.\n${PYRO_WARN}`}
        />

        <CommandButton
          name="PYRO OUTPUT B"
          desc="Fires pyro channel B"
          icon={<Tally2 size={56} stroke="#fb2c36" strokeWidth={1.5} />}
          color="#fb2c36"
          bgColor="#ffa2a2"
          commandStr="PYRO,2"
          alertStr={`This will fire Output B.\n${PYRO_WARN}`}
        />

        <CommandButton
          name="PYRO OUTPUT C"
          desc="Fires pyro channel C"
          icon={<Tally3 size={56} stroke="#fb2c36" strokeWidth={1.5} />}
          color="#fb2c36"
          bgColor="#ffa2a2"
          commandStr="PYRO,3"
          alertStr={`This will fire Output C.\n${PYRO_WARN}`}
        />

        <CommandButton
          name="PYRO OUTPUT D"
          desc="Fires pyro channel D"
          icon={<Tally4 size={56} stroke="#fb2c36" strokeWidth={1.5} />}
          color="#fb2c36"
          bgColor="#ffa2a2"
          commandStr="PYRO,4"
          alertStr={`This will fire Output D.\n${PYRO_WARN}`}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
