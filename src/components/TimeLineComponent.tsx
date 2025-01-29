/* eslint-disable @next/next/no-img-element */
// components/IncidentTimeline.tsx
'use client';

import { AlertTriangle, Battery, Bell, Camera, Clock, Filter, Shield } from 'lucide-react';
import { useState } from 'react';

type Incident = {
  id: string;
  timestamp: Date;
  type: 'alert' | 'detection' | 'patrol' | 'system' | 'battery';
  camera: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  details?: string;
  thumbnail?: string;
};

// Example data
const MOCK_INCIDENTS: Incident[] = [
  {
    id: '1',
    timestamp: new Date('2024-01-30T10:30:00'),
    type: 'alert',
    camera: 'Camera 1',
    description: 'Unauthorized person detected in restricted area',
    severity: 'high',
    details: 'Person detected near server room entrance',
    thumbnail: '/thief.jpeg',
  },
  {
    id: '2',
    timestamp: new Date('2024-01-30T10:25:00'),
    type: 'patrol',
    camera: 'Camera 2',
    description: 'Completed patrol route A',
    severity: 'low',
  },
  {
    id: '3',
    timestamp: new Date('2024-01-30T10:20:00'),
    type: 'detection',
    camera: 'Camera 1',
    description: 'Multiple people detected in loading dock',
    severity: 'medium',
    thumbnail: '/multiple.jpeg',
  },
  {
    id: '4',
    timestamp: new Date('2024-01-30T10:15:00'),
    type: 'battery',
    camera: 'Camera 2',
    description: 'Low battery warning (25%)',
    severity: 'medium',
  },
  {
    id: '5',
    timestamp: new Date('2024-01-30T10:10:00'),
    type: 'system',
    camera: 'Camera 1',
    description: 'System update completed',
    severity: 'low',
  },
];

export function IncidentTimeline() {
  const [filter, setFilter] = useState<string>('all');
  const [incidents] = useState<Incident[]>(MOCK_INCIDENTS);

  const getIcon = (type: Incident['type']) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="text-red-500" />;
      case 'detection':
        return <Camera className="text-blue-500" />;
      case 'patrol':
        return <Shield className="text-green-500" />;
      case 'system':
        return <Bell className="text-purple-500" />;
      case 'battery':
        return <Battery className="text-yellow-500" />;
      default:
        return <Clock className="text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: Incident['severity']) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 border-red-500';
      case 'medium':
        return 'bg-yellow-100 border-yellow-500';
      case 'low':
        return 'bg-blue-100 border-blue-500';
    }
  };

  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-bold">Incident Timeline</h3>

        <div className="flex items-center gap-2">
          <Filter className="size-4 text-gray-500" />
          <select
            className="rounded-md border border-gray-300 px-2 py-1 text-sm"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          >
            <option value="all">All Events</option>
            <option value="alert">Alerts</option>
            <option value="detection">Detections</option>
            <option value="patrol">Patrol</option>
            <option value="system">System</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {incidents.map(incident => (
          <div
            key={incident.id}
            className={`relative rounded-lg border-l-4 p-4 ${getSeverityColor(incident.severity)}`}
          >
            <div className="flex items-start gap-4">
              <div className="mt-1">
                {getIcon(incident.type)}
              </div>

              <div className="flex-1">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm font-medium">{incident.description}</span>
                  <span className="text-xs text-gray-500">
                    {incident.timestamp.toLocaleTimeString()}
                  </span>
                </div>

                <div className="mb-2 text-xs text-gray-600">
                  {incident.camera}
                  {' '}
                  •
                  {incident.type.charAt(0).toUpperCase() + incident.type.slice(1)}
                </div>

                {incident.details && (
                  <p className="text-xs text-gray-600">{incident.details}</p>
                )}

                {incident.thumbnail && (
                  <div className="mt-2">
                    <img
                      src={incident.thumbnail}
                      alt="Incident thumbnail"
                      className="rounded"
                      width={120}
                      height={80}

                    />
                  </div>
                )}
              </div>

              <button
                className="rounded px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50"
                onClick={() => {}}
                type="button"
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
