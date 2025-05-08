/* eslint-disable no-bitwise */
import * as ExpoDevice from 'expo-device';
import { useAtom } from 'jotai';
import { PermissionsAndroid, Platform } from 'react-native';
import { BleError, BleManager, Characteristic, Device } from 'react-native-ble-plx';

import { allDevicesAtom, connectedDeviceAtom } from '~/atoms/bleAtoms';

const TELEMETRY_SERVICE_UUID = '7103fa9a-0447-427d-93b1-42eccc6b5018';
const TELEMETRY_CHARACTERISTIC_UUID = 'a9aa7873-ca44-4243-a446-b8eee777c8a3';

const bleManager = new BleManager();

export type FlightComputer = {
  isGroundStation: boolean;
} & Device;

function useBLE() {
  const [allDevices, setAllDevices] = useAtom(allDevicesAtom);
  const [connectedDevice, setConnectedDevice] = useAtom(connectedDeviceAtom);

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
      await deviceConnection.discoverAllServicesAndCharacteristics();
      bleManager.stopDeviceScan();

      startStreamingData(deviceConnection);

      deviceConnection.onDisconnected((error) => {
        handleDeviceDisconnect();
        return error;
      });
    } catch (e) {
      console.log('FAILED TO CONNECT', e);
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

  const onDataUpdate = (error: BleError | null, characteristic: Characteristic | null) => {
    if (error) {
      console.log(error);
      return;
    } else if (!characteristic?.value) {
      console.log('No Data was received');
      return;
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

  return {
    connectToDevice,
    allDevices,
    connectedDevice,
    requestPermissions,
    scanForPeripherals,
    startStreamingData,
  };
}

export default useBLE;
