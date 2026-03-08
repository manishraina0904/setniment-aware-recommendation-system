# src/bert_inference.py
# Upgraded inference module: TF-IDF, BERT, Emotion (GoEmotions)
# - Graceful fallbacks if transformers or models unavailable
# - Optional dictionary API expansion (config)
# - Exposes analyze_user_input(...) used by recommendation_nlp.py

import os
import joblib
import requests
import torch
import numpy as np
import warnings

# Try to import transformers; if unavailable, warn and provide fallback behavior
try:
    from transformers import (
        BertTokenizer,
        BertForSequenceClassification,
        AutoTokenizer,
        AutoModelForSequenceClassification,
    )
    import torch.nn.functional as F
    TRANSFORMERS_AVAILABLE = True
except Exception:
    TRANSFORMERS_AVAILABLE = False
    F = None

# ---------- Config ----------
MODELS_DIR = "models"
TFIDF_VECT = os.path.join(MODELS_DIR, "tfidf_vectorizer.pkl")
TFIDF_SENT_MODEL = os.path.join(MODELS_DIR, "tfidf_sentiment_model.pkl")
BERT_MODEL_DIR = os.path.join(MODELS_DIR, "bert_model")  # optional
USE_OXFORD = False  # set True if you want Oxford API; see README for env
OXFORD_API_URL = "https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/"
OXFORD_APP_ID = os.getenv("OXFORD_APP_ID", "")
OXFORD_APP_KEY = os.getenv("OXFORD_APP_KEY", "")

# ---------- Load TF-IDF sentiment model (required) ----------
tfidf_vectorizer = None
sentiment_model = None
if os.path.exists(TFIDF_VECT) and os.path.exists(TFIDF_SENT_MODEL):
    try:
        tfidf_vectorizer = joblib.load(TFIDF_VECT)
        sentiment_model = joblib.load(TFIDF_SENT_MODEL)
        print("✅ TF-IDF sentiment model loaded.")
    except Exception as e:
        print("⚠️ Could not load TF-IDF models:", e)
else:
    print("⚠️ TF-IDF model files not found. TF-IDF functions will be limited.")

# ---------- Optional: load fine-tuned BERT (if present and transformers available) ----------
bert_tokenizer = None
bert_model = None
device = "cuda" if torch.cuda.is_available() else "cpu"

if TRANSFORMERS_AVAILABLE and os.path.isdir(BERT_MODEL_DIR):
    try:
        bert_tokenizer = BertTokenizer.from_pretrained(BERT_MODEL_DIR)
        bert_model = BertForSequenceClassification.from_pretrained(BERT_MODEL_DIR)
        bert_model.to(device)
        bert_model.eval()
        print(f"✅ Local fine-tuned BERT loaded on {device}.")
    except Exception as e:
        print("⚠️ Failed to load local BERT:", e)
else:
    if TRANSFORMERS_AVAILABLE:
        print("ℹ️ No local BERT folder found; skipping BERT contextual model.")
    else:
        print("ℹ️ transformers not available; BERT contextual model disabled.")

# ---------- Optional: emotion model (GoEmotions) ----------
emotion_tokenizer = None
emotion_model = None
if TRANSFORMERS_AVAILABLE:
    try:
        # Attempt to use a light, commonly-available emotion model if online
        emo_model_name = os.getenv("EMOTION_MODEL_NAME", "j-hartmann/emotion-english-distilroberta-base")
        emotion_tokenizer = AutoTokenizer.from_pretrained(emo_model_name)
        emotion_model = AutoModelForSequenceClassification.from_pretrained(emo_model_name)
        emotion_model.to(device)
        emotion_model.eval()
        print("✅ Emotion model loaded.")
    except Exception as e:
        print("⚠️ Could not load emotion model (online). Emotion features will be limited.", e)

# ---------- Utilities ----------
def safe_tfidf_predict(text: str):
    if tfidf_vectorizer is None or sentiment_model is None:
        return "Neutral", 0.0
    try:
        feats = tfidf_vectorizer.transform([text])
        pred = sentiment_model.predict(feats)[0]
        conf = float(max(sentiment_model.predict_proba(feats)[0]))
        return pred, conf
    except Exception:
        return "Neutral", 0.0

def safe_bert_predict(text: str):
    if bert_model is None or bert_tokenizer is None:
        return None, 0.0
    try:
        inputs = bert_tokenizer(text, return_tensors="pt", truncation=True, padding=True, max_length=128).to(device)
        with torch.no_grad():
            out = bert_model(**inputs)
            probs = F.softmax(out.logits, dim=1)
            label_id = int(torch.argmax(probs, dim=1).item())
            conf = float(probs[0][label_id].item())
        # expecting label mapping 0/1/2 -> Negative/Neutral/Positive; allow fallback
        label_map = getattr(bert_model.config, "id2label", {0: "Negative", 1: "Neutral", 2: "Positive"})
        return label_map.get(label_id, "Neutral"), conf
    except Exception:
        return None, 0.0

def safe_emotion_predict(text: str):
    if emotion_model is None or emotion_tokenizer is None:
        return "neutral", 0.0
    try:
        inputs = emotion_tokenizer(text, return_tensors="pt", truncation=True, padding=True, max_length=128).to(device)
        with torch.no_grad():
            logits = emotion_model(**inputs).logits
        probs = F.softmax(logits, dim=1)
        label_id = int(torch.argmax(probs, dim=1).item())
        label = emotion_model.config.id2label[label_id]
        conf = float(probs[0][label_id].item())
        return label.lower(), conf
    except Exception:
        return "neutral", 0.0

def get_synonyms_oxford(word: str):
    if not USE_OXFORD or not OXFORD_APP_ID or not OXFORD_APP_KEY:
        return []
    try:
        url = f"{OXFORD_API_URL}{word.lower()}"
        headers = {"app_id": OXFORD_APP_ID, "app_key": OXFORD_APP_KEY}
        r = requests.get(url, headers=headers, timeout=5)
        if r.status_code != 200:
            return []
        data = r.json()
        senses = data["results"][0]["lexicalEntries"][0]["entries"][0]["senses"]
        syns = []
        for s in senses:
            if "synonyms" in s:
                syns.extend([x["text"] for x in s["synonyms"]])
        return list(set(syns))
    except Exception:
        return []

# ---------- Main analysis ----------
def analyze_user_input(user_input: str):
    """
    Returns:
    {
      status, message,
      sentiment, sentiment_confidence,
      emotion, emotion_confidence,
      brands (list), features (list)
    }
    """
    if not user_input or not user_input.strip():
        return {"status": "error", "message": "Empty input."}

    # 1) TFIDF prediction (fallback baseline)
    tfidf_label, tfidf_conf = safe_tfidf_predict(user_input)

    # 2) BERT contextual prediction (if available)
    bert_label, bert_conf = safe_bert_predict(user_input)

    # choose best available
    if bert_label is not None and bert_conf >= tfidf_conf:
        sentiment = bert_label
        sentiment_conf = bert_conf
    else:
        sentiment = tfidf_label
        sentiment_conf = tfidf_conf

    # 3) emotion
    emotion_label, emotion_conf = safe_emotion_predict(user_input)

    # 4) brand & feature extraction (simple keyword-based; left to recommender for heavy NER)
    known_brands = ["samsung", "apple", "nokia", "oneplus", "sony", "xiaomi", "oppo", "vivo", "realme", "lenovo", "itel", "itel"]
    lower = user_input.lower()
    detected_brands = [b for b in known_brands if b in lower]

    feature_keywords = ["camera", "battery", "display", "screen", "charger", "price", "storage", "processor", "performance", "design", "ram"]
    detected_features = [f for f in feature_keywords if f in lower]

    # expand features via Oxford optionally
    expanded = []
    if detected_features and USE_OXFORD:
        for f in detected_features:
            expanded += get_synonyms_oxford(f)
    features = list(dict.fromkeys(detected_features + expanded))

    return {
        "status": "success",
        "message": "",
        "sentiment": sentiment,
        "sentiment_confidence": float(sentiment_conf),
        "emotion": emotion_label,
        "emotion_confidence": float(emotion_conf),
        "brands": detected_brands,
        "features": features
    }

# self-test (interactive)
if __name__ == "__main__":
    while True:
        t = input("Text ('exit' to quit): ")
        if t.strip().lower() in ("exit", "quit"):
            break
        print(analyze_user_input(t))
