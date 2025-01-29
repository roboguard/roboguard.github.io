/* eslint-disable react/no-array-index-key */
// components/VoiceControl.tsx
'use client';

import { Mic, MicOff, Play, Radio, Save, Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';

type AudioRecord = {
  id: string;
  timestamp: Date;
  duration: number;
  source: 'operator' | 'robot';
  camera: string;
  saved: boolean;
};

const MOCK_RECORDINGS: AudioRecord[] = [
  {
    id: '1',
    timestamp: new Date('2024-01-30T10:45:00'),
    duration: 8,
    source: 'operator',
    camera: 'Camera 1',
    saved: true,
  },
  {
    id: '2',
    timestamp: new Date('2024-01-30T10:42:00'),
    duration: 15,
    source: 'robot',
    camera: 'Camera 2',
    saved: true,
  },
];

export function AudioControl() {
  const [isTalking, setIsTalking] = useState(false);
  const [isListening, setIsListening] = useState(true);
  const [volume, setVolume] = useState(80);
  const [recordings, setRecordings] = useState<AudioRecord[]>(MOCK_RECORDINGS);

  const [presetMessages] = useState([
    'Please show your ID',
    'This is a restricted area',
    'Security has been notified',
    'Please exit the building',
  ]);

  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <h3 className="mb-4 text-lg font-bold">Two-Way Communication</h3>

      {/* Main Controls */}
      <div className="mb-4 grid grid-cols-2 gap-4">
        <div className="flex flex-col items-center rounded-lg bg-gray-50 p-4">
          <span className="mb-2 text-sm font-medium">Talk</span>
          <button
            className={`rounded-full p-4 ${
              isTalking ? 'bg-red-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => setIsTalking(!isTalking)}
            type="button"
          >
            {isTalking ? <MicOff /> : <Mic />}
          </button>
          {isTalking && (
            <div className="mt-2 text-sm text-red-500">Recording...</div>
          )}
        </div>

        <div className="flex flex-col items-center rounded-lg bg-gray-50 p-4">
          <span className="mb-2 text-sm font-medium">Listen</span>
          <button
            className={`rounded-full p-4 ${
              isListening ? 'bg-green-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => setIsListening(!isListening)}
            type="button"
          >
            {isListening ? <Volume2 /> : <VolumeX />}
          </button>
          {isListening && (
            <div className="mt-2 text-sm text-green-500">Active</div>
          )}
        </div>
      </div>

      {/* Quick Messages */}
      <div className="mb-4">
        <h4 className="mb-2 text-sm font-medium">Quick Messages</h4>
        <div className="grid grid-cols-2 gap-2">
          {presetMessages.map((message, index) => (
            <button
              key={index}
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-blue-600 hover:bg-gray-50"
              onClick={() => {}}
              type="button"
            >
              {message}
            </button>
          ))}
        </div>
      </div>

      {/* Volume Control */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Speaker Volume</span>
          <span className="text-sm text-gray-500">
            {volume}
            %
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={e => setVolume(Number(e.target.value))}
          className="mt-2 w-full"
        />
      </div>

      {/* Recent Recordings */}
      <div>
        <h4 className="mb-2 text-sm font-medium">Recent Recordings</h4>
        <div className="space-y-2">
          {recordings.map(recording => (
            <div
              key={recording.id}
              className="flex items-center justify-between rounded-lg border border-gray-200 p-2"
            >
              <div className="flex items-center gap-2">
                <button className="rounded-full bg-gray-100 p-1.5 hover:bg-gray-200" type="button">
                  <Play className="size-4" />
                </button>
                <div>
                  <div className="text-sm font-medium">
                    {recording.source === 'operator' ? 'Operator Message' : 'Robot Audio'}
                  </div>
                  <div className="text-xs text-gray-500">
                    {recording.timestamp.toLocaleTimeString()}
                    {' '}
                    •
                    {recording.duration}
                    s
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!recording.saved && (
                  <button
                    className="rounded p-1 hover:bg-gray-100"
                    type="button"
                  >
                    <Save className="size-4 text-blue-500" />
                  </button>
                )}
                <Radio className={recording.source === 'operator' ? 'text-blue-500' : 'text-green-500'} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
