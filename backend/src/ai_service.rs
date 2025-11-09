use serde::{Deserialize, Serialize};
use std::error::Error;

#[derive(Debug, Serialize)]
struct GeminiRequest {
    contents: Vec<Content>,
}

#[derive(Debug, Serialize)]
struct Content {
    parts: Vec<Part>,
}

#[derive(Debug, Serialize)]
struct Part {
    text: String,
}

#[derive(Debug, Deserialize)]
struct GeminiResponse {
    candidates: Vec<Candidate>,
}

#[derive(Debug, Deserialize)]
struct Candidate {
    content: ContentResponse,
}

#[derive(Debug, Deserialize)]
struct ContentResponse {
    parts: Vec<PartResponse>,
}

#[derive(Debug, Deserialize)]
struct PartResponse {
    text: String,
}

pub struct AIService {
    api_key: String,
    client: reqwest::Client,
}

impl AIService {
    pub fn new(api_key: String) -> Self {
        Self {
            api_key,
            client: reqwest::Client::new(),
        }
    }

    pub async fn process_command(
        &self,
        command: &str,
        text: &str,
    ) -> Result<String, Box<dyn Error + Send + Sync>> {
        let prompt = match command {
            "summarize" => format!(
                "Summarize the following slide content in one concise sentence. Focus on the key takeaway:\n\n{}",
                text
            ),
            "ask-question" => format!(
                "Act as my assistant. Based on the following slide content, what's a likely question the audience would have? Provide one specific, relevant question:\n\n{}",
                text
            ),
            _ => return Err("Invalid command. Use 'summarize' or 'ask-question'".into()),
        };

        self.call_gemini(&prompt).await
    }

    async fn call_gemini(&self, prompt: &str) -> Result<String, Box<dyn Error + Send + Sync>> {
        let url = format!(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={}",
            self.api_key
        );

        let request_body = GeminiRequest {
            contents: vec![Content {
                parts: vec![Part {
                    text: prompt.to_string(),
                }],
            }],
        };

        let response = self.client.post(&url).json(&request_body).send().await?;

        if !response.status().is_success() {
            let error_text = response.text().await?;
            return Err(format!("Gemini API error: {}", error_text).into());
        }

        let gemini_response: GeminiResponse = response.json().await?;

        let result = gemini_response
            .candidates
            .first()
            .and_then(|c| c.content.parts.first())
            .map(|p| p.text.clone())
            .ok_or("No response from Gemini API")?;

        Ok(result)
    }
}
