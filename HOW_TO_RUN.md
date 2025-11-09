# 🎯 How to Run the AI Presentation Assistant

## Complete Setup and Demo Guide

This guide will walk you through setting up and running both the **Rust backend** and **React frontend** to see the full AI Presentation Assistant in action.

---

## 📋 Prerequisites

Before starting, make sure you have:

- ✅ **Rust** (1.70+) - [Install here](https://rustup.rs/)
- ✅ **Node.js** (18+) - [Install here](https://nodejs.org/)
- ✅ **Gemini API Key** - [Get one here](https://makersuite.google.com/app/apikey)
- ✅ **Webcam** - For hand gesture detection

---

## 🚀 Quick Start (2 Terminal Setup)

### Terminal 1: Backend (Rust)

```bash
# Navigate to backend
cd backend

# Create .env file
cp .env.example .env

# Edit .env and add your GEMINI_API_KEY
# GEMINI_API_KEY=your_actual_api_key_here

# Run the backend
cargo run
```

**Expected Output:**
```
Starting server on 0.0.0.0:3000
Server listening on 0.0.0.0:3000
```

✅ Backend is ready at `http://localhost:3000`

---

### Terminal 2: Frontend (React)

```bash
# Navigate to frontend
cd frontend

# Install dependencies (first time only)
npm install

# Start the dev server
npm run dev
```

**Expected Output:**
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

✅ Frontend is ready at `http://localhost:5173`

---

## 🎮 How to Use

1. **Open your browser** → Go to `http://localhost:5173`

2. **Allow camera access** when prompted

3. **Enter slide text** in the text area (or use the default sample)

4. **Make gestures in front of your webcam:**

   ### 👋 Raise Hand (5 fingers extended)
   - Hold for 1 second
   - AI will generate a **likely audience question** about your slide
   
   ### ✊ Make a Fist (fingers closed)
   - Hold for 1 second
   - AI will generate a **summary/key takeaway** of your slide

5. **See the results** appear in the AI Analysis section below!

---

## 🔍 What You'll See

### In the Browser:

1. **Webcam Feed** - Live video with hand tracking overlay
2. **Green Lines** - Hand skeleton tracking
3. **Red Dots** - Hand landmark points
4. **Gesture Label** - Shows what gesture is detected
5. **Slide Text Box** - Where you enter your presentation content
6. **AI Analysis Box** - Shows AI responses with animations
7. **Instructions** - Quick reference guide

### Sample Interaction:

```
You: [Raise hand gesture for 1 second]
UI: Shows "Raised Hand (5 fingers extended) - Ask Question"
AI: "How does the gesture recognition system handle varying lighting conditions?"

You: [Make fist gesture for 1 second]
UI: Shows "Fist (0 fingers extended) - Summarize"
AI: "The key takeaway is that MediaPipe and Gemini API enable real-time AI-powered presentation assistance."
```

---

## 🧪 Testing the API Manually

### Test Backend Health

```bash
curl http://localhost:3000/health
# Expected: OK
```

### Test Summarize

```bash
curl -X POST http://localhost:3000/ai-assist \
  -H "Content-Type: application/json" \
  -d '{
    "command": "summarize",
    "text": "This slide explains machine learning fundamentals including neural networks, training data, and model optimization techniques."
  }'

# Expected: {"result":"The key takeaway is..."}
```

### Test Ask Question

```bash
curl -X POST http://localhost:3000/ai-assist \
  -H "Content-Type: application/json" \
  -d '{
    "command": "ask-question",
    "text": "This slide explains machine learning fundamentals including neural networks, training data, and model optimization techniques."
  }'

# Expected: {"result":"What are the main challenges in..."}
```

---

## 🐛 Troubleshooting

### Backend Issues

**Problem: "GEMINI_API_KEY must be set"**
```bash
# Solution:
cd backend
nano .env  # or use your preferred editor
# Add: GEMINI_API_KEY=your_actual_key
```

**Problem: Port 3000 already in use**
```bash
# Solution: Change port in backend/.env
PORT=3001

# Update frontend to match:
# Edit frontend/src/services/aiService.ts
# Change: const API_BASE_URL = 'http://localhost:3001';
```

**Problem: Rust compile errors**
```bash
# Solution:
cd backend
cargo clean
cargo build
```

---

### Frontend Issues

**Problem: "Cannot find module" errors**
```bash
# Solution:
cd frontend
rm -rf node_modules package-lock.json
npm install
```

**Problem: Camera not working**
- Check browser permissions (click lock icon in address bar)
- Try a different browser (Chrome works best)
- Make sure no other app is using the camera

**Problem: Hand tracking not showing**
- Make sure you're in good lighting
- Hold your hand clearly in view
- Try moving closer/farther from camera
- Check browser console for errors (F12)

**Problem: AI responses showing errors**
- Make sure backend is running (`http://localhost:3000/health` returns OK)
- Check backend terminal for error messages
- Verify your Gemini API key is valid

---

## 📊 System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                        Browser                          │
│  ┌───────────────────────────────────────────────────┐  │
│  │  React Frontend (http://localhost:5173)           │  │
│  │  ┌─────────────┐  ┌──────────────┐  ┌──────────┐ │  │
│  │  │  Webcam     │  │  MediaPipe   │  │   UI     │ │  │
│  │  │  Component  │→ │  Hand Track  │→ │ Display  │ │  │
│  │  └─────────────┘  └──────────────┘  └──────────┘ │  │
│  │         ↓                                          │  │
│  │  ┌──────────────────────────────────────────┐     │  │
│  │  │  Gesture Detection (raised-hand / fist)  │     │  │
│  │  └──────────────────────────────────────────┘     │  │
│  │         ↓                                          │  │
│  │  ┌──────────────────────────────────────────┐     │  │
│  │  │  AI Service (HTTP POST to backend)       │     │  │
│  │  └──────────────────────────────────────────┘     │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                          ↓ HTTP
┌─────────────────────────────────────────────────────────┐
│  Rust Backend (http://localhost:3000)                   │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Axum Web Server                                  │  │
│  │  ┌─────────────┐  ┌──────────────┐  ┌──────────┐ │  │
│  │  │  /ai-assist │→ │  AI Service  │→ │  Gemini  │ │  │
│  │  │  endpoint   │  │  Module      │  │   API    │ │  │
│  │  └─────────────┘  └──────────────┘  └──────────┘ │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## 🎯 Feature Checklist

After setup, you should be able to:

- ✅ See yourself in the webcam
- ✅ See green hand skeleton when you show your hand
- ✅ See gesture labels update in real-time
- ✅ Hold raised hand → See "Raised Hand - Ask Question"
- ✅ Hold fist → See "Fist - Summarize"
- ✅ Get AI responses after holding gesture for 1 second
- ✅ Edit slide text and get different AI responses
- ✅ See animated UI with loading states

---

## 📝 Next Steps

Once everything is working, you can:

1. **Customize the slide text** - Enter your actual presentation content
2. **Adjust gesture sensitivity** - Edit `GestureTracker` hold time in `gestureDetection.ts`
3. **Add more gestures** - Extend the gesture detection logic
4. **Integrate with Google Slides** - Add API to fetch slide content
5. **Deploy to production** - Build and host both frontend and backend

---

## 🎥 Expected Demo Flow

1. **Start both servers** (backend + frontend)
2. **Open browser** to `http://localhost:5173`
3. **Allow camera** permission
4. **Show hand** to camera
5. **See green tracking** overlay on your hand
6. **Raise all 5 fingers** and hold for 1 second
7. **Watch** as "Processing..." appears
8. **Read** the AI-generated question
9. **Make a fist** and hold for 1 second
10. **Read** the AI-generated summary

---

## 💡 Tips for Best Experience

- **Good lighting** helps hand detection
- **Solid background** improves tracking
- **Hold gestures steady** for 1 second
- **One hand at a time** works best
- **Keep hand in frame** and clearly visible
- **Sample text provided** - try it first before custom content

---

## 🆘 Need Help?

### Check Logs

**Backend logs:**
```bash
# In backend terminal, you should see:
conductor_assistant_backend=debug,tower_http=debug
Received AI assist request - command: summarize, text length: 123
Successfully processed AI request
```

**Frontend logs:**
```bash
# In browser console (F12), you should see:
Hand tracking initialized
Gesture detected: raised-hand
Calling AI service...
AI response received
```

### Common Success Indicators

✅ Backend: `Server listening on 0.0.0.0:3000`  
✅ Frontend: `Local: http://localhost:5173/`  
✅ Browser: Camera permission granted  
✅ Webcam: Green hand skeleton visible  
✅ Console: No red errors  

---

## 🎉 You're Ready!

Both systems are now connected and working together. Enjoy your AI-powered presentation assistant!

**Questions or issues?** Check the troubleshooting section above or review the logs for error messages.
