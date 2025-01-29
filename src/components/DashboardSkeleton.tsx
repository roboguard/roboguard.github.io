// app/dashboard/DashboardSkeleton.tsx
export function DashboardSkeleton() {
  return (
    <div className="min-h-screen animate-pulse bg-gray-100">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="h-8 w-48 rounded bg-gray-200" />
        </div>
      </header>

      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex gap-6">
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map(n => (
                  <div key={n} className="aspect-video rounded bg-gray-200" />
                ))}
              </div>
            </div>
            <div className="w-80 space-y-6">
              <div className="h-64 rounded bg-gray-200" />
              <div className="h-96 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
