/* eslint-disable no-bitwise */
import * as Burnt from 'burnt';
import * as ExpoDevice from 'expo-device';
import { useAtom } from 'jotai';
import { PermissionsAndroid, Platform } from 'react-native';
import base64 from 'react-native-base64';
import { BleError, BleManager, Characteristic, Device } from 'react-native-ble-plx';

import clamp from './clamp';

import { allDevicesAtom, connectedDeviceAtom, connectedDeviceInstanceAtom } from '~/atoms/bleAtom';
import { FlightTelemetry, telemetryAtom } from '~/atoms/telemetryAtom';

const TELEMETRY_SERVICE_UUID = '7103fa9a-0447-427d-93b1-42eccc6b5018';
const TELEMETRY_CHARACTERISTIC_UUID = 'a9aa7873-ca44-4243-a446-b8eee777c8a3';
const COMMAND_CHARACTERISTIC_UUID = '5b5e2121-6a0b-483b-b90d-21a6abbcfeff';

const FLIGHT_STATES = ['Idle', 'Armed', 'Boost', 'Burnout', 'Apogee', 'Main Deployed'];
const STATE_COLORS = ['#6a7282', '#00bc7d', '#fb2c36', '#efb100', '#00a6f4', '#e12afb'];
const STATE_BG_COLORS = ['#d1d5dc', '#5ee9b5', '#ffa2a2', '#ffdf20', '#74d4ff', '#f4a8ff'];

const bleManager = new BleManager();

export type FlightComputer = {
  isGroundStation: boolean;
} & Device;

function useBLE() {
  const [allDevices, setAllDevices] = useAtom(allDevicesAtom);
  const [connectedDevice, setConnectedDevice] = useAtom(connectedDeviceAtom);
  const [, setConnectedDeviceInstance] = useAtom(connectedDeviceInstanceAtom);
  const [, setTelemetryData] = useAtom(telemetryAtom);

  const requestAndroid31Permissions = async () => {
    const bluetoothScanPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        title: 'Location Permission',
        message: 'Bluetooth Low Energy requires Location',
        buttonPositive: 'OK',
      }
    );
    const bluetoothConnectPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      {
        title: 'Location Permission',
        message: 'Bluetooth Low Energy requires Location',
        buttonPositive: 'OK',
      }
    );
    const fineLocationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'Bluetooth Low Energy requires Location',
        buttonPositive: 'OK',
      }
    );

    return (
      bluetoothScanPermission === 'granted' &&
      bluetoothConnectPermission === 'granted' &&
      fineLocationPermission === 'granted'
    );
  };

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'Bluetooth Low Energy requires Location',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const isAndroid31PermissionsGranted = await requestAndroid31Permissions();

        return isAndroid31PermissionsGranted;
      }
    } else {
      return true;
    }
  };

  const connectToDevice = async (device: Device) => {
    try {
      const deviceConnection = await bleManager.connectToDevice(device.id);

      const flightComp: FlightComputer = {
        ...deviceConnection,
        isGroundStation: device.localName?.includes('AUGR') || device.name?.includes('AUGR'),
      } as FlightComputer;

      setConnectedDevice(flightComp);
      setConnectedDeviceInstance(deviceConnection);

      await deviceConnection.discoverAllServicesAndCharacteristics();
      bleManager.stopDeviceScan();

      startStreamingData(deviceConnection);

      deviceConnection.onDisconnected((error) => {
        handleDeviceDisconnect();
        return error;
      });
    } catch (e) {
      console.log('FAILED TO CONNECT', e);
      Burnt.toast({
        title: 'Failed to connect to device',
        preset: 'error',
        duration: 0.75,
      });
    }
  };

  const handleDeviceDisconnect = () => {
    setConnectedDevice(null);
  };

  const isDuplicateDevice = (devices: Device[], nextDevice: Device) =>
    devices.findIndex((device) => nextDevice.id === device.id) > -1;

  const scanForPeripherals = () => {
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log(error);
      }

      if (
        device &&
        (device.localName?.includes('AUGR') ||
          device.name?.includes('AUGR') ||
          device.localName?.includes('AUFL') ||
          device.name?.includes('AUFL'))
      ) {
        setAllDevices((prevState: FlightComputer[]) => {
          if (!isDuplicateDevice(prevState, device)) {
            const flightComp = {
              ...device,
              isGroundStation: device.localName?.includes('AUGR') || device.name?.includes('AUGR'),
            } as FlightComputer;

            return [...prevState, flightComp];
          }
          return prevState;
        });
      }
    });
  };

  const processTelemetry = (dataPoints: string[]): FlightTelemetry => {
    const flightStateIndex = clamp(Number(dataPoints[0]), 0, 5);

    const baseData: FlightTelemetry = {
      flightStateIndex,
      flightState: FLIGHT_STATES[flightStateIndex],
      stateColor: STATE_COLORS[flightStateIndex],
      stateBgColor: STATE_BG_COLORS[flightStateIndex],

      baroAltAGL: Math.round(Number(dataPoints[1]) * 3.28084),
      gnssAltAGL: Number(dataPoints[2]),

      accelVertVel: Number(dataPoints[3]),
      baroVertVel: Number(dataPoints[4]),
      gnssVertVel: Number(dataPoints[5]),

      tiltAngle: Number(dataPoints[6]),

      latitude: Number(dataPoints[7]),
      longitude: Number(dataPoints[8]),

      accelXYZ: [0, 0, 0],
      gyroXYZ: [0, 0, 0],

      rssi: Number(dataPoints[dataPoints.length - 4]), // Access from the end to handle both lengths
      snr: Number(dataPoints[dataPoints.length - 3]),
      signalRssi: Number(dataPoints[dataPoints.length - 2]),
      packetSpacing: Number(dataPoints[dataPoints.length - 1]),
    };

    if (dataPoints.length >= 19) {
      const accelXYZArr = dataPoints.slice(9, 12).map(Number);
      const gyroXYZArr = dataPoints.slice(12, 15).map(Number);

      return {
        ...baseData,
        accelXYZ: accelXYZArr,
        gyroXYZ: gyroXYZArr,
      };
    } else {
      return baseData;
    }
  };

  const onDataUpdate = (error: BleError | null, characteristic: Characteristic | null) => {
    if (error) {
      console.log(error);
      Burnt.toast({
        title: 'Device disconnected',
        preset: 'error',
        duration: 0.75,
      });
      return;
    } else if (!characteristic?.value) {
      console.log('No Data was received');
      return;
    }
    const dataString = base64.decode(characteristic.value);
    const dataPoints = dataString.split(',');

    if (dataPoints.length >= 13) {
      const telemetryData = processTelemetry(dataPoints);
      setTelemetryData(telemetryData);
    }
  };

  const startStreamingData = async (device: Device) => {
    if (device) {
      device.monitorCharacteristicForService(
        TELEMETRY_SERVICE_UUID,
        TELEMETRY_CHARACTERISTIC_UUID,
        onDataUpdate
      );
    } else {
      console.log('No Device Connected');
    }
  };

  const sendCommand = async (device: Device | null, command: string) => {
    if (!device) {
      Burnt.toast({
        title: 'No device connected',
        preset: 'error',
        duration: 0.75,
      });
      return;
    }

    const base64Data = base64.encode(command);

    try {
      await device.writeCharacteristicWithResponseForService(
        TELEMETRY_SERVICE_UUID,
        COMMAND_CHARACTERISTIC_UUID,
        base64Data
      );
      Burnt.toast({
        title: 'Command sent!',
        message: `${command} was sent`,
        preset: 'done',
        duration: 0.75,
      });
    } catch (e) {
      console.error('Failed to send command:', e);
      Burnt.toast({
        title: 'Failed to send command',
        preset: 'error',
        duration: 0.75,
      });
    }
  };

  return {
    connectToDevice,
    allDevices,
    connectedDevice,
    requestPermissions,
    scanForPeripherals,
    startStreamingData,
    sendCommand,
  };
}

export default useBLE;
