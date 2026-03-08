# ============================================================
#   SENTIMENT-AWARE SMART INTENT FILTER (Ultra Smart v7.1)
#   - Stricter but safe
#   - Handles Hinglish, typos, brands
#   - Returns stable signals for recommendation engine
# ============================================================

import re
from rapidfuzz import fuzz, process
from sentence_transformers import SentenceTransformer, util
from transformers import pipeline
import torch

DEVICE = 0 if torch.cuda.is_available() else -1

sem_model = SentenceTransformer("all-MiniLM-L6-v2")
if torch.cuda.is_available():
    sem_model = sem_model.to("cuda")

zero_shot = pipeline(
    "zero-shot-classification",
    model="facebook/bart-large-mnli",
    device=DEVICE
)

DEVICE_KEYWORDS = {
    "phone","mobile","smartphone","laptop","tablet",
    "camera","watch","smartwatch","earphone","headphone",
    "monitor","tv","router","earbuds","speaker"
}

INTENT_WORDS = {
    "recommend","suggest","best","buy","need","want",
    "looking","search","find","good","which","compare",
    "vs","versus","between","pick","choose"
}

FEATURE_WORDS = {
    "camera","battery","ram","storage","fast","performance",
    "processor","charging","display","screen","selfie","price","budget"
}

BLACKLIST = {
    "song","lyrics","movie","joke","story","whatsapp","download",
    "spotify","soundcloud","gaana","saavn","status","meme","instagram","tiktok"
}

KNOWN_BRANDS = set()

KNOWN_WORDS = list(DEVICE_KEYWORDS) + list(INTENT_WORDS) + list(FEATURE_WORDS)

STOP_WORDS = {
    "i","me","my","you","your","we","us","the","a","an","and","or","in","on",
    "for","to","of","is","are","was","were","please","pls","please"
}

def set_known_brands(brands):
    global KNOWN_BRANDS, KNOWN_WORDS
    KNOWN_BRANDS = set(b.lower() for b in brands)
    KNOWN_WORDS += list(KNOWN_BRANDS)


# ------------ helper ----------------

def detect_comparison(text):
    text = text.lower()
    if any(x in text for x in [" vs ", " versus ", "compare", "which is better"]):
        return True
    return False

def is_maybe_price_query(text):
    return bool(re.search(r"\b(under|below|less than|₹|inr|rs\.?|rs\b)\b", text.lower()))

def correct_spelling(text):
    tokens = text.split()
    corrected = []

    candidate_pool = KNOWN_WORDS + list(KNOWN_BRANDS)

    for tok in tokens:
        clean = re.sub(r"[^a-zA-Z0-9]", "", tok).lower()

        if len(clean) <= 2 or clean in STOP_WORDS or clean.isdigit():
            corrected.append(tok)
            continue

        if clean in candidate_pool:
            corrected.append(tok)
            continue

        res = process.extractOne(clean, candidate_pool, scorer=fuzz.WRatio)
        if res and res[1] >= 85:
            corrected.append(res[0])
        else:
            corrected.append(tok)

    return " ".join(corrected)

GOOD_EXAMPLES = [
    "recommend phone",
    "suggest best mobile",
    "best phone under 20000",
    "which phone should I buy"
]
good_emb = sem_model.encode(GOOD_EXAMPLES, convert_to_tensor=True)

def semantic_layer(t):
    emb = sem_model.encode(t, convert_to_tensor=True)
    score = util.cos_sim(emb, good_emb).max().item()
    return score >= 0.36, score

def zs_intent(text):
    out = zero_shot(
        text,
        candidate_labels=["recommendation", "comparison", "product_search", "shopping", "nonsense"]
    )
    label = out["labels"][0]
    score = out["scores"][0]
    return label in {"recommendation", "comparison", "product_search", "shopping"}, label, score

def rule_layer(text):
    t = text.lower()

    if any(b in t for b in BLACKLIST):
        return False

    has_brand = any(b in t for b in KNOWN_BRANDS)
    has_device = any(d in t for d in DEVICE_KEYWORDS)
    has_intent = any(i in t for i in INTENT_WORDS)
    has_feature = any(f in t for f in FEATURE_WORDS)
    has_price = is_maybe_price_query(t)
    is_comp = detect_comparison(t)

    if (has_brand and has_device) or (has_device and (has_intent or has_feature)):
        return True
    if has_intent and (has_device or has_price or has_feature):
        return True
    if is_comp and (has_brand or has_device):
        return True

    return False

def not_meaningless(t):
    t = t.strip()
    if len(t) == 0:
        return False
    if len(t.split()) == 1:
        return t.lower() not in {"hi","hello","hey","thanks","ok","bye"}
    return True

def analyze_query(text):
    corrected = correct_spelling(text)
    t = corrected.lower()

    has_brand = [b for b in KNOWN_BRANDS if b in t]
    has_feat = [f for f in FEATURE_WORDS if f in t]

    sem_ok, sem_score = semantic_layer(t)
    zs_ok, zs_label, zs_score = zs_intent(t)
    rule_ok = rule_layer(t)
    meaning = not_meaningless(t)
    comparison = detect_comparison(t)

    return {
        "corrected": corrected,
        "brands": has_brand,
        "features": has_feat,
        "semantic_score": sem_score,
        "zs_score": zs_score,
        "rule_pass": rule_ok,
        "meaningful": meaning,
        "intent_label": zs_label,
        "comparison": comparison
    }

def is_real_recommendation_query(text):
    a = analyze_query(text)
    t = text.lower()

    if not a["meaningful"]:
        return False
    if any(b in t for b in BLACKLIST):
        return False

    has_brand = len(a["brands"]) > 0
    has_device = any(d in t for d in DEVICE_KEYWORDS)
    has_feat = len(a["features"]) > 0
    has_intent = any(i in t for i in INTENT_WORDS)
    price = is_maybe_price_query(t)
    comparison = a["comparison"]

    if a["rule_pass"]:
        if a["zs_score"] >= 0.55:
            return True
        if a["semantic_score"] >= 0.36:
            return True
        if has_device or has_brand or has_feat or price:
            return True
        return False

    if not a["rule_pass"]:
        if a["zs_score"] >= 0.65 and a["semantic_score"] >= 0.40:
            if has_brand or has_device or has_feat or has_intent or price or comparison:
                return True

    return False