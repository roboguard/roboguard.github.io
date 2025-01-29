// components/ErrorBoundary.tsx
'use client';

import type { ErrorInfo, ReactNode } from 'react';
import { Component } from 'react';

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
};

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex h-full items-center justify-center rounded-lg bg-gray-900 p-4 text-white">
          <div className="text-center">
            <p className="mb-2">Something went wrong</p>
            <button
              type="button"
              onClick={() => this.setState({ hasError: false })}
              className="rounded bg-blue-500 px-4 py-2 hover:bg-blue-600"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
