# 🎬 DEMO SCRIPT - AI Presentation Assistant

## Step-by-Step Demo Guide

Follow these steps to demonstrate the AI Presentation Assistant working end-to-end.

---

## 📋 Pre-Demo Checklist

Before starting the demo:

- [ ] Rust installed (`cargo --version`)
- [ ] Node.js installed (`node --version`)
- [ ] Gemini API key obtained
- [ ] Good webcam available
- [ ] Good lighting setup
- [ ] Browser ready (Chrome recommended)

---

## 🚀 PART 1: Start the Backend (Terminal 1)

```bash
# Navigate to project
cd /path/to/conductor-assistant/backend

# Create .env file (if not exists)
cp .env.example .env

# Edit .env and add your Gemini API key
# GEMINI_API_KEY=your_actual_key_here

# Start the backend
cargo run
```

**Wait for:**
```
✅ "Server listening on 0.0.0.0:3000"
```

**Test it works:**
```bash
curl http://localhost:3000/health
# Should return: OK
```

---

## 🎨 PART 2: Start the Frontend (Terminal 2)

```bash
# Navigate to frontend
cd /path/to/conductor-assistant/frontend

# Install dependencies (first time only)
npm install

# Start dev server
npm run dev
```

**Wait for:**
```
✅ "Local: http://localhost:5173/"
```

---

## 🎥 PART 3: Open in Browser

1. **Open Chrome/Edge**
2. **Navigate to** `http://localhost:5173`
3. **Allow camera permission** when prompted
4. **You should see:**
   - Your webcam feed
   - "Conductor AI Assistant" title
   - Text input area
   - Instructions section

---

## 👋 PART 4: Test Hand Tracking

1. **Position yourself** in front of the camera
2. **Show your hand** clearly to the camera
3. **You should see:**
   - ✅ Green skeleton lines on your hand
   - ✅ Red dots at hand landmarks
   - ✅ Text label showing gesture status

**If not showing:**
- Improve lighting
- Move closer/farther
- Try different hand position
- Check browser console (F12)

---

## ✊ PART 5: Demo Fist Gesture (Summarize)

1. **Read the default slide text** in the text area
2. **Make a fist** with your hand
3. **Hold steady for 1 second**
4. **Watch for:**
   - Text label changes to "Fist (0 fingers extended) - Summarize"
   - "Processing..." message appears
   - AI summary appears in blue/purple box

**Example Result:**
```
📝 Key Takeaway
"The key takeaway is that MediaPipe and Gemini API enable 
real-time AI-powered presentation assistance through gesture recognition."
```

5. **Response auto-clears** after 10 seconds (or make another gesture)

---

## 👋 PART 6: Demo Raised Hand Gesture (Ask Question)

1. **Open your hand fully** - all 5 fingers extended
2. **Hold steady for 1 second**
3. **Watch for:**
   - Text label: "Raised Hand (5 fingers extended) - Ask Question"
   - "Processing..." message
   - AI-generated question appears

**Example Result:**
```
❓ Likely Audience Question
"How does the system handle varying lighting conditions or 
different hand sizes during gesture recognition?"
```

---

## 📝 PART 7: Custom Slide Text

1. **Clear the default text** in the textarea
2. **Enter your own content**, for example:

```
This slide presents our Q4 sales results. Revenue increased by 
35% compared to last quarter, driven primarily by our new 
product line launch in September. Key markets showing growth 
include North America (+40%) and Europe (+28%).
```

3. **Make fist gesture** → Get summary:
```
"Key takeaway: Q4 revenue surged 35% due to successful 
September product launch, with strongest growth in North America."
```

4. **Make raised hand** → Get question:
```
"What factors contributed to the higher growth rate in 
North America compared to Europe?"
```

---

## 🎯 PART 8: Show Key Features

### Feature 1: Real-time Tracking
- Move your hand around
- Show how the green skeleton follows perfectly
- Point out the 21 landmark points

### Feature 2: Gesture Recognition
- Show different finger counts (1, 2, 3, 4, 5 fingers)
- Demonstrate the label updates in real-time
- Show that only fist and raised hand trigger AI

### Feature 3: Hold Timer
- Show gesture briefly (doesn't trigger)
- Hold for 1 second (triggers AI)
- Explain this prevents accidental triggers

### Feature 4: Processing State
- Show the loading spinner
- Point out the "Connecting to AI..." message
- Demonstrate error handling (stop backend briefly)

### Feature 5: Animated UI
- Show smooth transitions when AI responses appear
- Point out the gradient backgrounds
- Show the auto-clear after 10 seconds

---

## 🧪 PART 9: Test Backend Integration

**Open a third terminal and test the API directly:**

```bash
# Test summarize
curl -X POST http://localhost:3000/ai-assist \
  -H "Content-Type: application/json" \
  -d '{
    "command": "summarize",
    "text": "This is a test slide about cloud computing and scalability."
  }'

# Test ask-question
curl -X POST http://localhost:3000/ai-assist \
  -H "Content-Type: application/json" \
  -d '{
    "command": "ask-question",
    "text": "This is a test slide about cloud computing and scalability."
  }'
```

**Show the response** in the terminal to demonstrate the backend works independently.

---

## 📊 PART 10: Explain the Architecture

**Draw or show this diagram:**

```
Browser (Frontend)
    ↓ Webcam Feed
MediaPipe Hand Tracking
    ↓ 21 Landmarks
Gesture Detection (raised-hand / fist)
    ↓ 1-second hold
HTTP POST to Backend
    ↓
Rust Backend (Axum)
    ↓
Gemini API
    ↓
AI Response
    ↓
Display in UI
```

---

## 💡 PART 11: Highlight Technical Achievements

1. **Frontend:**
   - TypeScript for type safety
   - MediaPipe for in-browser hand tracking
   - Custom gesture detection algorithms
   - React hooks for state management
   - Tailwind + Framer Motion for UI

2. **Backend:**
   - Rust for performance and safety
   - Axum for async web framework
   - reqwest for HTTP client
   - Gemini API integration
   - CORS-enabled REST API

3. **Integration:**
   - Real-time gesture → AI pipeline
   - Error handling and loading states
   - Smooth UX with animations
   - Hold timer to prevent false triggers

---

## 🎓 PART 12: Use Cases

Explain potential applications:

1. **Live Presentations:**
   - Speaker raises hand → AI suggests likely questions
   - Speaker makes fist → AI provides quick summary for recap

2. **Teaching:**
   - Instructor can get instant feedback on slide clarity
   - Students' likely questions predicted

3. **Practice:**
   - Solo practice with AI as audience
   - Get real-time feedback on content

4. **Accessibility:**
   - Hands-free presentation control
   - Voice-free AI interaction

---

## 🐛 PART 13: Troubleshooting Demo

**Show common issues and solutions:**

1. **Backend not running:**
   - Frontend shows error message
   - Check backend terminal
   - Restart with `cargo run`

2. **Camera permission denied:**
   - Click lock icon in browser
   - Allow camera access
   - Refresh page

3. **Gesture not detecting:**
   - Improve lighting
   - Move hand position
   - Check console for errors

---

## ✅ PART 14: Success Criteria

After the demo, the audience should have seen:

- ✅ Live hand tracking working smoothly
- ✅ Fist gesture triggering summarize
- ✅ Raised hand triggering ask-question
- ✅ AI responses appearing with animations
- ✅ Custom slide text working
- ✅ Backend API responding correctly
- ✅ Error handling when backend is down
- ✅ Professional UI/UX

---

## 📸 Screenshot Checklist

Capture these moments:

1. Hand tracking with green skeleton
2. Fist gesture with summary result
3. Raised hand with question result
4. Custom slide text input
5. Processing/loading state
6. Backend terminal showing logs
7. Frontend terminal showing dev server
8. Browser DevTools showing clean console

---

## 🎯 Demo Tips

- **Practice beforehand** - know the gestures well
- **Good lighting** - ensures reliable tracking
- **Speak clearly** - explain what you're doing
- **Show failures** - demonstrate error handling
- **Engage audience** - ask them to suggest slide text
- **Be enthusiastic** - showcase the cool factor!

---

## 🚀 Closing

**End with:**

> "This demonstrates how modern web technologies (React, MediaPipe), 
> combined with high-performance backend (Rust), and AI (Gemini API) 
> can create innovative, gesture-controlled applications. The system 
> is fully functional, real-time, and ready for further enhancements!"

**Next steps to mention:**
- Google Slides integration
- More gestures (swipe, pinch, etc.)
- Voice commands
- Multi-language support
- Deployment to production

---

## 📞 Q&A Preparation

**Expected questions:**

**Q: Does it work with gloves?**
A: No, MediaPipe needs to see skin tones. Future version could use different tracking.

**Q: What's the latency?**
A: Gesture detection is instant. AI response takes 1-3 seconds depending on API.

**Q: Can it work offline?**
A: Hand tracking yes, AI processing no (requires Gemini API).

**Q: What about privacy?**
A: All processing is local/client-side. Only slide text sent to Gemini.

**Q: Why Rust for backend?**
A: Performance, safety, modern async support, excellent for API servers.

**Q: Can I use ChatGPT instead?**
A: Yes! Just modify aiService.ts to call OpenAI API instead.

---

## 🎉 Demo Complete!

You've successfully demonstrated a cutting-edge, AI-powered, 
gesture-controlled presentation assistant!
