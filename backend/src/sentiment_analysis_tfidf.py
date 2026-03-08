import os
import pandas as pd
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, accuracy_score

print("🚀 Starting sentiment_analysis_tfidf.py...")

# ============================================================
# 1️⃣ Setup & File Paths
# ============================================================
DATA_DIR = "data"
MODELS_DIR = "models"
TRAIN_PATH = os.path.join(DATA_DIR, "train_preprocessed.csv")
TEST_PATH = os.path.join(DATA_DIR, "test_preprocessed.csv")
SENTIMENT_READY_PATH = os.path.join(DATA_DIR, "sentiment_ready.csv")

os.makedirs(MODELS_DIR, exist_ok=True)

# ============================================================
# 2️⃣ Load Preprocessed Data
# ============================================================
if not (os.path.exists(TRAIN_PATH) and os.path.exists(TEST_PATH)):
    raise FileNotFoundError("❌ Preprocessed data not found. Run data_preprocessing.py first!")

train = pd.read_csv(TRAIN_PATH)
test = pd.read_csv(TEST_PATH)

print("✅ Data loaded successfully!")
print("📊 Columns available:", train.columns.tolist()[:10])

if "Cleaned_Reviews" not in train.columns or "Sentiment" not in train.columns:
    raise ValueError("❌ Missing 'Cleaned_Reviews' or 'Sentiment' columns. Check preprocessing!")

# ============================================================
# 3️⃣ Prepare Data
# ============================================================
X_train = train["Cleaned_Reviews"].fillna("")
y_train = train["Sentiment"]
X_test = test["Cleaned_Reviews"].fillna("")
y_test = test["Sentiment"]

# ============================================================
# 4️⃣ TF-IDF Vectorization
# ============================================================
print("🧠 Performing TF-IDF vectorization...")
tfidf = TfidfVectorizer(max_features=5000, stop_words="english")
X_train_tfidf = tfidf.fit_transform(X_train)
X_test_tfidf = tfidf.transform(X_test)

# ============================================================
# 5️⃣ Train Logistic Regression Model
# ============================================================
print("⚙️ Training Logistic Regression model...")
model = LogisticRegression(max_iter=500)
model.fit(X_train_tfidf, y_train)

# ============================================================
# 6️⃣ Evaluate Model
# ============================================================
y_pred = model.predict(X_test_tfidf)
print("\n✅ Model trained successfully!")
print("🎯 Accuracy:", round(accuracy_score(y_test, y_pred), 4))
print("\n📈 Classification Report:")
print(classification_report(y_test, y_pred))

# ============================================================
# 7️⃣ Save Model and Vectorizer
# ============================================================
tfidf_path = os.path.join(MODELS_DIR, "tfidf_vectorizer.pkl")
model_path = os.path.join(MODELS_DIR, "tfidf_sentiment_model.pkl")

joblib.dump(tfidf, tfidf_path)
joblib.dump(model, model_path)

print(f"\n💾 TF-IDF vectorizer saved to: {tfidf_path}")
print(f"💾 Sentiment model saved to: {model_path}")

# ============================================================
# 8️⃣ Save Sentiment-Ready Data (for Recommendation System)
# ============================================================
sentiment_ready_df = test[["Product Name", "Brand Name", "Price", "Rating", "Reviews", "Sentiment", "Cleaned_Reviews"]].copy()
sentiment_ready_df.to_csv(SENTIMENT_READY_PATH, index=False)
print(f"✅ Sentiment-ready dataset saved to: {SENTIMENT_READY_PATH}")

print("\n🎉 Sentiment analysis model and data preparation completed successfully!")
