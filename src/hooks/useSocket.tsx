import type { SocketContextType } from '@/types/socket';
import { createContext, useContext } from 'react';

export const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  error: null,
});

export const useSocket = () => useContext(SocketContext);
