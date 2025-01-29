// components/CameraStream.tsx
'use client';

import { useSocket } from '@/hooks/useSocket';
import { useCallback, useEffect, useRef, useState } from 'react';

type CameraStreamProps = {
  cameraId: string;
  onMotionDetected?: (cameraId: string) => void;
};

export function CameraStream({ cameraId }: CameraStreamProps) {
  const { socket, isConnected } = useSocket();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [originalDimensions, setOriginalDimensions] = useState({ width: 320, height: 240 });
  const [dimensions, setDimensions] = useState({ width: 320, height: 240 });

  // Refs for performance optimization
  const streamActive = useRef(false);
  const frameQueue = useRef<Blob[]>([]);
  const isProcessing = useRef(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleImageLoad = useCallback(() => {
    if (imgRef.current) {
      const { naturalWidth, naturalHeight, clientWidth, clientHeight } = imgRef.current;
      setOriginalDimensions({
        width: naturalWidth,
        height: naturalHeight,
      });
      setDimensions({
        width: clientWidth,
        height: clientHeight,
      });

      // if (canvasRef.current) {
      //   canvasRef.current.width = naturalWidth;
      //   canvasRef.current.height = naturalHeight;
      // }
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (imgRef.current) {
        handleImageLoad();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleImageLoad]);

  const processNextFrame = useCallback(() => {
    if (frameQueue.current.length === 0 || isProcessing.current || !streamActive.current) {
      return;
    }

    isProcessing.current = true;
    const blob = frameQueue.current.shift();

    if (blob && imgRef.current) {
      const url = URL.createObjectURL(blob);
      imgRef.current.src = url;
      setIsLoading(false);
      setError(null);

      // Cleanup old URL after frame is loaded
      imgRef.current.onload = () => {
        URL.revokeObjectURL(url);
        isProcessing.current = false;

        // Process next frame if available
        if (frameQueue.current.length > 0) {
          requestAnimationFrame(processNextFrame);
        }
      };
    } else {
      isProcessing.current = false;
    }
  }, []);

  const handleFrame = useCallback((frameData: string) => {
    if (!streamActive.current) {
      return;
    }

    try {
      // Convert hex string to Uint8Array
      const bytes = new Uint8Array(
        frameData.match(/.{1,2}/g)?.map(byte => Number.parseInt(byte, 16)) || [],
      );

      const blob = new Blob([bytes], { type: 'image/jpeg' });

      if (frameQueue.current.length > 2) {
        frameQueue.current = frameQueue.current.slice(-2);
      }

      frameQueue.current.push(blob);
      requestAnimationFrame(processNextFrame);
    } catch (err) {
      setError('Failed to process frame');
      console.error('Frame processing error:', err);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const drawDetections = useCallback((detections: any[]) => {
    if (!canvasRef.current || !imgRef.current) {
      return;
    }
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) {
      return;
    }

    // Get current dimensions
    const canvasWidth = canvasRef.current.width;
    const canvasHeight = canvasRef.current.height;

    // Original dimensions from server
    const originalWidth = originalDimensions.width;
    const originalHeight = originalDimensions.height;

    // Calculate scale factors
    const scaleX = canvasWidth / originalWidth;
    const scaleY = canvasHeight / originalHeight;

    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Group detections by class
    const personDetections = [];
    const otherDetections = [];

    for (const det of detections) {
      if (det.class === 'person') {
        personDetections.push(det);
      } else {
        otherDetections.push(det);
      }
    }

    // Set common text properties
    const baseFontSize = Math.max(12, Math.floor(16 * Math.min(scaleX, scaleY)));
    ctx.font = `${baseFontSize}px sans-serif`;
    ctx.lineWidth = 2;

    // Draw person detections (red)
    if (personDetections.length > 0) {
      ctx.beginPath();
      ctx.strokeStyle = '#ff0000';
      ctx.fillStyle = '#ff0000';

      for (const det of personDetections) {
        const [x1, y1, x2, y2] = det.bbox;
        const scaledX1 = x1 * scaleX;
        const scaledY1 = y1 * scaleY;
        const scaledX2 = x2 * scaleX;
        const scaledY2 = y2 * scaleY;

        ctx.rect(
          scaledX1,
          scaledY1,
          scaledX2 - scaledX1,
          scaledY2 - scaledY1,
        );

        // Add label
        const label = `${det.class} ${(det.confidence * 100).toFixed(0)}%`;
        ctx.fillText(label, scaledX1, scaledY1 - 5);
      }
      ctx.stroke();
    }

    // Draw other detections (green)
    if (otherDetections.length > 0) {
      ctx.beginPath();
      ctx.strokeStyle = '#00ff00';
      ctx.fillStyle = '#00ff00';

      for (const det of otherDetections) {
        const [x1, y1, x2, y2] = det.bbox;
        const scaledX1 = x1 * scaleX;
        const scaledY1 = y1 * scaleY;
        const scaledX2 = x2 * scaleX;
        const scaledY2 = y2 * scaleY;

        ctx.rect(
          scaledX1,
          scaledY1,
          scaledX2 - scaledX1,
          scaledY2 - scaledY1,
        );

        // Add label
        const label = `${det.class} ${(det.confidence * 100).toFixed(0)}%`;
        ctx.fillText(label, scaledX1, scaledY1 - 5);
      }
      ctx.stroke();
    }
  }, [originalDimensions.height, originalDimensions.width]);

  const handleWebSocketMessage = useCallback((event: MessageEvent) => {
    try {
      const message = JSON.parse(event.data) as {
        camera_id: string;
        type: string;
        frame?: string;
        detections?: any[];
        person_count?: number;
      };

      // Check if this message is for this camera
      if (message.camera_id === cameraId) {
        if (message.type === 'stream' && message.frame) {
          handleFrame(message.frame);
        }

        if (message.detections) {
          drawDetections(message.detections);
        }
      }
    } catch (err) {
      console.error('Error handling WebSocket message:', err);
    }
  }, [cameraId, handleFrame, drawDetections]);

  // Main effect for socket management
  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.addEventListener('message', handleWebSocketMessage);
    streamActive.current = true; // This was missing

    return () => {
      socket.removeEventListener('message', handleWebSocketMessage);
      streamActive.current = false; // And this
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  if (error) {
    return (
      <div className="flex h-full items-center justify-center rounded-lg bg-gray-900 p-4 text-white">
        <div className="text-center">
          <p className="mb-2">{error}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded bg-red-500 px-4 py-2 hover:bg-red-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-lg bg-gray-900">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="size-8 animate-spin rounded-full border-b-2 border-white" />
        </div>
      )}
      {!isConnected && (
        <div className="absolute inset-0 flex items-center justify-center text-white">
          Connecting...
        </div>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        alt={`Camera ${cameraId}`}
        className="size-full object-cover"
        onLoad={handleImageLoad}
      />
      <div className="absolute bottom-2 left-2 rounded bg-black/50 px-2 py-1 text-sm text-white">
        Camera
        {cameraId}
        {isConnected ? '🟢' : '🔴'}
      </div>
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0"
        width={dimensions.width}
        height={dimensions.height}
      />
    </div>
  );
}
