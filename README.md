# 🧠 Sentiment-Aware Product Recommendation System Using NLP

> An NLP-powered product recommendation system that combines **sentiment analysis, emotion detection, contextual language understanding, and product similarity** to generate more personalized product recommendations from customer reviews.

---

## 📌 Overview

Traditional recommendation systems primarily depend on:

* Product ratings
* Purchase history
* User interactions
* Product similarity
* Click behavior

However, numerical ratings alone do not capture **why** a customer likes or dislikes a product.

For example:

> *"The camera quality is excellent, but the battery drains very quickly."*

A traditional system may only see a 4-star rating.

A sentiment-aware system can extract:

```text
Camera Quality → Positive
Battery Life   → Negative
Overall Review → Mixed / Positive
```

This project uses **Natural Language Processing (NLP)** and **Machine Learning** to analyze customer reviews, detect sentiment and emotions, build product-level preference information, and incorporate these signals into product recommendation.

---

# 🎯 Project Objectives

The main objectives of the project are:

1. Analyze customer product reviews using NLP.
2. Clean and preprocess textual review data.
3. Detect positive, negative, and neutral sentiment.
4. Extract deeper emotional information from reviews.
5. Compare traditional NLP methods with transformer-based models.
6. Convert textual reviews into numerical representations.
7. Build sentiment classification models.
8. Fine-tune transformer models for emotion detection.
9. Incorporate sentiment and emotional information into recommendation.
10. Generate personalized product recommendations.
11. Evaluate both NLP classification and recommendation performance.

---

# ⭐ Key Results

| Component                | Approach                       |                   Result |
| ------------------------ | ------------------------------ | -----------------------: |
| Sentiment Analysis       | VADER                          |                 Baseline |
| Sentiment Classification | TF-IDF + Logistic Regression   |      **85–90% accuracy** |
| Emotion Detection        | Fine-tuned BERT                |         **96% accuracy** |
| Product Recommendation   | Sentiment-aware recommendation | **90–95% match quality** |

> **Note:** The recommendation metric is reported as **match quality**, not conventional classification accuracy.

---

# 🚀 Key Features

### 🔹 Sentiment Analysis

Classifies customer reviews into sentiment categories:

* Positive
* Negative
* Neutral

### 🔹 Emotion Detection

Goes beyond simple sentiment classification and attempts to identify the emotional response expressed in a review.

Examples:

* Joy
* Satisfaction
* Anger
* Sadness
* Frustration
* Surprise

### 🔹 Traditional NLP Pipeline

Uses:

* TF-IDF
* Logistic Regression
* VADER

### 🔹 Transformer-Based NLP

Uses:

* BERT
* DistilRoBERTa

for contextual understanding of review text.

### 🔹 Sentiment-Aware Recommendations

Recommendations consider information extracted from customer reviews rather than relying exclusively on product similarity or ratings.

### 🔹 Product Similarity

Textual product/review representations can be compared using vector similarity techniques such as cosine similarity.

---

# 🏗️ System Architecture

```text
                         ┌─────────────────────┐
                         │   Product Dataset   │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   Customer Reviews  │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │ Text Preprocessing  │
                         └──────────┬──────────┘
                                    │
                    ┌───────────────┴────────────────┐
                    │                                │
                    ▼                                ▼
          ┌──────────────────┐             ┌──────────────────┐
          │ VADER Sentiment  │             │ TF-IDF Features  │
          └────────┬─────────┘             └────────┬─────────┘
                   │                                │
                   │                                ▼
                   │                     ┌────────────────────┐
                   │                     │ Logistic Regression│
                   │                     └─────────┬──────────┘
                   │                               │
                   └──────────────┬────────────────┘
                                  │
                                  ▼
                         ┌───────────────────┐
                         │ Sentiment Signals │
                         └─────────┬─────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │ BERT /            │
                         │ DistilRoBERTa     │
                         └─────────┬─────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │ Emotion Detection │
                         └─────────┬─────────┘
                                   │
                                   ▼
                       ┌────────────────────────┐
                       │ Product Representation │
                       └────────────┬───────────┘
                                    │
                                    ▼
                       ┌────────────────────────┐
                       │ Recommendation Engine │
                       └────────────┬───────────┘
                                    │
                                    ▼
                       ┌────────────────────────┐
                       │ Product Similarity +   │
                       │ Sentiment/Emotion      │
                       └────────────┬───────────┘
                                    │
                                    ▼
                       ┌────────────────────────┐
                       │ Product Ranking        │
                       └────────────┬───────────┘
                                    │
                                    ▼
                       ┌────────────────────────┐
                       │ Top-N Recommendations │
                       └────────────────────────┘
```

---

# 🧩 Technology Stack

## Programming

* Python

## Data Processing

* Pandas
* NumPy

## Natural Language Processing

* NLTK
* VADER
* TF-IDF

## Machine Learning

* Scikit-learn
* Logistic Regression

## Deep Learning / Transformers

* BERT
* DistilRoBERTa

## Recommendation

* Content-based similarity
* Cosine similarity
* Sentiment-aware ranking

## Visualization

* Matplotlib
* Seaborn

---

# 📂 Project Structure

A recommended repository structure is:

```text
sentiment-aware-product-recommendation/
│
├── data/
│   ├── raw/
│   └── processed/
│
├── notebooks/
│   ├── 01_data_exploration.ipynb
│   ├── 02_sentiment_analysis.ipynb
│   ├── 03_tfidf_logistic_regression.ipynb
│   ├── 04_bert_emotion_detection.ipynb
│   └── 05_recommendation_engine.ipynb
│
├── src/
│   ├── preprocessing/
│   │   └── text_preprocessing.py
│   │
│   ├── sentiment/
│   │   ├── vader_sentiment.py
│   │   └── sentiment_classifier.py
│   │
│   ├── emotion/
│   │   └── bert_emotion.py
│   │
│   ├── recommendation/
│   │   └── recommender.py
│   │
│   └── utils/
│       └── evaluation.py
│
├── models/
│   ├── tfidf/
│   ├── logistic_regression/
│   └── transformer/
│
├── results/
│   ├── sentiment_results/
│   ├── emotion_results/
│   └── recommendation_results/
│
├── requirements.txt
├── README.md
└── .gitignore
```

> The exact folder structure can be adjusted to match the implementation in the repository.

---

# 🔄 End-to-End Workflow

```text
Customer Review
       │
       ▼
Text Cleaning
       │
       ▼
Tokenization
       │
       ▼
Normalization
       │
       ▼
Sentiment Analysis
       │
       ├───────────────┐
       ▼               ▼
    VADER          TF-IDF
                       │
                       ▼
                Logistic Regression
                       │
                       ▼
                  Sentiment
                       │
                       ▼
               BERT / DistilRoBERTa
                       │
                       ▼
                  Emotion
                       │
                       ▼
             User Preference Profile
                       │
                       ▼
             Product Representation
                       │
                       ▼
               Similarity Calculation
                       │
                       ▼
              Sentiment-Aware Ranking
                       │
                       ▼
                Top-N Products
```

---

# 📝 1. Data Processing

The system begins with product and review information.

Typical fields include:

```text
product_id
product_name
category
review_text
rating
review_title
```

Example:

```text
Product:
Wireless Headphones

Review:
"The sound quality is excellent and the headphones
are comfortable, but the battery life is disappointing."

Rating:
4
```

The primary NLP input is the `review_text`.

---

# 🧹 2. Text Preprocessing

Raw reviews are processed before being passed to traditional machine-learning models.

Typical operations include:

```text
Raw Text
   ↓
Lowercasing
   ↓
Removing unnecessary characters
   ↓
Tokenization
   ↓
Stop-word handling
   ↓
Lemmatization
   ↓
Clean Text
```

### Example

Original:

```text
"The headphones are REALLY amazing!!! I loved them."
```

Processed representation:

```text
headphone really amazing loved
```

The exact preprocessing depends on the downstream model.

Transformer models such as BERT generally use their own tokenization strategy rather than aggressive traditional preprocessing.

---

# ❤️ 3. Sentiment Analysis

Sentiment analysis determines the polarity of a review.

The basic categories are:

```text
Positive
Negative
Neutral
```

Example:

```text
"The sound quality is amazing."

→ Positive
```

```text
"The battery life is terrible."

→ Negative
```

---

# 🧠 4. VADER

VADER stands for:

> **Valence Aware Dictionary and sEntiment Reasoner**

It is a lexicon- and rule-based sentiment analysis approach.

VADER is useful because it:

* Is lightweight
* Is fast
* Requires no model training
* Provides a strong baseline
* Works well for short textual content

VADER provides sentiment scores including a normalized compound score.

Conceptually:

```text
Compound > 0 → Positive
Compound < 0 → Negative
Compound ≈ 0 → Neutral
```

The exact thresholds should follow the implementation used in the project.

---

# 🔢 5. TF-IDF

TF-IDF stands for:

> **Term Frequency–Inverse Document Frequency**

Traditional ML models cannot directly understand raw text.

TF-IDF converts text into numerical feature vectors.

### Term Frequency

Measures how frequently a word occurs in a document.

### Inverse Document Frequency

Reduces the importance of words that occur across many documents.

### Formula

```text
TF-IDF = TF × IDF
```

More formally:

$$
TFIDF(t,d)=TF(t,d)\times IDF(t)
$$

where:

$$
IDF(t)=\log\left(\frac{N}{df(t)}\right)
$$

TF-IDF therefore gives higher importance to words that are informative for particular documents.

---

# 🤖 6. Logistic Regression

TF-IDF features are passed to a Logistic Regression classifier.

Pipeline:

```text
Review
   ↓
Preprocessing
   ↓
TF-IDF
   ↓
Numerical Vector
   ↓
Logistic Regression
   ↓
Sentiment
```

Logistic Regression estimates class probabilities using a sigmoid function for binary classification:

$$
P(y=1|x)=\frac{1}{1+e^{-z}}
$$

where:

$$
z=w^Tx+b
$$

For multiclass problems, Logistic Regression can be extended using appropriate multiclass strategies.

---

# 📊 Sentiment Classification Result

The reported performance for the traditional NLP approach was:

### **85–90% accuracy**

```text
TF-IDF
   +
Logistic Regression
   =
85–90% Sentiment Classification Accuracy
```

---

# 🤗 7. BERT

BERT stands for:

> **Bidirectional Encoder Representations from Transformers**

Unlike simple bag-of-words representations, BERT creates **contextual representations**.

For example:

```text
"The battery isn't good."
```

The meaning of `good` depends on its surrounding context.

BERT can model these contextual relationships.

---

# 🔧 8. Fine-Tuning BERT

Instead of training BERT from scratch, a pretrained BERT model can be fine-tuned on a task-specific dataset.

Pipeline:

```text
Pretrained BERT
       ↓
Task-Specific Dataset
       ↓
Fine-Tuning
       ↓
Emotion Classifier
       ↓
Predictions
```

Fine-tuning allows the pretrained language model to adapt to the project's specific classification task.

---

# 😊 9. Emotion Detection

Sentiment answers:

> "Is the review positive or negative?"

Emotion detection attempts to answer:

> "What emotional response does the review express?"

For example:

```text
"I absolutely love this phone."

→ Positive sentiment
→ Joy / satisfaction-related emotion
```

Another example:

```text
"The phone keeps crashing and I'm frustrated."

→ Negative sentiment
→ Frustration / anger-related emotion
```

---

# 📈 Emotion Detection Result

The reported BERT emotion-detection performance was:

### **96% accuracy**

```text
Fine-Tuned BERT
       ↓
Emotion Detection
       ↓
96% Accuracy
```

---

# ⚡ 10. DistilRoBERTa

DistilRoBERTa is a distilled transformer model based on RoBERTa.

The purpose of using a distilled transformer is to obtain strong contextual NLP capabilities while reducing model size and computational requirements compared with a larger transformer model.

### General trade-off

```text
Large Transformer
      ↓
Higher computational cost

Distilled Transformer
      ↓
Smaller / lighter model
      ↓
More efficient inference
```

---

# 🔍 11. Sentiment vs Emotion

| Aspect         | Sentiment                     | Emotion                    |
| -------------- | ----------------------------- | -------------------------- |
| Purpose        | Opinion polarity              | Emotional state            |
| Typical output | Positive / Negative / Neutral | Joy, anger, sadness, etc.  |
| Granularity    | Lower                         | Higher                     |
| Example        | Positive                      | Joy                        |
| Use in project | Preference signal             | Detailed preference signal |

---

# 🛍️ 12. Recommendation Engine

The recommendation engine combines product similarity with information extracted from reviews.

Conceptually:

```text
Product Information
       +
Review Information
       +
Sentiment
       +
Emotion
       ↓
Product Representation
       ↓
Similarity
       ↓
Sentiment-Aware Ranking
       ↓
Top-N Recommendations
```

---

# 📐 13. Cosine Similarity

For vector representations, cosine similarity can be used to determine how similar two vectors are.

Formula:

$$
Similarity(A,B)=
\frac{A\cdot B}
{\|A\|\|B\|}
$$

A value closer to 1 generally indicates stronger similarity in vector direction, while a value closer to 0 indicates less similarity.

---

# 💡 14. Why Sentiment Improves Recommendations

Consider a user review:

> *"I love the camera and display, but the battery backup is disappointing."*

The system can extract:

```text
Positive:
✓ Camera
✓ Display

Negative:
✗ Battery
```

A recommendation system can then prioritize products that provide:

```text
Good Camera
+
Good Display
+
Better Battery
```

rather than simply recommending another product that is broadly similar.

This is the core idea behind **sentiment-aware recommendation**.

---

# 👤 15. User Preference Representation

The system can create a preference profile from review signals.

Example:

```text
USER PREFERENCE PROFILE

Likes:
✓ High camera quality
✓ High display quality
✓ Good performance

Dislikes:
✗ Poor battery
✗ Overheating
```

This information can then contribute to product ranking.

---

# 🧮 16. Recommendation Scoring

Conceptually, the recommendation score can combine multiple signals:

```text
Recommendation Score
        =
Product Similarity
+
Preference Match
+
Sentiment Compatibility
+
Emotion Compatibility
```

The exact weighting depends on the implementation and should be configured based on validation rather than arbitrarily assigning weights.

---

# 🏆 17. Recommendation Result

The reported recommendation performance was:

### **90–95% match quality**

This means the recommendation output was reported as matching the desired/user preference criteria at approximately this level under the project's evaluation approach.

It should not automatically be interpreted as a standard classification accuracy.

---

# 📊 18. Project Performance Summary

```text
┌──────────────────────────────────────────┐
│        PROJECT PERFORMANCE               │
├──────────────────────────────────────────┤
│                                          │
│ Sentiment Classification                │
│ TF-IDF + Logistic Regression             │
│ → 85–90% Accuracy                        │
│                                          │
│ Emotion Detection                        │
│ Fine-Tuned BERT                          │
│ → 96% Accuracy                            │
│                                          │
│ Recommendation                           │
│ Sentiment-Aware Recommendation           │
│ → 90–95% Match Quality                   │
│                                          │
└──────────────────────────────────────────┘
```

---

# 🧪 19. Evaluation Metrics

## Accuracy

Accuracy measures the proportion of correctly classified examples.

$$
Accuracy =
\frac{Correct\ Predictions}
{Total\ Predictions}
$$

Your reported values:

```text
Sentiment Classification:
85–90%

Emotion Detection:
96%
```

---

## Precision

Precision measures how many predicted positive samples were actually positive.

$$
Precision =
\frac{TP}{TP+FP}
$$

where:

* TP = True Positive
* FP = False Positive

---

## Recall

Recall measures how many actual positive samples were successfully identified.

$$
Recall =
\frac{TP}{TP+FN}
$$

where:

* FN = False Negative

---

## F1 Score

F1 balances precision and recall.

$$
F1 =
2\times
\frac{Precision\times Recall}
{Precision+Recall}
$$

---

# 🔬 20. Model Comparison

| Model                 | Approach                       | Purpose                  |          Reported Result |
| --------------------- | ------------------------------ | ------------------------ | -----------------------: |
| VADER                 | Lexicon/rule-based             | Sentiment baseline       |                 Baseline |
| Logistic Regression   | TF-IDF + ML                    | Sentiment classification |      **85–90% accuracy** |
| BERT                  | Transformer                    | Emotion detection        |         **96% accuracy** |
| DistilRoBERTa         | Distilled Transformer          | Contextual NLP           |             Experimental |
| Recommendation Engine | Similarity + sentiment/emotion | Product recommendation   | **90–95% match quality** |

---

# 🔥 21. Why Multiple Models?

Different models solve different parts of the problem.

### VADER

Fast baseline.

### TF-IDF + Logistic Regression

Efficient traditional NLP approach.

### BERT

Deep contextual understanding.

### DistilRoBERTa

More lightweight transformer-based contextual processing.

Therefore, the project demonstrates a progression:

```text
Rule-Based NLP
      ↓
Traditional ML
      ↓
Transformer NLP
      ↓
Sentiment-Aware Recommendation
```

---

# ⚙️ 22. Installation

Clone the repository:

```bash
git clone https://github.com/manishraina0904/sentiment-aware-product-recommendation.git
cd sentiment-aware-product-recommendation
```

Create a virtual environment:

```bash
python -m venv venv
```

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

---

# 📦 23. Recommended Requirements

A typical environment can include:

```text
python
numpy
pandas
scikit-learn
nltk
matplotlib
seaborn
torch
transformers
datasets
```

Install NLTK resources when required:

```python
import nltk

nltk.download("punkt")
nltk.download("stopwords")
nltk.download("vader_lexicon")
nltk.download("wordnet")
```

---

# ▶️ 24. Running the Project

If the project is notebook-based:

```bash
jupyter notebook
```

Then run the notebooks in sequence:

```text
01_data_exploration.ipynb
        ↓
02_sentiment_analysis.ipynb
        ↓
03_tfidf_logistic_regression.ipynb
        ↓
04_bert_emotion_detection.ipynb
        ↓
05_recommendation_engine.ipynb
```

If Python scripts are used:

```bash
python src/preprocessing/text_preprocessing.py
```

```bash
python src/sentiment/sentiment_classifier.py
```

```bash
python src/emotion/bert_emotion.py
```

```bash
python src/recommendation/recommender.py
```

Use the commands that correspond to the actual files present in the repository.

---

# 🧑‍💻 25. Example Workflow

```python
review = """
The camera quality is excellent but the battery
life is disappointing.
"""
```

### Sentiment analysis

```text
Camera → Positive
Battery → Negative
```

### Emotion analysis

```text
Camera → Satisfaction
Battery → Disappointment
```

### Preference extraction

```text
Preferred:
Camera quality

Avoid:
Poor battery
```

### Recommendation

```text
Products with:
✓ Strong camera
✓ Strong battery
✓ Similar product characteristics

→ Higher recommendation relevance
```

---

# 🧠 26. Core NLP Concepts Used

This project demonstrates practical understanding of:

* Natural Language Processing
* Text preprocessing
* Tokenization
* Stop-word handling
* Lemmatization
* Sentiment analysis
* Emotion detection
* TF-IDF
* Logistic Regression
* Transformer architecture
* BERT
* DistilRoBERTa
* Text classification
* Feature representation
* Vector similarity
* Recommendation systems
* Model evaluation

---

# 🎯 27. Business Use Cases

This architecture can be applied to:

### E-commerce

Analyze customer reviews and personalize product recommendations.

### Retail

Identify common customer preferences and complaints.

### Customer Experience

Understand why customers are satisfied or dissatisfied.

### Product Analytics

Identify frequently praised or criticized product characteristics.

### Personalized Shopping

Recommend products based on the user's expressed preferences.

### Review Intelligence

Convert unstructured reviews into structured insights.

---

# ⚠️ 28. Limitations

The current system has several limitations.

### 1. Aspect-level sentiment

A review can contain multiple opinions:

> "Great camera but poor battery."

A basic review-level sentiment classifier may not completely separate every aspect.

### 2. Sarcasm

Example:

> "Great, another phone that dies in two hours."

Sarcasm is difficult for traditional sentiment systems.

### 3. Context

Short reviews can be ambiguous without additional context.

### 4. Dataset dependency

Model performance depends heavily on the quality, size, and distribution of the training data.

### 5. Recommendation evaluation

Recommendation quality depends on how the ground truth or matching criteria are defined.

### 6. Transformer computational cost

BERT-based models require significantly more computational resources than simple TF-IDF pipelines.

---

# 🚀 29. Future Improvements

Potential future improvements include:

### Aspect-Based Sentiment Analysis

Instead of analyzing an entire review:

```text
Review → Positive
```

extract:

```text
Camera → Positive
Battery → Negative
Display → Positive
```

### Personalized User Embeddings

Create embeddings representing individual users based on their historical preferences.

### Hybrid Recommendation

Combine:

```text
Content-Based Filtering
+
Collaborative Filtering
+
Sentiment Analysis
```

### Explainable Recommendations

Instead of simply showing:

```text
Recommended Product X
```

show:

> **Recommended because you prefer high camera quality and strong battery performance.**

### Real-Time Recommendation

Process reviews and user interactions in real time.

### Multilingual Reviews

Support reviews written in multiple languages.

### LLM Integration

Use modern LLMs for:

* Aspect extraction
* Review summarization
* Preference extraction
* Recommendation explanations

---

# 📈 30. Future Architecture

```text
                         USER
                          │
                          ▼
                  USER INTERACTIONS
                          │
                          ▼
                  REVIEW / HISTORY
                          │
                          ▼
                 NLP / LLM PIPELINE
                          │
             ┌────────────┼────────────┐
             ▼            ▼            ▼
         Sentiment      Emotion      Aspects
             │            │            │
             └────────────┼────────────┘
                          ▼
                  USER EMBEDDING
                          │
                          ▼
              HYBRID RECOMMENDER
                    /           \
                   /             \
          Content-Based      Collaborative
                   \             /
                    \           /
                     ▼         ▼
                    RANKING ENGINE
                          │
                          ▼
               PERSONALIZED PRODUCTS
                          │
                          ▼
                EXPLANATION LAYER
                          │
                          ▼
                RECOMMENDATION + WHY
```

---

# 📚 31. Key Formulas

### TF-IDF

$$
TFIDF(t,d)=TF(t,d)\times IDF(t)
$$

### Logistic Regression

$$
P(y=1|x)=\frac{1}{1+e^{-w^Tx+b}}
$$

### Cosine Similarity

$$
Cosine(A,B)=
\frac{A\cdot B}
{\|A\|\|B\|}
$$

### Precision

$$
Precision=\frac{TP}{TP+FP}
$$

### Recall

$$
Recall=\frac{TP}{TP+FN}
$$

### F1

$$
F1=2\frac{Precision\times Recall}{Precision+Recall}
$$

---

# 🎤 32. Interview Explanation

If asked:

## "Explain your project."

Use this:

> **I developed a Sentiment-Aware Product Recommendation System using NLP. The goal was to improve traditional product recommendations by extracting information from customer reviews instead of relying only on ratings.**
>
> **I first performed text preprocessing and used VADER for baseline sentiment analysis. Then I used TF-IDF to convert reviews into numerical features and trained Logistic Regression for sentiment classification, achieving around 85–90% accuracy.**
>
> **For deeper contextual understanding, I fine-tuned BERT for emotion detection and achieved around 96% accuracy. I also experimented with DistilRoBERTa as a lighter transformer-based approach.**
>
> **Finally, I incorporated the sentiment and emotional information into the recommendation pipeline along with product similarity. This allowed the system to identify what users liked and disliked and use those signals when ranking products. The reported recommendation match quality was around 90–95%.**

---

# 💬 33. Interview Questions

### Q1. Why did you use NLP?

> Because customer reviews are unstructured textual data, and NLP allows us to convert those reviews into useful sentiment, emotion, and preference signals.

### Q2. Why VADER?

> VADER is fast, lightweight, and useful as a baseline sentiment analyzer without requiring model training.

### Q3. Why TF-IDF?

> TF-IDF converts textual data into numerical features while giving greater importance to informative words.

### Q4. Why Logistic Regression?

> It is an efficient and strong baseline for classification with high-dimensional sparse TF-IDF features.

### Q5. Why BERT?

> BERT provides contextual representations and can understand relationships between words better than simple bag-of-words approaches.

### Q6. Why DistilRoBERTa?

> It provides transformer-based contextual understanding with a lighter architecture and reduced computational requirements compared with larger transformer models.

### Q7. What is sentiment analysis?

> Sentiment analysis determines the polarity of text, typically positive, negative, or neutral.

### Q8. What is emotion detection?

> Emotion detection identifies the specific emotional response expressed in text, such as joy, anger, sadness, or frustration.

### Q9. What is the difference between sentiment and emotion?

> Sentiment gives the overall polarity, while emotion provides more detailed information about the type of emotional response.

### Q10. How does the recommendation system use sentiment?

> It extracts positive and negative preference signals from reviews and incorporates them into product representation and ranking.

### Q11. What similarity method can be used?

> Cosine similarity can compare vector representations of products or reviews.

### Q12. What was your sentiment model performance?

> The TF-IDF plus Logistic Regression approach achieved approximately 85–90% accuracy.

### Q13. What was your emotion model performance?

> The fine-tuned BERT model achieved approximately 96% accuracy.

### Q14. What was the recommendation performance?

> The reported recommendation match quality was approximately 90–95%.

### Q15. What was the biggest challenge?

> Handling reviews containing multiple opinions was a major challenge because a single review can be positive about one product attribute and negative about another.

---

# 🏁 34. Conclusion

The **Sentiment-Aware Product Recommendation System** combines traditional NLP, machine learning, and transformer-based language models to make product recommendations more personalized.

The complete pipeline is:

```text
Customer Reviews
       ↓
Text Preprocessing
       ↓
Sentiment Analysis
       ↓
Emotion Detection
       ↓
Preference Extraction
       ↓
Product Representation
       ↓
Similarity Calculation
       ↓
Sentiment-Aware Ranking
       ↓
Personalized Recommendations
```

### Final reported metrics

```text
┌────────────────────────────────────────────┐
│ SENTIMENT CLASSIFICATION                   │
│ TF-IDF + Logistic Regression               │
│ 85–90% Accuracy                            │
├────────────────────────────────────────────┤
│ EMOTION DETECTION                          │
│ Fine-Tuned BERT                            │
│ 96% Accuracy                               │
├────────────────────────────────────────────┤
│ RECOMMENDATION                             │
│ Sentiment-Aware Recommendation             │
│ 90–95% Match Quality                       │
└────────────────────────────────────────────┘
```

---

## 👨‍💻 Author

**Manish Raina**

AI/ML Engineer | Python | NLP | Machine Learning | Deep Learning

### Areas of Interest

* Artificial Intelligence
* Machine Learning
* Natural Language Processing
* Generative AI
* Recommendation Systems
* Deep Learning
* Full-Stack AI Applications

---

## 📜 License

This project is intended for educational and research purposes.

If a specific open-source dataset, pretrained model, or external resource is used in the implementation, follow its respective license and attribution requirements.
