// components/AlertsList.tsx
'use client';

import { useSocket } from '@/hooks/useSocket';
import { useEffect, useState } from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const MAX_HISTORY_POINTS = 30;

type CountDataPoint = {
  timestamp: string;
  count: number;
};

type CameraData = {
  currentCount: number;
  history: CountDataPoint[];
};

export function AlertsList() {
  const { socket, isConnected } = useSocket();
  const [cameraData, setCameraData] = useState<Record<string, CameraData>>({});

  const addToHistory = (cameraId: string, count: number) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString();

    setCameraData((prev) => {
      const camera = prev[cameraId] || { currentCount: 0, history: [] };
      const newHistory = [...camera.history, { timestamp: timeString, count }];

      return {
        ...prev,
        [cameraId]: {
          currentCount: count,
          history: newHistory.slice(-MAX_HISTORY_POINTS),
        },
      };
    });
  };

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.onmessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data) as {
        camera_id: string;
        type: string;
        person_count?: number;
      };

      if (message.camera_id && message.person_count !== undefined) {
        addToHistory(message.camera_id, message.person_count);
      }
    };

    return () => {
      socket.onmessage = null;
    };
  }, [socket]);

  const renderCameraStats = (cameraId: string, data: CameraData) => {
    const peakCount = Math.max(...data.history.map(point => point.count), 0);
    const avgCount = data.history.length > 0
      ? Math.round(data.history.reduce((acc, point) => acc + point.count, 0) / data.history.length)
      : 0;

    return (
      <div key={cameraId} className="mb-6 flex-1 rounded-lg border border-gray-200 bg-white p-4">
        <h4 className="mb-3 font-medium">
          Camera
          {cameraId}
        </h4>

        {/* Current Count */}
        <div className="mb-4 text-sm text-gray-600">
          Current Count:
          {' '}
          {data.currentCount}
        </div>

        {/* Count History Graph */}
        <div className="mb-4 h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.history}>
              <XAxis
                dataKey="timestamp"
                tick={{ fontSize: 12 }}
                interval="preserveStartEnd"
              />
              <YAxis
                domain={[0, 'auto']}
                tick={{ fontSize: 12 }}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#2563eb"
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-blue-50 p-3">
            <div className="text-sm font-medium text-gray-600">Peak Count</div>
            <div className="text-xl font-bold text-blue-600">{peakCount}</div>
          </div>
          <div className="rounded-lg bg-green-50 p-3">
            <div className="text-sm font-medium text-gray-600">Average Count</div>
            <div className="text-xl font-bold text-green-600">{avgCount}</div>
          </div>
        </div>
      </div>
    );
  };

  if (!isConnected) {
    return (
      <div className="rounded-lg bg-white p-4 shadow">
        <h3 className="mb-4 text-lg font-bold">Recent Info</h3>
        <div className="text-center text-gray-500">Connecting...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1400px] rounded-lg bg-transparent py-4">
      <h3 className="mb-4 text-lg font-bold">Recent Info</h3>

      <div className="flex h-[420px] flex-wrap justify-center gap-4 overflow-y-auto">
        {Object.entries(cameraData).length === 0
          ? (
              <div className="text-center text-gray-500">No data available</div>
            )
          : (
              Object.entries(cameraData).map(([cameraId, data]) =>
                renderCameraStats(cameraId, data),
              )
            )}
      </div>
    </div>
  );
}
