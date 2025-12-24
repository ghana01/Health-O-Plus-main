// API Configuration - Uses environment variables for deployment flexibility
export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";
export const AI_CONSULT_URL = import.meta.env.VITE_AI_CONSULT_URL || "http://localhost:8000/api/ai-consult";

// WebSocket URL for video calls
// Converts http/https to ws/wss automatically
const getWebSocketUrl = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";
  // Extract the origin (protocol + host) from the API URL
  const url = new URL(baseUrl);
  const wsProtocol = url.protocol === 'https:' ? 'wss:' : 'ws:';
  return `${wsProtocol}//${url.host}`;
};
export const WS_URL = import.meta.env.VITE_WS_URL || getWebSocketUrl();

export const token = localStorage.getItem("token");
