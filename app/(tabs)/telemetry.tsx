import {
  MoveUp,
  Circle,
  Gauge,
  CircleGauge,
  TriangleRight,
  WindArrowDown,
  MapPinPlus,
  MapPinMinus,
  Move3D,
  Rotate3D,
  Antenna,
  AudioLines,
  UtilityPole,
  Timer,
  ChartNoAxesGantt,
} from 'lucide-react-native';
import { SafeAreaView, View, Text, Dimensions, Image, ScrollView } from 'react-native';

import TelemetryBox from '~/components/TelemetryBox';

export default function Tab() {
  const { width } = Dimensions.get('window');
  const windowWidth = width * 0.9;
  const mLeft = (width - windowWidth) / 2;

  const shadowStyle = {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  };

  const stateColor = '#6a7282';
  const stateBgColor = '#d1d5dc';

  return (
    <SafeAreaView>
      <ScrollView
        className="flex"
        style={{ width: windowWidth, marginLeft: mLeft }}
        contentContainerStyle={{ gap: 16, paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}>
        {/* Flight state */}
        <View
          className="mt-4 flex w-full flex-row items-center gap-[9px] rounded-lg border-[1px] px-4 py-3"
          style={{
            ...shadowStyle,
            borderColor: stateBgColor,
            shadowColor: stateBgColor,
            shadowOpacity: 0.7,
            backgroundColor: `${stateBgColor}1a`,
          }}>
          <Circle size={16} fill={stateColor} stroke={stateBgColor} />
          <Text className="font-ibm-semibold text-2xl">Idle</Text>
        </View>

        {/* Baro altitude */}
        <View
          className="flex w-full gap-1 rounded-lg border-[1px] border-gray-300 bg-white px-2 py-3"
          style={{ ...shadowStyle }}>
          <View className="ml-1 flex flex-row items-center gap-1">
            <MoveUp size={18} stroke="#6B7280" />
            <Text className="font-ibm-medium text-lg text-gray-500">Altitude</Text>
          </View>
          <View className="flex flex-row items-center">
            <Text className="ml-1 font-ibm-semibold text-4xl">12002</Text>
            <Text className="ml-[2px] font-ibm-semibold text-3xl text-gray-500">ft</Text>
          </View>
        </View>

        {/* Vertical velocity (accel and GNSS) */}
        <View className="flex flex-row gap-4">
          <TelemetryBox
            header="Vertical Velocity"
            icon={<Gauge size={16} stroke="#6B7280" />}
            value={201.42}
            unit="m/s"
          />

          <TelemetryBox
            header="GNSS Velocity"
            icon={<CircleGauge size={16} stroke="#6B7280" />}
            value={198.24}
            unit="m/s"
          />
        </View>

        {/* Tilt visualizer, tilt angle, GNSS altitude, Baro velocity */}
        <View className="flex flex-row gap-4">
          <View
            className="relative aspect-square w-2/3 rounded-lg border-[1px] border-gray-300 bg-white"
            style={{ ...shadowStyle }}>
            <View
              style={{
                position: 'absolute',
                top: '50%',
                left: '5%',
                right: '5%',
                height: 1,
                backgroundColor: '#00000032',
                width: '90%',
                zIndex: 0,
              }}
            />

            <Image
              source={require('../../assets/icons/rocketicon.png')}
              style={{
                position: 'absolute',
                width: '80%',
                height: '80%',
                top: '10%',
                left: '10%',
                transform: [{ rotate: '0deg' }],
                zIndex: 1,
              }}
              resizeMode="contain"
            />
          </View>

          <View className="flex flex-1 gap-4">
            <View
              className="flex justify-center gap-1 rounded-lg border-[1px] border-gray-300 bg-white px-2 py-3"
              style={{ ...shadowStyle }}>
              <View className="ml-1 flex flex-row items-center gap-2">
                <TriangleRight size={16} stroke="#6B7280" />
                <Text className="font-ibm-medium text-gray-500">Tilt Angle</Text>
              </View>
              <View className="flex flex-row items-start">
                <Text className="ml-1 font-ibm-semibold text-2xl">180.32</Text>
                <Text className="ml-[2px] font-ibm-semibold text-xl text-gray-500">°</Text>
              </View>
            </View>

            <View
              className="flex flex-1 justify-center gap-1 rounded-lg border-[1px] border-gray-300 bg-white px-2 py-3"
              style={{ ...shadowStyle }}>
              <View className="ml-1 flex flex-row items-center gap-1">
                <MoveUp size={16} stroke="#6B7280" />
                <Text className="font-ibm-medium text-gray-500">GNSS Alt</Text>
              </View>
              <View className="flex flex-row items-end">
                <Text className="ml-1 font-ibm-medium text-xl">20124</Text>
                <Text className="ml-[2px] font-ibm-semibold text-lg text-gray-500">m</Text>
              </View>
            </View>

            <View
              className="flex flex-1 justify-center gap-1 rounded-lg border-[1px] border-gray-300 bg-white px-2 py-3"
              style={{ ...shadowStyle }}>
              <View className="ml-1 flex flex-row items-center gap-2">
                <WindArrowDown size={16} stroke="#6B7280" />
                <Text className="font-ibm-medium text-gray-500">Baro Vel</Text>
              </View>
              <View className="flex flex-row items-baseline">
                <Text className="ml-1 font-ibm-medium text-lg">-180.32</Text>
                <Text className="ml-[2px] font-ibm-semibold text-gray-500">m/s</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Latitude and longitude */}
        <View className="flex flex-row gap-4">
          <TelemetryBox
            header="Latitude"
            icon={<MapPinPlus size={16} stroke="#6B7280" />}
            value={-37.48214}
            unit=""
          />
          <TelemetryBox
            header="Longitude"
            icon={<MapPinMinus size={16} stroke="#6B7280" />}
            value={118.84824}
            unit=""
          />
        </View>

        {/* Accel XYZ */}
        <View className="flex flex-row gap-4">
          <TelemetryBox
            header="Accel X"
            icon={<Move3D size={16} stroke="#6B7280" />}
            value={-9.99}
            unit="g"
          />
          <TelemetryBox
            header="Accel Y"
            icon={<Move3D size={16} stroke="#6B7280" />}
            value={0.0}
            unit="g"
          />
          <TelemetryBox
            header="Accel Z"
            icon={<Move3D size={16} stroke="#6B7280" />}
            value={0.0}
            unit="g"
          />
        </View>

        {/* Gyro XYZ */}
        <View className="flex flex-row gap-4">
          <TelemetryBox
            header="Gyro X"
            icon={<Rotate3D size={16} stroke="#6B7280" />}
            value={-9.99}
            unit="dps"
            bigUnit={false}
          />
          <TelemetryBox
            header="Gyro Y"
            icon={<Rotate3D size={16} stroke="#6B7280" />}
            value={0.0}
            unit="dps"
            bigUnit={false}
          />
          <TelemetryBox
            header="Gyro Z"
            icon={<Rotate3D size={16} stroke="#6B7280" />}
            value={0.0}
            unit="dps"
            bigUnit={false}
          />
        </View>

        {/* Radio stats */}
        <View className="flex flex-row gap-4">
          <TelemetryBox
            header="RSSI"
            icon={<Antenna size={16} stroke="#6B7280" />}
            value={-104}
            unit="dBm"
            bigUnit={false}
          />
          <TelemetryBox
            header="SNR"
            icon={<AudioLines size={16} stroke="#6B7280" />}
            value={4}
            unit="dB"
            bigUnit={false}
          />
          <TelemetryBox
            header="Sig RSSI"
            icon={<UtilityPole size={16} stroke="#6B7280" />}
            value={-89}
            unit="dBm"
            bigUnit={false}
          />
        </View>

        {/* Packet timing stats */}
        <View className="flex flex-row gap-4">
          <TelemetryBox
            header="Last packet"
            icon={<Timer size={16} stroke="#6B7280" />}
            value={1001}
            unit="ms"
            bigUnit={false}
          />
          <TelemetryBox
            header="Packet rate"
            icon={<ChartNoAxesGantt size={16} stroke="#6B7280" />}
            value={15}
            unit="Hz"
            bigUnit={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
