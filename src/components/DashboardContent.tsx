// app/dashboard/DashboardContent.tsx
'use client';

import { AudioControl } from './AudioControl';
import { CameraGrid } from './CameraGrid';
import { ConnectionStatus } from './ConnectionStatus';
import { AlertsList } from './Metrics';
import { RobotStatus } from './RobotStatus';
import { IncidentTimeline } from './TimeLineComponent';

export function DashboardContent() {
  // const { isConnected } = useSocket();

  // Handle initial connection
  // useEffect(() => {
  //   if (isConnected) {
  //     setIsInitialLoad(false);
  //   }
  // }, [isConnected]);

  // if (error) {
  //   return (
  //     <div className="rounded-lg bg-red-50 p-4 text-red-700">
  //       <h3 className="text-lg font-medium">Connection Error</h3>
  //       <p className="mt-1">{error.message}</p>
  //       <button
  //         type="button"
  //         onClick={() => window.location.reload()}
  //         className="mt-3 rounded bg-red-100 px-3 py-1 text-red-700 hover:bg-red-200"
  //       >
  //         Retry Connection
  //       </button>
  //     </div>
  //   );
  // }

  // if (isInitialLoad) {
  //   return (
  //     <div className="flex h-full items-center justify-center rounded-lg bg-white pt-6">
  //       <div className="text-center text-gray-500">
  //         <div className="mb-4">
  //           <div className="inline-block size-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
  //         </div>
  //         <p>Connecting to cameras...</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="mb-4 bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Security Dashboard
            </h1>
            <ConnectionStatus />
          </div>
        </div>
      </header>
      <AlertsList />
      {/* Main content */}
      <main>
        <div className="mx-auto max-w-[1400px] py-6">
          <div className="mb-6 flex gap-6">
            <div className="flex-1">
              <CameraGrid />
            </div>
            <div className="w-1/3">
              <RobotStatus />
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex-1">
              <IncidentTimeline />
            </div>
            <div className="w-1/3">
              <AudioControl />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
