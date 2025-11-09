use axum::{extract::State, http::StatusCode, Json};
use serde::{Deserialize, Serialize};
use std::sync::Arc;

use crate::ai_service::AIService;

#[derive(Debug, Deserialize)]
pub struct AIAssistRequest {
    pub command: String,
    pub text: String,
}

#[derive(Debug, Serialize)]
pub struct AIAssistResponse {
    pub result: String,
}

#[derive(Debug, Serialize)]
pub struct ErrorResponse {
    pub error: String,
}

pub async fn ai_assist_handler(
    State(ai_service): State<Arc<AIService>>,
    Json(payload): Json<AIAssistRequest>,
) -> Result<Json<AIAssistResponse>, (StatusCode, Json<ErrorResponse>)> {
    tracing::info!(
        "Received AI assist request - command: {}, text length: {}",
        payload.command,
        payload.text.len()
    );

    match ai_service
        .process_command(&payload.command, &payload.text)
        .await
    {
        Ok(result) => {
            tracing::info!("Successfully processed AI request");
            Ok(Json(AIAssistResponse { result }))
        }
        Err(e) => {
            tracing::error!("Error processing AI request: {}", e);
            Err((
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(ErrorResponse {
                    error: e.to_string(),
                }),
            ))
        }
    }
}

pub async fn health_check() -> &'static str {
    "OK"
}
