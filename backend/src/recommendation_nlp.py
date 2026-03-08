# ============================================================
#  STABLE RECOMMENDATION ENGINE (v7.1)
#  - No NaN errors
#  - Fuzzy Hinglish brand matching
#  - One product per brand
#  - JSON-safe values
# ============================================================

import os
import pandas as pd
from typing import Optional
from difflib import get_close_matches

from src.bert_inference import analyze_user_input
from src.nlp_intent_filter import is_real_recommendation_query, set_known_brands


DATA_PATHS = [
    "data/emotion_ready.csv",
    "data/recommendation_ready.csv",
    "data/sentiment_ready.csv",
    "data/test_preprocessed.csv"
]

DEFAULT_TOP_N = 5

# ---------------------------------------------------------
# LOAD DATASET
# ---------------------------------------------------------

data = None
for p in DATA_PATHS:
    if os.path.exists(p):
        data = pd.read_csv(p)
        print(f"✅ Loaded dataset: {p}")
        break

if data is None:
    raise FileNotFoundError("No dataset found in data/")

# Normalize column names
colmap = {}
if "Product Name" in data.columns: colmap["Product Name"] = "product_name"
if "Brand Name" in data.columns: colmap["Brand Name"] = "brand"
if "Rating" in data.columns: colmap["Rating"] = "rating"

data = data.rename(columns=colmap)

# Required columns
for c in ["product_name", "brand", "rating"]:
    if c not in data.columns:
        raise ValueError(f"Dataset missing required column: {c}")

# Text column
text_cols = [c for c in data.columns if "review" in c.lower() or "clean" in c.lower()]
review_col = text_cols[0] if text_cols else data.columns[-1]
data["review_text"] = data[review_col].astype(str).fillna("")

# Brand list
KNOWN_BRANDS = list(data["brand"].dropna().astype(str).str.lower().unique())
set_known_brands(KNOWN_BRANDS)  # <-- IMPORTANT FIX


# ---------------------------------------------------------
# SAFE FUZZY MATCH (Hinglish tolerant)
# ---------------------------------------------------------

def fuzzy_brand_match(token: str):
    matches = get_close_matches(token.lower(), KNOWN_BRANDS, n=1, cutoff=0.50)
    return matches[0] if matches else None


# ---------------------------------------------------------
# FEATURE MATCH
# ---------------------------------------------------------

def feature_match_score(text: str, features: list):
    if not features:
        return 0
    t = str(text).lower()
    return sum(1 for f in features if f.lower() in t)


# ---------------------------------------------------------
# NORMALIZATION (NaN-SAFE)
# ---------------------------------------------------------

def normalize_series(s: pd.Series):
    s = s.fillna(0)
    if s.max() == s.min():
        return s.apply(lambda _: 0.0)
    return (s - s.min()) / (s.max() - s.min())


# ---------------------------------------------------------
# RANKING SYSTEM
# ---------------------------------------------------------

def rank_products(sentiment: str, brands=None, features=None, top_n=DEFAULT_TOP_N):

    df = data.copy()

    # Brand filtering (safe fallback)
    if brands:
        b0 = brands[0].lower()
        fb = fuzzy_brand_match(b0) or b0
        filtered = df[df["brand"].str.contains(fb, case=False, na=False)]
        df = filtered if not filtered.empty else data.copy()

    # Feature match
    df["feature_match"] = df["review_text"].apply(lambda t: feature_match_score(t, features))

    # Normalize everything safely
    df["rating_norm"] = normalize_series(df["rating"].astype(float))
    df["feature_norm"] = normalize_series(df["feature_match"])
    df["sentiment_norm"] = normalize_series(df.get("sentiment_score", pd.Series([0]*len(df))))
    df["emotion_norm"] = normalize_series(df.get("emotion_conf", pd.Series([0]*len(df))))

    # Brand penalty
    bc = df["brand"].value_counts()
    df["brand_penalty"] = df["brand"].apply(lambda b: 1.0 / bc.get(b, 1))

    s = sentiment.lower()
    sdir = 1 if s == "positive" else -1 if s == "negative" else 0
    df["sentiment_norm"] = df["sentiment_norm"] * sdir

    df["final_score"] = (
        0.30 * df["rating_norm"] +
        0.25 * df["sentiment_norm"] +
        0.20 * df["feature_norm"] +
        0.10 * df["brand_penalty"] +
        0.15 * df["emotion_norm"]
    )

    df = df.replace([float("inf"), float("-inf")], 0).fillna(0)

    df = df.sort_values("final_score", ascending=False)
    df = df.groupby("brand").head(2).reset_index(drop=True)

    cols = ["product_name", "brand", "rating", "final_score"]

    if "product_image" in df.columns:
        cols.append("product_image")
    else:
        df["product_image"] = ""
        cols.append("product_image")

    return df[cols].head(top_n)


# ---------------------------------------------------------
# PUBLIC FUNCTION
# ---------------------------------------------------------

def generate_recommendations(user_input: str, top_n: int = DEFAULT_TOP_N) -> Optional[pd.DataFrame]:

    if not is_real_recommendation_query(user_input):
        print("⚠ Query rejected by intent filter.")
        return None

    analysis = analyze_user_input(user_input)
    if analysis.get("status") != "success":
        print("⚠ Analysis failed", analysis)
        return None

    sentiment = analysis.get("sentiment", "Neutral")
    brands = analysis.get("brands", [])
    features = analysis.get("features", [])

    return rank_products(sentiment, brands, features, top_n)