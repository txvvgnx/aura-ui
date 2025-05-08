import { atom } from 'jotai';

export type FlightTelemetry = {
  flightState: string;
  stateColor: string;
  stateBgColor: string;

  baroAltAGL: number;
  gnssAltAGL: number;

  accelVertVel: number;
  gnssVertVel: number;
  baroVertVel: number;

  tiltAngle: number;

  latitude: number;
  longitude: number;

  accelXYZ: number[];
  gyroXYZ: number[];

  rssi: number;
  snr: number;
  signalRssi: number;

  packetSpacing: number;
};

export const telemetryAtom = atom<FlightTelemetry>({
  flightState: 'Idle',
  stateColor: '#6a7282',
  stateBgColor: '#d1d5dc',

  baroAltAGL: 0,
  gnssAltAGL: 0,

  accelVertVel: 0,
  baroVertVel: 0,
  gnssVertVel: 0,

  tiltAngle: 0,

  latitude: 0,
  longitude: 0,

  accelXYZ: [0, 0, 0],
  gyroXYZ: [0, 0, 0],

  rssi: 0,
  snr: 0,
  signalRssi: 0,
  packetSpacing: 0,
});
