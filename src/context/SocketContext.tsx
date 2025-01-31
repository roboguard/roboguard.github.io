/* eslint-disable no-console */
// context/SocketContext.tsx
'use client';

import type { SocketContextType } from '@/types/socket';
import { SocketContext } from '@/hooks/useSocket';
import { useEffect, useMemo, useRef, useState } from 'react';

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const wsRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // const ws = new WebSocket('ws://localhost:8000/ws');
    const ws = new WebSocket('wss://ec2-54-193-123-50.us-west-1.compute.amazonaws.com/ws');
    ws.onopen = () => {
      console.log('WebSocket connected successfully');
      setIsConnected(true);
      setError(null);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
    };

    ws.onerror = (err) => {
      console.error('WebSocket error:', err);
      setError(new Error('WebSocket connection error'));
    };

    wsRef.current = ws;

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, []);

  const contextValue: SocketContextType = useMemo(() => ({
    socket: wsRef.current,
    isConnected,
    error,
  }), [isConnected, error]);

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
}
