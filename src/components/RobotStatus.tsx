// components/PatrolMap.tsx
'use client';

import { Lock, Navigation } from 'lucide-react';
import { useEffect, useState } from 'react';

type Zone = {
  id: string;
  type: 'restricted' | 'patrol' | 'alert';
  points: string; // SVG path points
  label: string;
};

type RobotPosition = {
  x: number;
  y: number;
  rotation: number;
  status: 'active' | 'charging' | 'alert';
};

const MOCK_ZONES: Zone[] = [
  {
    id: 'zone1',
    type: 'restricted',
    points: 'M50,50 L150,50 L150,150 L50,150 Z',
    label: 'Server Room',
  },
  {
    id: 'zone2',
    type: 'patrol',
    points: 'M200,100 L300,100 L300,200 L200,200 Z',
    label: 'Main Corridor',
  },
  {
    id: 'zone3',
    type: 'alert',
    points: 'M350,150 L450,150 L450,250 L350,250 Z',
    label: 'Loading Dock',
  },
];

export function RobotStatus() {
  const [robotPosition, setRobotPosition] = useState<RobotPosition>({
    x: 100,
    y: 100,
    rotation: 45,
    status: 'active',
  });

  // Simulate robot movement
  useEffect(() => {
    const interval = setInterval(() => {
      setRobotPosition(prev => ({
        ...prev,
        x: prev.x + (Math.random() - 0.5) * 10,
        y: prev.y + (Math.random() - 0.5) * 10,
        rotation: (prev.rotation + 5) % 360,
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getZoneColor = (type: Zone['type']) => {
    switch (type) {
      case 'restricted': return 'fill-red-200 stroke-red-500';
      case 'patrol': return 'fill-blue-200 stroke-blue-500';
      case 'alert': return 'fill-yellow-200 stroke-yellow-500';
    }
  };

  const getRobotColor = (status: RobotPosition['status']) => {
    switch (status) {
      case 'active': return 'text-green-500';
      case 'charging': return 'text-yellow-500';
      case 'alert': return 'text-red-500';
    }
  };

  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold">Patrol Map</h3>

        <div className="flex gap-4">
          <div className="flex items-center gap-2 text-sm">
            <div className="size-3 rounded-full bg-red-500" />
            <span>Restricted</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="size-3 rounded-full bg-blue-500" />
            <span>Patrol</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="size-3 rounded-full bg-yellow-500" />
            <span>Alert</span>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative h-[500px] w-full rounded-lg bg-gray-100">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 500 500"
          className="absolute inset-0"
        >
          {/* Grid Lines */}
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke="rgba(0,0,0,0.1)"
              strokeWidth="0.5"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Zones */}
          {MOCK_ZONES.map(zone => (
            <g key={zone.id}>
              <path
                d={zone.points}
                className={`${getZoneColor(zone.type)} opacity-50`}
                strokeWidth="2"
              />
              <text
                x={zone.type === 'restricted' ? 60 : zone.type === 'patrol' ? 210 : 360}
                y={zone.type === 'restricted' ? 100 : zone.type === 'patrol' ? 150 : 200}
                className="fill-gray-700 text-xs font-medium"
              >
                {zone.label}
              </text>
            </g>
          ))}

          {/* Robot Position */}
          <g
            transform={`translate(${robotPosition.x},${robotPosition.y}) rotate(${robotPosition.rotation})`}
          >
            <circle r="15" className={`${getRobotColor(robotPosition.status)} fill-current`} />
            <path
              d="M-5,-5 L5,0 L-5,5 Z"
              fill="white"
            />
          </g>
        </svg>

        {/* Controls Overlay */}
        <div className="absolute bottom-4 right-4 space-y-2">
          <button
            className="rounded-full bg-white p-2 shadow hover:bg-gray-50"
            type="button"
          >
            <Navigation className="size-6 text-blue-500" />
          </button>
          <button className="rounded-full bg-white p-2 shadow hover:bg-gray-50" type="button">
            <Lock className="size-6 text-red-500" />
          </button>
        </div>
      </div>

      {/* Current Location Info */}
      <div className="mt-4 flex items-center justify-between rounded-lg bg-gray-50 p-3">
        <div className="flex items-center gap-2">
          <Navigation className="text-blue-500" />
          <span className="text-sm font-bold">Current Location:</span>
          <span className="text-sm text-gray-600">Main Building - Floor 1</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Last Updated: 2 sec ago</span>
        </div>
      </div>
    </div>
  );
}
