Sentiment-Aware Product Recommendation System
Using NLP, BERT (Pretrained), TF-IDF, Logistic Regression & Emotion Analysis (GoEmotions)

This system recommends mobile phones by understanding the user’s sentiment, emotion, features, and brand preference. It analyzes the emotions and sentiment of product reviews and uses them to generate intelligent recommendations.

----------------------------------------------------------------------
PROJECT PIPELINE OVERVIEW
----------------------------------------------------------------------
RAW DATA
   ↓
(1) Data Preprocessing
   ↓
(2) Sentiment Model Training (TF-IDF + Logistic Regression)
   ↓
(3) Emotion Detection on Reviews (GoEmotions)
   ↓
(4) Final Dataset Generation
   ↓
(5) User Input Processing (BERT + TF-IDF)
   ↓
(6) Recommendation System

----------------------------------------------------------------------
FOLDER STRUCTURE
----------------------------------------------------------------------
machine_learnig_project/
│
├── generate_review_emotions.py      (important: this is in main folder)
│
├── src/
│   ├── data_preprocessing.py
│   ├── sentiment_analysis_tfidf.py
│   ├── bert_inference.py
│   └── recommendation_nlp.py
│
├── models/
│   ├── bert_model/
│   ├── tfidf_vectorizer.pkl
│   └── tfidf_sentiment_model.pkl
│
├── data/
│   ├── raw_reviews.csv
│   ├── test_preprocessed.csv
│   ├── sentiment_ready.csv
│   ├── emotion_ready.csv
│   └── recommendation_ready.csv
│
├── venv/
├── requirements.txt
└── README.txt

----------------------------------------------------------------------
INSTALLATION GUIDE (BEGINNER FRIENDLY)
----------------------------------------------------------------------

1) Install Python 3.10 or 3.11:
python --version

2) Navigate to project folder:
cd M:\MANISH\machine_learnig_project

3) Create virtual environment:
python -m venv venv

4) Activate environment:
.\venv\Scripts\activate

5) Install dependencies:
pip install -r requirements.txt

----------------------------------------------------------------------
STEP 1 — DATA PREPROCESSING
----------------------------------------------------------------------
Run:
python src\data_preprocessing.py

Creates:
data/test_preprocessed.csv

----------------------------------------------------------------------
STEP 2 — TRAIN TF-IDF + LOGISTIC REGRESSION MODEL
----------------------------------------------------------------------
Run:
python src\sentiment_analysis_tfidf.py

Creates:
models/tfidf_vectorizer.pkl
models/tfidf_sentiment_model.pkl

----------------------------------------------------------------------
STEP 3 — EMOTION DETECTION FOR REVIEWS
----------------------------------------------------------------------
IMPORTANT: This file is in MAIN PROJECT FOLDER, not in /src

Run:
python generate_review_emotions.py

Creates:
data/emotion_ready.csv

Adds:
emotion_label
emotion_conf
emotion_sentiment

----------------------------------------------------------------------
STEP 4 — TEST NLP ENGINE (Sentiment + Emotion + Feature Extraction)
----------------------------------------------------------------------
Run:
python src\bert_inference.py

Checks:
- TF-IDF sentiment
- BERT sentiment (pretrained)
- GoEmotions emotion
- Brand detection
- Feature detection
- Input validation

----------------------------------------------------------------------
STEP 5 — RUN FINAL RECOMMENDATION SYSTEM
----------------------------------------------------------------------
Run:
python src\recommendation_nlp.py

Valid inputs:
I want phone with good battery
I want Samsung phone
phone with good camera but bad battery
cheap phone with long battery

Invalid inputs:
yo
hi
ok
happy birthday

----------------------------------------------------------------------
HOW THE RECOMMENDATION SYSTEM WORKS
----------------------------------------------------------------------

1) Sentiment Analysis:
Uses TF-IDF + Logistic Regression  
Uses pretrained BERT (inference only)

2) Emotion Analysis:
GoEmotions labels each review with:
joy, anger, sadness, love, optimism, gratitude, etc.

3) Feature Matching:
Detects battery, camera, display, storage, processor, etc.

4) Brand Matching:
Samsung, Apple, Acer, Nokia, OnePlus, Xiaomi, etc.

5) Brand Bias Correction:
Prevents Apple from dominating recommendations.

6) Final Score Calculation:
35% rating_norm
30% sentiment_norm
20% feature_norm
10% brand_penalty
5% emotion_alignment

----------------------------------------------------------------------
INPUT VALIDATION RULES
----------------------------------------------------------------------

System blocks meaningless inputs:
yo
hi
ok
birthday

Requires:
- brand
- feature
- phone keyword
- meaningful sentence

----------------------------------------------------------------------
TROUBLESHOOTING
----------------------------------------------------------------------

If emotion_ready.csv cannot be saved:
Close Excel → delete file → run again.

If BERT model not found:
Ensure folder exists:
models/bert_model/

If TF-IDF model missing:
Run:
python src\sentiment_analysis_tfidf.py

If no recommendations:
Give valid input with brand or feature.

----------------------------------------------------------------------
TECHNOLOGIES USED
----------------------------------------------------------------------

Python
Pandas
NumPy
Scikit-Learn
PyTorch
Transformers
GoEmotions model (DistilRoBERTa)
Requests
Matplotlib / Seaborn

----------------------------------------------------------------------
FINAL NOTES
----------------------------------------------------------------------

Your project is:
✔ Fully working
✔ Sentiment-aware
✔ Emotion-aware
✔ NLP powered
✔ Uses pretrained BERT (no training needed)
✔ Ready for final-year submission
--------------------------------

To run this backend

 first activate the environment  the commmand is:-   .\venv\Scripts\Activate.ps1

then run this command this si the main command to run this backend :-   uvicorn api:app --reload

Now the backend is running now go for frontend 

to run the frontend in new windown  the commands are

 frist commnand :- pnpm install
 second command :- pnpm dev
