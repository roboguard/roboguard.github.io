export type ConnectionState = {
  isConnected: boolean;
  error: Error | null;
};

export type SocketContextType = {
  socket: WebSocket | null;
} & ConnectionState;

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
