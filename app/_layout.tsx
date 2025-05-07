import '../global.css';

import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';

export default function Layout() {
  const [fontsLoaded] = useFonts({
    'IBMPlexSans-Thin': require('../assets/fonts/IBMPlexSans-Thin.ttf'),
    'IBMPlexSans-ExtraLight': require('../assets/fonts/IBMPlexSans-ExtraLight.ttf'),
    'IBMPlexSans-Light': require('../assets/fonts/IBMPlexSans-Light.ttf'),
    'IBMPlexSans-Regular': require('../assets/fonts/IBMPlexSans-Regular.ttf'),
    'IBMPlexSans-Medium': require('../assets/fonts/IBMPlexSans-Medium.ttf'),
    'IBMPlexSans-SemiBold': require('../assets/fonts/IBMPlexSans-SemiBold.ttf'),
    'IBMPlexSans-Bold': require('../assets/fonts/IBMPlexSans-Bold.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
