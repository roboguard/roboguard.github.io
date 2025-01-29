import type { Buffer } from 'node:buffer';

export type RobotStatus = {
  batteryLevel: number;
  connectionStrength: number;
  location: string;
  status: 'patrolling' | 'idle' | 'charging';
  timestamp: number;
};

export type Alert = {
  id: string;
  type: 'motion' | 'sound' | 'object' | 'person';
  location: string;
  confidence: number;
  timestamp: number;
};

export type CameraFrame = {
  id: string;
  data: Buffer;
  timestamp: number;
};
