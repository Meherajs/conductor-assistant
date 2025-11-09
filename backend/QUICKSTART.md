# 🎯 Conductor Assistant Backend - Quick Reference

## What Was Built

A **Rust-based REST API backend** that provides AI-powered text analysis for presentation slides using the Google Gemini API.

## 📁 Project Structure

```
backend/
├── src/
│   ├── main.rs           # Server setup & routing
│   ├── handlers.rs       # API endpoint handlers
│   └── ai_service.rs     # Gemini API integration
├── Cargo.toml            # Dependencies
├── .env.example          # Configuration template
├── README.md             # User guide
├── IMPLEMENTATION.md     # Technical docs
├── api-spec.json         # API specification
├── start.sh              # Quick start script
└── test-api.sh           # Testing script
```

## 🚀 Quick Start

1. **Get API Key**: Visit https://makersuite.google.com/app/apikey

2. **Configure**:
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env and add your GEMINI_API_KEY
   ```

3. **Run**:
   ```bash
   cargo run
   ```
   Server starts at: http://localhost:3000

## 🔌 API Endpoints

### Health Check
```
GET /health
Response: "OK"
```

### AI Assist
```
POST /ai-assist
Content-Type: application/json

Body:
{
  "command": "summarize",        # or "ask-question"
  "text": "Your slide content"
}

Response:
{
  "result": "AI-generated response"
}
```

## 💡 Commands

- **`summarize`**: Get a concise summary of the slide's key takeaway
- **`ask-question`**: Generate a likely audience question about the slide

## 🧪 Test It

```bash
# Health check
curl http://localhost:3000/health

# Summarize
curl -X POST http://localhost:3000/ai-assist \
  -H "Content-Type: application/json" \
  -d '{"command":"summarize","text":"Your slide text here"}'

# Ask question
curl -X POST http://localhost:3000/ai-assist \
  -H "Content-Type: application/json" \
  -d '{"command":"ask-question","text":"Your slide text here"}'
```

## 🛠️ Tech Stack

- **Framework**: Axum (async web framework)
- **Runtime**: Tokio
- **HTTP Client**: reqwest (for Gemini API)
- **Serialization**: serde + serde_json
- **CORS**: tower-http
- **Config**: dotenv
- **Logging**: tracing

## 🔗 Frontend Integration

```javascript
// Example usage in frontend
const response = await fetch('http://localhost:3000/ai-assist', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    command: 'summarize',
    text: slideText
  })
});

const { result } = await response.json();
console.log(result); // AI-generated summary
```

## ⚙️ Environment Variables

```env
GEMINI_API_KEY=your_api_key_here  # Required
PORT=3000                          # Optional (default: 3000)
```

## 📋 Key Features Implemented

✅ REST API with Axum framework  
✅ Gemini API integration via reqwest  
✅ Two AI commands (summarize, ask-question)  
✅ CORS support for frontend access  
✅ Environment-based configuration  
✅ Comprehensive error handling  
✅ Structured logging  
✅ Health check endpoint  

## 🐛 Troubleshooting

**Port in use?**
- Change PORT in .env or kill process on port 3000

**API errors?**
- Verify GEMINI_API_KEY is set correctly in .env

**CORS issues?**
- Ensure backend is running on correct port

**Build errors?**
- Run `cargo clean && cargo build`

## 📚 Documentation

- `README.md` - User guide and setup instructions
- `IMPLEMENTATION.md` - Technical architecture and details
- `api-spec.json` - API specification

## 🎓 What Each File Does

| File | Purpose |
|------|---------|
| `main.rs` | Initializes server, sets up routes, starts HTTP listener |
| `handlers.rs` | Processes HTTP requests, validates input, returns responses |
| `ai_service.rs` | Communicates with Gemini API, processes AI commands |
| `Cargo.toml` | Lists all Rust dependencies |
| `.env` | Stores API keys and configuration (not in git) |

## 🔄 Workflow

```
User Gesture → Frontend → POST /ai-assist → Handler → AI Service → Gemini API
                                                                        ↓
Frontend ← JSON Response ← Handler ← AI Service ← Gemini Response ←────┘
```

---

**Ready to use!** 🎉

Run `cargo run` and the backend will be ready to receive requests from your frontend.
