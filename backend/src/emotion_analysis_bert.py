# ==============================================
# 🤖 Advanced Emotion Analysis using BERT + Recommendation Prep
# ==============================================

import os
import json
import logging
import numpy as np
import pandas as pd
import torch
from sklearn.metrics import classification_report, confusion_matrix
from datasets import Dataset
from transformers import (
    AutoTokenizer,
    AutoModelForSequenceClassification,
    Trainer,
    TrainingArguments,
    EarlyStoppingCallback,
)

# ==========================
# 1️⃣ Setup & Configuration
# ==========================
TRAIN_PATH = "./data/train_preprocessed.csv"
TEST_PATH = "./data/test_preprocessed.csv"
MODEL_DIR = "./models/bert_model"
TOKENIZER_DIR = "./models/bert_tokenizer"
RESULTS_DIR = "./models/bert_results"
LOG_DIR = "./models/bert_logs"

os.makedirs(MODEL_DIR, exist_ok=True)
os.makedirs(TOKENIZER_DIR, exist_ok=True)
os.makedirs(RESULTS_DIR, exist_ok=True)
os.makedirs(LOG_DIR, exist_ok=True)

logging.basicConfig(filename=f"{LOG_DIR}/training_log.txt", level=logging.INFO)
device = "cuda" if torch.cuda.is_available() else "cpu"
print(f"🚀 Training on device: {device.upper()}")

# ==========================
# 2️⃣ Load and Prepare Data
# ==========================
if not os.path.exists(TRAIN_PATH) or not os.path.exists(TEST_PATH):
    raise FileNotFoundError("❌ Preprocessed CSV files not found. Run data_preprocessing.py first.")

train_df = pd.read_csv(TRAIN_PATH)
test_df = pd.read_csv(TEST_PATH)

print("✅ Loaded data successfully!")
print("Train shape:", train_df.shape, "| Test shape:", test_df.shape)

train_df["Cleaned_Reviews"] = train_df["Cleaned_Reviews"].fillna("")
test_df["Cleaned_Reviews"] = test_df["Cleaned_Reviews"].fillna("")

# ==========================
# 3️⃣ Label Mapping
# ==========================
label_map = {"Negative": 0, "Neutral": 1, "Positive": 2}
train_df["label"] = train_df["Sentiment"].map(label_map)
test_df["label"] = test_df["Sentiment"].map(label_map)

with open("./models/label_map.json", "w") as f:
    json.dump(label_map, f)

# ==========================
# 4️⃣ Tokenization
# ==========================
MODEL_NAME = "bert-base-uncased"
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)

def tokenize_data(example):
    return tokenizer(
        example["Cleaned_Reviews"],
        truncation=True,
        padding="max_length",
        max_length=128,
    )

train_ds = Dataset.from_pandas(train_df[["Cleaned_Reviews", "label"]])
test_ds = Dataset.from_pandas(test_df[["Cleaned_Reviews", "label"]])

train_ds = train_ds.map(tokenize_data, batched=True)
test_ds = test_ds.map(tokenize_data, batched=True)

# ==========================
# 5️⃣ Load Model
# ==========================
model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME, num_labels=3)

# ==========================
# 6️⃣ Training Configuration
# ==========================
training_args = TrainingArguments(
    output_dir=RESULTS_DIR,
    evaluation_strategy="epoch",
    save_strategy="epoch",
    learning_rate=2e-5,
    per_device_train_batch_size=8,
    per_device_eval_batch_size=8,
    num_train_epochs=3,
    weight_decay=0.01,
    logging_dir=LOG_DIR,
    logging_steps=20,
    load_best_model_at_end=True,
    metric_for_best_model="f1",
    save_total_limit=2,
    fp16=torch.cuda.is_available(),
)

def compute_metrics(pred):
    preds = np.argmax(pred.predictions, axis=1)
    labels = pred.label_ids
    report = classification_report(labels, preds, output_dict=True)
    return {
        "accuracy": report["accuracy"],
        "precision": report["weighted avg"]["precision"],
        "recall": report["weighted avg"]["recall"],
        "f1": report["weighted avg"]["f1-score"],
    }

# ==========================
# 7️⃣ Trainer Setup
# ==========================
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_ds,
    eval_dataset=test_ds,
    tokenizer=tokenizer,
    compute_metrics=compute_metrics,
    callbacks=[EarlyStoppingCallback(early_stopping_patience=2)],
)

# ==========================
# 8️⃣ Train Model
# ==========================
print("🚀 Starting training...")
trainer.train()
print("✅ Training completed successfully!")

# ==========================
# 9️⃣ Evaluate Model
# ==========================
print("\n📊 Evaluating model on test data...")
predictions = trainer.predict(test_ds)
y_pred = np.argmax(predictions.predictions, axis=1)
y_true = predictions.label_ids

print("\n📈 Final Classification Report:")
print(classification_report(y_true, y_pred, target_names=["Negative", "Neutral", "Positive"]))
print("🧩 Confusion Matrix:\n", confusion_matrix(y_true, y_pred))

# ==========================
# 🔟 Save Model & Tokenizer (Fixed)
# ==========================
print("\n💾 Saving model and tokenizer together...")

# Save both in same folder
model.save_pretrained(MODEL_DIR)
tokenizer.save_pretrained(MODEL_DIR)

# Also save tokenizer separately (optional)
tokenizer.save_pretrained(TOKENIZER_DIR)

print(f"\n💾 Model + Tokenizer saved to: {MODEL_DIR}")
print(f"🎯 Training log saved to: {LOG_DIR}/training_log.txt")

# ==========================
# 1️⃣1️⃣ (Optional) Prepare Recommendation Dataset
# ==========================
if {"Product Name", "Brand Name", "Price", "Rating", "Reviews"}.issubset(train_df.columns):
    rec_data = train_df[["Product Name", "Brand Name", "Price", "Rating", "Reviews", "Sentiment", "Cleaned_Reviews"]]
    rec_data.to_csv("./data/recommendation_ready.csv", index=False)
    print("🧩 Preparing recommendation dataset...")
    print("✅ Recommendation-ready dataset saved at: ./data/recommendation_ready.csv")
