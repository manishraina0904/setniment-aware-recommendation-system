export interface Product {
  product_name: string;
  brand: string;
  rating: number;
  final_score: number;
  product_image?: string;
}

export interface AnalysisResult {
  results: Product[];
  analysis: {
    sentiment_confidence: number;
    emotion_confidence: number;
    positive_score?: number;
    negative_score?: number;
    neutral_score?: number;
  };
}

export interface ApiError {
  error: string;
  message?: string;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function getRecommendations(
  queryText: string
): Promise<AnalysisResult | ApiError> {
  if (!queryText.trim()) {
    return { error: "empty_query", message: "Please enter some text to analyze" };
  }

  try {
    // Get API URL from environment or use default
    const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
    const endpoint = `${apiUrl}/recommend`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: queryText }),
    });

    if (!res.ok) {
      return {
        error: "api_error",
        message: `API Error: ${res.status} ${res.statusText}`,
      };
    }

    const data = await res.json();

    // Validate response structure
    if (!data.results || !Array.isArray(data.results)) {
      return {
        error: "invalid_response",
        message: "Invalid API response format",
      };
    }

    // Ensure analysis data exists, use dummy values if not
    if (!data.analysis) {
      data.analysis = {
        sentiment_confidence: 85,
        emotion_confidence: 10,
        positive_score: 0.75,
        negative_score: 0.1,
        neutral_score: 0.15,
      };
    }

    return data as AnalysisResult;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
    return {
      error: "network_error",
      message: `Network error: ${errorMessage}. Make sure the backend is running at ${apiUrl}`,
    };
  }
}
