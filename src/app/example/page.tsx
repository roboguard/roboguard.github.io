// app/dashboard/page.tsx
'use client';

import { DashboardContent } from '@/components/DashboardContent';
import { DashboardSkeleton } from '@/components/DashboardSkeleton';
import { ErrorBoundary } from '@/components/StreamErrorBoundry';
import { SocketProvider } from '@/context/SocketContext';
import { Suspense } from 'react';

export default function DashboardPage() {
  return (
    <ErrorBoundary>
      <SocketProvider>
        <Suspense fallback={<DashboardSkeleton />}>
          <DashboardContent />
        </Suspense>
      </SocketProvider>
    </ErrorBoundary>
  );
}
