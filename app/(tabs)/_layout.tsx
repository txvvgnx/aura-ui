import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { View, Text, Dimensions } from 'react-native';

export default function TabLayout() {
  const { width } = Dimensions.get('window');
  const tabBarWidth = width * 0.9;
  const mLeft = (width - tabBarWidth) / 2;

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 30,
          height: 75,
          width: tabBarWidth,
          marginLeft: mLeft,
          left: 0,
          right: 0,
          backgroundColor: '#fff',
          borderRadius: 20,
          elevation: 4,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Devices',
          tabBarIcon: ({ focused, color, size }) => (
            <IconWithFocusBg
              focused={focused}
              iconName={focused ? 'albums' : 'albums-outline'}
              tabName="Devices"
              activeColor="#00c951"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="telemetry"
        options={{
          title: 'Telemetry',
          tabBarIcon: ({ focused, color, size }) => (
            <IconWithFocusBg
              focused={focused}
              iconName={focused ? 'navigate-circle' : 'navigate-circle-outline'}
              tabName="Telemetry"
              activeColor="#00a6f4"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="commands"
        options={{
          title: 'Commands',
          tabBarIcon: ({ focused, color, size }) => (
            <IconWithFocusBg
              focused={focused}
              iconName={focused ? 'terminal' : 'terminal-outline'}
              tabName="Commands"
              activeColor="#fb2c36"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}

function IconWithFocusBg({
  focused,
  iconName,
  tabName,
  activeColor,
  color,
  size,
}: {
  focused: boolean;
  iconName: any;
  tabName: string;
  activeColor: string;
  color: string;
  size: number;
}) {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 35,
        width: 110,
        height: 50,
      }}>
      <View
        style={{
          backgroundColor: focused ? `${activeColor}1a` : 'transparent',
          borderRadius: 14,
          padding: 8,
          paddingHorizontal: 16,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Ionicons name={iconName} size={size} color={focused ? activeColor : color} />
        <Text
          style={{
            color: focused ? activeColor : color,
            fontSize: 12,
            marginTop: 2,
            fontFamily: focused ? 'IBMPlexSans-Medium' : 'IBMPlexSans-Regular',
          }}>
          {tabName}
        </Text>
      </View>
    </View>
  );
}
