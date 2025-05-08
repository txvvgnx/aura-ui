import { atom } from 'jotai';
import { Device } from 'react-native-ble-plx';

import { FlightComputer } from '~/helpers/useBLE';

export const allDevicesAtom = atom<FlightComputer[]>([]);
export const connectedDeviceAtom = atom<FlightComputer | null>(null);
export const connectedDeviceInstanceAtom = atom<Device | null>(null);
