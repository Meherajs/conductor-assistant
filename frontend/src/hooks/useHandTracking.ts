import { useEffect, useRef } from 'react';
import { Hands, HAND_CONNECTIONS } from '@mediapipe/hands';
import type { Results } from '@mediapipe/hands';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import Webcam from 'react-webcam';

interface UseHandTrackingProps {
  webcamRef: React.RefObject<Webcam | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export function useHandTracking({ webcamRef, canvasRef }: UseHandTrackingProps) {
  const handsRef = useRef<Hands | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Initialize MediaPipe Hands
    const hands = new Hands({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      },
    });

    hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    hands.onResults(onResults);
    handsRef.current = hands;

    // Start detection loop
    startDetection();

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (handsRef.current) {
        handsRef.current.close();
      }
    };
  }, []);

  const onResults = (results: Results) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions to match video
    const video = webcamRef.current?.video;
    if (video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    }

    // Clear the canvas
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw hand landmarks if detected
    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
      for (const landmarks of results.multiHandLandmarks) {
        // Draw connections between landmarks
        drawConnectors(ctx, landmarks, HAND_CONNECTIONS, {
          color: '#00FF00',
          lineWidth: 5,
        });

        // Draw individual landmarks
        drawLandmarks(ctx, landmarks, {
          color: '#FF0000',
          lineWidth: 2,
          radius: 6,
        });
      }
    }

    ctx.restore();
  };

  const startDetection = async () => {
    const video = webcamRef.current?.video;
    const hands = handsRef.current;

    if (
      video &&
      hands &&
      video.readyState === 4 // Video is ready
    ) {
      // Send frame to MediaPipe
      await hands.send({ image: video });
    }

    // Continue the loop
    animationFrameRef.current = requestAnimationFrame(startDetection);
  };

  return {
    isReady: handsRef.current !== null,
  };
}
