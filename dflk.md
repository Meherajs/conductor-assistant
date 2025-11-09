# Project Blueprint: "Conductor" - AI Presentation Assistant (Rust Backend)

This document outlines the 3-part architecture for the AI Presentation Assistant. This version is optimized for a Rust-based AI backend by performing all Computer Vision (CV) in the frontend.

---

### 1. Frontend: The "Conductor" Dashboard (JS/TS) - *Your Part*

* **Responsibilities:**
    * Display the user's webcam feed in real-time.
    * Use `@mediapipe/hands` (in the browser) to find hand landmarks.
    * Draw hand landmarks (skeletons) on the video feed for visual feedback.
    * **[NEW]** **Analyze landmarks *in the frontend*** to classify gestures (e.g., "swipe-left", "fist", "raise-hand").
    * Display the AI-generated content (summaries, Q&A) received from the Rust Backend (Part 2).
    * Provide a UI to input the Google Slides/PowerPoint URL.

* **Technology Choices:**
    * **Framework:** React (Vite + TypeScript).
    * **Styling:** Tailwind CSS.
    * **Camera:** `react-webcam`.
    * **CV (in frontend):** `@mediapipe/hands`.

* **Communication:**
    * **[DELETED]** No longer needs to send video frames to the backend.
    * **[KEPT]** `fetch` (REST) to send slide text to the `/ai-assist` endpoint (Part 2) when a "fist" or "raise-hand" gesture is detected.
    * **[KEPT]** `WebSocket` client to send slide control commands (e.g., `slide:next`) to the Slide Controller (Part 3) when a "swipe" gesture is detected.

---

### 2. Backend: Text AI (Rust) - *Teammate 1 (Backend)*

* **Responsibilities:**
    * **[DELETED]** All Gesture Recognition responsibilities are moved to the frontend.
    * **[KEPT]** **Text AI (LLM):**
        * Create an endpoint that accepts slide text and a command (e.g., "summarize" or "ask-question").
        * Call a Large Language Model (e.g., Gemini API) with the appropriate prompt.
        * Return the LLM's text response to the frontend.

* **Technology Choices:**
    * **[CHANGED]** **Framework:** **Rust** (e.g., `axum`, `actix-web`, or `rocket`).
    * **[DELETED]** CV library (`mediapipe`) is not needed.
    * **[CHANGED]** **AI (LLM):** Use the `reqwest` crate to make HTTP client calls to the Gemini or OpenAI API.

* **API Endpoints (Simplified):**
    * **[DELETED]** `POST /gesture` is no longer needed.
    * **[KEPT]** **`POST /ai-assist`**:
        * **Sends:** `{"command": "summarize", "text": "This slide is about..."}`.
        * **Returns:** `{"result": "The key takeaway is..."}`.

---

### 3. Backend: Slide Controller (Node.js) - *Teammate 2 (Backend)*

*(This part is unchanged, as Node.js is the best tool for this specific job.)*

* **Responsibilities:**
    * This is the "integration" layer that controls the actual presentation.
    * Listens for commands from the frontend via a WebSocket.
    * Uses a browser automation tool (`puppeteer` or `playwright`) to control a real browser tab.
    * When it receives a command (e.g., `slide:next`), it programmatically presses the correct key (e.g., "Arrow Right") in the presentation tab.

* **Technology Choices:**
    * **Framework:** Node.js.
    * **Automation:** `puppeteer` or `playwright`.
    * **Communication:** `ws` library for a simple WebSocket server.

* **Workflow:**
    1.  User starts this server, which launches Chrome and navigates to the Google Slides URL.
    2.  Frontend (Part 1) connects to this server via WebSocket.
    3.  User makes a "swipe-left" gesture.
    4.  Frontend (Part 1) classifies the gesture and sends a WebSocket message: `{"command": "slide:prev"}`.
    5.  This server (Part 3) receives the message and tells `puppeteer` to press the "Arrow Left" key.