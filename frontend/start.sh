#!/bin/bash

# Frontend Quick Setup Script

echo "🎨 Setting up Conductor Assistant Frontend..."
echo ""

# Check if node_modules exists
if [ -d "node_modules" ]; then
    echo "✅ Dependencies already installed"
else
    echo "📦 Installing dependencies..."
    npm install
    
    if [ $? -eq 0 ]; then
        echo "✅ Dependencies installed successfully"
    else
        echo "❌ Failed to install dependencies"
        exit 1
    fi
fi

echo ""
echo "🚀 Starting development server..."
echo "📍 Frontend will be available at: http://localhost:5173"
echo "⚠️  Make sure the backend is running at: http://localhost:3000"
echo ""

npm run dev
