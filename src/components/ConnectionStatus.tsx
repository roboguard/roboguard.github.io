// app/dashboard/ConnectionStatus.tsx
'use client';

import { useSocket } from '@/hooks/useSocket';

export function ConnectionStatus() {
  const { isConnected, error } = useSocket();

  return (
    <div className="flex items-center gap-2">
      <div
        className={`size-2 rounded-full ${
          error
            ? 'bg-red-500'
            : isConnected ? 'bg-green-500' : 'bg-yellow-500'
        }`}
      />
      <span className="text-sm text-gray-600">
        {error
          ? 'Connection Error'
          : isConnected ? 'Connected' : 'Connecting...'}
      </span>
    </div>
  );
}
