# 🎯 Conductor AI Assistant

An AI-powered presentation assistant that uses hand gesture recognition to provide real-time AI insights during live presentations. Control your presentation and get intelligent suggestions with simple hand gestures!

![Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## ✨ Features

- 🎥 **Real-time Hand Tracking** - Uses MediaPipe for accurate hand gesture detection
- 👋 **Gesture Recognition** - Two primary gestures:
  - **Raised Hand (5 fingers)** → AI suggests likely audience questions
  - **Fist (closed hand)** → AI generates slide summaries
- 🤖 **AI-Powered Insights** - Integrates with Google Gemini API for intelligent text analysis
- ⚡ **Live Processing** - Instant gesture detection with 1-second hold to trigger
- 🎨 **Modern UI** - Beautiful React interface with Tailwind CSS and Framer Motion animations
- 🚀 **High-Performance Backend** - Rust-based REST API with async processing
- 🔒 **Type-Safe** - Full TypeScript frontend and Rust backend

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Browser (Frontend)                    │
│  ┌────────────────────────────────────────────────────┐ │
│  │  React + TypeScript + MediaPipe                    │ │
│  │  • Webcam feed with hand tracking                  │ │
│  │  • Gesture detection (raised hand / fist)          │ │
│  │  • Beautiful animated UI                           │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
                          ↓ HTTP POST
┌─────────────────────────────────────────────────────────┐
│                 Rust Backend (API Server)                │
│  ┌────────────────────────────────────────────────────┐ │
│  │  Axum + Tokio + reqwest                            │ │
│  │  • REST API endpoints                              │ │
│  │  • Gemini API integration                          │ │
│  │  • Command processing (summarize / ask-question)   │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
                          ↓
                   Google Gemini API
```

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **Rust** (1.70 or higher)
- **Webcam** (for gesture detection)
- **Google Gemini API Key** - [Get one here](https://makersuite.google.com/app/apikey)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Meherajs/conductor-assistant.git
cd conductor-assistant
```

### 2. Setup Backend

```bash
cd backend

# Create environment file
cp .env.example .env

# Add your Gemini API key to .env
# GEMINI_API_KEY=your_api_key_here

# Run the backend
cargo run
```

**Expected output:**
```
Server listening on 0.0.0.0:3000
```

### 3. Setup Frontend (New Terminal)

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

**Expected output:**
```
Local: http://localhost:5173/
```

### 4. Open in Browser

1. Navigate to `http://localhost:5173`
2. Allow camera permissions
3. Enter your slide text in the textarea
4. Make gestures to get AI insights!

## 🎮 How to Use

### Gestures

#### 👋 Raised Hand (5 fingers extended)
- **Hold for 1 second**
- AI generates a likely audience question about your slide
- Perfect for anticipating what people will ask

**Example:**
```
Slide: "Our new AI feature uses machine learning..."
Gesture: Raised hand
AI: "How does this handle data privacy and security?"
```

#### ✊ Fist (fingers closed)
- **Hold for 1 second**
- AI generates a concise summary of your slide
- Great for wrapping up complex topics

**Example:**
```
Slide: "Our Q4 results show 35% revenue growth..."
Gesture: Fist
AI: "Key takeaway: Q4 revenue grew 35% driven by new product launch."
```

### Use Cases

1. **Live Presentations** - Get real-time AI assistance while presenting
2. **Practice Sessions** - Prepare by pre-generating AI insights for all slides
3. **Q&A Preparation** - Anticipate audience questions before they ask
4. **Teaching** - Help educators provide clearer explanations

## 📁 Project Structure

```
conductor-assistant/
├── backend/                    # Rust API server
│   ├── src/
│   │   ├── main.rs            # Server entry point
│   │   ├── handlers.rs        # API request handlers
│   │   └── ai_service.rs      # Gemini API integration
│   ├── Cargo.toml             # Rust dependencies
│   └── .env.example           # Environment template
│
├── frontend/                   # React application
│   ├── src/
│   │   ├── components/
│   │   │   └── ConductorDashboard.tsx  # Main UI component
│   │   ├── hooks/
│   │   │   └── useHandTracking.ts      # Hand tracking logic
│   │   ├── services/
│   │   │   └── aiService.ts            # Backend API client
│   │   └── utils/
│   │       └── gestureDetection.ts     # Gesture recognition
│   ├── package.json           # Node dependencies
│   └── vite.config.ts         # Vite configuration
│
├── HOW_TO_RUN.md              # Detailed setup guide
├── SIMPLE_GUIDE.md            # Easy-to-understand usage guide
├── USE_CASES.md               # Real-world scenarios
└── README.md                  # This file
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **MediaPipe Hands** - Hand tracking
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **react-webcam** - Camera access

### Backend
- **Rust** - Programming language
- **Axum** - Web framework
- **Tokio** - Async runtime
- **reqwest** - HTTP client
- **serde** - Serialization
- **Google Gemini API** - AI processing

## 🔌 API Documentation

### Health Check
```http
GET /health
```

**Response:**
```
OK
```

### AI Assist
```http
POST /ai-assist
Content-Type: application/json

{
  "command": "summarize" | "ask-question",
  "text": "Your slide content here"
}
```

**Response:**
```json
{
  "result": "AI-generated response"
}
```

**Error Response:**
```json
{
  "error": "Error description"
}
```

## 🧪 Testing

### Test Backend API

```bash
# Health check
curl http://localhost:3000/health

# Summarize
curl -X POST http://localhost:3000/ai-assist \
  -H "Content-Type: application/json" \
  -d '{
    "command": "summarize",
    "text": "This slide discusses cloud computing scalability and performance optimization."
  }'

# Ask question
curl -X POST http://localhost:3000/ai-assist \
  -H "Content-Type: application/json" \
  -d '{
    "command": "ask-question",
    "text": "This slide discusses cloud computing scalability and performance optimization."
  }'
```

## 🐛 Troubleshooting

### Backend Issues

**Port already in use:**
```bash
# Change PORT in backend/.env
PORT=3001
```

**API key not found:**
```bash
# Make sure .env file exists and has valid key
cd backend
cat .env  # Should show GEMINI_API_KEY=your_key
```

### Frontend Issues

**Camera not working:**
- Check browser permissions (click lock icon in address bar)
- Try Chrome or Edge (best support for MediaPipe)
- Ensure no other app is using the camera

**Hand tracking not showing:**
- Improve lighting conditions
- Keep hand clearly visible in frame
- Try moving closer/farther from camera

**Text appears mirrored:**
- This is fixed! Text overlays are now correctly oriented

**AI responses not appearing:**
- Verify backend is running: `curl http://localhost:3000/health`
- Check browser console (F12) for errors
- Ensure slide text is entered

## 📖 Documentation

- **[HOW_TO_RUN.md](./HOW_TO_RUN.md)** - Complete setup and troubleshooting guide
- **[SIMPLE_GUIDE.md](./SIMPLE_GUIDE.md)** - Easy explanation of how to use
- **[USE_CASES.md](./USE_CASES.md)** - Real-world presentation scenarios
- **[DEMO_SCRIPT.md](./DEMO_SCRIPT.md)** - Step-by-step demo walkthrough
- **[backend/README.md](./backend/README.md)** - Backend documentation
- **[frontend/README.md](./frontend/README.md)** - Frontend documentation

## 🎯 Roadmap

- [ ] Google Slides API integration (auto-load slide content)
- [ ] PowerPoint integration
- [ ] Additional gestures (swipe, pinch, etc.)
- [ ] Voice command support
- [ ] Multi-language support
- [ ] Presentation history and analytics
- [ ] Cloud deployment guides
- [ ] Mobile app version

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **Meheraj** - *Initial work* - [Meherajs](https://github.com/Meherajs)

## 🙏 Acknowledgments

- [MediaPipe](https://google.github.io/mediapipe/) - Hand tracking solution
- [Google Gemini](https://ai.google.dev/) - AI language model
- [Axum](https://github.com/tokio-rs/axum) - Rust web framework
- [React](https://react.dev/) - Frontend framework

## 📧 Support

If you have any questions or issues, please:
1. Check the [troubleshooting section](#-troubleshooting)
2. Review the [documentation](#-documentation)
3. Open an issue on GitHub

---

**Made with ❤️ for better presentations**

⭐ Star this repo if you find it helpful!
