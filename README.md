# Conductor Assistant

AI-Powered Gesture Recognition System for Intelligent Presentation Assistance

---

## Overview

Conductor Assistant is an innovative presentation assistant that combines real-time hand gesture recognition with AI-powered content analysis. The system enables presenters to interact with their slides naturally through hand gestures while receiving intelligent assistance from Google's Gemini AI.

- **Real-time Hand Gesture Detection**: Uses MediaPipe for accurate hand tracking and gesture classification
- **AI-Powered Content Analysis**: Leverages Google Gemini API for slide summarization and audience question prediction
- **Modern Full-Stack Architecture**: React + TypeScript frontend with Rust + Axum backend
- **Seamless Frontend-Backend Communication**: RESTful API with CORS support for cross-origin requests
- **Professional UI/UX**: Premium glassmorphism design with smooth animations powered by Framer Motion

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         User Browser                             │
│                      (localhost:5173)                            │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │          React Frontend (TypeScript + Vite)                 │ │
│  │  • ConductorDashboard Component                            │ │
│  │  • Hand Tracking Hook (MediaPipe)                          │ │
│  │  • Gesture Detection (✋ Raise Hand / ✊ Fist)              │ │
│  │  • Webcam Integration (react-webcam)                       │ │
│  │  • AI Service Client                                       │ │
│  └───────────────────┬────────────────────────────────────────┘ │
└────────────────────┼─────────────────────────────────────────────┘
                      │
                      │ HTTP POST /ai-assist
                      │ { command, text }
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│               Rust Backend API (Axum)                            │
│                   (localhost:3000)                               │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  • API Handlers (handlers.rs)                              │ │
│  │    - POST /ai-assist → AI command processing              │ │
│  │    - GET /health → Health check                           │ │
│  │                                                            │ │
│  │  • AI Service (ai_service.rs)                             │ │
│  │    - Command routing (summarize/ask-question)             │ │
│  │    - Prompt engineering                                   │ │
│  │    - Gemini API integration                               │ │
│  └───────────────────┬────────────────────────────────────────┘ │
└────────────────────┼─────────────────────────────────────────────┘
                      │
                      │ HTTPS POST
                      │ https://generativelanguage.googleapis.com/v1/
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Google Gemini API                              │
│                  (gemini-1.5-flash)                             │
│  • Natural Language Processing                                  │
│  • Content Summarization                                        │
│  • Question Generation                                          │
└─────────────────────────────────────────────────────────────────┘
```

---

## Components

### Frontend (`/frontend`)

**Tech Stack:**
- React 19.1.1
- TypeScript 5.9.3
- Vite 7.1.7
- Tailwind CSS 4.1.16
- Framer Motion 12.23.24
- MediaPipe Hands 0.4.1675469240
- react-webcam 7.2.0

**Responsibilities:**
- Render the interactive dashboard UI with glassmorphism design
- Capture video feed from user's webcam
- Perform real-time hand tracking using MediaPipe
- Detect and classify hand gestures (raised hand, fist)
- Display gesture detection feedback with confidence scores
- Communicate with backend API for AI processing
- Display AI-generated summaries and audience questions
- Handle user input for slide content

**Port:** `5173` (Vite dev server)

**Documentation:** [Frontend README](./frontend/README.md)

---

### Backend (`/backend`)

**Tech Stack:**
- Rust (Edition 2021)
- Axum 0.7
- Tokio 1.x (async runtime)
- reqwest 0.12 (HTTP client)
- serde 1.0 (JSON serialization)
- tower-http 0.5 (CORS middleware)
- dotenv 0.15 (environment variables)

**Responsibilities:**
- Provide RESTful API endpoints for frontend communication
- Process AI assistance requests from frontend
- Route commands to appropriate AI processing functions
- Integrate with Google Gemini API for content analysis
- Handle error responses and logging
- Support CORS for cross-origin requests
- Manage API key security through environment variables

**Port:** `3000` (default, configurable via PORT env var)

**Documentation:** [Backend README](./backend/README.md)

---

## Key Features

### Hand Gesture Recognition

The system uses MediaPipe Hands to detect and track 21 hand landmarks in real-time:

- **Raised Hand (✋)**: Triggers "Ask Question" mode
  - Detects 5 extended fingers
  - Generates likely audience questions based on slide content
  - Shows confidence percentage

- **Fist (✊)**: Triggers "Summarize" mode
  - Detects closed hand with 0 extended fingers
  - Generates concise one-sentence summary of slide content
  - Displays key takeaway message

---

## Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **Rust** (latest stable) - [Install via rustup](https://rustup.rs/)
- **Google Gemini API Key** - [Get your key](https://makersuite.google.com/app/apikey)
- **Webcam** - Required for hand gesture detection

### 1. Clone the Repository

```bash
git clone https://github.com/tamim2763/conductor-assistant.git
cd conductor-assistant
```

### 3. Start the Backend Service

Open a terminal in the `backend/` directory:

```bash
cd backend
cargo run
```

Expected output:
```
Starting server on 0.0.0.0:3000
Server listening on 0.0.0.0:3000
```

**Note:** Keep this terminal running. The backend must be running before starting the frontend.

### 4. Start the Frontend Application

Open a **new terminal** in the `frontend/` directory:

```bash
cd frontend
npm install
npm run dev
```

Expected output:
```
  VITE v7.1.7  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 5. Open the Application

Navigate to **[http://localhost:5173](http://localhost:5173)** in your browser.

**Grant webcam permissions when prompted** to enable hand tracking.

---

## How to Use

1. **Allow Webcam Access**: When prompted by your browser, grant permission to use your webcam.

2. **Enter Slide Content**: In the "Slide Content" text area on the right, paste or type your presentation slide text.

3. **Position Your Hand**: Ensure your hand is visible in the webcam feed (left side of the screen).

4. **Make a Gesture**:
   - **Raise Hand (✋)**: All 5 fingers extended → Get a likely audience question
   - **Make Fist (✊)**: All fingers closed → Get a slide summary

5. **Wait for AI Response**: The system will display "Analyzing with AI..." while processing.

6. **View Results**: The AI-generated response appears in the right panel below the input area.

7. **Repeat**: Make another gesture to get a new analysis (the gesture tracker resets after each response).

---

## Future Enhancements

- [ ] **Multi-User Support**: Enable multiple presenters to use the system simultaneously
- [ ] **Gesture Customization**: Allow users to define custom gestures for different actions
- [ ] **Slide Deck Integration**: Integrate with PowerPoint/Google Slides APIs for direct slide control
- [ ] **Voice Commands**: Add speech recognition as an alternative input method
- [ ] **Analytics Dashboard**: Track gesture usage patterns and AI response quality
- [ ] **Offline Mode**: Cache AI responses for frequently used content
- [ ] **Mobile Support**: Optimize UI and hand tracking for mobile devices
- [ ] **Recording Feature**: Record presentations with gesture timestamps
- [ ] **Multi-Language Support**: Support for presentations in different languages
- [ ] **Advanced Gestures**: Add more complex gestures (swipe, pinch, rotate)
- [ ] **Real-time Collaboration**: Enable remote audience participation
- [ ] **Accessibility Features**: Screen reader support and keyboard-only navigation
- [ ] **Docker Deployment**: Containerize both frontend and backend for easy deployment
- [ ] **CI/CD Pipeline**: Automated testing and deployment workflows
- [ ] **WebSocket Support**: Real-time bidirectional communication for instant updates

---

## Acknowledgements

This project was made possible by the following technologies and resources:

- **[Google Gemini API](https://ai.google.dev/)** - Powerful AI model for natural language processing
- **[MediaPipe](https://mediapipe.dev/)** - Cross-platform ML solutions for hand tracking
- **[Axum](https://github.com/tokio-rs/axum)** - Ergonomic and modular web framework for Rust
- **[React](https://react.dev/)** - JavaScript library for building user interfaces
- **[Vite](https://vitejs.dev/)** - Next generation frontend tooling
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Production-ready animation library
- **[Rust Community](https://www.rust-lang.org/community)** - For the amazing ecosystem and support
- **[TypeScript](https://www.typescriptlang.org/)** - JavaScript with syntax for types

---

<div align="center">

[⬆ Back to Top](#conductor-assistant)

</div>
