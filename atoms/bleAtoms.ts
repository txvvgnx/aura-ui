import { atom } from 'jotai';

import { FlightComputer } from '~/helpers/useBLE';

export const allDevicesAtom = atom<FlightComputer[]>([]);
export const connectedDeviceAtom = atom<FlightComputer | null>(null);
