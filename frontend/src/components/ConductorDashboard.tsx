import { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { motion, AnimatePresence } from 'framer-motion';
import { useHandTracking } from '../hooks/useHandTracking';
import type { GestureResult } from '../utils/gestureDetection';

export default function ConductorDashboard() {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [slideText, setSlideText] = useState(
    "Sample slide content: This presentation discusses the implementation of an AI-powered gesture recognition system. The system uses MediaPipe for hand tracking and integrates with a Rust backend that leverages Google's Gemini API for intelligent text analysis. Key features include real-time gesture detection, natural language processing, and seamless frontend-backend communication."
  );
  const [aiResponse, setAIResponse] = useState<string>('');
  const [lastCommand, setLastCommand] = useState<string>('');
  const [currentGesture, setCurrentGesture] = useState<GestureResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleGestureDetected = (gesture: GestureResult) => {
    setCurrentGesture(gesture);
  };

  const handleAIResponse = (response: string, command: string) => {
    setAIResponse(response);
    setLastCommand(command);
    setIsProcessing(false);
    
    // Auto-clear after 10 seconds
    setTimeout(() => {
      if (lastCommand === command) {
        setAIResponse('');
        setLastCommand('');
      }
    }, 10000);
  };

  // Activate hand tracking
  useHandTracking({ 
    webcamRef, 
    canvasRef, 
    onGestureDetected: handleGestureDetected,
    onAIResponse: (response, command) => {
      setIsProcessing(true);
      handleAIResponse(response, command);
    },
    slideText 
  });

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

      {/* Slide Text Input */}
      <div className="w-full max-w-4xl mx-auto mt-6 px-4">
        <textarea
          value={slideText}
          onChange={(e) => setSlideText(e.target.value)}
          placeholder="Enter your slide text here... (This will be sent to the AI when you make a gesture)"
          className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={3}
        />
        <p className="text-sm text-gray-400 mt-2">
          👋 Raise hand (5 fingers) = Ask Question | ✊ Make fist = Summarize
        </p>
      </div>

      {/* AI Results Overlay - Animated */}
      <AnimatePresence>
        {(aiResponse || isProcessing) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl mx-auto mt-6 px-4 mb-8"
          >
            <div className={`border rounded-lg p-6 min-h-[150px] ${
              lastCommand === 'error' 
                ? 'bg-red-900 border-red-700' 
                : 'bg-gradient-to-br from-blue-900 to-purple-900 border-blue-700'
            }`}>
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-semibold text-white">
                  {isProcessing ? '🤔 Processing...' : 
                   lastCommand === 'ask-question' ? '❓ Likely Audience Question' :
                   lastCommand === 'summarize' ? '📝 Key Takeaway' :
                   '⚠️ Error'}
                </h3>
                {currentGesture && (
                  <span className="text-sm text-blue-300 bg-blue-800/50 px-3 py-1 rounded-full">
                    {currentGesture.type === 'raised-hand' ? '👋' : 
                     currentGesture.type === 'fist' ? '✊' : '👁️'}
                  </span>
                )}
              </div>
              {isProcessing ? (
                <div className="flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  <p className="text-gray-300">Connecting to AI...</p>
                </div>
              ) : (
                <p className="text-white text-lg leading-relaxed">
                  {aiResponse}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      <div className="w-full max-w-4xl mx-auto px-4 mb-4">
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <h4 className="text-white font-semibold mb-2">🎯 How to Use:</h4>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>1. Enter your slide text in the box above</li>
            <li>2. Hold your hand in front of the camera</li>
            <li>3. Raise hand (5 fingers) for 1 second → AI asks a likely question</li>
            <li>4. Make a fist for 1 second → AI summarizes the key point</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
