# Backend API Specifications for Sentiment Aware

## Overview
This document outlines the API requirements for the Sentiment Aware backend to support the frontend recommendation and product detail system.

---

## 1. CURRENT ENDPOINT (Already Implemented)

### POST /recommend

**Purpose:** Analyze user sentiment and return product recommendations

**Request:**
```json
{
  "text": "string - user's review or analysis text"
}
```

**Example Request:**
```json
{
  "text": "I want a phone with a good camera and long battery life"
}
```

**Response Format:**
```json
{
  "results": [
    {
      "product_name": "string",
      "brand": "string",
      "rating": "number (0-5)",
      "final_score": "number (0-1)",
      "product_image": "string (optional - image URL)"
    }
  ],
  "analysis": {
    "sentiment_confidence": "number (0-100) - overall sentiment confidence %",
    "emotion_confidence": "number (0-100) - confidence for emotions",
    "positive_score": "number (0-1) - positive sentiment proportion",
    "negative_score": "number (0-1) - negative sentiment proportion",
    "neutral_score": "number (0-1) - neutral sentiment proportion"
  }
}
```

**Example Response:**
```json
{
  "results": [
    {
      "product_name": "iPhone 15 Pro",
      "brand": "Apple",
      "rating": 4.8,
      "final_score": 0.92,
      "product_image": "https://example.com/iphone15.jpg"
    },
    {
      "product_name": "Samsung Galaxy S24",
      "brand": "Samsung",
      "rating": 4.6,
      "final_score": 0.88,
      "product_image": "https://example.com/galaxy.jpg"
    }
  ],
  "analysis": {
    "sentiment_confidence": 85,
    "emotion_confidence": 10,
    "positive_score": 0.85,
    "negative_score": 0.05,
    "neutral_score": 0.10
  }
}
```

---

## 2. DATA FLOW

```
User Input
    ↓
POST /recommend (with user's text)
    ↓
Backend:
  1. Tokenize and preprocess text
  2. Run through BERT/NLP model for sentiment analysis
  3. Extract sentiment scores (positive, negative, neutral)
  4. Calculate confidence metrics
  5. Match user sentiment against product database
  6. Rank products by sentiment match
    ↓
Return JSON response
    ↓
Frontend displays:
  - 3 circular progress charts (Positive/Neutral/Negative)
  - Product recommendations in grid
  - Each product card shows:
    * Product image
    * Brand and name
    * Rating (stars)
    * Sentiment match score (%)
  - Optional: View Details button
    ↓
User clicks "View Details" on a product
    ↓
Frontend navigates to ProductDetail page with:
  - Product data
  - User's original analysis text
  - Sentiment analysis results
    ↓
Product Detail page displays:
  - Product image (enlarged)
  - Brand, name, rating
  - Detailed sentiment analysis breakdown
  - Product specifications
  - Purchase buttons (Amazon, Flipkart)
  - Sentiment report for this specific product
  - Customer reviews section
```

---

## 3. KEY FEATURES THE BACKEND SHOULD SUPPORT

### A. Sentiment Analysis
- **Positive Score** (0-1): Proportion of positive sentiment in user's text
- **Negative Score** (0-1): Proportion of negative sentiment in user's text
- **Neutral Score** (0-1): Proportion of neutral sentiment in user's text
- **Sentiment Confidence** (0-100): How confident the model is in its overall assessment
- **Emotion Confidence** (0-100): Confidence in emotion classification

### B. Product Matching
- Match products based on sentiment scores
- Calculate `final_score` as a combination of:
  - Sentiment match percentage (higher = better match)
  - Product rating
  - Number of positive reviews matching user sentiment

### C. Product Database
- Should contain at least 50+ products with:
  - `product_name`
  - `brand`
  - `rating` (0-5 stars)
  - `product_image` URL
  - Category/type for better matching
  - Customer reviews (for sentiment analysis)

---

## 4. EXAMPLE SENTIMENT ANALYSIS FLOW

**User Input:** "I want a reliable phone with excellent camera quality and fast charging"

**NLP Analysis:**
- Positive words detected: "reliable", "excellent", "fast"
- Sentiment breakdown:
  - Positive: 85%
  - Neutral: 10%
  - Negative: 5%
- Sentiment confidence: 90% (high confidence in this analysis)

**Product Matching:**
- Search database for phones with:
  - Good camera ratings (matches "excellent camera")
  - High reliability ratings (matches "reliable")
  - Fast charging capability (matches "fast charging")
- Rank by match score and return top 3-6 products

---

## 5. REQUIRED API RESPONSE STRUCTURE

**Minimum Requirements:**
- `results` array with at least 1, max 10 products
- Each product must have: `product_name`, `brand`, `rating`, `final_score`
- `product_image` should be a valid URL or null
- `analysis` object with all 5 fields

**Validation:**
- `sentiment_confidence` and `emotion_confidence`: 0-100
- `positive_score`, `negative_score`, `neutral_score`: 0-1 (sum ≈ 1)
- `rating`: 0-5
- `final_score`: 0-1

---

## 6. TECHNICAL RECOMMENDATIONS

### NLP Models to Use
- **Primary:** BERT (Bidirectional Encoder Representations from Transformers)
- **Alternative:** DistilBERT (faster, lighter version)
- **Emotion Detection:** RoBERTa-based emotion classifier
- **Framework:** Hugging Face Transformers library

### Database Schema (Suggested)

```sql
Products Table:
- id (PRIMARY KEY)
- product_name (VARCHAR)
- brand (VARCHAR)
- category (VARCHAR)
- rating (FLOAT)
- average_sentiment_score (FLOAT)
- product_image_url (VARCHAR)
- num_reviews (INT)
- created_at (TIMESTAMP)

Reviews Table:
- id (PRIMARY KEY)
- product_id (FOREIGN KEY)
- review_text (TEXT)
- sentiment_score (FLOAT)
- rating (INT)
- created_at (TIMESTAMP)
```

### Performance Requirements
- Response time: < 2 seconds
- Support concurrent requests: 100+ simultaneous users
- Batch processing: Can handle multiple requests per minute

---

## 7. ERROR HANDLING

**Error Response Format:**
```json
{
  "error": "error_code",
  "message": "Human readable error message"
}
```

**Error Codes:**
- `empty_text`: User didn't provide any text
- `invalid_input`: Text too short or invalid format
- `model_error`: Issue with NLP model inference
- `database_error`: Issue fetching products
- `server_error`: Internal server error

---

## 8. FRONTEND FEATURES TO ENABLE

### A. Product Recommendation Card
```
┌─────────────────────┐
│ Product Image       │
├─────────────────────┤
│ ✨ 92% (Match)     │ ← Uses final_score
│ Apple               │ ← Brand
│ iPhone 15 Pro       │ ← Product name
│ ★★★★★ 4.8/5       │ ← Rating
│ [Progress Bar]      │ ← Sentiment match
│ [View Details] →    │ ← Navigation button
└─────────────────────┘
```

### B. Product Detail Page
```
1. Product Info Section
   - Large product image
   - Brand, name, rating
   - Sentiment match percentage
   
2. Sentiment Analysis Section
   - Positive score bar: 85%
   - Neutral score bar: 10%
   - Negative score bar: 5%
   
3. Why Recommended Section
   - User's original search: "I want a good phone..."
   - Match explanation: "This product matched 92%..."
   
4. Product Features
   - Dummy features (key specs)
   
5. Purchase Section
   - Amazon link
   - Flipkart link
   
6. Reviews Tab
   - Dummy customer reviews
```

---

## 9. CORS & SECURITY

- Enable CORS for frontend domain
- Add rate limiting (e.g., 100 requests per minute per IP)
- Input validation on all endpoints
- Sanitize user input before processing

---

## 10. DEPLOYMENT CHECKLIST

- [ ] NLP model loaded and cached in memory
- [ ] Product database populated with 50+ products
- [ ] CORS headers configured
- [ ] Rate limiting enabled
- [ ] Error handling implemented
- [ ] Logging system in place
- [ ] API tested with various inputs
- [ ] Response times optimized (< 2 sec)

---

## 11. TESTING THE API

### Test Case 1: Positive Sentiment
```bash
curl -X POST http://127.0.0.1:8000/recommend \
  -H "Content-Type: application/json" \
  -d '{"text": "I love this product! It works perfectly and exceeded my expectations."}'
```

**Expected:** High positive_score, high sentiment_confidence, matching products

### Test Case 2: Negative Sentiment
```bash
curl -X POST http://127.0.0.1:8000/recommend \
  -H "Content-Type: application/json" \
  -d '{"text": "This product is terrible and does not work as promised."}'
```

**Expected:** High negative_score, matching products with lower ratings

### Test Case 3: Mixed Sentiment
```bash
curl -X POST http://127.0.0.1:8000/recommend \
  -H "Content-Type: application/json" \
  -d '{"text": "The product is good but has some issues with battery life."}'
```

**Expected:** Balanced scores, medium sentiment_confidence

---

## 12. NEXT STEPS

1. Set up BERT/RoBERTa models for sentiment analysis
2. Create product database with detailed information
3. Implement product matching algorithm
4. Create `/recommend` endpoint with proper error handling
5. Test with various user inputs
6. Deploy to production server
7. Monitor performance and accuracy

---

## 13. CONTACT & SUPPORT

**Frontend Team Contact:** sentimentrecommendation@gmail.com
**Phone:** +91 6005001995 / +91 7082233139

For any clarifications on API specifications, please reach out!
