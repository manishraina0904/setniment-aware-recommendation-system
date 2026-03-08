# ======================
# 📘 Sentiment-Aware Recommendation System
# Step 1: Data Preprocessing
# ======================

import pandas as pd
import numpy as np
import re
import string
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, MinMaxScaler
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import nltk

# Download resources for NLP
nltk.download('stopwords')
nltk.download('wordnet')

# Load dataset
df = pd.read_csv("./data/Amazon_Unlocked_Mobile.csv")

# ======================
# Step 1: Handle Missing Values
# ======================
df.dropna(subset=['Product Name', 'Reviews', 'Rating'], inplace=True)
df['Brand Name'].fillna("Unknown", inplace=True)
df['Price'].fillna(df['Price'].median(), inplace=True)
df['Review Votes'].fillna(0, inplace=True)

# ======================
# Step 2: Sentiment Label Creation
# ======================
def label_sentiment(rating):
    if rating >= 4:
        return "Positive"
    elif rating == 3:
        return "Neutral"
    else:
        return "Negative"

df['Sentiment'] = df['Rating'].apply(label_sentiment)

# ======================
# Step 3: Text Cleaning Function
# ======================
stop_words = set(stopwords.words('english'))
lemmatizer = WordNetLemmatizer()

def clean_text(text):
    text = text.lower()                              # Lowercase
    text = re.sub(r'[^a-z\s]', '', text)             # Remove punctuation and numbers
    tokens = text.split()
    tokens = [lemmatizer.lemmatize(word) for word in tokens if word not in stop_words]
    return " ".join(tokens)

df['Cleaned_Reviews'] = df['Reviews'].astype(str).apply(clean_text)

# ======================
# Step 4: Encode Categorical Features
# ======================
le_brand = LabelEncoder()
df['Brand_Encoded'] = le_brand.fit_transform(df['Brand Name'])

# ======================
# Step 5: Feature Scaling
# ======================
scaler = MinMaxScaler()
df[['Price_Scaled', 'Votes_Scaled']] = scaler.fit_transform(df[['Price', 'Review Votes']])

# ======================
# Step 6: Train-Test Split
# ======================
train_df, test_df = train_test_split(df, test_size=0.2, random_state=42, stratify=df['Sentiment'])

print("✅ Data preprocessing completed successfully!")
print("Training size:", train_df.shape)
print("Testing size:", test_df.shape)

# ======================
# Step 7: Save Preprocessed Data
# ======================
train_df.to_csv("./data/train_preprocessed.csv", index=False)
test_df.to_csv("./data/test_preprocessed.csv", index=False)

print("✅ Preprocessed data saved successfully to 'data/' folder!")
