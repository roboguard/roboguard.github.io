// components/CameraGrid.tsx
'use client';

import { useSocket } from '@/hooks/useSocket';
import { memo, useEffect, useState } from 'react';
import { CameraStream } from './CameraStream';
import { ErrorBoundary } from './StreamErrorBoundry';

const MemoizedCameraStream = memo(CameraStream);

export function CameraGrid() {
  const { socket, isConnected } = useSocket();
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null);
  const [lastMotion, setLastMotion] = useState<string | null>(null);

  useEffect(() => {
    if (!socket || !isConnected) {
      return;
    }

    // Start streams
    const cameraIds = ['1', '2', '3', '4'];
    cameraIds.forEach((id) => {
      socket.send(JSON.stringify({ type: 'start_stream', camera_id: id }));
    });

    return () => {
      cameraIds.forEach((id) => {
        socket.send(JSON.stringify({ type: 'stop_stream', camera_id: id }));
      });
    };
  }, [socket, isConnected]);

  const handleMotionDetected = (cameraId: string) => {
    setLastMotion(cameraId);
    setTimeout(() => setLastMotion(null), 3000);
  };

  // Pass socket through context or props
  const streamProps = {
    socket,
    isConnected,
  };

  if (selectedCamera) {
    return (
      <div className="h-full">
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={() => setSelectedCamera(null)}
            className="rounded bg-gray-700 px-3 py-1 text-white hover:bg-gray-600"
            type="button"
          >
            Back to Grid
          </button>
          {lastMotion === selectedCamera && (
            <div className="rounded bg-red-500 px-3 py-1 text-white">
              Motion Detected!
            </div>
          )}
        </div>
        <div className="h-[calc(100%-2rem)]">
          <ErrorBoundary>
            <MemoizedCameraStream
              cameraId={selectedCamera}
              onMotionDetected={handleMotionDetected}
              {...streamProps}
            />
          </ErrorBoundary>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {['1', '2', '3', '4'].map(cameraId => (
        <button
          key={cameraId}
          className={`cursor-pointer ${lastMotion === cameraId ? 'rounded-lg ring-2 ring-red-500' : ''}`}
          onClick={() => setSelectedCamera(cameraId)}
          type="button"
        >
          <ErrorBoundary>
            <MemoizedCameraStream
              cameraId={cameraId}
              onMotionDetected={handleMotionDetected}
              {...streamProps}
            />
          </ErrorBoundary>
        </button>
      ))}
    </div>
  );
}
