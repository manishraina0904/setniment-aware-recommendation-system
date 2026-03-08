# src/generate_review_emotions.py
import os
import pandas as pd
import torch
from tqdm import tqdm
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch.nn.functional as F

MODEL_NAME = "j-hartmann/emotion-english-distilroberta-base"
device = "cuda" if torch.cuda.is_available() else "cpu"

print("Loading dataset...")
DATA_PATHS = ["data/test_preprocessed.csv", "data/recommendation_ready.csv", "data/sentiment_ready.csv"]
df = None
for p in DATA_PATHS:
    if os.path.exists(p):
        df = pd.read_csv(p)
        print("Loaded:", p)
        break
if df is None:
    raise FileNotFoundError("No input dataset found.")

text_col = next((c for c in df.columns if "review" in c.lower() or "clean" in c.lower()), df.columns[-1])
df[text_col] = df[text_col].astype(str).fillna("")

print("Loading emotion model...")
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME).to(device)
model.eval()

batch_size = 32
labels, confs = [], []
for i in tqdm(range(0, len(df), batch_size)):
    batch = df[text_col].iloc[i:i+batch_size].tolist()
    enc = tokenizer(batch, return_tensors="pt", truncation=True, padding=True, max_length=128).to(device)
    with torch.no_grad():
        logits = model(**enc).logits
    probs = F.softmax(logits, dim=1).cpu().numpy()
    ids = probs.argmax(axis=1)
    for idx, pid in enumerate(ids):
        labels.append(model.config.id2label[int(pid)].lower())
        confs.append(float(probs[idx, pid]))

df["emotion_label"] = labels
df["emotion_conf"] = confs
# optional mapping to sentiment
emotion_to_sentiment = {"joy":"Positive","love":"Positive","optimism":"Positive","gratitude":"Positive",
                        "anger":"Negative","disgust":"Negative","sadness":"Negative","fear":"Negative"}
df["emotion_sentiment"] = df["emotion_label"].map(emotion_to_sentiment).fillna("Neutral")

out = "data/emotion_ready.csv"
df.to_csv(out, index=False)
print("Saved:", out)
