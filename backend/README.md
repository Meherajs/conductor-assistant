# Conductor Assistant Backend

A Rust-based backend service for the AI Presentation Assistant. This service provides text AI capabilities using the Gemini API to assist with presentation slides.

## Features

- **AI-Powered Slide Analysis**: Process slide content with AI to generate insights
- **Two Main Commands**:
  - `summarize`: Get a concise summary of the slide's key takeaway
  - `ask-question`: Generate a likely audience question about the slide
- **REST API**: Simple HTTP endpoints for frontend integration
- **CORS Enabled**: Ready for cross-origin requests from the frontend

## Technology Stack

- **Framework**: Axum (high-performance async web framework)
- **Runtime**: Tokio (async runtime)
- **HTTP Client**: reqwest (for Gemini API calls)
- **Serialization**: serde & serde_json
- **AI**: Google Gemini API

## Prerequisites

- Rust 1.70 or later
- A Gemini API key (get one from [Google AI Studio](https://makersuite.google.com/app/apikey))

## Installation

1. **Clone the repository** (if not already done):
   ```bash
   cd backend
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   PORT=3000
   ```

3. **Build the project**:
   ```bash
   cargo build --release
   ```

## Running the Server

### Development Mode
```bash
cargo run
```

### Production Mode
```bash
cargo run --release
```

The server will start on `http://0.0.0.0:3000` (or the port specified in your `.env` file).

## API Endpoints

### Health Check
```
GET /health
```

**Response:**
```
OK
```

### AI Assist
```
POST /ai-assist
```

**Request Body:**
```json
{
  "command": "summarize",
  "text": "This slide discusses the importance of artificial intelligence in modern presentations..."
}
```

**Supported Commands:**
- `summarize`: Returns a concise summary of the slide's key takeaway
- `ask-question`: Returns a likely question the audience might have

**Success Response (200 OK):**
```json
{
  "result": "The key takeaway is that AI enhances presentation engagement and understanding."
}
```

**Error Response (500 Internal Server Error):**
```json
{
  "error": "Error description here"
}
```

## Example Usage

### Using curl

**Summarize a slide:**
```bash
curl -X POST http://localhost:3000/ai-assist \
  -H "Content-Type: application/json" \
  -d '{
    "command": "summarize",
    "text": "This slide explains how machine learning algorithms can improve data analysis efficiency by 40%."
  }'
```

**Get a likely audience question:**
```bash
curl -X POST http://localhost:3000/ai-assist \
  -H "Content-Type: application/json" \
  -d '{
    "command": "ask-question",
    "text": "This slide explains how machine learning algorithms can improve data analysis efficiency by 40%."
  }'
```

### Using JavaScript (from frontend)

```javascript
async function getAIAssist(command, text) {
  const response = await fetch('http://localhost:3000/ai-assist', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ command, text }),
  });
  
  const data = await response.json();
  return data.result;
}

// Example usage
const summary = await getAIAssist('summarize', 'Your slide text here');
const question = await getAIAssist('ask-question', 'Your slide text here');
```

## Project Structure

```
backend/
├── src/
│   ├── main.rs           # Application entry point and router setup
│   ├── handlers.rs       # HTTP request handlers
│   └── ai_service.rs     # Gemini API integration
├── Cargo.toml            # Dependencies and project metadata
├── .env.example          # Environment variables template
├── .gitignore           # Git ignore rules
└── README.md            # This file
```

## Configuration

The application can be configured using environment variables:

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `GEMINI_API_KEY` | Your Gemini API key | Yes | - |
| `PORT` | Server port | No | 3000 |

## Development

### Logging

The application uses `tracing` for structured logging. To adjust log levels, set the `RUST_LOG` environment variable:

```bash
RUST_LOG=debug cargo run
```

### Testing the API

You can test the endpoints using tools like:
- curl (command line)
- Postman (GUI)
- Thunder Client (VS Code extension)

## Deployment

For production deployment:

1. Build the release version:
   ```bash
   cargo build --release
   ```

2. The binary will be in `target/release/conductor_assistant_backend`

3. Set environment variables on your server

4. Run the binary:
   ```bash
   ./target/release/conductor_assistant_backend
   ```

## Troubleshooting

### "GEMINI_API_KEY must be set" error
Make sure you have created a `.env` file with your API key, or set the environment variable directly.

### CORS errors
The server is configured to allow all origins. If you're still experiencing CORS issues, check your frontend's request configuration.

### Connection refused
Ensure the server is running and check that the port is not already in use.

## License

This project is part of the Conductor Assistant application.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues.
