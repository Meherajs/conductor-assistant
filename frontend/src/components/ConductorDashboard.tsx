import { useRef } from 'react';
import Webcam from 'react-webcam';
import { motion } from 'framer-motion';
import { useHandTracking } from '../hooks/useHandTracking';

export default function ConductorDashboard() {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Activate hand tracking
  useHandTracking({ webcamRef, canvasRef });

  return (
    <div className="relative w-screen h-screen bg-gray-900 flex flex-col items-center overflow-hidden">
      {/* Title */}
      <h1 className="text-4xl font-bold text-white mt-8 mb-6">
        Conductor AI Assistant
      </h1>

      {/* Webcam Container */}
      <div className="relative w-full max-w-4xl mx-auto">
        {/* Webcam */}
        <Webcam
          ref={webcamRef}
          mirrored={true}
          className="w-full rounded-lg"
          screenshotFormat="image/jpeg"
        />

        {/* Canvas overlay - positioned absolutely on top of webcam */}
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
          style={{ transform: 'scaleX(-1)' }} // Mirror to match webcam
        />
      </div>

      {/* Google Slides URL Input */}
      <div className="w-full max-w-4xl mx-auto mt-6 px-4">
        <input
          type="text"
          placeholder="Enter Google Slides URL..."
          className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* AI Results Overlay - Animated placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl mx-auto mt-6 px-4 mb-8"
      >
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 min-h-[150px]">
          <h3 className="text-xl font-semibold text-white mb-3">
            AI Analysis
          </h3>
          <p className="text-gray-400">
            Hand gesture detection and AI responses will appear here...
          </p>
        </div>
      </motion.div>
    </div>
  );
}
