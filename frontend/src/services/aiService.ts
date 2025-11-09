/**
 * AI Service for communicating with the Rust backend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface AIAssistRequest {
  command: 'summarize' | 'ask-question';
  text: string;
}

export interface AIAssistResponse {
  result: string;
}

export interface ErrorResponse {
  error: string;
}

class AIService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Check if the backend is healthy and running
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/health`, {
        method: 'GET',
      });
      return response.ok;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }

  /**
   * Get a summary of the slide content
   */
  async summarizeSlide(slideText: string): Promise<string> {
    return this.processCommand('summarize', slideText);
  }

  /**
   * Get a likely audience question about the slide
   */
  async getAudienceQuestion(slideText: string): Promise<string> {
    return this.processCommand('ask-question', slideText);
  }

  /**
   * Process a command with the AI backend
   */
  private async processCommand(
    command: 'summarize' | 'ask-question',
    text: string
  ): Promise<string> {
    try {
      const requestBody: AIAssistRequest = { command, text };

      const response = await fetch(`${this.baseUrl}/ai-assist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData: ErrorResponse = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data: AIAssistResponse = await response.json();
      return data.result;
    } catch (error) {
      console.error(`Error processing ${command}:`, error);
      throw error;
    }
  }
}

// Export singleton instance
export const aiService = new AIService();
