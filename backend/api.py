# api.py
import asyncio
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

from src.recommendation_nlp import generate_recommendations
from src.nlp_intent_filter import is_real_recommendation_query

# Optional: prevent "Failed to fetch" due to GPU timeout
asyncio.timeout = 60

app = FastAPI(title="Sentiment-Aware Recommendation API", version="7.1")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Query(BaseModel):
    text: str

analyzer = SentimentIntensityAnalyzer()

@app.get("/")
def home():
    return {"message": "API is running!"}

@app.post("/recommend")
async def recommend_products(query: Query):
    user_input = query.text.strip()
    if not user_input:
        return {"error": "Empty input"}

    # Sentiment block
    vs = analyzer.polarity_scores(user_input)
    pos, neu, neg = vs["pos"], vs["neu"], vs["neg"]

    analysis_block = {
        "sentiment_confidence": round(pos * 100),
        "emotion_confidence": round(neu * 100),
        "positive_score": pos,
        "negative_score": neg,
        "neutral_score": neu
    }

    # Intent guard
    if not is_real_recommendation_query(user_input):
        return {
            "results": [],
            "analysis": analysis_block,
            "message": "Query is not a product recommendation request."
        }

    # Main engine
    df = generate_recommendations(user_input)
    if df is None or df.empty:
        return {
            "results": [],
            "analysis": analysis_block,
            "message": "No matching products found."
        }

    results_out = []
    for _, row in df.iterrows():
        results_out.append({
            "product_name": row.get("product_name", ""),
            "brand": row.get("brand", ""),
            "rating": float(row.get("rating", 0)),
            "final_score": float(row.get("final_score", 0)),
            "product_image": row.get("product_image", "")
        })

    return {
        "results": results_out,
        "analysis": analysis_block
    }