# "Conductor" - AI Presentation Assistant

A real-time, gesture-controlled presentation tool with a built-in AI assistant. This project uses your webcam to track your hand gestures to control slides and get live feedback from a Large Language Model (LLM).

## ✨ Current Features

-   ✅ **Real-time Hand Tracking**: Uses `@mediapipe/hands` to detect 21 hand landmarks from your webcam
-   ✅ **Gesture Recognition**: Detects raised hand (5 fingers) and fist gestures
-   ✅ **AI Integration**: Connected to Rust backend with Gemini API for intelligent responses
-   ✅ **Live Visual Feedback**: Draws the hand "skeleton" directly onto the video feed
-   ✅ **AI-Powered Responses**: 
    - 👋 Raise hand → AI generates likely audience questions
    - ✊ Make fist → AI generates slide summaries
-   ✅ **Modern Tech Stack**: React, TypeScript, Vite, Tailwind CSS, and Framer Motion

## 🏗️ Project Structure

This is a monorepo containing:
1.  ✅ `/frontend`: React/TypeScript UI with hand tracking (COMPLETE)
2.  ✅ `/backend`: Rust API server with AI integration (COMPLETE)
3.  🚧 `/gesture-api`: (DEPRECATED - moved to frontend)
4.  🚧 `/slide-controller`: (TODO) Browser automation for slides

## Getting Started (Running the Frontend)

This will run the Part 1 frontend, which is the visual dashboard.

### Prerequisites

-   Node.js (v18 or higher)
-   npm (or `npm.cmd` on PowerShell)

### Installation & Running

1.  **Clone the repository** (if you haven't already).

2.  **Navigate to the frontend folder**:
    ```bash
    cd frontend
    ```

3.  **Install dependencies**:
    ```bash
    npm install
    ```
    *(If you are on PowerShell, you may need to use `npm.cmd install`)*

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

5.  **Open the app**:
    * Open your browser to `http://localhost:5173`.
    * **Allow webcam permission** when prompted.

## How to Use

### 🚀 Quick Start

1. **Start the backend first** (see `/backend/README.md`)
2. **Install frontend dependencies**: `npm install`
3. **Start dev server**: `npm run dev`
4. **Open browser**: `http://localhost:5173`
5. **Allow webcam permission** when prompted
6. **Enter slide text** in the textarea
7. **Make gestures**:
   - 👋 Raise hand (5 fingers) for 1 second → AI asks a question
   - ✊ Make fist for 1 second → AI summarizes the slide
8. **View AI responses** in the analysis section below

### 📋 Full Setup Guide

See `/HOW_TO_RUN.md` in the project root for complete instructions on running both frontend and backend together.

## 🎯 Features Demo

1. Put your hand in front of the camera
2. See real-time hand tracking with green skeleton overlay
3. Gesture labels update live as you move your hand
4. Hold a gesture for 1 second to trigger AI processing
5. AI responses appear with smooth animations

## Tech Stack (Frontend)

-   **React** (with Hooks)
-   **TypeScript**
-   **Vite**
-   **Tailwind CSS**
-   **`react-webcam`**: For accessing the camera feed.
-   **`@mediapipe/hands`**: For in-browser hand tracking.
-   **`framer-motion`**: For UI animations.

