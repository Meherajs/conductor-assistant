# Conductor Assistant - Backend Implementation Guide

## Project Overview

The Conductor Assistant backend is a **Rust-based REST API service** that provides AI-powered text analysis for presentation slides. It integrates with Google's Gemini API to generate intelligent responses based on slide content.

## Architecture

### Components

```
Backend Architecture
├── HTTP Server (Axum Framework)
│   ├── Router & Routes
│   ├── CORS Middleware
│   └── Request Handlers
├── AI Service Layer
│   ├── Gemini API Integration
│   ├── Command Processing
│   └── Prompt Engineering
└── Configuration
    ├── Environment Variables
    └── Logging
```

### Data Flow

```
Frontend Request
    ↓
[POST /ai-assist]
    ↓
Request Handler
    ↓
AI Service
    ↓
Gemini API (HTTP Client)
    ↓
Response Processing
    ↓
JSON Response to Frontend
```

## Implementation Details

### 1. **Main Server (`main.rs`)**
- Initializes the Axum web server
- Configures CORS for frontend access
- Sets up routing and middleware
- Loads environment configuration
- Starts the HTTP listener on port 3000

### 2. **Request Handlers (`handlers.rs`)**
- `health_check()`: Simple health endpoint
- `ai_assist_handler()`: Main API endpoint
  - Accepts JSON payload with `command` and `text`
  - Validates input
  - Calls AI service
  - Returns formatted response or error

### 3. **AI Service (`ai_service.rs`)**
- **AIService struct**: Manages Gemini API interactions
- **process_command()**: Routes commands to appropriate prompts
  - `"summarize"`: Generates concise slide summary
  - `"ask-question"`: Predicts audience questions
- **call_gemini()**: Makes HTTP requests to Gemini API
  - Handles authentication
  - Formats requests
  - Parses responses
  - Error handling

## API Specification

### Endpoint: `/ai-assist`

**Method**: POST

**Request Format**:
```json
{
  "command": "summarize" | "ask-question",
  "text": "string"
}
```

**Response Format (Success)**:
```json
{
  "result": "AI-generated text response"
}
```

**Response Format (Error)**:
```json
{
  "error": "Error description"
}
```

## Key Features

### ✅ Implemented Features

1. **RESTful API Design**
   - Clear endpoint structure
   - Standard HTTP methods
   - JSON request/response format

2. **AI Integration**
   - Gemini API integration via reqwest
   - Intelligent prompt engineering
   - Two command types (summarize, ask-question)

3. **Error Handling**
   - Comprehensive error messages
   - HTTP status codes
   - Logging for debugging

4. **CORS Support**
   - Configured for cross-origin requests
   - Works with frontend on different ports

5. **Configuration Management**
   - Environment variable support
   - .env file integration
   - Configurable port

6. **Logging & Monitoring**
   - Structured logging with tracing
   - Request/response logging
   - Debug information

## Technology Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Web Framework | Axum 0.7 | High-performance async HTTP server |
| Async Runtime | Tokio | Asynchronous runtime for Rust |
| HTTP Client | reqwest 0.12 | Making requests to Gemini API |
| Serialization | serde + serde_json | JSON handling |
| CORS | tower-http | Cross-origin resource sharing |
| Config | dotenv | Environment variable management |
| Logging | tracing + tracing-subscriber | Structured logging |

## Setup Instructions

### Quick Start

1. **Install Rust** (if not already installed):
   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   ```

2. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

3. **Configure environment**:
   ```bash
   cp .env.example .env
   # Edit .env and add your GEMINI_API_KEY
   ```

4. **Run the server**:
   ```bash
   chmod +x start.sh
   ./start.sh
   ```

   Or manually:
   ```bash
   cargo run
   ```

### Getting a Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key to your `.env` file

## Testing

### Manual Testing with curl

```bash
# Test health endpoint
curl http://localhost:3000/health

# Test summarize command
curl -X POST http://localhost:3000/ai-assist \
  -H "Content-Type: application/json" \
  -d '{
    "command": "summarize",
    "text": "Your slide content here"
  }'

# Test ask-question command
curl -X POST http://localhost:3000/ai-assist \
  -H "Content-Type: application/json" \
  -d '{
    "command": "ask-question",
    "text": "Your slide content here"
  }'
```

### Automated Testing

```bash
chmod +x test-api.sh
./test-api.sh
```

## Integration with Frontend

### JavaScript Example

```javascript
const API_BASE_URL = 'http://localhost:3000';

async function summarizeSlide(slideText) {
  try {
    const response = await fetch(`${API_BASE_URL}/ai-assist`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        command: 'summarize',
        text: slideText
      })
    });
    
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

async function getAudienceQuestion(slideText) {
  try {
    const response = await fetch(`${API_BASE_URL}/ai-assist`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        command: 'ask-question',
        text: slideText
      })
    });
    
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
```

### TypeScript/React Example

```typescript
interface AIAssistRequest {
  command: 'summarize' | 'ask-question';
  text: string;
}

interface AIAssistResponse {
  result: string;
}

const useAIAssist = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processSlide = async (command: string, text: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:3000/ai-assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command, text })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: AIAssistResponse = await response.json();
      return data.result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { processSlide, loading, error };
};
```

## Performance Considerations

1. **Async Architecture**: Uses Tokio for non-blocking I/O
2. **Connection Pooling**: reqwest manages HTTP connections efficiently
3. **Minimal Dependencies**: Lean dependency tree for fast compilation
4. **Error Handling**: Graceful degradation on API failures

## Security Considerations

1. **API Key Protection**: 
   - Never commit `.env` file
   - Use environment variables in production
   
2. **CORS Configuration**: 
   - Currently allows all origins (for development)
   - Restrict in production to specific frontend URLs
   
3. **Input Validation**: 
   - Command validation
   - Text sanitization via serde

## Deployment

### Development
```bash
cargo run
```

### Production
```bash
# Build optimized binary
cargo build --release

# Run the binary
./target/release/conductor_assistant_backend
```

### Docker (Future Enhancement)
```dockerfile
FROM rust:1.70 as builder
WORKDIR /app
COPY . .
RUN cargo build --release

FROM debian:bookworm-slim
COPY --from=builder /app/target/release/conductor_assistant_backend /usr/local/bin/
CMD ["conductor_assistant_backend"]
```

## Troubleshooting

### Common Issues

1. **Port already in use**
   - Change PORT in `.env` file
   - Kill process using port 3000

2. **API key errors**
   - Verify GEMINI_API_KEY in `.env`
   - Check API key validity at Google AI Studio

3. **CORS errors**
   - Ensure server is running
   - Check frontend URL configuration

4. **Compilation errors**
   - Update Rust: `rustup update`
   - Clean and rebuild: `cargo clean && cargo build`

## Future Enhancements

- [ ] Add rate limiting
- [ ] Implement caching for common queries
- [ ] Add support for more AI models (OpenAI, Claude)
- [ ] Database integration for query history
- [ ] WebSocket support for real-time updates
- [ ] Authentication and authorization
- [ ] Metrics and monitoring (Prometheus)
- [ ] Docker containerization
- [ ] CI/CD pipeline

## File Structure

```
backend/
├── src/
│   ├── main.rs              # Server initialization and routing
│   ├── handlers.rs          # HTTP request handlers
│   └── ai_service.rs        # Gemini API integration
├── Cargo.toml               # Rust dependencies
├── .env.example             # Environment template
├── .gitignore              # Git ignore rules
├── README.md               # User documentation
├── IMPLEMENTATION.md       # This file (technical documentation)
├── api-spec.json           # API specification
├── start.sh                # Quick start script
└── test-api.sh             # API testing script
```

## Contributing

When contributing to this backend:

1. Follow Rust naming conventions
2. Add tests for new features
3. Update documentation
4. Run `cargo fmt` before committing
5. Run `cargo clippy` to check for issues

## License

Part of the Conductor Assistant project.
