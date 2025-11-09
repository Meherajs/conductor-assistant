#!/bin/bash

# Quick Start Script for Conductor Assistant Backend

echo "🚀 Starting Conductor Assistant Backend Setup..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  No .env file found. Creating from .env.example..."
    cp .env.example .env
    echo "📝 Please edit .env and add your GEMINI_API_KEY"
    echo "   Get your API key from: https://makersuite.google.com/app/apikey"
    exit 1
fi

# Check if GEMINI_API_KEY is set
source .env
if [ -z "$GEMINI_API_KEY" ] || [ "$GEMINI_API_KEY" = "your_gemini_api_key_here" ]; then
    echo "❌ GEMINI_API_KEY is not set in .env file"
    echo "   Please edit .env and add your actual API key"
    exit 1
fi

echo "✅ Configuration verified"
echo "🔨 Building project..."

# Build the project
cargo build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "🚀 Starting server..."
    cargo run
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi
