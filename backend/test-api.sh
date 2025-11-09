#!/bin/bash

# Test script for Conductor Assistant Backend API

BASE_URL="http://localhost:3000"

echo "🧪 Testing Conductor Assistant Backend API"
echo "=========================================="
echo ""

# Test 1: Health Check
echo "Test 1: Health Check"
echo "GET $BASE_URL/health"
curl -s "$BASE_URL/health"
echo ""
echo ""

# Test 2: Summarize Command
echo "Test 2: Summarize Command"
echo "POST $BASE_URL/ai-assist"
curl -s -X POST "$BASE_URL/ai-assist" \
  -H "Content-Type: application/json" \
  -d '{
    "command": "summarize",
    "text": "This slide discusses the implementation of a Rust-based backend service using the Axum framework. The service provides REST API endpoints for AI-powered text analysis. It integrates with the Gemini API to process slide content and generate intelligent responses. The architecture includes modular design with separate handlers, services, and CORS configuration for frontend integration."
  }' | jq '.'
echo ""
echo ""

# Test 3: Ask Question Command
echo "Test 3: Ask Question Command"
echo "POST $BASE_URL/ai-assist"
curl -s -X POST "$BASE_URL/ai-assist" \
  -H "Content-Type: application/json" \
  -d '{
    "command": "ask-question",
    "text": "This slide explains how machine learning algorithms can improve data analysis efficiency by 40%. The key factors include automated pattern recognition, real-time processing capabilities, and intelligent data filtering. Companies using these technologies have reported significant time savings and improved accuracy in their analytics workflows."
  }' | jq '.'
echo ""
echo ""

# Test 4: Invalid Command
echo "Test 4: Invalid Command (Expected to fail)"
echo "POST $BASE_URL/ai-assist"
curl -s -X POST "$BASE_URL/ai-assist" \
  -H "Content-Type: application/json" \
  -d '{
    "command": "invalid-command",
    "text": "Some text"
  }' | jq '.'
echo ""
echo ""

echo "=========================================="
echo "✅ Tests completed!"
