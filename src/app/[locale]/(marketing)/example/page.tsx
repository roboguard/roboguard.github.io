'use client';

import { useState } from 'react';

export default function Dashboard() {
  const [selectedCamera, setSelectedCamera] = useState<number | null>(null);

  return (
    <div className="mx-4 flex border-2 border-gray-300 bg-gray-100">
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h1 className="text-xl font-bold">RoboGuard</h1>
        </div>
        <nav className="px-4">
          <ul className="space-y-2">
            <li className="cursor-pointer rounded p-2 hover:bg-gray-100">Overview</li>
            <li className="cursor-pointer rounded p-2 hover:bg-gray-100">Live Feed</li>
            <li className="cursor-pointer rounded p-2 hover:bg-gray-100">Alerts</li>
            <li className="cursor-pointer rounded p-2 hover:bg-gray-100">Patrol Routes</li>
            <li className="cursor-pointer rounded p-2 hover:bg-gray-100">Reports</li>
          </ul>
        </nav>
      </div>

      <div className="flex-1 overflow-auto">
        <header className="bg-white p-4 shadow">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">
              {selectedCamera ? `Camera ${selectedCamera} Feed` : 'Security Dashboard'}
            </h2>
            <div className="flex items-center space-x-4">
              <button className="rounded p-2 hover:bg-gray-100" type="button">Notifications</button>
              <button className="rounded p-2 hover:bg-gray-100" type="button">Settings</button>
            </div>
          </div>
        </header>

        <div className="p-6">
          {selectedCamera
            ? (
                <div className="space-y-6">
                  <button
                    className="rounded bg-gray-500 px-4 py-2 text-white"
                    onClick={() => setSelectedCamera(null)}
                    type="button"
                  >
                    {'< Back to Overview'}
                  </button>
                  <div className="rounded-lg bg-white p-4 shadow">
                    <div className="aspect-video rounded bg-gray-900">
                      <div className="flex h-full items-center justify-center text-white">
                        Camera
                        {' '}
                        {selectedCamera}
                        {' '}
                        - Full View
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="rounded-lg bg-white p-4 shadow">
                      <h3 className="mb-4 text-lg font-bold">
                        Camera
                        {selectedCamera}
                        {' '}
                        Status
                      </h3>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span>Resolution</span>
                          <span>1080p</span>
                        </div>
                        <div className="flex justify-between">
                          <span>FPS</span>
                          <span>30</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Night Vision</span>
                          <span className="text-green-500">Active</span>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg bg-white p-4 shadow">
                      <h3 className="mb-4 text-lg font-bold">Camera Controls</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <button className="rounded bg-blue-500 p-2 text-white" type="button">Pan Left</button>
                        <button className="rounded bg-blue-500 p-2 text-white" type="button">Pan Right</button>
                        <button className="rounded bg-blue-500 p-2 text-white" type="button">Zoom In</button>
                        <button className="rounded bg-blue-500 p-2 text-white" type="button">Zoom Out</button>
                      </div>
                    </div>
                    <div className="rounded-lg bg-white p-4 shadow">
                      <h3 className="mb-4 text-lg font-bold">Robot Status</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span>Battery</span>
                          <span className="font-bold">85%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Connection</span>
                          <span className="text-green-500">Strong</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Current Location</span>
                          <span>Zone A</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Status</span>
                          <span>On Patrol</span>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg bg-white p-4 shadow">
                      <h3 className="mb-4 text-lg font-bold">Recent Alerts</h3>
                      <div className="space-y-2">
                        {[1, 2, 3].map(alert => (
                          <div key={alert} className="rounded bg-gray-50 p-2">
                            Motion detected in Zone B -
                            {' '}
                            {new Date().toLocaleTimeString()}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-lg bg-white p-4 shadow">
                      <h3 className="mb-4 text-lg font-bold">Quick Actions</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <button className="rounded bg-red-500 p-2 text-white" type="button">Emergency Stop</button>
                        <button className="rounded bg-blue-500 p-2 text-white" type="button">Return Home</button>
                        <button className="rounded bg-yellow-500 p-2 text-white" type="button">Sound Alarm</button>
                        <button className="rounded bg-green-500 p-2 text-white" type="button">Two-way Audio</button>
                      </div>
                    </div>
                  </div>

                </div>
              )
            : (
                <div className="gap-6">
                  <div className="rounded-lg bg-white p-4 shadow">
                    <h3 className="mb-4 text-lg font-bold">Live Camera Feeds</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map(camera => (
                        <div
                          key={camera}
                          className="aspect-video cursor-pointer rounded bg-gray-900"
                          onClick={() => setSelectedCamera(camera)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              setSelectedCamera(camera);
                            }
                          }}
                          role="button"
                          tabIndex={0}
                        >
                          <div className="flex h-full items-center justify-center text-white">
                            Camera
                            {' '}
                            {camera}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
        </div>
      </div>
    </div>
  );
}
